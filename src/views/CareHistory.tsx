import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FAB, List, PaperProvider, Text } from 'react-native-paper'
import { CareEventDetailView } from '../components/CareHistory/CareEventDetailView'
import { FilterBar } from '../components/CareHistory/FilterBar'
import { CareHistoryCard } from '../components/CareHistory/CareHistoryCard'
import { AddEditEventModal } from '../components/CareHistory/AddEditEventModal'
import { useCareHistoryStore } from '../store/careHistoryStore'
import { IBovine } from '../interfaces/Livestock'
import { FincaModel } from '../interfaces/IFinca'
import { LoadingScreen } from '../components/LoadingStream'
import { obtenerGanadoPorFincaServices } from '../services/bovinosService'
import { CareEvent } from '../interfaces/CareEvent'

interface CareHistoryProps {
  route: {
    params: {
      animal: IBovine | FincaModel
      type: 'cattle' | 'farm'
    }
  }
}

export default function CareHistoryCRUD({ route }: CareHistoryProps) {
  const { animal, type } = route.params
  const [loading, setLoading] = useState(true)

  const {
    bovinos,
    currentEvent,
    isDetailViewVisible,
    isModalVisible,
    typeHistory,
    handleFilter,
    handleAddEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    openAddModal,
    openEditModal,
    openDetailView,
    closeModal,
    closeDetailView,
    handleExpandedAccordion,
    getCareHistoryByBovino,
    getCareHistoryByFinca,
  } = useCareHistoryStore()

  const [bovinosChoose, setBovinosChoose] = useState<IBovine[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (type === 'cattle') {
        await getCareHistoryByBovino((animal as IBovine).id)
      } else if (type === 'farm') {
        await getCareHistoryByFinca((animal as FincaModel)._id)
        const bovinos = await obtenerGanadoPorFincaServices(
          (animal as FincaModel)._id
        )
        setBovinosChoose(bovinos)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const confirmDelete = useCallback(
    async (id: string) => {
      Alert.alert(
        'Eliminar evento',
        '¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            onPress: () => handleDeleteEvent(id),
            style: 'destructive',
          },
        ]
      )
    },
    [handleDeleteEvent]
  )

  if (loading) {
    return <LoadingScreen /> // Muestra un mensaje de carga
  }

  if (isDetailViewVisible && currentEvent) {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <CareEventDetailView
            event={currentEvent}
            onEdit={() => openEditModal(currentEvent)}
            onDelete={() => handleDeleteEvent(currentEvent.id)}
            onBack={closeDetailView}
          />
          <AddEditEventModal
            visible={isModalVisible}
            onClose={closeModal}
            onSave={currentEvent ? handleUpdateEvent : handleAddEvent}
            event={currentEvent}
            bovino={animal as IBovine}
            bovinosChoose={bovinosChoose}
            typeView={type}
          />
        </SafeAreaProvider>
      </PaperProvider>
    )
  }

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {
            type === "farm" && <Text style={styles.title}>Historial de salud de {(animal as FincaModel).nombre}</Text>
          }
          <FilterBar onFilter={handleFilter} />
          <List.AccordionGroup>
            {bovinos.map((item) => {
              const dataAccordion =
                typeHistory === 'Todos'
                  ? item.careHistory
                  : item.careHistory.filter(
                      (item: CareEvent) => item.type === typeHistory
                    )
              return (
                <List.Accordion
                  title={item.identifier}
                  left={(props) => <List.Icon {...props} icon="cow" />}
                  expanded={item.expanded}
                  onPress={() => handleExpandedAccordion(item.id)}
                  id={item.id}
                  key={item.id}
                >
                  <FlatList
                    style={{ paddingBottom: 30 }}
                    data={dataAccordion}
                    renderItem={({ item }) => (
                      <CareHistoryCard
                        event={item}
                        onPress={() => openDetailView(item)}
                        onEdit={() => openEditModal(item)}
                        onDelete={() => confirmDelete(item.id)}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={[
                      styles.listContent,
                      { paddingBottom: dataAccordion.length > 3 ? 120 : 0 },
                    ]}
                  />
                </List.Accordion>
              )
            })}
          </List.AccordionGroup>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={openAddModal}
            color="white"
          />
          <AddEditEventModal
            visible={isModalVisible}
            onClose={closeModal}
            onSave={currentEvent ? handleUpdateEvent : handleAddEvent}
            event={currentEvent}
            bovino={animal as IBovine}
            bovinosChoose={bovinosChoose}
            typeView={type}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
    backgroundColor: '#1B5E20',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    padding: 16,
  },
})

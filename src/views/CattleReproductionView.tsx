import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  FAB,
  Searchbar,
  PaperProvider,
  DefaultTheme,
  useTheme,
} from 'react-native-paper'
import { ReproductiveEvent } from '../interfaces/ReproductiveEvent'
import { AddEventModal } from '../components/CattleReproduction/AddEventModal'
import { EventDetailsModal } from '../components/CattleReproduction/EventDetailsModal'
import { AddCattleModal } from '../components/CattleReproduction/AddCattleModal'
import { AddCattleModal as AddRecentCattleModal } from '../components/Bovine/AddCattleModal'
import { useCattleReproductionStore } from '../store/cattleReproductionStore'
import FilterBar from '../components/CattleReproduction/FilterBar'
import { CardReproduction } from '../components/CattleReproduction/CardReproduction'
import { LoadingScreen } from '../components/LoadingStream'
import { IBovine } from '../interfaces/Livestock'
import { FincaModel } from '../interfaces/IFinca'
import { obtenerGanadoPorFincaServices } from '../services/bovinosService'
import { useBovinosStore } from '../store/useBovinoStore'

interface CattleDetailScreenProps {
  route: {
    params: {
      animal: IBovine | FincaModel
      type: 'cattle' | 'farm'
    }
  }
}

export const CattleReproductionView = ({ route }: CattleDetailScreenProps) => {
  const { animal } = route.params

  const {
    cattleData,
    searchQuery,
    filterType,
    selectedCattle,
    isAddModalVisible,
    isAddCattleModalVisible,
    setSearchQuery,
    toggleAddModal,
    toggleAddCattleModal,
    addEventToCattle,
    addCattle,
    getReproductiveEventsByBovino,
    getReproductiveEventsByFinca,
  } = useCattleReproductionStore()

  const { crearGanado } = useBovinosStore()

  const [loading, setLoading] = useState(true)

  const [selectedEvent, setSelectedEvent] = useState<ReproductiveEvent | null>(
    null
  )
  const [isEventDetailsModalVisible, setIsEventDetailsModalVisible] =
    useState(false)

  const [bovinos, setBovinos] = useState<IBovine[]>([])
  const [isAddRecentBirthModalVisible, setIsAddRecentBirthModalVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (route.params.type === 'cattle') {
          await getReproductiveEventsByBovino((animal as IBovine).id)
        } else {
          let fincaId = (animal as FincaModel)._id as string
          await getReproductiveEventsByFinca(fincaId)
          const bovinos = (await obtenerGanadoPorFincaServices(
            fincaId
          )) as IBovine[]
          setBovinos(bovinos.filter((item) => item.gender === 'hembra'))
        }
      } catch (error) {
        console.error('Error fetching data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddCattle = useCallback(async (newCattle: IBovine) => {
    await crearGanado(newCattle)
    setIsAddRecentBirthModalVisible(false)
  }, [])

  const theme = useTheme()
  theme.colors.primary = '#1B5E20'

  if (loading) {
    return <LoadingScreen /> // Muestra un mensaje de carga
  }

  const filteredCattleData = cattleData.filter(
    (cattle) =>
      cattle.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterType === 'all' ||
        cattle?.events?.some((event) => event.type === filterType))
  )

  const openAddRecentBirthModal = () => {
    setIsAddRecentBirthModalVisible(true)
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search cattle"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
            />
          </View>
          <FilterBar />
          <ScrollView style={styles.content}>
            {filteredCattleData.map((cattle) => (
              <CardReproduction
                key={cattle.id}
                cattle={cattle}
                setIsEventDetailsModalVisible={setIsEventDetailsModalVisible}
                setSelectedEvent={setSelectedEvent}
              />
            ))}
          </ScrollView>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => toggleAddCattleModal(true)}
            color="white"
          />
          <AddEventModal
            visible={isAddModalVisible}
            onClose={() => toggleAddModal(false)}
            onAdd={addEventToCattle}
            cattleId={selectedCattle?.id as string}
            existingEvents={selectedCattle ? selectedCattle.events : []}
            openAddRecentBirthModal={openAddRecentBirthModal}
          />
          <EventDetailsModal
            visible={isEventDetailsModalVisible}
            onClose={() => setIsEventDetailsModalVisible(false)}
            event={selectedEvent}
          />
          <AddCattleModal
            animal={animal as IBovine}
            type={route.params.type}
            bovinos={bovinos}
            visible={isAddCattleModalVisible}
            onClose={() => toggleAddCattleModal(false)}
            onAdd={addCattle}
          />
          <AddRecentCattleModal
            visible={isAddRecentBirthModalVisible}
            onClose={() => setIsAddRecentBirthModalVisible(false)}
            onAdd={handleAddCattle}
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
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#F0F0F0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
    backgroundColor: '#1B5E20',
  },
})

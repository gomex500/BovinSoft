import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FAB, PaperProvider } from 'react-native-paper'
import { CareEvent } from '../interfaces/CareEvent'
import { CareEventDetailView } from '../components/CareHistory/CareEventDetailView'
import { FilterBar } from '../components/CareHistory/FilterBar'
import { CareHistoryCard } from '../components/CareHistory/CareHistoryCard'
import { AddEditEventModal } from '../components/CareHistory/AddEditEventModal'

const initialCareHistory: CareEvent[] = [
  {
    id: '1',
    date: '2024-11-15',
    type: 'Vacunación',
    description: 'Vacunación anual contra la gripe',
    performedBy: 'Dr. Smith',
  },
  {
    id: '2',
    date: '2024-11-10',
    type: 'Revisión',
    description: 'Reconocimiento médico rutinario',
    performedBy: 'Dr. Johnson',
  },
  {
    id: '3',
    date: '2024-11-05',
    type: 'Desparasitación',
    description: 'Tratamiento antiparasitario trimestral',
    performedBy: 'Technician Brown',
  },
  {
    id: '4',
    date: '2024-10-28',
    type: 'Recorte de pezuñas',
    description: 'Mantenimiento regular de los cascos',
    performedBy: 'Technician Davis',
  },
  {
    id: '5',
    date: '2024-10-20',
    type: 'Evaluación nutricional',
    description: 'Evaluación y ajuste de la dieta',
    performedBy: 'Nutritionist Wilson',
  },
]

export default function CareHistoryCRUD() {
  const [careHistory, setCareHistory] = useState<CareEvent[]>(initialCareHistory)
  const [filteredHistory, setFilteredHistory] = useState<CareEvent[]>(initialCareHistory)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<CareEvent | null>(null)
  const [isDetailViewVisible, setIsDetailViewVisible] = useState(false)

  const handleFilter = (filterType: string) => {
    if (filterType === 'Todos') {
      setFilteredHistory(careHistory)
    } else {
      setFilteredHistory(
        careHistory.filter((event) => event.type === filterType)
      )
    }
  }

  const handleAddEvent = (newEvent: CareEvent) => {
    const updatedHistory = [
      ...careHistory,
      { ...newEvent, id: Date.now().toString() },
    ]
    setCareHistory(updatedHistory)
    setFilteredHistory(updatedHistory)
    setIsModalVisible(false)
  }

  const handleUpdateEvent = (updatedEvent: CareEvent) => {
    const updatedHistory = careHistory.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    )
    setCareHistory(updatedHistory)
    setFilteredHistory(updatedHistory)
    setIsModalVisible(false)
    setIsDetailViewVisible(false)
  }

  const handleDeleteEvent = (id: string) => {
    const updatedHistory = careHistory.filter((event) => event.id !== id)
    setCareHistory(updatedHistory)
    setFilteredHistory(updatedHistory)
    setIsDetailViewVisible(false)
  }

  const openAddModal = () => {
    setCurrentEvent(null)
    setIsModalVisible(true)
  }

  const openEditModal = (event: CareEvent) => {
    setCurrentEvent(event)
    setIsModalVisible(true)
  }

  const openDetailView = (event: CareEvent) => {
    setCurrentEvent(event)
    setIsDetailViewVisible(true)
  }

  if (isDetailViewVisible && currentEvent) {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <CareEventDetailView
            event={currentEvent}
            onEdit={() => openEditModal(currentEvent)}
            onDelete={() => handleDeleteEvent(currentEvent.id)}
            onBack={() => setIsDetailViewVisible(false)}
          />
          <AddEditEventModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSave={currentEvent ? handleUpdateEvent : handleAddEvent}
            event={currentEvent}
          />
        </SafeAreaProvider>
      </PaperProvider>
    )
  }

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <FilterBar onFilter={handleFilter} />
          <FlatList
            data={filteredHistory}
            renderItem={({ item }) => (
              <CareHistoryCard
                event={item}
                onPress={() => openDetailView(item)}
                onEdit={() => openEditModal(item)}
                onDelete={() => handleDeleteEvent(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={openAddModal}
            color="white"
          />
          <AddEditEventModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSave={currentEvent ? handleUpdateEvent : handleAddEvent}
            event={currentEvent}
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
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
    backgroundColor: '#1B5E20',
  },
})

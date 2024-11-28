import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Header } from '../components/BovineCareCalendar/Header'
import { EventList } from '../components/BovineCareCalendar/EventList'
import { AddEventModal } from '../components/BovineCareCalendar/AddEventModal'

export interface CareEvent {
  id: string
  date: string
  title: string
  description: string
}

export default function BovineCareCalendar() {
  const [selectedDate, setSelectedDate] = useState('')
  const [events, setEvents] = useState<CareEvent[]>([])
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString)
  }

  const addEvent = (event: CareEvent) => {
    setEvents([...events, event])
    setIsAddModalVisible(false)
  }

  const handleShowModal = () => {
    if (selectedDate === '') {
      Alert.alert('Selecciona una fecha', 'Por favor, selecciona una fecha para añadir un evento de cuidado')
      return
    }
    setIsAddModalVisible(true)
  }

  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = { marked: true, dotColor: '#1B5E20' }
    return acc
  }, {} as { [key: string]: { marked: boolean; dotColor: string } })

  return (
    <View style={styles.container}>
      <Header title="Calendario de cuidados" />
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            selectedColor: '#1B5E20',
            marked: markedDates[selectedDate]?.marked,
            dotColor: 'white',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#1B5E20',
          todayTextColor: '#1B5E20',
          arrowColor: '#1B5E20',
        }}
      />
      <EventList
        events={events.filter((event) => event.date === selectedDate)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleShowModal}>
        <Text style={styles.addButtonText}>Añadir evento de cuidado</Text>
      </TouchableOpacity>
      <AddEventModal
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAdd={addEvent}
        selectedDate={selectedDate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#1B5E20',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

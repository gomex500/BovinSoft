import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  Appbar,
  FAB,
  useTheme,
  PaperProvider,
} from 'react-native-paper'
import { Calendar } from 'react-native-calendars'
import { EventList } from '../components/BovineCareCalendar/EventList'
import { AddEventModal } from '../components/BovineCareCalendar/AddEventModal'
import { UpcomingEventsModal } from '../components/BovineCareCalendar/UpcomingEventsModal'
import { useSnackbarStore } from '../store/snackbarStore'
import { useCareCalendarStore } from '../store/CareCalendarStore'
import { IBovine } from '../interfaces/Livestock'
import { FincaModel } from '../interfaces/IFinca'
import { obtenerGanadoPorFincaServices } from '../services/bovinosService'
import { LoadingScreen } from '../components/LoadingStream'

type CareEventAction = 'health' | 'feeding' | 'breeding' | 'other'

export interface CareEvent {
  id: string
  date: string
  title: string
  description: string
  type: CareEventAction
  bovinoId: string
}

interface CareCalendarProps {
  route: {
    params: {
      animal: IBovine | FincaModel
      type: 'cattle' | 'farm'
    }
  }
}

export default function BovineCareCalendar({ route }: CareCalendarProps) {

  const { animal, type } = route.params
  const [isUpcomingModalVisible, setIsUpcomingModalVisible] = useState(false)
  const theme = useTheme()
  const { selectedDate, events, isAddModalVisible, onDayPress, addEvent, handleShowModal, hiddenModal, getCareCalendarByBovino, getCareCalendarByFinca } = useCareCalendarStore()
  const [loading, setLoading] = useState(true)
  const [bovinosChoose, setBovinosChoose] = useState<IBovine[]>([])

  useEffect(() => {
    checkUpcomingEvents()
  }, [events])

  useEffect(() => {
    const fetchData = async () => {
      if (type === 'cattle') {
        await getCareCalendarByBovino((animal as IBovine).id)
      } else if (type === 'farm') {
        await getCareCalendarByFinca((animal as FincaModel)._id)
        const bovinos = await obtenerGanadoPorFincaServices(
          (animal as FincaModel)._id
        )
        setBovinosChoose(bovinos)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const checkUpcomingEvents = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const upcomingEvents = events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === tomorrow.toDateString()
    })

    if (upcomingEvents.length > 0) {
      useSnackbarStore.getState().dispatchSnackbar(`Tienes ${upcomingEvents.length} evento(s) mañana`)
    }
  }

  const getEventTypeColor = (type: CareEvent['type']) => {
    switch (type) {
      case 'health':
        return theme.colors.error
      case 'feeding':
        return theme.colors.primary
      case 'breeding':
        return '#FF4081'
      default:
        return '#1B5E20'
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = {
      marked: true,
      dotColor: getEventTypeColor(event.type),
      activeOpacity: 0,
    }
    return acc
  }, {} as { [key: string]: { marked: boolean; dotColor: string; activeOpacity: number } })

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Appbar.Header>
            <Appbar.Content title="Calendario de cuidados" />
            <Appbar.Action
              icon="calendar-month"
              onPress={() => setIsUpcomingModalVisible(true)}
            />
          </Appbar.Header>
          <View style={styles.content}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                ...markedDates,
                [selectedDate]: {
                  selected: true,
                  selectedColor: theme.colors.primary,
                  marked: markedDates[selectedDate]?.marked,
                  dotColor: markedDates[selectedDate]?.dotColor,
                },
              }}
              theme={{
                selectedDayBackgroundColor: theme.colors.primary,
                todayTextColor: '#FF4081',
                arrowColor: theme.colors.primary,
                monthTextColor: theme.colors.primary,
                textMonthFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 18,
              }}
            />
            <EventList
              events={events.filter((event) => event.date === selectedDate)}
              selectedDate={selectedDate}
              bovino={animal as IBovine}
              bovinosChoose={bovinosChoose}
              typeView={type}
            />
          </View>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={handleShowModal}
            label="Añadir evento"
          />
          <AddEventModal
            visible={isAddModalVisible}
            onClose={hiddenModal}
            onAdd={addEvent}
            selectedDate={selectedDate}
            animal={animal as IBovine}
            typeView={type}
            bovinosChoose={bovinosChoose}
          />
          <UpcomingEventsModal
            visible={isUpcomingModalVisible}
            onClose={() => setIsUpcomingModalVisible(false)}
            events={events}
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
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

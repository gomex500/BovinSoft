import { create } from 'zustand'
import { CareEvent } from '../views/BovineCareCalendar'
import { useSnackbarStore } from './snackbarStore'
import { Alert } from 'react-native'
import moment from 'moment'
import {
  createScheduledCareServices,
  mostrarScheduledCareByBovinoServices,
  mostrarScheduledCareByFincaServices,
} from '../services/scheduledCareServices'

interface ICareCalendarState {
  selectedDate: string
  events: CareEvent[]
  isAddModalVisible: boolean
  onDayPress: (day: { dateString: string }) => void
  addEvent: (event: CareEvent) => Promise<void>
  handleShowModal: () => void
  hiddenModal: () => void
  getCareCalendarByBovino: (bovinoId: string) => Promise<void>
  getCareCalendarByFinca: (fincaId: string) => Promise<void>
}

// Crear el store de usuario
export const useCareCalendarStore = create<ICareCalendarState>((set, get) => ({
  selectedDate: moment().format('YYYY-MM-DD'),
  events: [],
  isAddModalVisible: false,

  onDayPress: (day: { dateString: string }) => set({ selectedDate: day.dateString }),

  addEvent: async (event: CareEvent) => {
    let eventResponse = await createScheduledCareServices(event)

    if (!eventResponse) {
      useSnackbarStore
        .getState()
        .dispatchSnackbar('Error al añadir evento de cuidado')
      return
    }

    event.id = eventResponse.id

    useSnackbarStore.getState().dispatchSnackbar('Evento añadido con éxito')
    set({ events: [...get().events, event], isAddModalVisible: false })
  },

  handleShowModal: () => {
    let selectedDate = get().selectedDate

    if (selectedDate === '') {
      Alert.alert(
        'Selecciona una fecha',
        'Por favor, selecciona una fecha para añadir un evento de cuidado'
      )
      return
    }
    set({ isAddModalVisible: true })
  },

  hiddenModal: () => {
    set({ isAddModalVisible: false })
  },

  getCareCalendarByBovino: async (bovinoId: string) => {
    const data = await mostrarScheduledCareByBovinoServices(bovinoId)

    if ((data as { error: string }).error) return

    set((state) => ({
      ...state,
      events: data as CareEvent[],
    }))
  },
  
  getCareCalendarByFinca: async (fincaId: string) => {
    const data = await mostrarScheduledCareByFincaServices(fincaId)
    if ((data as { error: string }).error) return
    set((state) => ({
      ...state,
      events: data as CareEvent[],
    }))
  },
}))

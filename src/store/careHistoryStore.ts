import { create } from "zustand";
import { BovineWithCareHistory, CareEvent } from "../interfaces/CareEvent";
import { createHistorialSanitarioServices, deleteHistorialSanitarioServices, mostarHistorialSanitarioByBovinoServices, mostarHistorialSanitarioByFincaServices, updateHistorialSanitarioServices } from "../services/historialSanitarioServices";
import { Alert } from "react-native";

const initialCareHistory: CareEvent[] = [
  {
    id: '1',
    date: '2024-11-15',
    type: 'Vacunación',
    description: 'Vacunación anual contra la gripe',
    performedBy: 'Dr. Smith',
    bovinoId: '67390db33af2038add07ed4e',
  },
  {
    id: '2',
    date: '2024-11-10',
    type: 'Revisión',
    description: 'Reconocimiento médico rutinario',
    performedBy: 'Dr. Johnson',
    bovinoId: '67390db33af2038add07ed4e',
  },
  {
    id: '3',
    date: '2024-11-05',
    type: 'Desparasitación',
    description: 'Tratamiento antiparasitario trimestral',
    performedBy: 'Technician Brown',
    bovinoId: '67390db33af2038add07ed4e',
  },
  {
    id: '4',
    date: '2024-10-28',
    type: 'Recorte de pezuñas',
    description: 'Mantenimiento regular de los cascos',
    performedBy: 'Technician Davis',
    bovinoId: '67390db33af2038add07ed4e',
  },
  {
    id: '5',
    date: '2024-10-20',
    type: 'Evaluación nutricional',
    description: 'Evaluación y ajuste de la dieta',
    performedBy: 'Nutritionist Wilson',
    bovinoId: '67390db33af2038add07ed4e',
  },
]

const bovineCare: BovineWithCareHistory[] = [
  {
    id: '67390db33af2038add07ed4e', // Identificador único del bovino
    identifier: 'BOV-2023-0001', // Identificador específico del bovino
    breed: 'Holstein', // Raza del bovino
    dateOfBirth: '2021-05-15', // Fecha de nacimiento en formato YYYY-MM-DD
    status: 'saludable', // Estado de salud del bovino (debe coincidir con el tipo Status definido en tu aplicación)
    farmId: 'farm67890', // ID de la granja a la que pertenece el bovino
    weight: 650, // Peso en kilogramos
    gender: 'hembra', // Género del bovino (debe coincidir con el tipo Gender definido en tu aplicación)
    name: 'Luna', // Nombre del bovino
    image: 'http://example.com/images/luna.jpg', // URL de la imagen del bovino
    type: 'carne', // Tipo de bovino (debe coincidir con el tipo Type definido en tu aplicación)
    age: '2 years', // Edad del bovino (opcional)
    farmStr: 'Granja La Esperanza', // Nombre de la granja (opcional)
    careHistory: initialCareHistory,
    expanded: false,
  },
]

interface CareHistoryState {
  bovinos: BovineWithCareHistory[];
  currentEvent: CareEvent | null;
  typeHistory: string;
  isDetailViewVisible: boolean;
  isModalVisible: boolean;
  expanded: boolean

  // Actions
  handlePress: () => void
  handleFilter: (filterType: string) => void
  handleAddEvent: (newEvent: BovineWithCareHistory) => Promise<void>
  handleUpdateEvent: (updatedEvent: BovineWithCareHistory) => Promise<void>
  handleDeleteEvent: (id: string) => Promise<void>
  openAddModal: () => void
  openEditModal: (event: CareEvent) => void
  openDetailView: (event: CareEvent) => void
  closeModal: () => void
  closeDetailView: () => void
  handleExpandedAccordion: (bovinoId: string) => void
  getCareHistoryByBovino: (bovinoId: string) => Promise<void>
  getCareHistoryByFinca: (fincaId: string) => Promise<void>
}

export const useCareHistoryStore = create<CareHistoryState>((set, get) => ({
  bovinos: [],
  currentEvent: null,
  typeHistory: 'Todos',
  isDetailViewVisible: false,
  isModalVisible: false,
  expanded: true,

  // Actions
  handlePress: () => set({ expanded: !get().expanded }),
  handleFilter: (filterType: string) => set({ typeHistory: filterType }),

  handleAddEvent: async (newBovino) => {
    const newEvent = newBovino.careHistory[0];
    let careEventResponse = await createHistorialSanitarioServices(newEvent);
    Alert.alert("Añadición de evento de atención", careEventResponse ? "Evento añadido correctamente" : "Error al añadir evento de atención");

    if (!careEventResponse) return;

    newEvent.id = (careEventResponse as CareEvent).id

    set((state) => {
      const someBovino = state.bovinos.some((item) => item.id === newEvent.bovinoId);

      if (!someBovino) {
        const updatedHistory = [...state.bovinos, newBovino];
        return { bovinos: updatedHistory, currentEvent: null, isModalVisible: false };
      }

      const updatedHistory = state.bovinos.map((item) =>
        item.id === newEvent.bovinoId
          ? { ...item, careHistory: [...item.careHistory, newEvent] }
          : item
      );
      
      return { bovinos: updatedHistory, currentEvent: null, isModalVisible: false };
    })
  },
   

  handleUpdateEvent: async (updateBovino) => {
    let updatedEvent = updateBovino.careHistory[0];

    let careEventResponse = await updateHistorialSanitarioServices(updatedEvent);
    Alert.alert("Actualización de evento de atención", careEventResponse ? "Evento actualizado correctamente" : "Error al actualizar evento de atención");

    if (!careEventResponse) return;

    const update = get().bovinos.find((item) => item.id === updatedEvent.bovinoId)

    if (update) {
      const updatedHistory = update.careHistory.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      set({ bovinos: [
        ...get().bovinos.map((item) =>
          item.id === updatedEvent.bovinoId
            ? { ...item, careHistory: updatedHistory }
            : item
        ),
      ], isModalVisible: false, isDetailViewVisible: false, currentEvent: null });
    }
  },


  handleDeleteEvent: async (id) => {
    const update = get().bovinos.map((item) => item.careHistory).flat().find((item) => item.id === id)
    const careEventResponse = await deleteHistorialSanitarioServices(id);

    Alert.alert("Eliminación de evento de atención", careEventResponse ? "Evento eliminado correctamente" : "Error al eliminar evento de atención");

    if(!careEventResponse) return;

    if (update) {
      let updateBovino = get().bovinos.find((item) => item.id === update.bovinoId)
      if (updateBovino) {
        const updatedHistory = updateBovino.careHistory.filter((event) => event.id !== id)

        set({ bovinos: [
          ...get().bovinos.map((item) =>
            item.id === updateBovino.id ? { ...item, careHistory: updatedHistory } : item
          ),
        ], isDetailViewVisible: false, isModalVisible: false, currentEvent: null });
      }
    }
  },
  openAddModal: () => {
    set({ currentEvent: null, isModalVisible: true })
  },

  openEditModal: (event) => {
    set({ currentEvent: event, isModalVisible: true })
  },

  openDetailView: (event) => {
    set({ currentEvent: event, isDetailViewVisible: true })
  },
  closeModal: () => {
    set({ isModalVisible: false })
  },
  closeDetailView: () => {
    set({ isDetailViewVisible: false })
  },

  handleExpandedAccordion: (bovinoId:string) => {
    set((state) => {
      const updatedBovino = state.bovinos.find((item) => item.id === bovinoId)
      if (updatedBovino) {
        updatedBovino.expanded = !updatedBovino.expanded
        return { bovinos: state.bovinos }
      }
    })
  },

  getCareHistoryByBovino: async (bovinoId: string) => {
    const data = await mostarHistorialSanitarioByBovinoServices(bovinoId);
    if((data as { error: string }).error) return;

    set((state) => ({
      ...state,
      bovinos: [(data as BovineWithCareHistory)]
    }));
  },

  getCareHistoryByFinca: async (fincaId: string) => {
    const data = await mostarHistorialSanitarioByFincaServices(fincaId);
    if((data as { error: string }).error) return;
    set((state) => ({
      ...state,
      bovinos: data as BovineWithCareHistory[]
    }));
  },
}));
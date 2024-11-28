// store/cattleReproductionStore.ts
import { create } from 'zustand';
import { CattleReproduction, ReproductiveEvent, ReproductiveEventType } from '../interfaces/ReproductiveEvent';
import { createReproductiveEventService, createReproductiveProcessService, getReproductiveEventsByBovinoService, getReproductiveEventsByFincaService } from '../services/reproductionsServices';

const mockData: CattleReproduction[] = [
  {
    id: '1R',
    name: 'Daisy',
    bovinoId: '1B',
    events: [
      { id: '1RV', type: 'proestrus', date: '2024-01-01', notes: 'Normal cycle', treatments: ['Hormone therapy'], testResults: [{ name: 'Progesterone', value: '2.5', unit: 'ng/mL' }], reproductiveId: '1R' },
      { id: '2RV', type: 'insemination', date: '2024-01-03', notes: 'AI performed', treatments: ['Semen deposition'], testResults: [{ name: 'Semen motility', value: '80', unit: '%' }], reproductiveId: '1R' },
      { id: '3RV', type: 'gestation', date: '2024-01-15', notes: 'Pregnancy confirmed', testResults: [{ name: 'Pregnancy test', value: 'Positive' }], reproductiveId: '1R' },
      { id: '4RV', type: 'parturition', date: '2024-10-12', notes: 'Normal delivery', treatments: ['Oxytocin administration'], reproductiveId: '1R' },
    ],
  },
  {
    id: '2R',
    name: 'Bella',
    bovinoId: '2B',
    events: [
      { id: '5RV', type: 'proestrus', date: '2024-02-15', notes: 'Strong signs', treatments: ['GnRH injection'], reproductiveId: '2R' },
      { id: '6RV', type: 'insemination', date: '2024-02-17', notes: 'Natural breeding', reproductiveId: '2R' },
      { id: '7RV', type: 'gestation', date: '2024-03-01', notes: 'Early pregnancy', testResults: [{ name: 'Ultrasound', value: 'Positive' }], reproductiveId: '2R' },
    ],
  },
];

interface CattleReproductionState {
  cattleData: CattleReproduction[];
  searchQuery: string;
  filterType: ReproductiveEventType | 'all';
  selectedCattle: CattleReproduction | null;
  selectedEvent: ReproductiveEvent | null;
  isAddModalVisible: boolean;
  isAddCattleModalVisible: boolean;
  isEventDetailsModalVisible: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  setFilterType: (type: ReproductiveEventType | 'all') => void;
  setSelectedCattle: (cattle: CattleReproduction | null) => void;
  setSelectedEvent: (event: ReproductiveEvent | null) => void;
  toggleAddModal: (isVisible: boolean) => void;
  toggleAddCattleModal: (isVisible: boolean) => void;
  toggleEventDetailsModal: (isVisible: boolean) => void;
  openAddModal: (cattle: CattleReproduction) => void

  addEventToCattle: (newEvent: ReproductiveEvent) => Promise<void>;
  addCattle: (name: string, bovinoId: string) => Promise<void>
  getReproductiveEventsByBovino: (bovinoId: string) => Promise<void>
  getReproductiveEventsByFinca: (fincaId: string) => Promise<void>
}

const useCattleReproductionStore = create<CattleReproductionState>((set, get) => ({
  cattleData: [],
  searchQuery: '',
  filterType: 'all',
  selectedCattle: null,
  selectedEvent: null,
  isAddModalVisible: false,
  isAddCattleModalVisible: false,
  isEventDetailsModalVisible: false,

  // Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterType: (type) => set({ filterType: type }),
  setSelectedCattle: (cattle) => set({ selectedCattle: cattle }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  toggleAddModal: (isVisible) => set({ isAddModalVisible: isVisible }),
  toggleAddCattleModal: (isVisible) => set({ isAddCattleModalVisible: isVisible }),
  toggleEventDetailsModal: (isVisible) => set({ isEventDetailsModalVisible: isVisible }),
  openAddModal:(cattle) => {
    get().toggleAddModal(true)
    get().setSelectedCattle(cattle)
  },

  addEventToCattle: async (newEvent) => {
    let id = await createReproductiveEventService(newEvent)

    newEvent.id = id

    set((state) => {
      const updatedCattleData = state.cattleData.map((cattle) =>
        cattle.id === newEvent.reproductiveId
          ? { ...cattle, events: [...cattle.events, newEvent] }
          : cattle
      );
      return { cattleData: updatedCattleData, selectedCattle:null, isAddModalVisible:false };
    })
  },
   

  addCattle: async (name, bovinoId) => {
    let id = await createReproductiveProcessService({ bovinoId });

    set((state) => ({
      cattleData: [
        ...state.cattleData,
        {
          id: id,
          name,
          bovinoId: bovinoId,
          events: [],
        },
      ],
      isAddCattleModalVisible: false
    }))
  }
    ,
    getReproductiveEventsByBovino: async (bovinoId: string) => {
      const data = await getReproductiveEventsByBovinoService(bovinoId);
      set((state) => ({
        ...state,
        cattleData: data,
      }));
    },
    getReproductiveEventsByFinca: async (fincaId: string) => {
      const data = await getReproductiveEventsByFincaService(fincaId);
      set((state) => ({
        ...state,
        cattleData: data,
      }));
    },
}));

export default useCattleReproductionStore;

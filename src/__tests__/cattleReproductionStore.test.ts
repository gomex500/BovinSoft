
import { act } from 'react-dom/test-utils';
import { useCattleReproductionStore } from '../store/cattleReproductionStore';
import { CattleReproduction, ReproductiveEvent } from '../interfaces/ReproductiveEvent';

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    __esModule: true,
    default: {
      setItem: jest.fn(() => Promise.resolve()),
      getItem: jest.fn(() => Promise.resolve(null)),
      removeItem: jest.fn(() => Promise.resolve()),
      clear: jest.fn(() => Promise.resolve()),
    },
  };
});

describe('cattleReproductionStore', () => {
  it('should initialize with default state', () => {
    const state = useCattleReproductionStore.getState();
    expect(state.cattleData).toEqual([]);
    expect(state.searchQuery).toBe('');
    expect(state.filterType).toBe('all');
    expect(state.selectedCattle).toBeNull();
    expect(state.isAddModalVisible).toBe(false);
    expect(state.isAddCattleModalVisible).toBe(false);
  });

  it('should update search query', () => {
    const { setSearchQuery } = useCattleReproductionStore.getState();
    act(() => {
      setSearchQuery('Daisy');
    });
    expect(useCattleReproductionStore.getState().searchQuery).toBe('Daisy');
  });

  it('should update filter type', () => {
    const { setFilterType } = useCattleReproductionStore.getState();
    act(() => {
      setFilterType('insemination');
    });
    expect(useCattleReproductionStore.getState().filterType).toBe('insemination');
  });

  it('should add event to cattle', async () => {
    const { addEventToCattle, toggleAddModal, setSelectedCattle, setCattle } = useCattleReproductionStore.getState();
    const mockEvent:ReproductiveEvent = {
      id: 'newEvent',
      type: 'insemination',
      date: '2024-02-01',
      notes: 'Mock event',
      treatments: [],
      reproductiveId: '1R',
    };
    const mockCattle:CattleReproduction = {
      id: '1R',
      name: 'Daisy',
      bovinoId: '1B',
      events: [],
    };

    act(async () => {
      setCattle([mockCattle]);
    });

    act(() => {
      setSelectedCattle(mockCattle);
      toggleAddModal(true);
    });

    await act(async () => {
      await addEventToCattle(mockEvent);
    });

    const state = useCattleReproductionStore.getState();
    console.log(state.cattleData);
    
    expect(state.cattleData[0].events).toContainEqual(mockEvent);
    expect(state.isAddModalVisible).toBe(false);
  });

  it('should add cattle to the store', async () => {
    const { addCattle } = useCattleReproductionStore.getState();

    await act(async () => {
      await addCattle('Bella', '2B');
    });

    const state = useCattleReproductionStore.getState();
    const addedCattle = (state.cattleData.find(cattle => cattle.bovinoId === '2B') as CattleReproduction);
    expect(addedCattle).toBeDefined();
    expect(addedCattle.name).toBe('Bella');
  });
});

import { create } from 'zustand';
import axios from 'axios';

// Crear el store de vacas
export const useVacasStore = create<VacasState>((set) => ({
  vacas: [],
  obtenerGanado: async () => {
    try {
      const { data } = await axios.get(''); // URL de ganados
      set({ vacas: data });
    } catch (error) {
      console.error('Error fetching vacas:', error);
    }
  },
}));

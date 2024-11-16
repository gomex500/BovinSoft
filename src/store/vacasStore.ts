import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '@env';
import { BovinoModel } from '../interfaces/IBovino';
import { useUserStore } from './userStore';

interface VacasState {
  vacas: BovinoModel[];
  obtenerGanadoPorUsuario: () => Promise<void>;
  crearGanado: (vaca: BovinoModel) => Promise<boolean>;
}

// Crear el store de vacas
export const useBovinosStore = create<VacasState>((set) => ({
  vacas: [],
  obtenerGanadoPorUsuario: async () => {
    try {
      const stateUser = useUserStore.getState();

      const userId = stateUser.user._id;
      const token = stateUser.token;

      const { data } = await axios.get(`${API_URL}/bovino/byUsers/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      set({ vacas: data });
    } catch (error) {
      console.error('@obtenerGanadoPorUsuario Error fetching vacas:', error);
    }
  },
  crearGanado: async (vaca:BovinoModel) => {
    try {
      const stateUser = useUserStore.getState();

      const token = stateUser.token;
      const { data } = await axios.post(`${API_URL}/bovino`, vaca, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ vacas: data });

      return true
    } catch (error) {
      console.error('Error create vacas:', error);
      return false
    }
  },
}));

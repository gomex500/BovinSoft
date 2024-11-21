import { create } from 'zustand';
import axios from 'axios';
import { FincaModel } from '../interfaces/IFinca';
import { API_URL } from '@env';
import { useUserStore } from './userStore';
import { createFincaServices } from '../services/fincaServices';

// Define el tipo del estado de finca
// Crear el store de finca


interface FincaState {
  fincas: FincaModel[] | null;
  obtenerFincaPorUsuario: () => Promise<FincaModel[]>;
  createFinca: (finca:FincaModel) => Promise<boolean>
  fincaSelected: FincaModel | null;
  setFincaId: (finca: FincaModel | null) => void;
}

interface ICreateFinca {
  token: string;
  finca: FincaModel;
}

export const useFincaStore = create<FincaState>((set, get) => ({
  fincas: null,
  fincaSelected: null,
  obtenerFincaPorUsuario: async () => {

    const stateUser = useUserStore.getState();

    const userId = stateUser.user._id;
    const token = stateUser.token;

    try {
      const { data } = await axios.get(`${API_URL}/fincas/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ fincas: data });

      return data;
    } catch (error) {
      console.error('Error fetching finca:', error);
    }
  },
  createFinca: async (finca:FincaModel) => {
    try {

      const data = await createFincaServices(finca);
      set({ fincas: [...(get().fincas as FincaModel[]), {...data, _id: data.id}]});

      return true;
    } catch (error) {
      console.error('Error fetching finca:', error);
      return false;
    }
  },
  setFincaId: (finca) => set({ fincaSelected: finca }),
}));

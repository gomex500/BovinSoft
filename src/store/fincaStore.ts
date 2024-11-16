import { create } from 'zustand';
import axios from 'axios';
import { FincaModel } from '../interfaces/IFinca';
import { API_URL } from '@env';
import { useUserStore } from './userStore';

// Define el tipo del estado de finca
// Crear el store de finca


interface FincaState {
  fincas: FincaModel[];
  obtenerFincaPorUsuario: () => Promise<FincaModel[]>;
  createFinca: ({ finca, token }: ICreateFinca) => Promise<boolean>
}

interface ICreateFinca {
  token: string;
  finca: FincaModel;
}

export const useFincaStore = create<FincaState>((set, get) => ({
  fincas: null,
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
  createFinca: async ({ finca, token }: ICreateFinca) => {
    try {

      const { data } = (await axios.post(`${API_URL}/finca`, finca, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } ));

      set({ fincas: [...get().fincas, {...data, _id: data.id}]});
      return true;
    } catch (error) {
      console.error('Error fetching finca:', error);
      return false;
    }
  },
}));

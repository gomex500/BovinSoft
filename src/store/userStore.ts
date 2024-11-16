import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '@env';

interface IUserState {
  user: any;
  token: string | null;
  isLoggedIn: boolean | null;
  obtenerUsuario: (id: string, token: string) => Promise<void>;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}


// Crear el store de usuario
export const useUserStore = create<IUserState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: null,
  obtenerUsuario: async (id, token) => {
    try {
      const { data } = await axios.get(`${API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ user: data });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));

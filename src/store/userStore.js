import { create } from 'zustand';
import axios from 'axios';



// Crear el store de usuario
export const useUserStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: null,
  obtenerUsuario: async (id, token) => {
    try {
      const { data } = await axios.get(`https://bovinsoft-backend-plae.onrender.com/user/${id}`, {
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

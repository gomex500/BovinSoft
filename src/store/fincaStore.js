import { create } from 'zustand';
import axios from 'axios';

// Define el tipo del estado de finca
// Crear el store de finca
export const useFincaStore = create<FincaState>((set) => ({
  finca: null,
  obtenerFinca: async () => {
    try {
      const { data } = await axios.get('https://bovinsoft-backend.onrender.com/fincas/66ff6c787a81ade5258dc6e6', {
        headers: {
          Authorization: 'Bearer <your-token>',
        },
      });
      set({ finca: data });
    } catch (error) {
      console.error('Error fetching finca:', error);
    }
  },
}));

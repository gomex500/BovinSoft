import { create } from 'zustand';
import { BovinoModel } from '../interfaces/IBovino';
import { agregarBovinoService, deleteBovinoServices, obtenerGanadoPorFincaServices, obtenerGanadoPorUsuarioServices, updateBovinoServices } from '../services/bovinosService';
import { IBovine } from '../interfaces/Livestock';

interface BovinoState {
  bovinos: IBovine[];
  obtenerGanadoPorUsuario: () => Promise<void>;
  crearGanado: (vaca: IBovine) => Promise<boolean>;
  obtenerGanadoPorFinca: (fincaId: string) => Promise<void>
  updateGanado: (bovino: IBovine) => Promise<void>
  deleteGanado: (id: string) => Promise<void>
}

// Crear el store de vacas
export const useBovinosStore = create<BovinoState>((set, get) => ({
  bovinos: [],
  obtenerGanadoPorUsuario: async () => {
    try {
      const bovinos = await obtenerGanadoPorUsuarioServices();
     
      set({ bovinos });
    } catch (error) {
      console.error('@obtenerGanadoPorUsuario Error fetching vacas:', error);
    }
  },

  crearGanado: async (bovino:IBovine) => {
    try {
      const data = await agregarBovinoService(bovino);

      set({ bovinos: get().bovinos.concat(data) });
      return true
    } catch (error) {
      console.error('Error create bovino:', error);
      return false
    }
  },
  updateGanado: async (bovino: IBovine) => {
    await updateBovinoServices(bovino)
    set({ bovinos: get().bovinos.map(item => item.id === bovino.id ? bovino : item) });
  },

  deleteGanado: async (id: string) => {
    await deleteBovinoServices(id)
    set({ bovinos: get().bovinos.filter(item => item.id !== id) });
  },

  obtenerGanadoPorFinca: async (fincaId: string) => {
    try {
      const bovinos = await obtenerGanadoPorFincaServices(fincaId);

      set({ bovinos });
    } catch (error) {
      console.error('@obtenerGanadoPorFinca Error fetching vacas:', error);
    }
  },
}));

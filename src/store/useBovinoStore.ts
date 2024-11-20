import { create } from 'zustand';
import { BovinoModel } from '../interfaces/IBovino';
import { agregarBovinoService, obtenerGanadoPorFincaServices, obtenerGanadoPorUsuarioServices } from '../services/bovinosService';

interface BovinoState {
  bovinos: BovinoModel[];
  obtenerGanadoPorUsuario: () => Promise<void>;
  crearGanado: (vaca: BovinoModel) => Promise<boolean>;
  obtenerGanadoPorFinca: (fincaId: string) => Promise<void>
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

  crearGanado: async (bovino:BovinoModel) => {
    try {
      const data = await agregarBovinoService(bovino);

      set({ bovinos: get().bovinos.concat(data) });
      return true
    } catch (error) {
      console.error('Error create bovino:', error);
      return false
    }
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

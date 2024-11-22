import { create } from 'zustand';
import { FincaModel } from '../interfaces/IFinca';
import { createFincaServices, obtenerFincaByIdService, obtenerFincaPorUsuarioService } from '../services/fincaServices';


interface FincaState {
  fincas: FincaModel[] | null;
  obtenerFincaPorUsuario: () => Promise<FincaModel[]>;
  createFinca: (finca:FincaModel) => Promise<boolean>
  fincaSelected: FincaModel | null;
  setFincaId: (finca: FincaModel | null) => void;
  obtenerFincaById: (id: string) => Promise<any>
}

export const useFincaStore = create<FincaState>((set, get) => ({
  fincas: null,
  fincaSelected: null,
  obtenerFincaPorUsuario: async () => {

    try {
      const data = await obtenerFincaPorUsuarioService()

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
  obtenerFincaById: async (id:string) => {
    try {
      const data = await obtenerFincaByIdService(id)

      set({ fincaSelected: data });

      return data;
    } catch (error) {
      console.error('Error fetching finca:', error);
      return false;
    }
  },
}));

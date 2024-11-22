import { create } from 'zustand';
import { obtenerUsuarioServices } from '../services/userServices';
import { UserModel } from '../interfaces/IUser';
import { useFincaStore } from './fincaStore';

interface IUserState {
  user: UserModel | null;
  token: string | null;
  isLoggedIn: boolean | null;
  obtenerUsuario: (id: string, token: string) => Promise<void>;
  setUser: (user: UserModel | null) => void;
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
      const user:UserModel = await obtenerUsuarioServices(id, token);

      if (user.rol !== "ROOT") {
        if (user.rol !== "OWNER") {
          useFincaStore.getState().obtenerFincaById(user.fincaId)
        }
      }

      set({ user, token });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));

import { create } from 'zustand';
import { crearUsuarioServices, getAllUsersService, updateUserService } from '../services/userServices';
import { UserModel } from '../interfaces/IUser';

interface IUserState {
  users: UserModel[];
  getAllUsers: () => Promise<void>;
  onEditUser: (updatedUser: UserModel) => Promise<void>;
  onAddUser: (newUser: UserModel) => Promise<void>;
}


// Crear el store de usuario
export const useUserStore = create<IUserState>((set, get) => ({
  users: [],
  getAllUsers: async () => {
    try {
      let users = await getAllUsersService();
      set({ users });  
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  },
  onEditUser: async (updatedUser: UserModel) => {
    let user = get().users.find(user => user._id === updatedUser._id);
    let newUpdatedUser = { ...user, ...updatedUser };

    await updateUserService(newUpdatedUser);

    set({ users: get().users.map(user => user._id === updatedUser._id ? newUpdatedUser : user) });
  },
  onAddUser: async (newUser: UserModel) => {
    let { id } = await crearUsuarioServices(newUser);
    newUser._id = id;
    set({ users: get().users.concat(newUser) });
  },
  
}));

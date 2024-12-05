import { create } from "zustand";
import { UserModel } from "../interfaces/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from 'zustand/middleware';

const AUTH_TOKEN_KEY = 'auth-storage';

interface AuthState {
  user: UserModel | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (user: UserModel, token: string) => void;
  clearSession: () => void;
  setRestored: (isRestored: boolean) => void;
  isRestored: boolean;
}

export const useAuthStore = create(
  persist<AuthState>(
      (set) => ({
          user: null,
          token: null,
          isAuthenticated: false,
          setSession: (user, token) => set({ user, token, isAuthenticated: true }),
          clearSession: () => set({ isAuthenticated: false, user: null, token: null }),
          isRestored: false,
          setRestored: (isRestored: boolean) => set({ isRestored }),
      }),
      {
          name: AUTH_TOKEN_KEY,
          storage: {
              getItem: async (name) => {
                  const value = await AsyncStorage.getItem(name);
                  return value ? JSON.parse(value) : null;
              },
              setItem: async (name, value) => {
                  await AsyncStorage.setItem(name, JSON.stringify(value));
              },
              removeItem: async (name) => {
                  await AsyncStorage.removeItem(name);
              },
          },
          onRehydrateStorage:() => (state) => {
              (state as AuthState).setRestored(true);
          },
      }
  )
);
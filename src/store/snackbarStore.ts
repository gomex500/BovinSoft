import { create } from 'zustand';

interface ISnackbarState {
  snackbarVisible: boolean;
  snackbarMessage: string;
  handleMessage: (message:string) => void;
  showSnackbar: () => void;
  hiddenSnackbar: () => void;
  dispatchSnackbar: (message: string) => void
}


// Crear el store de usuario
export const useSnackbarStore = create<ISnackbarState>((set) => ({
  snackbarMessage: '',
  snackbarVisible: false,
  handleMessage: (message) => set({ snackbarMessage:message }),
  showSnackbar: () => set({ snackbarVisible: true }),
  hiddenSnackbar: () => set({ snackbarVisible: false }),
  dispatchSnackbar: (message) => set({snackbarMessage:message, snackbarVisible:true})
}));

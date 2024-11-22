import { createAxiosInstance, PATH_LIST } from "../helpers/axiosIntance";
import { BovinoModel } from "../interfaces/IBovino";
import { useAuthStore } from "../store/authStore";

export const obtenerGanadoPorUsuarioServices = async () => {
  try {
    const user = useAuthStore.getState().user;
    const axiosInstance = createAxiosInstance(PATH_LIST.BovinoByUser);
    const response = await axiosInstance.get(`/${user._id}`);
    
    return response.data;
  } catch (error) {
    console.error('@obtenerGanadoPorUsuario Error fetching vacas:', error);
  }
};

export const agregarBovinoService = async (bovino: BovinoModel) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Bovino);
    const response = await axiosInstance.post(``, bovino);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching bovino:', error);
  }
};

export const obtenerGanadoPorFincaServices = async (fincaId: string) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.BovinoByFarm);
    const response = await axiosInstance.get(`/${fincaId}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching bovino:', error);
  }
};
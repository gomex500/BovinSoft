import { createAxiosInstance, PATH_LIST } from "../helpers/axiosIntance";
import { FincaModel } from "../interfaces/IFinca";
import { UserModel } from "../interfaces/IUser";
import { useAuthStore } from "../store/authStore";

export const createFincaServices = async (finca:FincaModel) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Finca);
    const response = await axiosInstance.post(``, finca);

    return response.data;
  } catch (error) {
    console.error('Error fetching finca:', error);
  }
};

export const obtenerFincaPorUsuarioService = async () => {
  try {
    const stateUser = useAuthStore.getState();
    const userId = (stateUser.user as UserModel)._id;
    const axiosInstance = createAxiosInstance(PATH_LIST.Fincas);
    const response = await axiosInstance.get(`/${userId}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching finca:', error);
  }
};

export const obtenerFincaByIdService = async (id:string) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Finca);
    const response = await axiosInstance.get(`/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching finca:', error);
  }
};
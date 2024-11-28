import { createAxiosInstance, PATH_LIST } from "../helpers/axiosIntance";
import { ReproductiveEvent } from "../interfaces/ReproductiveEvent";

export const getReproductiveEventsByBovinoService = async (bovinoId: string) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.ReproductiveByBovino);
    const response = await axiosInstance.get(`/${bovinoId}`);

    return response.data;
  } catch (error) {
    console.error('@getReproductiveEventsByBovinoService error', error);
  }
};

export const getReproductiveEventsByFincaService = async (fincaId: string) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.ReproductiveByFinca);
    const response = await axiosInstance.get(`/${fincaId}`);

    return response.data;
  } catch (error) {
    console.error("@getReproductiveEventsByFincaService error", error);
  }
};

export const createReproductiveProcessService = async (data: any) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Reproductive);
    const response = await axiosInstance.post(``, data);

    return response.data._id;
  } catch (error) {
    console.error("@CreateReproductiveProcess error", error);
  }
};

export const createReproductiveEventService = async (data: ReproductiveEvent) => {
  try {
    console.log(data);
    
    const axiosInstance = createAxiosInstance(PATH_LIST.ReproductiveEvents);
    const response = await axiosInstance.post(``, data);
    
    return response.data.id;
  } catch (error) {
    console.error("@CreateReproductiveEvent error", error);
  }
};
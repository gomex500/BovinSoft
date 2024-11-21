import { createAxiosInstance, PATH_LIST } from "../helpers/axiosIntance";
import { FincaModel } from "../interfaces/IFinca";

export const createFincaServices = async (finca:FincaModel) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Finca);
    const response = await axiosInstance.post(``, finca);

    return response.data;
  } catch (error) {
    console.error('Error fetching finca:', error);
  }
};
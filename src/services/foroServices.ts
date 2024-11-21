import { createAxiosInstance, PATH_LIST } from "../helpers/axiosIntance";
import { IComentario, IInteraccionesComentarioCreate, IInteraccionesPublicacionCreate, IPublicacion } from "../interfaces/IForo";

export const obtenerPublicacionesService = async () => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Publicaciones);
    const response = await axiosInstance.get('')
    const data = response.data;
    
    return data.map((item:any) => {
      return {
        ...item,
        comentarios: []
      }
    });
  } catch (error) {
    console.error('Error fetching publicaciones:', error);
  }
};

export const obtenerComentariosService = async (postId: string) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Comentarios);
    const response = await axiosInstance.get(`/${postId}`);
    const data = response.data;
    
    return data;
  } catch (error) {
    console.error('Error fetching comentarios:', error);
  }
};

export const agregarComentarioService = async (comentario: IComentario) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Comentario);
    const response = await axiosInstance.post(``, comentario);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching comentarios:', error);
  }
};

export const agregarPublicacionService = async (publicacion: IPublicacion) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Publicacion);
    const response = await axiosInstance.post(``, publicacion);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching publicaciones:', error);
  }
};

export const actualizarInteraccionPublicacionService = async (interaccion: IInteraccionesPublicacionCreate) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.InteraccionesPost);
    const response = await axiosInstance.post(``, interaccion);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching interaccion:', error);
  }
};

export const actualizarInteraccionComentarioService = async (interaccion: IInteraccionesComentarioCreate) => {
  try {
    console.log(interaccion)
    
    const axiosInstance = createAxiosInstance(PATH_LIST.InteraccionesComentario);
    const response = await axiosInstance.post(``, interaccion);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching interaccion:', error);
  }
};
import axios, { AxiosInstance } from 'axios';
import { API_URL } from '@env';
import { useUserStore } from '../store/userStore';

export enum PATH_LIST {
  Publicacion = 'foro',
  Publicaciones = 'foros',
  InteraccionesPost = 'interacciones/publicaciones',
  InteraccionesComentario = 'interacciones/comentarios',
  Comentario = 'comentario',
  Comentarios = 'comentarios',
  Finca = 'finca',
  Fincas = 'fincas',
  Usuario = 'user',
  Usuarios = 'users',
  Login = 'login',
  SigIn = 'sigin',
  Bovino = 'bovino',
  BovinoByUser = 'bovino/byUsers',
  BovinoByFarm = 'bovino/byFarm',
}

export const createAxiosInstance = (PATH: string): AxiosInstance => {
  const JWT = useUserStore.getState().token
  
  const baseURL = `${API_URL}/${PATH}`;

  const headers = {
    Authorization: `Bearer ${JWT}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  return axios.create({
    baseURL,
    headers,
  });
};

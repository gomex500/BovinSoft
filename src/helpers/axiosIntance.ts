import axios, { AxiosInstance } from 'axios';
import { API_URL } from '@env';
import { useAuthStore } from '../store/authStore';

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
  SignIn = 'signin',
  Bovino = 'bovino',
  BovinoByUser = 'bovino/byUsers',
  BovinoByFarm = 'bovino/byFarm',
  ReproductiveEvents = 'reproductive_events',
  ReproductiveByBovino = 'reproductive_events/bovino',
  ReproductiveByFinca = 'reproductive_events/finca',
  Reproductive = 'reproduccion'
}

export const createAxiosInstance = (PATH: string): AxiosInstance => {
  const JWT = useAuthStore.getState().token
  
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

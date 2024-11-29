import moment from "moment";
import { createAxiosInstance, PATH_LIST } from "../helpers/axiosIntance";
import { calcularDiferenciaDeTiempo } from "../helpers/gen";
import { BovinoModel } from "../interfaces/IBovino";
import { IBovine } from "../interfaces/Livestock";
import { useAuthStore } from "../store/authStore";

export const toCastBovino = (bovino): IBovine => {
  return {
    id: bovino._id,
    identifier: bovino.codigo,
    breed: bovino.raza,
    dateOfBirth: bovino.fechaNacimiento,
    status: bovino.estadoSalud,
    farmId: bovino.fincaId,
    weight: bovino.peso,
    gender: bovino.genero,
    name: bovino.nombre,
    image: bovino.image,
    type: bovino.tipo,
    age: bovino.edad,
    farmStr: bovino?.fincaNombre || "",
  };
};

export const obtenerGanadoPorUsuarioServices = async () => {
  try {
    const user = useAuthStore.getState().user;
    const axiosInstance = createAxiosInstance(PATH_LIST.BovinoByUser);
    const response = await axiosInstance.get(`/${user._id}`);

    let BovinoModel = response.data 
    let bovine: IBovine[] = [];

    for (let i = 0; i < BovinoModel.length; i++) {
      let bovino:IBovine = {
        id: BovinoModel[i]._id,
        name: BovinoModel[i].nombre,
        image: BovinoModel[i].image,
        identifier: BovinoModel[i].codigo,
        breed: BovinoModel[i].raza,
        dateOfBirth: moment(BovinoModel[i].fechaNacimiento).format("YYYY-MM-DD"),
        status: BovinoModel[i].estadoSalud,
        farmId: BovinoModel[i].fincaId,
        weight: parseInt(BovinoModel[i].peso),
        gender: BovinoModel[i].genero.toLowerCase(),
        type: BovinoModel[i].tipo.toLowerCase(),
        age: calcularDiferenciaDeTiempo(BovinoModel[i].fechaNacimiento),
        farmStr: BovinoModel[i].fincaNombre,
      }
      bovine.push(bovino);
    }

    return bovine || [];
  } catch (error) {
    console.error('@obtenerGanadoPorUsuario Error fetching vacas:', error);
    return [];
  }
};

export const agregarBovinoService = async (bovino: IBovine) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Bovino);

    const castBovino:BovinoModel = {
      nombre: bovino.name,
      fechaNacimiento: moment(bovino.dateOfBirth).format("YYYY-MM-DD"),
      tipo: bovino.type,
      estadoSalud: bovino.status,
      fincaId: bovino.farmId,
      image: bovino.image,
      genero: bovino.gender,
      raza: bovino.breed,
      peso: `${bovino.weight}`,
      edad: `${bovino.age}`,
    }

    const response = await axiosInstance.post(``, castBovino);
    const data = response.data;

    bovino.id = data._id;
    bovino.identifier = data.codigo;
    return bovino;
  } catch (error) {
    console.error('Error fetching bovino:', error);
  }
};

export const updateBovinoServices = async (bovino: IBovine) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Bovino);

    const castBovino:BovinoModel = {
      _id: bovino.id,
      nombre: bovino.name,
      fechaNacimiento: moment(bovino.dateOfBirth).format("YYYY-MM-DD"),
      tipo: bovino.type,
      estadoSalud: bovino.status,
      fincaId: bovino.farmId,
      image: bovino.image,
      genero: bovino.gender,
      raza: bovino.breed,
      peso: `${bovino.weight}`,
      edad: `${bovino.age}`,
    }

    const response = await axiosInstance.put(`/${castBovino._id}`, castBovino);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching bovino:', error);
  }
};

export const deleteBovinoServices = async (id: string) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Bovino);
    const response = await axiosInstance.delete(`/${id}`);
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
    const BovinoModel = response.data;

    let bovine: IBovine[] = [];

    for (let i = 0; i < BovinoModel.length; i++) {
      let bovino:IBovine = {
        id: BovinoModel[i]._id,
        name: BovinoModel[i].nombre,
        image: BovinoModel[i].image,
        identifier: BovinoModel[i].codigo,
        breed: BovinoModel[i].raza,
        dateOfBirth: moment(BovinoModel[i].fechaNacimiento).format("YYYY-MM-DD"),
        status: BovinoModel[i].estadoSalud,
        farmId: BovinoModel[i].fincaId,
        weight: parseInt(BovinoModel[i].peso),
        gender: BovinoModel[i].genero.toLowerCase(),
        type: BovinoModel[i].tipo.toLowerCase(),
        age: calcularDiferenciaDeTiempo(BovinoModel[i].fechaNacimiento),
        farmStr: BovinoModel[i].fincaNombre,
      }
      bovine.push(bovino);
    }

    return bovine;
  } catch (error) {
    console.error('Error fetching bovino:', error);
  }
};
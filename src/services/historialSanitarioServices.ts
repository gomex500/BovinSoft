import axios from "axios";
import { createAxiosInstance, PATH_LIST } from "../helpers/axiosIntance";
import { BovineWithCareHistory, CareEvent } from "../interfaces/CareEvent";
import { toCastBovino } from "./bovinosService";

interface historialSanitarioResponse {
  fecha: string;        // Fecha de la evaluación
  tipo: string;        // Tipo de evaluación
  descripcion: string; // Descripción de la evaluación
  veterinario: string; // Nombre del veterinario que realizó la evaluación
  bovinoId: string;    // ID del bovino relacionado con la evaluación
  medicamento: string;  // Medicamento (puede estar vacío)
  _id: string;          // ID único de la evaluación
}

const toCastCareEvent = (event: historialSanitarioResponse): CareEvent => {
    return {
        id: event._id,
        date: event.fecha,
        type: event.tipo,
        description: event.descripcion,
        performedBy: event.veterinario,
        bovinoId: event.bovinoId,
    };
};

const toCastCareEvents = (events: historialSanitarioResponse[]): CareEvent[] => {
    return events.map(toCastCareEvent);
};

const toCastHistorialSanitario = (event:CareEvent): historialSanitarioResponse => {
    return {
        fecha: event.date,
        tipo: event.type,
        descripcion: event.description,
        veterinario: event.performedBy,
        bovinoId: event.bovinoId,
        medicamento: "",
        _id: event.id,
    };
};

const toCastHistorialSanitarios = (events: CareEvent[]): historialSanitarioResponse[] => {
    return events.map(toCastHistorialSanitario);
};

export const createHistorialSanitarioServices = async (event: CareEvent) => {
    try {
        let axiosInstance = createAxiosInstance(PATH_LIST.HistorialSanitario);
        const response = await axiosInstance.post(``, toCastHistorialSanitario(event));

        return toCastCareEvent(response.data.historial);
    } catch (error) {
        console.error('Error al crear historial de sanitario:', error);
        return false;
    }
};

export const mostarHistorialSanitarioByBovinoServices = async (bovinoId: string) => {
    try {
        let axiosInstance = createAxiosInstance(PATH_LIST.HistorialSanitarioByBovino);
        const response = await axiosInstance.get(`/${bovinoId}`);

        let historial: BovineWithCareHistory = {
          ...toCastBovino(response.data.historiales),
          careHistory: toCastCareEvents(response.data.historiales.careHistory),
          expanded: true,
        }

        return historial;
    } catch (error) {
        console.error('Error al obtener historial de sanitario:', error);
        return { error: 'Error al obtener historial de sanitario' };
    }
};

export const mostarHistorialSanitarioByFincaServices = async (fincaId: string) => {
    try {
        let axiosInstance = createAxiosInstance(PATH_LIST.HistorialSanitarioByFinca);
        const response = await axiosInstance.get(`/${fincaId}`);

        let historiales: BovineWithCareHistory[] = [];

        response.data.historiales.forEach(element => {
          let historial: BovineWithCareHistory = {
            ...toCastBovino(element),
            careHistory: toCastCareEvents(element.careHistory),
            expanded: false,
          }

          historiales.push(historial);
        });

        return historiales;
    } catch (error) {
        console.error('Error al obtener historial de sanitario:', error);
        return { error: 'Error al obtener historial de sanitario' };
    }
};

export const updateHistorialSanitarioServices = async (event: CareEvent) => {
    try {
        let axiosInstance = createAxiosInstance(PATH_LIST.HistorialSanitario);
        await axiosInstance.put(`/${event.id}`, toCastHistorialSanitario(event));

        return true;
    } catch (error) {
        console.error('Error al actualizar historial de sanitario:', error);
        return false;
    }
};

export const deleteHistorialSanitarioServices = async (id: string) => {
    try {
        let axiosInstance = createAxiosInstance(PATH_LIST.HistorialSanitario);
        await axiosInstance.delete(`/${id}`);

        return true;
    } catch (error) {
        console.error('Error al eliminar historial de sanitario:', error);
        return false;
    }
};
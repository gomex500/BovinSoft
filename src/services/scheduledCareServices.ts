import { createAxiosInstance, PATH_LIST } from "../helpers/axiosIntance";
import { CareEvent } from "../views/BovineCareCalendar";

interface scheduledCareResponse {
  _id: string; // Identificador único
  actividad: string; // Nombre de la actividad
  bovinoId: string; // Identificador del bovino
  costoEstimado: string; // Costo estimado como cadena
  descripcion: string; // Descripción de la actividad
  estado: string; // Estado de la actividad
  fechaCreacion?: string; // Fecha de creación en formato de cadena
  fechaProgramada: string; // Fecha programada en formato de cadena
  titulo: string; // Título de la actividad
}

const toCastScheduledCare = (event:CareEvent): Omit<scheduledCareResponse, '_id' >  => {
    return {
        actividad: event.type,
        bovinoId: event.bovinoId,
        costoEstimado: "50",
        descripcion: event.description,
        estado: "Pendiente",	
        fechaProgramada: event.date,
        titulo: event.title,
    };

};

const toCastCareEvent = (event: scheduledCareResponse): CareEvent => {
    return {
        id: event._id,
        date: event.fechaProgramada,
        //@ts-ignore
        type: event.actividad,
        description: event.descripcion,
        bovinoId: event.bovinoId,
        title: event.titulo,
    };
};

const toCastCareEvents = (events: scheduledCareResponse[]): CareEvent[] => {
    return events.map(toCastCareEvent);
};

export const createScheduledCareServices = async (event: CareEvent) => {
    try {
        let axiosInstance = createAxiosInstance(PATH_LIST.ScheduledCare);
        const response = await axiosInstance.post(``, toCastScheduledCare(event));

        return toCastCareEvent(response.data.calendario_cuidado);
    } catch (error) {
        console.error('Error al crear evento de cuidado programado:', error);
        return false;
    }
};

export const mostrarScheduledCareByBovinoServices = async (bovinoId: string) => {
    try {
        let axiosInstance = createAxiosInstance(PATH_LIST.ScheduledCareByBovino);
        const response = await axiosInstance.get(`/${bovinoId}`);

        return toCastCareEvents(response.data.scheduledCare);
    } catch (error) {
        console.error('Error al obtener eventos de cuidado programado:', error);
        return { error: 'Error al obtener eventos de cuidado programado' };
    }
};

export const mostrarScheduledCareByFincaServices = async (fincaId: string) => {
    try {
        let axiosInstance = createAxiosInstance(PATH_LIST.ScheduledCareByFinca);
        const response = await axiosInstance.get(`/${fincaId}`);

        return toCastCareEvents(response.data.scheduledCare);
    } catch (error) {
        console.error('Error al obtener eventos de cuidado programado:', error);
        return { error: 'Error al obtener eventos de cuidado programado' };
    }
};
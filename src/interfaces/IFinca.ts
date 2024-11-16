export interface FincaModel {
  _id?: string; // ID de la finca
  nombre: string; // Nombre de la finca
  image: string; // URL de la imagen de la finca
  direccion: string; // Dirección de la finca
  coordenadas: ICordenadas; // Coordenadas como objeto (puede refinarse según la estructura)
  tamano: string; // Tamaño de la finca
  recursosN: string[]; // Recursos naturales disponibles en la finca
  descripcion: string; // Descripción de la finca
  idUsuario: string; // ID del usuario asociado a la finca
  create_at?: string | Date; // Fecha de creación (string o Date)
  update_at?: string | Date; // Fecha de última actualización (string o Date)
}

export interface ICordenadas {
  latitud: number | string;
  longitud: number | string;
}

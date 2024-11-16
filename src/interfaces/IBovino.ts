
export interface BovinoModel {
  _id?: string; // ID del bovino
  fincaId: string; // ID de la finca asociada
  nombre: string; // Nombre del bovino
  image: string; // URL de la imagen del bovino
  raza: string; // Raza del bovino
  edad: string; // Edad en formato string (podría ser un número si es más apropiado)
  peso: string; // Peso en formato string (podría ser un número si es más apropiado)
  consecutivo?: number | null; // Número consecutivo (opcional)
  codigo?: string; // Código único del bovino
  fechaNacimiento?: string | Date | null; // Fecha de nacimiento (string o Date, opcional)
  genero: string; // Género del bovino, ej: "macho", "hembra"
  tipo: string; // Tipo de bovino, ej: "carne", "leche", "mixto"
  estadoSalud: string; // Estado de salud, ej: "sano", "enfermo"
  fechaRegistro?: string | Date; // Fecha de registro (puede ser Date o string)
  create_at?: string | Date; // Fecha de creación (puede ser Date o string)
  update_at?: string | Date; // Fecha de última actualización (puede ser Date o string)
}

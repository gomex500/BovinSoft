export interface UserModel {
  _id?:string;
  nombre: string;
  apellido?: string;
  fecha_nacimiento?: string; // Podría ser Date si se desea manejar como objeto de fecha
  email: string;
  password: string;
  telefono?: string;
  tipoSuscripcion: 'básica' | 'premium'; // Puedes agregar más tipos si es necesario
  rol: RolType // También puedes agregar más roles si es necesario
  direccion?: string;
  image: string;
  create_at?: Date; // Asumiendo que se manejará como objeto Date
  update_at?: Date; // Asumiendo que se manejará como objeto Date
  fincaId?:string
  exp?: number;
  status?: 'active' | 'inactive';
}

export type RolType = 'ADMIN' | 'OWNER' | 'WORKER'| 'ROOT'
interface IRoll {
  ADMIN : RolType,
  OWNER: RolType,
  WORKER: RolType
  ROOT: RolType
}

export const RolEnum:IRoll = {
  ADMIN: "ADMIN",
  OWNER: "OWNER",
  WORKER: "WORKER",
  ROOT: "ROOT"
}
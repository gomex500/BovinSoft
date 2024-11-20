export interface IComentario {
  id?: string
  usuario: string
  idUsuario: string
  idForo: string
  avatar: string
  contenido: string
  create_at: Date | string
  interacciones: IInteractions
  userInteractions: IUserInteractions
}
export interface IInteractions {
  likes: number
  dislikes: number
  reports: number
}

export interface IUserInteractions {
  likes: boolean
  dislikes: boolean
  reports: boolean
}

export interface IPublicacion {
  id?: string
  idUsuario: string
  usuario: string
  avatar: string
  titulo: string
  contenido: string
  interacciones: IInteractions
  create_at: Date | string
  comentarios: IComentario[]
  userInteractions: IUserInteractions
}
export interface IInteraccionesPublicacionCreate {
  id?: string,
  idForo: string,
  tipoInteraccion: string,
  idUsuario: string,
  estado: boolean
}

export interface IInteraccionesComentarioCreate {
  id?: string,
  idComment: string,
  tipo: string,
  idUsuario: string,
  estado: boolean
}
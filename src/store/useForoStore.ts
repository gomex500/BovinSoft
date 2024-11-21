import { create } from 'zustand'
import {
  IComentario,
  IInteraccionesComentarioCreate,
  IInteraccionesPublicacionCreate,
  IPublicacion,
} from '../interfaces/IForo'
import {
  actualizarInteraccionComentarioService,
  actualizarInteraccionPublicacionService,
  obtenerComentariosService,
  obtenerPublicacionesService,
} from '../services/foroServices'
import { useUserStore } from './userStore'

interface ForoState {
  publicaciones: IPublicacion[]
  agregarComentario: (comentario: IComentario) => void
  agregarPublicacion: (publicacion: IPublicacion) => void
  actualizarInteraccionPublicacion: (id: string, tipo: string) => void
  actualizarInteraccionComentario: (id: any, postId: any, tipo: any) => void
  obtenerPublicaciones: () => Promise<void>
  obtenerComentariosByPostId: (postId: string) => Promise<void>
}

// Utilidad para actualizar interacciones
function actualizarInteraccion(
  items: IPublicacion[] | IComentario[],
  itemId: string,
  tipo: string,
  actualizarEstado: boolean
): IPublicacion[] | IComentario[] {
  return items.map((item) => {
    if (item.id === itemId) {
      const isActive = item.userInteractions[tipo]
      return {
        ...item,
        interacciones: {
          ...item.interacciones,
          [tipo]: isActive
            ? item.interacciones[tipo] - 1
            : item.interacciones[tipo] + 1,
        },
        userInteractions: {
          ...item.userInteractions,
          [tipo]: actualizarEstado,
        },
      }
    }
    return item
  })
}

export const useForoStore = create<ForoState>((set, get) => ({
  publicaciones: [],
  agregarComentario: (comentario: IComentario) =>
    set((state) => ({
      publicaciones: state.publicaciones.map((pub) =>
        pub.id === comentario.idForo
          ? {
              ...pub,
              comentarios: [...pub.comentarios, comentario],
            }
          : pub
      ),
    })),

  agregarPublicacion: (publicacion: IPublicacion) =>
    set((state) => ({
      publicaciones: [...state.publicaciones, publicacion],
    })),

  actualizarInteraccionPublicacion: async (id, tipo) => {
    const { publicaciones } = get()
    let publicacion = publicaciones.find(
      (item) => item.id === id
    ) as IPublicacion

    if (!publicacion) return

    const isActive = publicacion.userInteractions[tipo]

    let interaccion: IInteraccionesPublicacionCreate = {
      tipoInteraccion: tipo,
      idUsuario: useUserStore.getState().user._id,
      estado: !isActive,
      idForo: id,
    }

    await actualizarInteraccionPublicacionService(interaccion)

    set({
      publicaciones: (actualizarInteraccion(publicaciones, id, tipo, !isActive) as IPublicacion[]),
    })
  },

  actualizarInteraccionComentario: async (id, postId, tipo) => {
    let publicacion = get().publicaciones.find(
      (item) => item.id === postId
    ) as IPublicacion
    let comentario = publicacion.comentarios.find(
      (item) => item.id === id
    ) as IComentario
    const isActive = comentario.userInteractions[tipo]

    let interaccion: IInteraccionesComentarioCreate = {
      tipo: tipo,
      idUsuario: useUserStore.getState().user._id,
      estado: !isActive,
      idComment: id,
    }

    await actualizarInteraccionComentarioService(interaccion)

    set((state) => ({
      publicaciones: state.publicaciones.map((pub) => {
        if (pub.id === postId) {
          return {
            ...pub,
            comentarios: (actualizarInteraccion(pub.comentarios, id, tipo, !isActive) as IComentario[]),
          }
        }
        return pub
      }),
    }))
  },
  obtenerPublicaciones: async () => {
    try {
      const publicaciones = await obtenerPublicacionesService()
      set({ publicaciones })
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  },

  obtenerComentariosByPostId: async (postId: string) => {
    try {
      const comentario = await obtenerComentariosService(postId)

      set((state) => ({
        publicaciones: state.publicaciones.map((pub) => {
          if (pub.id === postId) {
            return {
              ...pub,
              comentarios: [...pub.comentarios, ...comentario],
            }
          }
          return pub
        }),
      }))
    } catch (error) {
      console.error('Error fetching comentario:', error)
    }
  },
}))

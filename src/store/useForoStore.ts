import { create } from 'zustand'
import { IComentario, IInteraccionesComentarioCreate, IInteraccionesPublicacionCreate, IPublicacion } from '../interfaces/IForo'
import { actualizarInteraccionComentarioService, actualizarInteraccionPublicacionService, obtenerComentariosService, obtenerPublicacionesService } from '../services/foroServices'
import { useUserStore } from './userStore'

interface ForoState {
  publicaciones: IPublicacion[]
  agregarComentario: (comentario: IComentario) => void
  agregarPublicacion: (publicacion: IPublicacion) => void
  actualizarInteraccionPublicacion: (id: any, tipo: any) => void
  actualizarInteraccionComentario: (id: any, postId: any, tipo: any) => void
  obtenerPublicaciones: () => Promise<void>
  obtenerComentariosByPostId: (postId: string) => Promise<void>
}

export const useForoStore = create<ForoState>((set, get) => ({
  publicaciones: [],
  agregarComentario: (comentario: IComentario) =>
    set((state) => ({
      publicaciones: state.publicaciones.map((pub) =>
        pub.id === comentario.idForo
          ? {
              ...pub,
              comentarios: [
                ...pub.comentarios,
                comentario,
              ],
            }
          : pub
      ),
    })),

  agregarPublicacion: (publicacion: IPublicacion) =>
    set((state) => ({
      publicaciones: [
        ...state.publicaciones,
        publicacion,
      ],
    })),

  actualizarInteraccionPublicacion: async (id, tipo) => {

    let publicacion = get().publicaciones.find((item) => item.id === id)
    const isActive = publicacion.userInteractions[tipo];

    let interaccion:IInteraccionesPublicacionCreate = {
      tipoInteraccion: tipo,
      idUsuario: useUserStore.getState().user._id,
      estado: !isActive,
      idForo: id
    }

    await actualizarInteraccionPublicacionService(interaccion)

    set((state) => ({
      publicaciones: state.publicaciones.map((pub) => {
        if (pub.id === id) {
          const isActive = pub.userInteractions[tipo];
          return {
            ...pub,
            interacciones: {
              ...pub.interacciones,
              [tipo]: isActive ? pub.interacciones[tipo] - 1 : pub.interacciones[tipo] + 1,
            },
            userInteractions: { ...pub.userInteractions, [tipo]: !isActive },
          };
        }
        return pub;
      }),
    }))
  },

  actualizarInteraccionComentario: async (id, postId, tipo) => {

    let publicacion = get().publicaciones.find((item) => item.id === postId)
    let comentario = publicacion.comentarios.find((item) => item.id === id)
    const isActive = comentario.userInteractions[tipo];

    let interaccion:IInteraccionesComentarioCreate = {
      tipo: tipo,
      idUsuario: useUserStore.getState().user._id,
      estado: !isActive,
      idComment: id
    }

    await actualizarInteraccionComentarioService(interaccion)
    
    set((state) => ({
      publicaciones: state.publicaciones.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comentarios: p.comentarios.map((c) => {
              if (c.id === id) {
                const isActive = c.userInteractions[tipo];
                return {
                  ...c,
                  interacciones: {
                    ...c.interacciones,
                    [tipo]: isActive ? c.interacciones[tipo] - 1 : c.interacciones[tipo] + 1,
                  },
                  userInteractions: { ...c.userInteractions, [tipo]: !isActive },
                }
              }
              return c
            }),
          }
        }
        return p
      }),
    }))
  },
  obtenerPublicaciones: async () => {
    try {
      const publicaciones = await obtenerPublicacionesService();
      set({ publicaciones });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
  
  obtenerComentariosByPostId: async (postId:string) => {
    try {
      const comentario = await obtenerComentariosService(postId);

      set((state) => ({
        publicaciones: state.publicaciones.map((pub) => {
          if (pub.id === postId) {
            return {
              ...pub,
              comentarios: [
                ...pub.comentarios,
                ...comentario,
              ],
            }
          }
          return pub
        }),
      }))

    } catch (error) {
      console.error('Error fetching comentario:', error);
    }
  },
}))

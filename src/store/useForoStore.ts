import { create } from "zustand";

interface IComentario {
  id: string;
  usuario: string;
  avatar: string;
  contenido: string;
  likes: number;
  createdAt: Date;
  userLiked: boolean;
}

interface Publicacion {
  id: string;
  usuario: string;
  avatar: string;
  titulo: string;
  contenido: string;
  likes: number;
  dislikes: number;
  reportes: number;
  createdAt: Date;
  comentarios: IComentario[];
  userInteractions: { like: false, dislike: false, report: false },
}

interface ForoState {
  publicaciones: Publicacion[],
  agregarComentario: (postId: any, contenido: any) => void
  agregarPublicacion: (titulo: any, contenido: any, usuario: any, avatar: any) => void
  actualizarInteraccionPublicacion: (id: any, tipo: any) => void
}

const useForoStore = create<ForoState>((set) => ({
  publicaciones: [
    {
      id: '1',
      usuario: 'Juan Perez',
      avatar: 'https://via.placeholder.com/50',
      titulo: 'Primera Publicación',
      contenido: 'Este es un resumen de mi publicación.',
      likes: 10,
      dislikes: 2,
      reportes: 0,
      createdAt: new Date(Date.now() - 7200 * 1000), // Hace 2 horas
      userInteractions: { like: false, dislike: false, report: false },
      comentarios: [
        {
          id: '1',
          usuario: 'Ana Gomez',
          avatar: 'https://via.placeholder.com/50',
          contenido: '¡Gran publicación!',
          likes: 2,
          createdAt: new Date(Date.now() - 3600 * 1000), // Hace 1 hora
          userLiked: false,
        },
      ],
    },
  ],
  agregarComentario: (postId, contenido) =>
    set((state) => ({
      publicaciones: state.publicaciones.map((pub) =>
        pub.id === postId
          ? {
              ...pub,
              comentarios: [
                ...pub.comentarios,
                {
                  id: (pub.comentarios.length + 1).toString(),
                  usuario: 'Nuevo Usuario',
                  avatar: 'https://via.placeholder.com/50',
                  contenido,
                  likes: 0,
                  createdAt: new Date(),
                  userLiked: false,
                },
              ],
            }
          : pub
      ),
    })),

    agregarPublicacion: (titulo, contenido, usuario, avatar) =>
      set((state) => ({
        publicaciones: [
          ...state.publicaciones,
          {
            id: (state.publicaciones.length + 1).toString(),
            usuario,
            avatar,
            titulo,
            contenido,
            likes: 0,
            dislikes: 0,
            reportes: 0,
            createdAt: new Date(),
            userInteractions: { like: false, dislike: false, report: false },
            comentarios: [],
          },
        ],
      })),
      actualizarInteraccionPublicacion: (id, tipo) =>
        set((state) => ({
          publicaciones: state.publicaciones.map((pub) =>
            pub.id === id
              ? {
                  ...pub,
                  [tipo]: pub.userInteractions[tipo] ? pub[tipo] - 1 : pub[tipo] + 1,
                  userInteractions: { ...pub.userInteractions, [tipo]: !pub.userInteractions[tipo] },
                }
              : pub
          ),
        })),
    
}));

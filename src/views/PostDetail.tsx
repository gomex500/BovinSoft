import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useEffect, useState } from 'react'
import { PostViewInCommentView } from '../components/PostView'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useForoStore } from '../store/useForoStore'
import { CommentView } from '../components/CommentView'
import { useUserStore } from '../store/userStore'
import { agregarComentarioService } from '../services/foroServices'
import { IComentario } from '../interfaces/IForo'
import { LoadingScreen } from '../components/LoadingStream'

interface PostDetailParams {
  postId: string
}

export default function PostDetail() {
  const route = useRoute<RouteProp<Record<string, PostDetailParams>, 'PostDetail'>>()
  const [nuevoComentario, setNuevoComentario] = useState('')
  const [loading, setLoading] = useState(true);

  const { publicaciones, agregarComentario, obtenerComentariosByPostId } = useForoStore()
  const postId = route.params?.postId

  let postData = publicaciones.find((item) => item.id === postId)

  const handleAddComment = async () => {
    let comentario: IComentario = {
      usuario: useUserStore.getState().user.nombre,
      avatar: useUserStore.getState().user.image || 'https://via.placeholder.com/50',
      idUsuario: useUserStore.getState().user._id,
      contenido: nuevoComentario,
      create_at: new Date(),
      interacciones: { likes: 0, dislikes: 0, reports: 0 },
      userInteractions: { likes: false, dislikes: false, reports: false },
      idForo: postData.id,
    }

    const data = await agregarComentarioService(comentario)
    comentario.id = data.id
    agregarComentario(comentario)

    setNuevoComentario('')
  }

  useEffect(() => {
    const fetchComentarios = async () => {
      await obtenerComentariosByPostId(postId);
      setLoading(false);
    };

    fetchComentarios();
  }, []);


  if (loading) {
    return <LoadingScreen />; // Muestra un mensaje de carga
  }

  if (!postData) {
    return <Text>No se encontró el post.</Text>; // Manejo de error si no se encuentra el post
  }
  
  return (
    <View style={styles.container}>
        {postData && postData.comentarios.length > 0 && (
          <FlatList
            data={postData.comentarios}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CommentView comment={item} postId={postData.id} />
            )}
            ListHeaderComponent={() => (<PostViewInCommentView post={postData} />)}
            contentContainerStyle={styles.commentsList}
          />
        )}

      {/* Formulario para agregar comentarios */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Escribe un comentario..."
          value={nuevoComentario}
          onChangeText={setNuevoComentario}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleAddComment}
        >
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  postContent: {
    fontSize: 16,
    color: '#666666',
  },
  timeAgo: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#007bff',
    marginRight: 16,
  },
  activeAction: {
    backgroundColor: '#007bff1a',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  commentsList: {
    marginBottom: 16,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333333',
  },
  commentText: {
    fontSize: 14,
    color: '#555555',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#1B4725',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

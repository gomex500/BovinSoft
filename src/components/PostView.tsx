import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import moment from 'moment'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../interfaces/navigationTypes'
import { useNavigation } from '@react-navigation/native'
import { useForoStore } from '../store/useForoStore'
import { IPublicacion } from '../interfaces/IForo'

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

interface PostViewProps {
  post: IPublicacion
}

export const PostView = ({ post }: PostViewProps) => {
  const { actualizarInteraccionPublicacion } = useForoStore()

  const navigation = useNavigation<NavigationProps>()

  const goToPostDetail = (id) => {
    navigation.navigate('PostDetail', { postId: id })
  }

  const tiempoTranscurrido = (fecha) => {
    return moment(fecha).fromNow()
  }

  return (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => goToPostDetail(post.id)}>
        <View style={styles.header}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.postTitle}>{post.usuario}</Text>
            <Text style={styles.username}>{post.titulo}</Text>
            <Text style={styles.timeAgo}>
              {tiempoTranscurrido(post.create_at)}
            </Text>
          </View>
        </View>
        <Text style={styles.postContent}>{post.contenido}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => actualizarInteraccionPublicacion(post.id, 'likes')}
            style={post.userInteractions.likes ? styles.activeAction : null}
          >
            <Text style={styles.actionText}>👍 {post.interacciones.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => actualizarInteraccionPublicacion(post.id, 'dislikes')}
            style={post.userInteractions.dislikes ? styles.activeAction : null}
          >
            <Text style={styles.actionText}>👎 {post.interacciones.dislikes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => actualizarInteraccionPublicacion(post.id, 'reports')}
            style={post.userInteractions.reports ? styles.activeAction : null}
          >
            <Text style={styles.actionText}>🚩 {post.interacciones.reports}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export const PostViewInCommentView = ({ post }: PostViewProps) => {
  return (
    <View>
      <PostView post={post} />
      <Text style={styles.title}>Comentarios</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Color de fondo más suave
    padding: 16,
  },
  addPostButton: {
    backgroundColor: '#1B4725', // Color azul de Facebook
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  addPostButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
  },
  postContent: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B4725', // Color azul de Facebook
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  inputLarge: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#1B4725', // Color azul de Facebook
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#cccccc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333333',
    fontWeight: 'bold',
  },
  timeAgo: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
  activeAction: {
    backgroundColor: '#e7f3ff', // Color de fondo al activar
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  adContainer: {
    backgroundColor: '#fffae6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  adText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d48806',
  },
  title: {
    fontSize: 21,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 10,
    color: '#1B4725',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

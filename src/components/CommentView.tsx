import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import moment from 'moment'
import { useForoStore } from '../store/useForoStore'
import { IComentario } from '../interfaces/IForo'

interface CommentViewParams {
  postId: string
  comment: IComentario
}

export const CommentView = ({ comment, postId }: CommentViewParams) => {
  const { actualizarInteraccionComentario } = useForoStore()

  const tiempoTranscurrido = (fecha) => {
    return moment(fecha).fromNow()
  }

  return (
    <View style={styles.comment}>
      <Image source={{ uri: comment.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.username}>{comment.usuario}</Text>
        <Text style={styles.commentText}>{comment.contenido}</Text>
        <Text style={styles.timeAgo}>
          {tiempoTranscurrido(comment.create_at)}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => actualizarInteraccionComentario(comment.id, postId, 'likes')}
            style={comment.userInteractions.likes ? styles.activeAction : null}
          >
            <Text style={styles.actionText}>👍 {comment.interacciones.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => actualizarInteraccionComentario(comment.id, postId, 'dislikes')}
            style={comment.userInteractions.dislikes ? styles.activeAction : null}
          >
            <Text style={styles.actionText}>👎 {comment.interacciones.dislikes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => actualizarInteraccionComentario(comment.id, postId, 'reports')}
            style={comment.userInteractions.reports ? styles.activeAction : null}
          >
            <Text style={styles.actionText}>🚩 {comment.interacciones.reports}</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 14,
    marginRight: 16,
    fontWeight: 'bold',
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

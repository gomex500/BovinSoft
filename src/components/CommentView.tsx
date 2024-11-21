import { View, Text, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { useForoStore } from '../store/useForoStore'
import { IComentario } from '../interfaces/IForo'

interface CommentViewParams {
  postId: string
  comment: IComentario
}

export const CommentView = ({ comment, postId }: CommentViewParams) => {
  const { actualizarInteraccionComentario } = useForoStore()

  const tiempoTranscurrido = (fecha: string | Date) => {
    return moment(fecha).fromNow()
  }

  return (
    <View
      style={{
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
      }}
    >
      <Image
        source={{ uri: comment.avatar }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 12,
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 4,
            color: '#333333',
          }}
        >
          {comment.usuario}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#555555',
          }}
        >
          {comment.contenido}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#888888',
            marginTop: 4,
          }}
        >
          {tiempoTranscurrido(comment.create_at)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 8,
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={() =>
              actualizarInteraccionComentario(comment.id, postId, 'likes')
            }
            style={
              comment.userInteractions.likes
                ? {
                    backgroundColor: '#007bff1a',
                    borderRadius: 8,
                    paddingHorizontal: 4,
                  }
                : null
            }
          >
            <Text
              style={{
                fontSize: 14,
                marginRight: 16,
                fontWeight: 'bold',
              }}
            >
              👍 {comment.interacciones.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              actualizarInteraccionComentario(comment.id, postId, 'dislikes')
            }
            style={
              comment.userInteractions.dislikes
                ? {
                    backgroundColor: '#007bff1a',
                    borderRadius: 8,
                    paddingHorizontal: 4,
                  }
                : null
            }
          >
            <Text
              style={{
                fontSize: 14,
                marginRight: 16,
                fontWeight: 'bold',
              }}
            >
              👎 {comment.interacciones.dislikes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              actualizarInteraccionComentario(comment.id, postId, 'reports')
            }
            style={
              comment.userInteractions.reports
                ? {
                    backgroundColor: '#007bff1a',
                    borderRadius: 8,
                    paddingHorizontal: 4,
                  }
                : null
            }
          >
            <Text
              style={{
                fontSize: 14,
                marginRight: 16,
                fontWeight: 'bold',
              }}
            >
              🚩 {comment.interacciones.reports}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

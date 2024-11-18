import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import moment from 'moment';

const initialComentarios = [
  { id: '1', usuario: 'Juan Perez', avatar: 'https://via.placeholder.com/50', contenido: '¡Gran publicación!', likes: 3, createdAt: new Date(Date.now() - 1800 * 1000), userLiked: false }, // Hace 30 min
  { id: '2', usuario: 'Ana Gomez', avatar: 'https://via.placeholder.com/50', contenido: 'Estoy de acuerdo.', likes: 5, createdAt: new Date(Date.now() - 3600 * 1000), userLiked: false }, // Hace 1 hora
  { id: '3', usuario: 'Carlos López', avatar: 'https://via.placeholder.com/50', contenido: 'Interesante perspectiva.', likes: 2, createdAt: new Date(Date.now() - 7200 * 1000), userLiked: false }, // Hace 2 horas
];

export default function PostDetail() {
  const [comentarios, setComentarios] = useState(initialComentarios);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [postData, setPostData] = useState({
    titulo: 'Título de la Publicación',
    contenido: 'Aquí va el contenido detallado de la publicación.',
    likes: 10,
    dislikes: 2,
    createdAt: new Date(Date.now() - 7200 * 1000), // Hace 2 horas
    userInteractions: { like: false, dislike: false },
  });

  // Agregar comentario
  const agregarComentario = () => {
    if (nuevoComentario.trim()) {
      setComentarios([
        ...comentarios,
        {
          id: (comentarios.length + 1).toString(),
          usuario: 'Nuevo Usuario',
          avatar: 'https://via.placeholder.com/50',
          contenido: nuevoComentario,
          likes: 0,
          createdAt: new Date(),
          userLiked: false,
        },
      ]);
      setNuevoComentario('');
    }
  };

  // Manejar likes/dislikes de la publicación
  const manejarInteraccionPublicacion = (tipo) => {
    setPostData((prev) => {
      const isActive = prev.userInteractions[tipo];
      return {
        ...prev,
        [tipo === 'like' ? 'likes' : 'dislikes']: isActive ? prev[tipo] - 1 : prev[tipo] + 1,
        userInteractions: { ...prev.userInteractions, [tipo]: !isActive },
      };
    });
  };

  // Manejar likes en comentarios
  const manejarLikeComentario = (id) => {
    setComentarios((prev) =>
      prev.map((comentario) =>
        comentario.id === id
          ? { ...comentario, likes: comentario.userLiked ? comentario.likes - 1 : comentario.likes + 1, userLiked: !comentario.userLiked }
          : comentario
      )
    );
  };

  // Función para calcular tiempo transcurrido
  const tiempoTranscurrido = (fecha) => {
    return moment(fecha).fromNow();
  };

  return (
    <View style={styles.container}>
      {/* Información de la publicación */}
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{postData.titulo}</Text>
        <Text style={styles.postContent}>{postData.contenido}</Text>
        <Text style={styles.timeAgo}>{tiempoTranscurrido(postData.createdAt)}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => manejarInteraccionPublicacion('like')}
            style={postData.userInteractions.like ? styles.activeAction : null}
          >
            <Text style={styles.actionText}>👍 {postData.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => manejarInteraccionPublicacion('dislike')}
            style={postData.userInteractions.dislike ? styles.activeAction : null}
          >
            <Text style={styles.actionText}>👎 {postData.dislikes}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de comentarios */}
      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.commentContent}>
              <Text style={styles.username}>{item.usuario}</Text>
              <Text style={styles.commentText}>{item.contenido}</Text>
              <Text style={styles.timeAgo}>{tiempoTranscurrido(item.createdAt)}</Text>
              <TouchableOpacity
                onPress={() => manejarLikeComentario(item.id)}
                style={item.userLiked ? styles.activeAction : null}
              >
                <Text style={styles.actionText}>👍 {item.likes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.commentsList}
      />

      {/* Formulario para agregar comentarios */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Escribe un comentario..."
          value={nuevoComentario}
          onChangeText={setNuevoComentario}
        />
        <TouchableOpacity style={styles.sendButton} onPress={agregarComentario}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
});

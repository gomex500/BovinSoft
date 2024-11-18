import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const comentarios = [
  { id: '1', usuario: 'Juan Perez', avatar: 'https://via.placeholder.com/50', contenido: '¡Gran publicación!' },
  { id: '2', usuario: 'Ana Gomez', avatar: 'https://via.placeholder.com/50', contenido: 'Estoy de acuerdo.' },
  { id: '3', usuario: 'Carlos López', avatar: 'https://via.placeholder.com/50', contenido: 'Interesante perspectiva.' },
];

export default function PostDetail() {
  const [nuevoComentario, setNuevoComentario] = useState('');

  const agregarComentario = () => {
    if (nuevoComentario.trim()) {
      comentarios.push({
        id: (comentarios.length + 1).toString(),
        usuario: 'Nuevo Usuario',
        avatar: 'https://via.placeholder.com/50',
        contenido: nuevoComentario,
      });
      setNuevoComentario('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Información de la publicación */}
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>Título de la Publicación</Text>
        <Text style={styles.postContent}>Aquí va el contenido detallado de la publicación.</Text>
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
    backgroundColor: '#007bff',
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

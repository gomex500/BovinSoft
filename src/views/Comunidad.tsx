import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import moment from 'moment';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/navigationTypes';
import { useNavigation } from '@react-navigation/native';

const initialPublicaciones = [
  {
    id: '1',
    usuario: 'Juan Perez',
    avatar: 'https://via.placeholder.com/50',
    titulo: 'Primera Publicación',
    contenido: 'Este es un resumen de mi publicación.',
    likes: 5,
    dislikes: 1,
    reportes: 0,
    createdAt: new Date(Date.now() - 3600 * 1000), // Hace 1 hora
    userInteractions: { like: false, dislike: false, report: false },
  },
  {
    id: '2',
    usuario: 'Ana Gomez',
    avatar: 'https://via.placeholder.com/50',
    titulo: 'Segunda Publicación',
    contenido: 'Aquí hay algo interesante que compartir.',
    likes: 8,
    dislikes: 0,
    reportes: 2,
    createdAt: new Date(Date.now() - 7200 * 1000), // Hace 2 horas
    userInteractions: { like: false, dislike: false, report: false },
  },
];

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Feed() {
  const [publicaciones, setPublicaciones] = useState(initialPublicaciones);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoContenido, setNuevoContenido] = useState('');
  const navigation = useNavigation<NavigationProps>();

  const goToPostDetail = (id) => {
    navigation.navigate('PostDetail', { postId: id });
  };

  const manejarInteraccion = (id, tipo) => {
    setPublicaciones((prev) =>
      prev.map((pub) => {
        if (pub.id === id) {
          const isActive = pub.userInteractions[tipo];
          return {
            ...pub,
            [tipo === 'like' ? 'likes' : tipo === 'dislike' ? 'dislikes' : 'reportes']: isActive
              ? pub[tipo === 'like' ? 'likes' : tipo === 'dislike' ? 'dislikes' : 'reportes'] - 1
              : pub[tipo === 'like' ? 'likes' : tipo === 'dislike' ? 'dislikes' : 'reportes'] + 1,
            userInteractions: { ...pub.userInteractions, [tipo]: !isActive },
          };
        }
        return pub;
      })
    );
  };

  const agregarPublicacion = () => {
    if (nuevoTitulo.trim() && nuevoContenido.trim()) {
      setPublicaciones([
        ...publicaciones,
        {
          id: (publicaciones.length + 1).toString(),
          usuario: 'Nuevo Usuario',
          avatar: 'https://via.placeholder.com/50',
          titulo: nuevoTitulo,
          contenido: nuevoContenido,
          likes: 0,
          dislikes: 0,
          reportes: 0,
          createdAt: new Date(),
          userInteractions: { like: false, dislike: false, report: false },
        },
      ]);
      setNuevoTitulo('');
      setNuevoContenido('');
      setModalVisible(false);
    }
  };

  const tiempoTranscurrido = (fecha) => {
    return moment(fecha).fromNow();
  };

  const renderItem = ({ item, index }) => {
    if ((index + 1) % 3 === 0) {
      // Mostrar publicidad cada tercer elemento
      return (
        <View style={styles.adContainer}>
          <Text style={styles.adText}>Publicidad: ¡Consigue nuestro producto!</Text>
        </View>
      );
    }

    return (
      <View style={styles.postContainer}>
            <TouchableOpacity onPress={() => goToPostDetail(item.id)}>
              <View style={styles.header}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View>
                  <Text style={styles.username}>{item.usuario}</Text>
                  <Text style={styles.postTitle}>{item.titulo}</Text>
                  <Text style={styles.timeAgo}>
                    {tiempoTranscurrido(item.createdAt)}
                  </Text>
                </View>
              </View>
              <Text style={styles.postContent}>{item.contenido}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => manejarInteraccion(item.id, 'like')}
                  style={item.userInteractions.like ? styles.activeAction : null}
                >
                  <Text style={styles.actionText}>👍 {item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => manejarInteraccion(item.id, 'dislike')}
                  style={item.userInteractions.dislike ? styles.activeAction : null}
                >
                  <Text style={styles.actionText}>👎 {item.dislikes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => manejarInteraccion(item.id, 'report')}
                  style={item.userInteractions.report ? styles.activeAction : null}
                >
                  <Text style={styles.actionText}>🚩 {item.reportes}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addPostButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addPostButtonText}>Nueva Publicación</Text>
      </TouchableOpacity>

      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Publicación</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={nuevoTitulo}
              onChangeText={setNuevoTitulo}
            />
            <TextInput
              style={[styles.input, styles.inputLarge]}
              placeholder="Contenido"
              value={nuevoContenido}
              onChangeText={setNuevoContenido}
              multiline
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={agregarPublicacion}
            >
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
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
});

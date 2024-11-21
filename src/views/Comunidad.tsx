import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native'
import { useEffect, useState } from 'react'
import { useForoStore } from '../store/useForoStore'
import { PostView } from '../components/PostView'
import { useUserStore } from '../store/userStore'
import { agregarPublicacionService } from '../services/foroServices'
import { IPublicacion } from '../interfaces/IForo'
import { LoadingScreen } from '../components/LoadingStream'

interface IRenderItem {
  item: IPublicacion;
  index: number;
}

export default function Feed() {
  const [modalVisible, setModalVisible] = useState(false)
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  const [nuevoContenido, setNuevoContenido] = useState('')
  const [loading, setLoading] = useState(true);

  const { agregarPublicacion, publicaciones, obtenerPublicaciones } = useForoStore()

  useEffect(() => {
    const fetchPublicaciones = async () => {
      await obtenerPublicaciones();
      setLoading(false)
    };

    fetchPublicaciones();
  }, []);

  const agregarPublicacionView = async () => {
    if (nuevoTitulo.trim() && nuevoContenido.trim()) {

      let publicacion:IPublicacion = {
        usuario: useUserStore.getState().user.nombre,
        idUsuario: useUserStore.getState().user._id,
        avatar: useUserStore.getState().user.image || 'https://via.placeholder.com/50',
        titulo: nuevoTitulo,
        contenido: nuevoContenido,
        interacciones: { likes: 0, dislikes: 0, reports: 0 },
        create_at: new Date(),
        userInteractions: { likes: false, dislikes: false, reports: false },
        comentarios: [],
      }

      const data = await agregarPublicacionService(publicacion)
      publicacion.id = data.id

      agregarPublicacion(publicacion)

      setNuevoTitulo('')
      setNuevoContenido('')
      setModalVisible(false)
    }
  }

  const renderItem = ({ item, index } : IRenderItem) => {
    return (
      <>
        {(index + 1) % 4 === 0 && (
          <View style={styles.adContainer}>
            <Text style={styles.adText}>
              Publicidad: ¡Consigue nuestro producto!
            </Text>
          </View>
        )}
        <PostView post={item} />
      </>
    )
  }

  if (loading) {
    return <LoadingScreen />; // Muestra un mensaje de carga
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addPostButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addPostButtonText}>Nueva Publicación</Text>
      </TouchableOpacity>

      <FlatList
        data={publicaciones && publicaciones.length > 0 ? publicaciones : []}
        keyExtractor={(item) => item.id as string}
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
              onPress={agregarPublicacionView}
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
})

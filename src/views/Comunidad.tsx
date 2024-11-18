import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/navigationTypes';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const publicaciones = [
  { id: '1', usuario: 'Juan Perez', avatar: 'https://via.placeholder.com/50', titulo: 'Primera Publicación', contenido: 'Este es un resumen de mi publicación.' },
  { id: '2', usuario: 'Ana Gomez', avatar: 'https://via.placeholder.com/50', titulo: 'Segunda Publicación', contenido: 'Aquí hay algo interesante que compartir.' },
];

export default function Feed() {
  const navigation = useNavigation<NavigationProps>();

  const goToPostDetail = (id) => {
    navigation.navigate('PostDetail', { postId: id });
  };
goToPostDetail
  return (
    <View style={styles.container}>
      {/* Botón para agregar nueva publicación */}
      <TouchableOpacity style={styles.addPostButton}>
        <Text style={styles.addPostButtonText}>Nueva Publicación</Text>
      </TouchableOpacity>

      {/* Listado de publicaciones */}
      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.postContainer}>
            <View style={styles.header}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.username}>{item.usuario}</Text>
                <Text style={styles.postTitle}>{item.titulo}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{item.contenido}</Text>
            <TouchableOpacity onPress={() => goToPostDetail(item.id)}>
              <Text style={styles.detailsLink} >Ver detalles</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  addPostButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
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
    shadowOpacity: 0.1,
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
  detailsLink: {
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BovinoModel } from "../interfaces/IBovino";
import { RootStackParamList } from "../interfaces/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'

interface ICardComponente {
  item: BovinoModel;
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const CardBovinos = ({ item }: ICardComponente) => {

  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      style={styles.contenedorCard}
      onPress={() => navigation.navigate('InfoBovino', { newsItem: item })}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.imagen} />
        <View style={styles.contTexto}>
          <Text style={styles.codigo}>{item.codigo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contenedorFiltro: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  contenedorInpunt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contTexto: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    borderColor: '#1B4725',
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontSize: 18,
    color: '#1B4725',
    fontWeight: 'bold',
    padding: 10,
    marginRight: 10,
  },
  boton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B4725',
    padding: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
  },
  contenedorCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  imagen: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  codigo: {
    marginTop: 10,
    color: '#1B4725',
    fontWeight: 'bold',
    fontSize: 12,
  },
  conBvi: {
    alignContent: 'center',
    alignItems: 'center',
    width: '98%',
    marginTop: 20,
  },
})
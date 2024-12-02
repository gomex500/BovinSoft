import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { useFincaStore } from '../store/fincaStore'
import { useTailwind } from 'tailwind-rn'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../interfaces/navigationTypes'
import { useNavigation } from '@react-navigation/native'
import { FincaModel } from '../interfaces/IFinca'
import {
  Button,
  Card,
  Divider,
  FAB,
  Menu,
  PaperProvider,
  Searchbar,
  useTheme,
} from 'react-native-paper'
import moment from 'moment'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '../store/authStore'

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

const Fincas = () => {
  const navigation = useNavigation<NavigationProps>()
  const { setFincaId } = useFincaStore()
  const [searchQuery, setSearchQuery] = useState('')
  const { fincas, obtenerFincaPorUsuario } = useFincaStore()
  const [animationValue] = useState(new Animated.Value(0))
  const { user } = useAuthStore()
  const tw = useTailwind()
  const theme = useTheme()
  theme.colors.primary = '#1B5E20'

  useEffect(() => {
    const fetchData = async () => {
      await obtenerFincaPorUsuario()
    }

    fetchData()

    Animated.timing(animationValue, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start()
  }, [])

  const filteredFarms =
    fincas.length > 0 &&
    fincas.filter((finca) =>
      finca.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const goForm = () => {
    navigation.navigate('FormFinca', {})
  }

  const goInfoFinca = (finca: FincaModel) => {
    setFincaId(finca)
    navigation.navigate('InfoFinca', {})
  }

  const gestionarGanado = (finca: FincaModel) => {
    setFincaId(finca)
    navigation.navigate('LivestockViewFarm', {farm: finca, type: 'farm'});
  };

  const toReproductiveView = (animal: FincaModel) => {
    navigation.navigate('CattleReproductionByFarm', { animal, type: 'farm' })
  }

  const toCareHistoryView = (animal: FincaModel) => {
    navigation.navigate('CareHistoryByFarm', { animal, type: 'farm' })
  }

  const toCareCalendarView = (animal: FincaModel) => {
    navigation.navigate('CareCalendarByFarm', { animal, type: 'farm' })
  }

  const [menuVisible, setMenuVisible] = useState<string | null>(null)

  const renderFincaItem = (animal: FincaModel) => (
    <Card
      key={animal._id}
      style={styles.card}
      onPress={() => goInfoFinca(animal)}
    >
      <Card.Title
        title={`${animal.nombre}`}
        subtitle={`${moment(animal.create_at).format('DD/MM/YYYY')}`}
        left={(props) => (
          <Image
            source={{
              uri:
                animal.image ||
                'https://enciclopediaiberoamericana.com/wp-content/uploads/2022/01/vaca.jpg',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />
      <Card.Content>
        <Text>Tamaño: {animal.tamano} acres</Text>
        <Text>Cantidad de bovinos: {animal.cantidadBovinos}</Text>
      </Card.Content>

      {user.tipoSuscripcion !== 'básica' && (
        <CardActionFarm
          animal={animal}
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          toCareCalendarView={toCareCalendarView}
          toCareHistoryView={toCareHistoryView}
          toReproductiveView={toReproductiveView}
          gestionarGanado={gestionarGanado}
        />
      )}
    </Card>
  )

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Buscar finca..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
              iconColor="#000"
              placeholderTextColor={'#000'}
            />
          </View>

          <FlatList
            data={filteredFarms}
            style={[tw('h-3/5'), { padding: 5 }]}
            renderItem={({ item }) => renderFincaItem(item)}
            keyExtractor={(item) => item._id as string} // Asegúrate de que 'id' sea único
          />
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={goForm}
            label="Añadir finca"
            color="white"
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  contenedorFiltro: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  contenedorInpunt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
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
  icon: {
    color: '#1B4725',
  },
  boton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B4725',
    padding: 10,
  },
  contenedorCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  contenedorImagen: {
    width: '100%',
    height: 150,
  },
  imagen: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contenedorTexto: {
    padding: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#252525',
  },
  descripcion: {
    fontSize: 14,
    color: '#000',
  },
  contTexto: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#F0F0F0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 30,
    backgroundColor: '#1B5E20',
    color: '#fff',
  },
})

export default Fincas

interface CardActionFarmProps {
  animal: FincaModel
  menuVisible: string | null
  setMenuVisible: React.Dispatch<React.SetStateAction<string | null>>
  toCareCalendarView: (animal: FincaModel) => void
  toCareHistoryView: (animal: FincaModel) => void
  toReproductiveView: (animal: FincaModel) => void
  gestionarGanado: (finca: FincaModel) => void
}

function CardActionFarm({
  animal,
  menuVisible,
  setMenuVisible,
  toCareCalendarView,
  toCareHistoryView,
  toReproductiveView,
  gestionarGanado,
}: CardActionFarmProps) {
  return (
    <Card.Actions>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Menu
          theme={{ colors: { primary: 'green' } }}
          visible={menuVisible === animal._id}
          onDismiss={() => setMenuVisible(null)}
          anchor={
            <Button
              textColor="#1B4725"
              onPress={() => setMenuVisible(animal._id)}
            >
              Opciones
            </Button>
          }
          contentStyle={{ backgroundColor: '#fff' }}
        >
          <Menu.Item
            onPress={() => toReproductiveView(animal)}
            title="Proceso reproductivo"
          />
          <Divider />

          <Menu.Item
            onPress={() => toCareHistoryView(animal)}
            title="Historico sanitario"
          />
          <Divider />

          <Menu.Item
            onPress={() => toCareCalendarView(animal)}
            title="Calendario de cuidados"
          />
          <Divider />
          <Menu.Item
            onPress={() => gestionarGanado(animal)}
            title="Gestionar Ganado"
          />
        </Menu>
      </View>
    </Card.Actions>
  )
}

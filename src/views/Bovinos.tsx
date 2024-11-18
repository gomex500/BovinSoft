import { Entypo } from '@expo/vector-icons'
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import { useBovinosStore } from '../store/vacasStore'
import { useTailwind } from 'tailwind-rn'
import { useFincaStore } from '../store/fincaStore'
import { useFocusEffect } from '@react-navigation/native'
import { fetchWeatherApi } from 'openmeteo'
import { openMeteoIntance } from '../helpers/openMeteo'

interface BovinoRouteParams {
  info: {
    from: string
    id: string
  } | null
}

const Bovinos = ({ navigation }) => {
  const { vacas, obtenerGanadoPorUsuario, obtenerGanadoPorFinca } =
    useBovinosStore()
  const tw = useTailwind()
  const { fincaSelected, setFincaId } = useFincaStore()

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (fincaSelected === null) {
          await obtenerGanadoPorUsuario()
        }
        if (fincaSelected) {
          await obtenerGanadoPorFinca(fincaSelected._id)
        }
      }

      fetchData()

      return () => {
        setFincaId(null)
        console.log('Saliste de la pantalla BovinosHome')
      }
    }, [fincaSelected])
  )

  const goForm = () => {
    navigation.navigate('FormBovino')
  }

  return (
    <View style={styles.container}>
      <View style={styles.contenedorFiltro}>
        <View style={styles.contenedorInpunt}>
          <TextInput placeholder="Buscar Ganado..." style={styles.input} />
          <TouchableOpacity style={styles.boton}>
            <Entypo name="magnifying-glass" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boton,
              { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
            ]}
            onPress={goForm}
          >
            <Entypo name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* tarjetas de los animales */}
      <View style={styles.conBvi}>
        <FlatList
          data={vacas}
          style={[tw('h-3/5'), { padding: 5 }]}
          renderItem={({ item }) => (
            <CardComponente navigation={navigation} item={item} />
          )}
          keyExtractor={(item) => item._id}
          numColumns={3} // Cambia este valor para ajustar el número de columnas
        />
      </View>
    </View>
  )
}

const CardComponente = ({ item, navigation }) => {
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

export default Bovinos

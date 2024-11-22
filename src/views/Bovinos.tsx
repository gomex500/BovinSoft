import { Entypo } from '@expo/vector-icons'
import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { useBovinosStore } from '../store/useBovinoStore'
import { useTailwind } from 'tailwind-rn'
import { useFincaStore } from '../store/fincaStore'
import { useFocusEffect } from '@react-navigation/native'
import { CardBovinos } from '../components/CardBovinos'
import { GoForm } from '../components/GoForm'
import { useAuthStore } from '../store/authStore'
import { LoadingScreen } from '../components/LoadingStream'


const Bovinos = () => {
  const tw = useTailwind()
  const { bovinos, obtenerGanadoPorUsuario, obtenerGanadoPorFinca } = useBovinosStore()
  const { fincaSelected, setFincaId } = useFincaStore()
  const { user } = useAuthStore()

  if (user === null) {
    return <LoadingScreen />
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (fincaSelected === null) {
          await obtenerGanadoPorUsuario()
        }
        if (fincaSelected) {
          await obtenerGanadoPorFinca(fincaSelected._id as string)
        }
      }

      fetchData()

      return () => {
        if (user.rol === "ROOT" || user.rol === "OWNER") {
          setFincaId(null)
          console.log('Saliste de la pantalla BovinosHome')
        }
      }
    }, [fincaSelected])
  )

  return (
    <View style={styles.container}>
      <View style={styles.contenedorFiltro}>
        <View style={styles.contenedorInpunt}>
          <TextInput placeholder="Buscar Ganado..." style={styles.input} />
          <TouchableOpacity style={styles.boton}>
            <Entypo name="magnifying-glass" size={24} color="white" />
          </TouchableOpacity>
          <GoForm />
        </View>
      </View>

      {/* tarjetas de los animales */}
      <View style={styles.conBvi}>
        <FlatList
          data={bovinos}
          style={[tw('h-3/5'), { padding: 5 }]}
          renderItem={({ item }) => (
            <CardBovinos item={item} />
          )}
          keyExtractor={(item) => item._id as string}
          numColumns={3} // Cambia este valor para ajustar el número de columnas
        />
      </View>
    </View>
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

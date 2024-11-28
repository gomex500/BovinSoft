import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn'
import { useFincaStore } from '../store/fincaStore'
import { useFocusEffect } from '@react-navigation/native'
import { useAuthStore } from '../store/authStore'
import { useBovinosStore } from '../store/useBovinoStore'
import { LoadingScreen } from '../components/LoadingStream'
import { GoForm } from '../components/GoForm'
import { CardBovinos } from '../components/CardBovinos'

const Bovinos = () => {
  const tw = useTailwind()
  const { bovinos, obtenerGanadoPorUsuario, obtenerGanadoPorFinca } = useBovinosStore()
  const { fincaSelected, setFincaId } = useFincaStore()
  const { user } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredBovinos = bovinos.filter(bovino =>
    bovino.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <View style={styles.contenedorFiltro}>
        <View style={styles.contenedorInpunt}>
          <TextInput 
            placeholder="Buscar Ganado..." 
            style={styles.input} 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.boton}>
            <Entypo name="magnifying-glass" size={24} color="white" />
          </TouchableOpacity>
          <GoForm />
        </View>
      </View>

      <View style={styles.conBvi}>
        <FlatList
          data={filteredBovinos}
          style={[tw('h-3/5'), { padding: 5 }]}
          renderItem={({ item }) => (
            <CardBovinos item={item} />
          )}
          keyExtractor={(item) => item.id as string}
          numColumns={2}
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
  conBvi: {
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    height: 580,
  },
})

export default Bovinos


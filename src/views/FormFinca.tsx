import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native'
import { ICordenadas } from '../interfaces/IFinca'
import { useFincaStore } from '../store/fincaStore'
import { useAuthStore } from '../store/authStore'
import {
  FontAwesome6,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons'
import { CustomInput } from '../components/CustomInput'
import { BollGroup } from '../components/BollGroup'
import { FarmResourcesList } from '../components/FarmResourcesList'

interface handle {
  text: string
  index: number
}

const FormFinca = () => {
  const { createFinca } = useFincaStore()
  const { user } = useAuthStore()
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [image, setImage] = useState('')
  const [resources, setResources] = useState<string[]>([])

  const [direccion, setDireccion] = useState('')
  const [coordenadas, setCoordenadas] = useState<ICordenadas>({
    latitud: '',
    longitud: '',
  })
  const [tamano, setTamano] = useState('')

  const [loading, setLoading] = useState(false)

  const [boll, setBoll] = useState({
    colo1: '#1B4725',
    colo2: '#c2c2c2',
  })

  const handleCoordenadasChange = (text, index) => {
    const newCoordenadas = { ...coordenadas }
    newCoordenadas[index] = text // Actualiza el recurso en el índice correspondiente
    setCoordenadas(newCoordenadas)
  }

  const handleSubmit = async () => {
    setLoading(true)
    const data = {
      nombre,
      descripcion,
      image,
      direccion,
      coordenadas,
      tamano,
      recursosN: resources,
      idUsuario: user._id,
    }
    let result = await createFinca(data)

    setLoading(false)
  }

  const disabledButton =
    nombre === '' ||
    image === '' ||
    direccion === '' ||
    tamano === '' ||
    resources.length === 0 ||
    coordenadas.latitud === '' ||
    coordenadas.longitud === '' ||
    descripcion === ''

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.contHeader}>
        <Image
          source={require('../../assets/img/splashLogo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Ingresar Finca</Text>
      </View>

      <View style={styles.container}>
        {boll.colo1 === '#1B4725' ? (
          <View>
            <CustomInput
              placeholder="Nombre :"
              value={nombre}
              onChangeText={setNombre}
              icon={
                <FontAwesome6
                  name="seedling"
                  size={20}
                  color="#1B4725"
                  style={styles.icon}
                />
              }
            />
            <CustomInput
              placeholder="Imagen :"
              value={image}
              onChangeText={setImage}
              icon={
                <FontAwesome6
                  name="image"
                  size={20}
                  color="#1B4725"
                  style={styles.icon}
                />
              }
            />
            <CustomInput
              placeholder="Direccion :"
              value={direccion}
              onChangeText={setDireccion}
              icon={
                <FontAwesome6
                  name="map-location-dot"
                  size={20}
                  color="#1B4725"
                  style={styles.icon}
                />
              }
            />
            <CustomInput
              placeholder="Tamaño :"
              value={tamano}
              onChangeText={setTamano}
              icon={
                <MaterialCommunityIcons
                  name="tape-measure"
                  size={20}
                  color="#1B4725"
                  style={styles.icon}
                />
              }
            />
          </View>
        ) : (
          <View>
            <CustomInput
              placeholder="Latitud :"
              value={coordenadas.latitud as string}
              onChangeText={(text) => handleCoordenadasChange(text, 'latitud')}
              icon={
                <FontAwesome6
                  name="location-crosshairs"
                  size={20}
                  color="#1B4725"
                  style={styles.icon}
                />
              }
            />
            <CustomInput
              placeholder="Longitud :"
              value={coordenadas.longitud as string}
              onChangeText={(text) => handleCoordenadasChange(text, 'longitud')}
              icon={
                <FontAwesome6
                  name="location-crosshairs"
                  size={20}
                  color="#1B4725"
                  style={styles.icon}
                />
              }
            />
            <CustomInput
              placeholder="Descripcion :"
              value={descripcion}
              onChangeText={setDescripcion}
              icon={
                <FontAwesome
                  name="text-width"
                  size={20}
                  color="#1B4725"
                  style={styles.icon}
                />
              }
            />
            <FarmResourcesList
              resources={resources}
              setResources={setResources}
            />
          </View>
        )}

        <BollGroup boll={boll} setBoll={setBoll} />

        {loading ? (
          <ActivityIndicator style={styles.loandig} size={50} color="#1B4725" />
        ) : (
          <TouchableOpacity
            disabled={disabledButton}
            style={disabledButton ? styles.btn2 : styles.btn}
            onPress={handleSubmit}
          >
            <Text style={disabledButton ? styles.btnText : styles.btnText2}>
              Enviar
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 300,
    height: 95,
    marginTop: 50,
  },
  contHeader: {
    alignItems: 'center',
    backgroundColor: '#1B4725',
    width: '100%',
    height: 220,
    paddingBottom: 5,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
  },
  label: {
    marginBottom: 5,
    marginTop: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1B4725',
    fontSize: 18,
  },
  icon: {
    marginRight: 8,
  },
  loandig: {
    paddingTop: 12,
    marginTop: 20,
    elevation: 3,
    height: 50,
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 50,
    paddingVertical: 10,
    paddingLeft: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: '#1B4725',
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontSize: 18,
    color: '#1B4725',
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#f2f2f2',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#1B4725',
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingTop: 12,
    marginTop: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
    borderColor: '#c2c2c2',
    marginBottom: 50,
  },
  btn2: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingTop: 12,
    marginTop: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
    borderColor: '#c2c2c2',
    marginBottom: 50,
  },
  btnText: {
    color: '#c2c2c2',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnText2: {
    color: '#f2f2f2',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default FormFinca

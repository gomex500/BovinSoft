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
} from 'react-native'
import { ICordenadas } from '../interfaces/IFinca'
import { useFincaStore } from '../store/fincaStore'
import { useAuthStore } from '../store/authStore'

interface handle {
  text: string;
  index: number;
}

const FormFinca = () => {
  const { createFinca } = useFincaStore()
  const { user } = useAuthStore()
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [image, setImage] = useState('')
  const [recursos, setRecursos] = useState(['']) // Inicializa con un campo vacío

  const [direccion, setDireccion] = useState('')
  const [coordenadas, setCoordenadas] = useState<ICordenadas>({
    latitud: '',
    longitud: '',
  })
  const [tamano, setTamano] = useState('')

  const [loading, setLoading] = useState(false)

  const handleAddRecurso = () => {
    setRecursos([...recursos, '']) // Agrega un nuevo campo vacío
  }

  const handleRecursoChange = (text, index) => {
    const newRecursos = [...recursos]
    newRecursos[index] = text // Actualiza el recurso en el índice correspondiente
    setRecursos(newRecursos)
  }

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
      recursosN: recursos.filter((recurso) => recurso !== ''), // Filtra recursos vacíos
      idUsuario: user._id,
    }
    let result = await createFinca(data)

    setLoading(false)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ingresar Finca</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder={'Nombre Finca'}
      />
      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
        placeholder={'Direccion:'}
      />
      <TextInput
        style={styles.input}
        value={coordenadas.latitud as string}
        onChangeText={(text) => handleCoordenadasChange(text, 'latitud')}
        placeholder={'Latitud:'}
      />
      <TextInput
        style={styles.input}
        value={coordenadas.longitud as string}
        onChangeText={(text) => handleCoordenadasChange(text, 'longitud')}
        placeholder={'Longitud:'}
      />
      <TextInput
        style={styles.input}
        value={tamano}
        onChangeText={setTamano}
        placeholder={'Tamano:'}
      />

      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
        placeholder={'Descripcion:'}
      />

      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder={'Imagen URL:'}
      />
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder={'Tamano:'}
      />

      <Text style={styles.label}>Recursos Naturales:</Text>
      {recursos.map((recurso, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={recurso}
          onChangeText={(text) => handleRecursoChange(text, index)}
          placeholder={`Recurso ${index + 1}`}
        />
      ))}
      <TouchableOpacity style={styles.btn} onPress={handleAddRecurso}>
        <Text style={styles.btnText}>Agregar Recurso</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={styles.loandig} size={50} color="#1B4725" />
      ) : (
        <TouchableOpacity style={styles.btn2} onPress={handleSubmit}>
          <Text style={styles.btnText}>Enviar</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 5,
    marginTop: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1B4725',
    fontSize: 18,
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
    color: '#1B4725',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    height: 50,
    paddingTop: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
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
  },
  btnText: {
    color: '#1B4725',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default FormFinca

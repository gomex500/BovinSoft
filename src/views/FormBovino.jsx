import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { CustomSelect } from '../components/CustomSelect'
import { RadioButtonGroup } from '../components/RadioButtonGroup'

const FormBovino = () => {
  const [nombre, setNombre] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [imagen, setImagen] = useState('')
  const [raza, setRaza] = useState('')
  const [edad, setEdad] = useState(0)
  const [peso, setPeso] = useState(0)
  const [genero, setGenero] = useState('')
  const [tipo, setTipo] = useState('')
  const [estadoSalud, setEstadoSalud] = useState('')

  const tw = useTailwind()

  const razasDeGanado = [
    { label: 'Angus', value: '1' },
    { label: 'Hereford', value: '2' },
    { label: 'Charolais', value: '3' },
    { label: 'Simmental', value: '4' },
    { label: 'Limousin', value: '5' },
    { label: 'Holstein', value: '6' },
    { label: 'Jersey', value: '7' },
    { label: 'Guernsey', value: '8' },
    { label: 'Ayrshire', value: '9' },
    { label: 'Brahman', value: '10' },
    { label: 'Piedmontese', value: '11' },
    { label: 'Santa Gertrudis', value: '12' },
    { label: 'Shorthorn', value: '13' },
    { label: 'Devon', value: '14' },
    { label: 'Galloway', value: '15' },
    { label: 'Red Poll', value: '16' },
    { label: 'Carmelite', value: '17' },
    { label: 'Murray Grey', value: '18' },
    { label: 'Belted Galloway', value: '19' },
    { label: 'South Devon', value: '20' },
    { label: 'Salers', value: '21' },
    { label: 'Montbéliarde', value: '22' },
    { label: 'Lincoln Red', value: '23' },
    { label: 'Blonde d\'Aquitaine', value: '24' },
    { label: 'Wagyu', value: '25' },
    { label: 'Normande', value: '26' },
    { label: 'Simbrés', value: '27' },
    { label: 'Braford', value: '28' },
    { label: 'Pardo Suizo', value: '29' },
    { label: 'Parthenais', value: '30' },
    { label: 'British Blue', value: '31' },
    { label: 'Brown Swiss', value: '32' },
    { label: 'Senepol', value: '33' },
    { label: 'Dexter', value: '34' },
    { label: 'Zebu', value: '35' },
    { label: 'Sahiwal', value: '36' },
    { label: 'Chianina', value: '37' }
  ];
  
  const handleSubmit = () => {
    const data = {
      nombre,
      descripcion,
      image,
      recursosN: recursos.filter((recurso) => recurso !== ''), // Filtra recursos vacíos
    }
    console.log(data)
    // Aquí puedes enviar los datos a tu API o manejarlos como necesites
  }

  const generosGanado = [
    { label: 'Macho', value: '1G' },
    { label: 'Hembra', value: '2G' },
  ];

  const tipoDeGAnado = [
    { label: 'Carne', value: '1TG' },
    { label: 'Leche', value: '2TG' },
    { label: 'Mixto', value: '3TG' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ingresar Finca</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder={'Nombre ganado:'}
      />
      <TextInput
        style={styles.input}
        value={imagen}
        onChangeText={setImagen}
        placeholder={'Imagen URL:'}
      />
      <TextInput
        style={styles.input}
        value={raza}
        onChangeText={setRaza}
        placeholder={'raza :'}
      />
      <TextInput
        style={styles.input}
        value={edad}
        onChangeText={setEdad}
        placeholder={'edad :'}
        keyboardType="numeric"
        maxLength={2}
      />
      <SafeAreaView style={tw('flex-1 bg-gray-50')}>
          <CustomSelect
            options={razasDeGanado}
            selectedValue={raza}
            onSelect={setRaza}
            placeholder="Razas:"
          />
      </SafeAreaView>
      <SafeAreaView style={tw('flex-1 bg-gray-50')}>
      <RadioButtonGroup
        options={generosGanado}
        selectedValue={genero}
        onSelect={setGenero}
        orientation={"horizontal"}
        placeholder="Generos:"
      />
      </SafeAreaView>
      <SafeAreaView style={tw('flex-1 bg-gray-50')}>
          <CustomSelect
            options={tipoDeGAnado}
            selectedValue={tipo}
            onSelect={setTipo}
            placeholder="Tipo de Ganado:"
          />
      </SafeAreaView>
      <TextInput
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
        placeholder={'peso :'}
        keyboardType="numeric"
        maxLength={2}
      />
      <TextInput
        style={styles.input}
        value={genero}
        onChangeText={setGenero}
        placeholder={'genero :'}
        keyboardType="text"
      />
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder={'tipo :'}
        keyboardType="text"
      />
      <TextInput
        style={styles.input}
        value={estadoSalud}
        onChangeText={setEstadoSalud}
        placeholder={'estado de salud :'}
      />

      <TouchableOpacity style={styles.btn2} onPress={() => {}}>
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>
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
    marginBottom: 50,
  },
  btnText: {
    color: '#1B4725',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default FormBovino

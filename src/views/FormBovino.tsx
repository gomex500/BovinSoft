import React, { useEffect, useState } from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  View,
  Image,
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { CustomSelect } from '../components/CustomSelect'
import { RadioButtonGroup } from '../components/RadioButtonGroup'
import { IOptions } from '../interfaces/IGen'
import { useFincaStore } from '../store/fincaStore'
import { FincaModel } from '../interfaces/IFinca'
import { useBovinosStore } from '../store/useBovinoStore'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../interfaces/navigationTypes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CustomInput } from '../components/CustomInput'
import { Feather, FontAwesome6, Entypo } from '@expo/vector-icons'
import { useAuthStore } from '../store/authStore'
import { BollGroup } from '../components/BollGroup'
import DatePickerExample from '../components/DataPicker'
import moment from 'moment'
import { BovinoModel } from '../interfaces/IBovino'
import { calcularDiferenciaDeTiempo } from '../helpers/gen'

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

const FormBovino = () => {
  const [nombre, setNombre] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [image, setImagen] = useState('')
  const [raza, setRaza] = useState('')
  const [edad, setEdad] = useState('')
  const [peso, setPeso] = useState('')
  const [genero, setGenero] = useState('')
  const [tipo, setTipo] = useState('')
  const [estadoSalud, setEstadoSalud] = useState('')
  const [loading, setLoading] = useState(false)
  const [fincaId, setFinca] = useState('')

  const navigate = useNavigation<NavigationProps>()

  const { obtenerFincaPorUsuario, fincas, fincaSelected } = useFincaStore()
  const { crearGanado } = useBovinosStore()
  const { user } = useAuthStore()
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      await obtenerFincaPorUsuario()
    }

    fetchData()
  }, [])

  let disabledButton =
    nombre === '' ||
    image === '' ||
    raza === '' ||
    peso === '' ||
    genero === '' ||
    tipo === '' ||
    estadoSalud === ''

  const tw = useTailwind()

  const razasDeGanado: IOptions[] = [
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
    { label: "Blonde d'Aquitaine", value: '24' },
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
    { label: 'Chianina', value: '37' },
  ]

  const tiempoTranscurrido = (fecha) => {
    return moment(fecha).fromNow()
  }

  const handleSubmit = async () => {
    setLoading(true)
    const data:BovinoModel = {
      nombre,
      image,
      raza: (razasDeGanado.find((item) => item.value === raza) as IOptions)
        .label,
      edad: calcularDiferenciaDeTiempo(date),
      fechaNacimiento: date,
      peso,
      genero: (generosGanado.find((item) => item.value === genero) as IOptions)
        .label,
      tipo: (tipoDeGanado.find((item) => item.value === tipo) as IOptions)
        .label,
      estadoSalud: (
        estadoSaludGanado.find((item) => item.value === estadoSalud) as IOptions
      ).label,
      fincaId,
    }
    let result = await crearGanado(data)
    setLoading(false)
    navigate.navigate('Bovinos', {})
  }

  const generosGanado = [
    { label: 'Macho', value: '1G' },
    { label: 'Hembra', value: '2G' },
  ]

  const tipoDeGanado = [
    { label: 'Carne', value: '1TG' },
    { label: 'Leche', value: '2TG' },
    { label: 'Mixto', value: '3TG' },
  ]

  const estadoSaludGanado = [
    { label: 'Saludable', value: 'saludable' },
    { label: 'Enfermo', value: 'enfermo' },
    { label: 'En tratamiento', value: 'en_tratamiento' },
    { label: 'En cuarentena', value: 'en_cuarentena' },
    { label: 'Lesionado', value: 'lesionado' },
    { label: 'Recuperado', value: 'recuperado' },
    { label: 'En observación', value: 'en_observacion' },
  ]

  const [boll, setBoll] = useState({
    colo1: '#1B4725',
    colo2: '#c2c2c2',
  })

  const handleBoll = () => {
    setBoll({
      colo1: boll.colo2,
      colo2: boll.colo1,
    })
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.contHeader}>
        <Image
          source={require('../../assets/img/splashLogo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Ingresar Ganado</Text>
      </View>
      <View style={[styles.container, tw('h-lvh')]}>
        <View>
          {boll.colo1 === '#1B4725' ? (
            <>
            <View style={[styles.inputContainer, {marginTop: 0}]}>
                <DatePickerExample date={date} setDate={setDate} />
              </View>
              <CustomInput
                placeholder="Nombre :"
                value={nombre}
                onChangeText={setNombre}
                icon={
                  <FontAwesome6
                    name="cow"
                    size={20}
                    color="#1B4725"
                    style={styles.icon}
                  />
                }
              />
              <CustomInput
                placeholder="Imagen :"
                value={image}
                onChangeText={setImagen}
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
                placeholder="Peso :"
                value={peso}
                onChangeText={setPeso}
                icon={
                  <FontAwesome6
                    name="scale-balanced"
                    size={20}
                    color="#1B4725"
                    style={styles.icon}
                  />
                }
              />
              <SafeAreaView style={tw('flex-1 bg-gray-50')}>
                <RadioButtonGroup
                  options={generosGanado}
                  selectedValue={genero}
                  onSelect={setGenero}
                />
              </SafeAreaView>
              <View style={{ opacity: 0 }}>
                <Text>Generos:</Text>
              </View>
            </>
          ) : (
            <>
              <SafeAreaView style={tw('flex-1 bg-gray-50')}>
                <CustomSelect
                  placeholder="Seleccione una finca"
                  options={
                    user.rol === 'ADMIN'
                      ? [
                          {
                            label: fincaSelected.nombre,
                            value: fincaSelected._id,
                          },
                        ]
                      : fincas && fincas.length > 0
                      ? fincas.map((finca) => ({
                          label: finca.nombre,
                          value: finca._id as string,
                        }))
                      : []
                  }
                  selectedValue={
                    user.rol === 'ADMIN'
                      ? (fincaSelected._id as string)
                      : fincaId
                  }
                  onValueChange={setFinca}
                  disabled={user.rol === 'ADMIN'}
                />
              </SafeAreaView>
              <SafeAreaView style={tw('flex-1 bg-gray-50')}>
                <CustomSelect
                  options={razasDeGanado}
                  selectedValue={raza}
                  onValueChange={setRaza}
                  placeholder="Selecciona una raza"
                />
              </SafeAreaView>
              <SafeAreaView style={tw('flex-1 bg-gray-50')}>
                <CustomSelect
                  options={tipoDeGanado}
                  selectedValue={tipo}
                  onValueChange={setTipo}
                  placeholder="Selecciona un tipo de ganado"
                />
              </SafeAreaView>
              <SafeAreaView style={tw('flex-1 bg-gray-50')}>
                <CustomSelect
                  options={estadoSaludGanado}
                  selectedValue={estadoSalud}
                  onValueChange={setEstadoSalud}
                  placeholder="Selecciona un estado de salud"
                />
              </SafeAreaView>
              <View style={{ opacity: 0 }}>
                <Text>Generos:</Text>
                <Text>Generos:</Text>
                <Text>Generos:</Text>
              </View>
            </>
          )}
        </View>
        <View>
          <BollGroup boll={boll} setBoll={setBoll} />
          {loading ? (
            <ActivityIndicator
              style={styles.loandig}
              size={50}
              color="#1B4725"
            />
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
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#fff',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
    position: 'relative',
},
  icon: {
    marginRight: 8,
  },
  logo: {
    width: 300,
    height: 95,
    marginTop: 50,
  },
  label: {
    marginBottom: 5,
    marginTop: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1B4725',
    fontSize: 18,
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
  loandig: {
    paddingTop: 12,
    marginTop: 20,
    elevation: 3,
    height: 50,
    marginBottom: 50,
  },
  bollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  boll1: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight: 10,
  },
  boll2: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
})

export default FormBovino

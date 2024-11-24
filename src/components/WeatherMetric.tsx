import { useEffect, useState } from 'react'
import {
  formatOpenMeteoForMetric,
  getWeatherCondition,
  openMeteoIntance,
} from '../helpers/openMeteo'
import LineChartWithSyncScroll from './LineChartWithSyncScroll '
import { CustomSelect } from './CustomSelect'
import { useFincaStore } from '../store/fincaStore'
import { IOptions } from '../interfaces/IGen'
import { FincaModel, ICordenadas } from '../interfaces/IFinca'
import { parse } from 'react-native-svg'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/navigationTypes'
import { CustomInput } from './CustomInput'
import { FontAwesome, Fontisto } from '@expo/vector-icons'

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

interface WeatherMetricProps {
  fincas: FincaModel[]
}

export const WeatherMetric = ({ fincas }: WeatherMetricProps) => {
  const [clima, setClima] = useState(null)
  const [forecastDays, setForecastDays] = useState('7')
  const [fincaId, setFincaId] = useState('')
  const [coordenadas, setCoordenadas] = useState<ICordenadas>({
    latitud: '',
    longitud: '',
  })
  const tw = useTailwind()
  const [forecastDaysBlur, setForecastDaysBlur] = useState('7')
  const navigation = useNavigation<NavigationProps>();

  const [watherCodeShow, setWatherCodeShow] = useState([])

  function removeDuplicates(arr) {
    return [...new Set(arr)];
}

  useEffect(() => {
    const fetchData = async () => {
      let dataMeteo = {
        latitude: coordenadas.latitud as number,
        longitude: coordenadas.longitud as number,
        forecast_days: parseInt(forecastDaysBlur),
      }

      const weatherData = await openMeteoIntance(dataMeteo)
      const { labels, weatherCode } = formatOpenMeteoForMetric(weatherData)
      console.log(weatherCode)
      
      setWatherCodeShow(removeDuplicates(weatherCode))
      let data = {
        labels: labels,
        datasets: [
          {
            data: weatherCode,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color de la línea
            strokeWidth: 2, // Ancho de la línea
          },
        ],
      }
      setClima(data)
    }
    if (coordenadas.latitud && coordenadas.longitud && forecastDays && fincas.length > 0) {
      fetchData()
    }
  }, [coordenadas, forecastDaysBlur])

  const handleForecastDaysBlur = () => {
    setForecastDaysBlur(forecastDays)
  }

  const handleCoordenadasChange = (fincaId: string) => {
    const fincaSelected = fincas.find((item) => item._id === fincaId)

    const newCoordenadas: ICordenadas = {
      latitud: parseFloat(fincaSelected.coordenadas.latitud as string),
      longitud: parseFloat(fincaSelected.coordenadas.longitud as string),
    }

    setFincaId(fincaId)
    setCoordenadas(newCoordenadas)
  }

  const handleForecastDaysChange = (value:string) => {

    if (value.includes('-')) return;

    const maxDays = 16; // Número máximo permitido
    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue) && numericValue <= maxDays) {
      setForecastDays(value);
    } else if (value === '') {
      // Permitir limpiar el campo
      setForecastDays('');
    }
  }

  const handleDataPointClick = (data) => {
    // data incluye información como el índice y valor del punto
    const { index, value } = data
    const farm = fincas.find((item) => item._id === fincaId).nombre
    let day = clima.labels[index]
    let weather = getWeatherCondition(value)
    
   navigation.navigate('RecommendedActivities', { newsItem: { day, weather, farm } })
  }

  return (
    <View style={[tw('flex flex-col w-full items-center')]}>
      <Text style={styles.title}>Gráfico de Clima</Text>
      <View style={[tw('flex flex-row w-11/12 justify-between bg-black'), { width: '100%'}]}>
        <CustomSelect
          options={fincas.map((item) => ({
            label: item.nombre,
            value: item._id,
          }))}
          placeholder='Selecciona una finca'
          selectedValue={fincaId}
          onValueChange={handleCoordenadasChange}
        />
        <View style={{ width: '30%'}}>
        <CustomInput
              placeholder="Días :"
              value={forecastDays}
              onChangeText={handleForecastDaysChange}
              onBlur={handleForecastDaysBlur}
              icon={
                <Fontisto
                  name="day-cloudy"
                  size={20}
                  color="#1B4725"
                  style={styles.icon}
                />
              }
            />
        </View>
      </View>
      {clima && (
        <LineChartWithSyncScroll
          data={clima}
          handleDataPointClick={handleDataPointClick}
        />
      )}
      <Text style={styles.title}>Datos de Clima</Text>
      <View style={tw('flex-col w-full items-start pl-2')}>
      {
        watherCodeShow.map((item, index) => (
          <Text key={index} style={styles.info}> {item} - {getWeatherCondition(item)}</Text>
        ))
      }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 10,
    color: '#1B4725',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 60,
    paddingVertical: 10,
    paddingLeft: 10,
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
  contData: {
    elevation: 5,
    padding: 10,
    borderRadius: 5,
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B4725',
  },
  icon: {
    marginRight: 8,
  },
})

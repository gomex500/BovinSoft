import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { WeatherMetric } from '../components/WeatherMetric'
import { useAuthStore } from '../store/authStore'
import { LoadingScreen } from '../components/LoadingStream'
import { useFincaStore } from '../store/fincaStore'
import { LivestockClassificationMetric } from '../components/LivestockClassificationMetric'

const Metricas = () => {
  const { user } = useAuthStore()
  const { obtenerFincaPorUsuario, fincas } = useFincaStore()

  useEffect(() => {
    const fetchData = async () => {
      await obtenerFincaPorUsuario()
    }

    fetchData()
  }, [])

  const data2 = [
    {
      name: 'Comida',
      population: 215,
      color: '#1E2923', // Color de la paleta anterior
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Transporte',
      population: 130,
      color: '#375746', // Color de la paleta anterior
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Entretenimiento',
      population: 90,
      color: '#4B7B62', // Color de la paleta anterior
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Otros',
      population: 50,
      color: '#5B9778', // Color de la paleta anterior
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ]

  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color de la línea
        strokeWidth: 2, // Ancho de la línea
      },
    ],
  }

  const data3 = {
    labels: ['Comida', 'Transporte', 'Entretenimiento', 'Otros'],
    datasets: [
      {
        data: [215, 130, 90, 50],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color de las barras
        strokeWidth: 2, // Ancho de la línea
      },
    ],
  }

  if (user === null || !fincas) {
    return <LoadingScreen />
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Gráficos</Text>
        { user?.rol !== "WORKER" && <WeatherMetric fincas={fincas} />}
        <LivestockClassificationMetric fincas={fincas} />
        <View style={styles.contChart}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>
            Gráfico de Pastel
          </Text>
          <PieChart
            data={data2}
            width={320} // Ancho del gráfico
            height={220} // Altura del gráfico
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population" // Propiedad que se usará para calcular el tamaño de las secciones
            backgroundColor="transparent"
            paddingLeft="15"
            absolute // Si se establece en true, el gráfico mostrará valores absolutos
          />
        </View>
        <View style={styles.contChart}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>
            Gráfico de Barras
          </Text>
          <BarChart
            data={data3}
            yAxisLabel="$"
            yAxisSuffix="K"
            width={320} // Ancho del gráfico
            height={220} // Altura del gráfico
            chartConfig={{
              backgroundColor: '#1E2923',
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              decimalPlaces: 2, // Cantidad de decimales
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 12,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  containerClasificacion: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  titleClasificacion: {
    fontSize: 21,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 10,
    color: '#1B4725',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contChart: {
    alignItems: 'center',
    marginVertical: 20,
  },
  conttainerCHair: {
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 40,
    color: '#1B4725',
    fontWeight: 'bold',
  },
})

export default Metricas

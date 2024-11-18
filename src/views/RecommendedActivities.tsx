import { RouteProp, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { getMonicaResponse } from '../helpers/getGeminiIA'
import { useTailwind } from 'tailwind-rn'
import { CustomMarkdown } from '../components/customMarkdown'
import { LoadingScreen } from '../../App'

interface newItem {
  day: string
  weather: string
  farm: string
}

interface RecommendedActivitiesRouteParams {
  newsItem: newItem
}

export const RecommendedActivities = () => {
  const route =
    useRoute<
      RouteProp<
        Record<string, RecommendedActivitiesRouteParams>,
        'RecommendedActivities'
      >
    >()
  const newsItem = route.params?.newsItem

  const tw = useTailwind()
  const [recomendaciones, setRecomendaciones] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMonicaResponse(newsItem.weather)
      setRecomendaciones(data)
      setLoading(false)
    }
    newsItem && fetchData()
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container} // Estilo para el contenido interno
      showsVerticalScrollIndicator={false} // Opcional: Oculta el indicador de scroll
    >
      <View>
        <Text style={styles.title}>
          Recomendaciones
        </Text>
        <Text style={styles.subTitle}>
          Día {newsItem.day}
        </Text>
        <View style={tw('flex flex-row w-11/12 items-center')}>
          <Text style={styles.info}> Clima: </Text>
          <Text style={styles.contData}>{newsItem.weather}</Text>
        </View>
        <View style={tw('flex flex-row w-11/12 items-center')}>
          <Text style={styles.info}> Finca: </Text>
          <Text style={styles.contData}>{newsItem.farm}</Text>
        </View>
        {
          loading ? (<LoadingScreen />) : (
            <CustomMarkdown markdownContent={recomendaciones} />
          )
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  btnGanado: {
    backgroundColor: '#1B4725',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  contData: {
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginLeft: 5,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1B4725',
  },

  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  title: {
    fontSize: 21,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    color: '#1B4725',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 21,
    marginLeft: 5,
    marginBottom: 10,
    color: '#1B4725',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  par: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 5,
    color: '#000',
  },
  caratT: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 5,
    color: '#1B4725',
    fontWeight: 'bold',
  },
  carat: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 5,
    color: '#f9f9f9',
  },
})

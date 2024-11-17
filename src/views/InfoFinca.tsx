import React, { useState } from 'react'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { FincaModel } from '../interfaces/IFinca'
import { useTailwind } from 'tailwind-rn'
import { useFincaStore } from '../store/fincaStore'

interface InfoFincaRouteParams {
  newsItem: FincaModel;
}

type RootStackParamList = {
  Bovinsoft: undefined; // O el tipo correspondiente si tiene parámetros
  BovinosHome: { newsItem: { from: string; id: string } }; // Define el tipo para BovinosHome
};

const InfoFinca = ({ navigation }) => {

  const { setFincaId } = useFincaStore();
  
  const route = useRoute<RouteProp<Record<string, InfoFincaRouteParams>, 'InfoFinca'>>();
  const newsItem = route.params?.newsItem
  const tw = useTailwind()

  const [origin, setOrigin] = useState({
    latitude: parseFloat(newsItem.coordenadas.latitud as string),
    longitude: parseFloat(newsItem.coordenadas.longitud as string),
  })

  const gestionarGanado = async () => {
    setFincaId(newsItem);
    navigation.navigate('Bovinos');
  };

  const [recursosN, setRecursosN] = useState(newsItem.recursosN)

  return (
    <ScrollView
      contentContainerStyle={styles.container} // Estilo para el contenido interno
      showsVerticalScrollIndicator={false} // Opcional: Oculta el indicador de scroll
    >
      <View>
        <Text style={styles.title}>{newsItem.nombre}</Text>
        <Image
          source={{ uri: newsItem.image }}
          style={{ width: '100%', height: 200, borderRadius: 8 }}
        />
        <TouchableOpacity 
              style={styles.btnGanado}
              onPress={gestionarGanado}
          >
              <Text style={styles.btnText}>Gestionar Ganado</Text>
          </TouchableOpacity>
        <Text style={[ tw('mt-4') ,styles.info]}>Descripción:</Text>
        <View style={styles.contData}>
          <Text>
            {newsItem.descripcion}
          </Text>
        </View>
        <Text style={styles.info}>Dirección:</Text>
        <View style={styles.contData}>
          <Text>
            {newsItem.direccion}
          </Text>
        </View>
        <Text style={styles.info}>Tamaño:</Text>
        <View style={styles.contData}>
          <Text>
            {newsItem.tamano} Hectarias
          </Text>
        </View>
        <Text style={styles.info}>Recursos Naturales</Text>
        {recursosN.map((item, index) => (
          <View style={styles.contData} key={index}>
            <Text>
              ~ {item}
            </Text>
          </View>
        ))}
        <Text style={styles.caratT}>Ubicacion:</Text>
        <View>
          <MapView
            provider={PROVIDER_GOOGLE} // Usa Google Maps
            style={styles.map}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={origin} title="Mi Marcador" />
          </MapView>
        </View>
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
  btnGanado:{
    backgroundColor: '#1B4725',
    borderRadius: 10,
    padding: 15,
    marginTop:20,
  },
  btnText:{
    textAlign:'center',
    color:'#fff',
    fontSize:18
  },
  contData: {
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
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

export default InfoFinca

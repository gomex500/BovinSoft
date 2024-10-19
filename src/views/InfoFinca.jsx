import React,{useState} from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const InfoFinca = () => {

    const route = useRoute();
    const newsItem = route.params?.newsItem;

    const [origin, setOrigin] = useState({
        latitude: parseFloat(newsItem.coordenadas.latitud),
        longitude: parseFloat(newsItem.coordenadas.longitud)
      });
  
      const [recursosN, setRecursosN] = useState(newsItem.recursosN);

    return (
        <View style={styles.container}>
        <View style={styles.card}>
            <Image source={{ uri: newsItem.image }} style={{ width: '100%', height: 200, borderRadius: 8 }} />
            <Text style={styles.title}>{newsItem.nombre}</Text>
            <Text style={styles.caratT}>Descripcion:</Text>
            <Text style={styles.par}>{newsItem.descripcion}</Text>
            <Text style={styles.caratT}>Direccion:</Text>
            <Text style={styles.par}>{newsItem.direccion}</Text>
            <Text style={styles.caratT}>Tamano:</Text>
            <Text style={styles.par}>{newsItem.tamano} Hectarias</Text>
            <Text style={styles.caratT}>Recursos Naturales</Text>
            {recursosN.map((item, index) => (
            <Text style={styles.recursos} key={index}>~ {item}</Text>
            ))}
            <Text style={styles.caratT}>Ubicacion:</Text>
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE} // Usa Google Maps
                    style={styles.map}
                    initialRegion={{
                        latitude: parseFloat(newsItem.coordenadas.latitud),
                        longitude: parseFloat(newsItem.coordenadas.longitud),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                   <Marker coordinate={origin} title="Mi Marcador" />
                </MapView>
            </View>
        </View>
    </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal:20
    },
    map: {
      width: '100%',
      height: 200,
      marginTop: 10
    },
    title:{
      fontSize: 21,
      marginTop:5,
      marginLeft:5,
      color: '#1B4725',
      fontWeight:'bold'
    },
    par:{
      fontSize: 16,
      marginTop:10,
      marginLeft:5,
      color: '#000',
    },
    caratT:{
      fontSize: 18,
      marginTop:10,
      marginLeft:5,
      color: '#1B4725',
      fontWeight:'bold'
    },
    carat:{
      fontSize: 16,
      marginTop:10,
      marginLeft:5,
      color: '#f9f9f9',
    }
  });
  

export default InfoFinca;
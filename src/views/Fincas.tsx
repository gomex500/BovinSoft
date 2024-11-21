import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, FlatList, Animated } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useFincaStore } from '../store/fincaStore';
import { useTailwind } from 'tailwind-rn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { FincaModel } from '../interfaces/IFinca';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
const Fincas = () => {

  const navigation = useNavigation<NavigationProps>();
  const { setFincaId } = useFincaStore();

    const { fincas, obtenerFincaPorUsuario } = useFincaStore();
    const [animationValue] = useState(new Animated.Value(0));
    const tw = useTailwind()

    useEffect(() => {
        const fetchData = async () => {
            await obtenerFincaPorUsuario();
        }
        fetchData();

        Animated.timing(animationValue, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
        }).start();
    }, []);

    const goForm = () =>{
        navigation.navigate('FormFinca', {});
    }

    const goInfoFinca = (finca:FincaModel) => {
        setFincaId(finca);
        navigation.navigate('InfoFinca', {});
    }

    return (
      <Animated.View style={[styles.contentContainer, { opacity: animationValue }]}>
          <View style={styles.contenedorFiltro}>
              <View style={styles.contenedorInpunt}>
                  <TextInput placeholder='Buscar finca...' style={styles.input} />
                  <TouchableOpacity style={styles.boton}>
                      <Entypo name="magnifying-glass" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                      style={[styles.boton, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]}
                      onPress={goForm}
                  >
                      <Entypo name="plus" size={24} color="white" />
                  </TouchableOpacity>
              </View>
          </View>

          <FlatList
              data={fincas}
              style={[tw('h-3/5') ,{ padding: 5 }]}
              renderItem={({ item }) => (
                  <TouchableOpacity
                      style={styles.contenedorCard}
                      onPress={() => goInfoFinca(item)}
                  >
                      <View style={styles.card}>
                          <Image 
                              source={require('../../assets/Finca.jpg')}
                              style={{ width: '100%', height: 200 }}
                          />
                          <View style={styles.contTexto}>
                              <Text style={styles.titulo}>{item.nombre}</Text>
                              <Text style={styles.descripcion}>{item.descripcion}</Text>
                          </View>
                      </View>
                  </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id as string} // Asegúrate de que 'id' sea único
          />
      </Animated.View>
  );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 24,
        backgroundColor: '#fff',
    },
    contenedorFiltro: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    contenedorInpunt: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:5
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
    contenedorCard: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    card: {
        width: 300,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        overflow: 'hidden',
    },
    contenedorImagen: {
        width: '100%',
        height: 150,
    },
    imagen: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contenedorTexto: {
        padding: 10,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color:'#252525'
    },
    descripcion: {
        fontSize: 14,
        color: '#000',
    },
    contTexto:{
        paddingHorizontal:10,
        paddingVertical:5
    }
});

export default Fincas;

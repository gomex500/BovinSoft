import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image, FlatList, Animated } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { GlobalContext } from '../Context/GlobalContext';
import FormFinca from './FormFinca';


const Fincas = ({navigation}) => {

    const {finca} = useContext(GlobalContext);
    const [animationValue] = useState(new Animated.Value(0));
    const [ingresar, setIngresar] = useState(false);
    // console.log(finca[0].nombre);

    // Animación de la opacidad
    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
        }).start();
    }, []);

    const ingresarD = () =>{
        setIngresar(!ingresar);
    }

    if (ingresar == true) {
        return <FormFinca/>
    } else {
        return (
            <Animated.View contentContainerStyle={[styles.contentContainer, { opacity: animationValue }]}>
                <View style={styles.contenedorFiltro}>
                    <View style={styles.contenedorInpunt}>
                        <TextInput placeholder='Buscar finca...' style={styles.input} />
                        <TouchableOpacity style={styles.boton}>
                            <Entypo name="magnifying-glass" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.boton, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]}
                            onPress={ingresarD}
                        >
                            <Entypo name="plus" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
    
                <FlatList
                    data={finca}
                    style={{ padding: 5 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.contenedorCard}
                            onPress={() => navigation.navigate('InfoFinca', { newsItem: item })}
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
                    keyExtractor={(item) => item.id} // Asegúrate de que 'id' sea único
                />
            </Animated.View>
        );
    }
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        padding: 16,
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

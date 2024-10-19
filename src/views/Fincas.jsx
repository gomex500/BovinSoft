import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { GlobalContext } from '../Context/GlobalContext';

const Fincas = () => {

    const {user} = useContext(GlobalContext);
    console.log(user)
    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.contenedorFiltro}>
                <View style={styles.contenedorInpunt}>
                    <TextInput placeholder='Buscar finca...' style={styles.input} />
                    <TouchableOpacity style={styles.boton}>
                        <Entypo name="magnifying-glass" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.boton, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]}>
                        <Entypo name="plus" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Varias tarjetas */}
            <CardComponente />
            <CardComponente />
            <CardComponente />
            <CardComponente />
            <CardComponente />
        </ScrollView>
    );
};

const CardComponente = () => {

   
  
    
    return (
        <View style={styles.contenedorCard}>
            <View style={styles.card}>
                <View style={styles.contenedorImagen}>
                    <Image source={require('../../assets/Finca.jpg')} style={styles.imagen} />
                </View>
                <View style={styles.contenedorTexto}>
                    <View>
                        <Text style={[styles.titulo,{color:'white'}]}>Nombre</Text>
                    </View>
                    <View>
                        <Text style={[styles.descripcion,{color:'white'}]}>
                            Hermosa finca ubicada 
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
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
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#C2C2C2',
        width: '70%',
        padding: 12,
        borderRadius: 8,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth:4,
        borderColor:'#1B4725'
    },
    boton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B4725',
        height: 56,
        width: 56,
    },
    contenedorCard: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    card: {
        width: 300,
        backgroundColor: '#1B4725',
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
    },
    descripcion: {
        fontSize: 14,
        color: '#777',
    },
});

export default Fincas;

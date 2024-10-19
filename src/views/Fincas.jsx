import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { GlobalContext } from '../Context/GlobalContext';

const Fincas = () => {
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

    const {finca} = useContext(GlobalContext);
    console.log(finca[0].nombre);
  
    
    return (
        <View style={styles.contenedorCard}>
            <View style={styles.card}>
                <View style={styles.contenedorImagen}>
                    <Image source={require('../../assets/Finca.jpg')} style={styles.imagen} />
                </View>
                <View style={styles.contenedorTexto}>
                    <View>
                        <Text style={styles.titulo}>{finca[0].nombre}</Text>
                    </View>
                    <View>
                        <Text style={styles.descripcion}>
                            {finca[0].descripcion}
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
});

export default Fincas;

import { Entypo } from '@expo/vector-icons';
import React, {useContext} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { GlobalContext } from '../Context/GlobalContext';

const data = [
    { id: '1', code: '001', image: require('../../assets/Finca.jpg') },
    { id: '2', code: '002', image: require('../../assets/Finca.jpg') },
    { id: '3', code: '003', image: require('../../assets/Finca.jpg') },
    { id: '4', code: '004', image: require('../../assets/Finca.jpg') },
    { id: '4', code: '004', image: require('../../assets/Finca.jpg') },
    { id: '4', code: '004', image: require('../../assets/Finca.jpg') },
    { id: '4', code: '004', image: require('../../assets/Finca.jpg') },
];

const Bovinos = ({navigation}) => {

    const {vacas} = useContext(GlobalContext);
    console.log(vacas);

    return (
        <View style={styles.container}>
            <View style={styles.contenedorFiltro}>
                <View style={styles.contenedorInpunt}>
                    <TextInput placeholder='Buscar Ganado...' style={styles.input} />
                    <TouchableOpacity style={styles.boton}>
                        <Entypo name="magnifying-glass" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.boton, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]}>
                        <Entypo name="plus" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* tarjetas de los animales */}
            <View style={styles.conBvi}>
                <FlatList
                    data={vacas}
                    renderItem={({item}) =>(
                        <TouchableOpacity
                            style={styles.contenedorCard}
                            onPress={() => navigation.navigate('InfoBovino', { newsItem: item })}
                        >
                            <View style={styles.card}>
                                <Image 
                                    source={{ uri: item.image }}
                                    style={styles.imagen}
                                />
                                <View style={styles.contTexto}>
                                    <Text style={styles.codigo}>{item.codigo}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={3} // Cambia este valor para ajustar el número de columnas
                    columnWrapperStyle={styles.row} // Estilo para las filas
                />
            </View>
        </View>
    );
}

const CardComponente = ({ item }) => {
    return (
        <View style={styles.card}>
            <Image source={item.image} style={styles.imagen} />
            <Text style={styles.codigo}>{item.code}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contenedorFiltro: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    contenedorInpunt: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:20
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
    flatListContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        width: 100, 
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginBottom:20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        overflow: 'hidden',
    },
    imagen: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 5, 
    },
    codigo: {
        marginTop: 10,
        color: '#1B4725',
        fontWeight: 'bold',
        fontSize:12
    },
    conBvi:{
        alignContent:'center',
        alignItems:'center',
        width:'98%',
        marginTop:20
    }
});

export default Bovinos;

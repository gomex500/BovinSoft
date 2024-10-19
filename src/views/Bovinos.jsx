import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';

const data = [
    { id: '1', code: '001', image: require('../../assets/Finca.jpg') },
    { id: '2', code: '002', image: require('../../assets/Finca.jpg') },
    { id: '3', code: '003', image: require('../../assets/Finca.jpg') },
    { id: '4', code: '004', image: require('../../assets/Finca.jpg') },
];

const Bovinos = () => {
    return (
        <ScrollView style={styles.container}>
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

            {/* tarjetas de los animales */}
            <View style={styles.conBvi}>
            <FlatList
                data={data}
                renderItem={({ item }) => <CardComponente item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
            />
             <FlatList
                data={data}
                renderItem={({ item }) => <CardComponente item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
            />
             <FlatList
                data={data}
                renderItem={({ item }) => <CardComponente item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
            />
             <FlatList
                data={data}
                renderItem={({ item }) => <CardComponente item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
            />
             <FlatList
                data={data}
                renderItem={({ item }) => <CardComponente item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
            />
            </View>
        </ScrollView>
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
        width: 80, 
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        overflow: 'hidden',
    },
    imagen: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30, 
    },
    codigo: {
        marginTop: 10,
        color: '#252525',
        fontWeight: 'bold',
    },
    conBvi:{
        alignContent:'center',
        alignItems:'center',
        width:'98%'
    }
});

export default Bovinos;

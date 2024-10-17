import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';

const data = [
    { id: '1', code: '001', image: require('../../assets/Finca.jpg') },
    { id: '2', code: '002', image: require('../../assets/Finca.jpg') },
    { id: '3', code: '003', image: require('../../assets/Finca.jpg') },
    { id: '4', code: '004', image: require('../../assets/Finca.jpg') },
    { id: '5', code: '005', image: require('../../assets/Finca.jpg') },
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
        borderBottomWidth: 4,
        borderColor: '#1B4725',
    },
    boton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B4725',
        height: 56,
        width: 56,
    },
    flatListContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    card: {
        backgroundColor: '#1B4725',
        borderRadius: 8,
        width: 80, 
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    imagen: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30, 
    },
    codigo: {
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Bovinos;

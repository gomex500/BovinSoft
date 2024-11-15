import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

const FormBovino = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [image, setImage] = useState('');
    const [direccion, setDireccion] = useState('');
    const [recursos, setRecursos] = useState(['']);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [finca, setFinca] = useState({
        nombre : nombre,
        image : image,
        direccion : direccion
    });

    const [coordenadas, setCoordenadas] = useState({
        latitud : '',
        longitud : ''
    })

    const handleAddRecurso = () => {
        setRecursos([...recursos, '']); // Agrega un nuevo campo vacío
    };

    const handleRecursoChange = (text, index) => {
        const newRecursos = [...recursos];
        newRecursos[index] = text; // Actualiza el recurso en el índice correspondiente
        setRecursos(newRecursos);
    };

    const handleSubmit = () => {
        const data = {
            nombre,
            descripcion,
            image,
            recursosN: recursos.filter(recurso => recurso !== ''), // Filtra recursos vacíos
        };
        console.log(data);
        // Aquí puedes enviar los datos a tu API o manejarlos como necesites
    };

    let text = 'Esperando ubicación...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Ingresar Finca</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder={'Nombre Finca'}
            />
            <TextInput
                style={styles.input}
                value={direccion}
                onChangeText={setDireccion}
                placeholder={'Direccion:'}
            />
            <TouchableOpacity 
                style={styles.btn}
                onPress={async () => {
                    // Solicitar permisos de ubicación
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        setErrorMsg('Permiso de ubicación denegado');
                        return;
                    }
                    let location1 = await Location.getCurrentPositionAsync({});
                    setLocation(location1);
                  }}
                
                >
                <Text style={styles.btnText}>Agregar Ubicacion</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
                numberOfLines={4}
                placeholder={'Descripcion:'}
            />

            <TextInput
                style={styles.input}
                value={image}
                onChangeText={setImage}
                placeholder={'Imagen URL:'}
            />
            <TextInput
                style={styles.input}
                value={image}
                onChangeText={setImage}
                placeholder={'Tamano en Hectareas:'}
            />

            <Text style={styles.label}>Recursos Naturales:</Text>
            {recursos.map((recurso, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    value={recurso}
                    onChangeText={(text) => handleRecursoChange(text, index)}
                    placeholder={`Recurso ${index + 1}`}
                />
            ))}
            <TouchableOpacity 
                style={styles.btn}
                onPress={handleAddRecurso}
                >
                <Text style={styles.btnText}>Agregar Recurso</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.btn2}
                onPress={handleAddRecurso}
                >
                <Text style={styles.btnText}>Enviar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        marginBottom: 5,
        marginTop:30,
        fontWeight: 'bold',
        textAlign:'center',
        color:'#1B4725',
        fontSize:18
    },
    input: {
        width: '100%',
        height: 50,
        paddingVertical: 10,
        paddingLeft: 10,
        marginTop: 20,
        borderRadius: 8,
        borderColor: '#1B4725',
        borderWidth: 2,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        fontSize: 18,
        color: '#1B4725',
        fontWeight: 'bold',
    },
    title:{
        textAlign:'center',
        fontSize:25,
        color:'#1B4725',
        fontWeight:'bold'
    },
    btn: {
        backgroundColor: '#f2f2f2',
        width: '100%',
        height: 50,
        paddingTop: 12,
        marginTop:10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        overflow: 'hidden',
    },
    btn2: {
        backgroundColor: '#f2f2f2',
        width: '100%',
        height: 50,
        borderRadius: 10,
        paddingTop: 12,
        marginTop:20,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        overflow: 'hidden',
        borderColor:'#c2c2c2',
        marginBottom:50
    },
    btnText: {
        color: '#1B4725',
        textAlign: 'center',
        fontSize: 18,
        fontWeight:'bold'
    },
});

export default FormBovino;
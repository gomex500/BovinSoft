import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Animated, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Inicio = ({navigation}) => {
    const [animationValue] = useState(new Animated.Value(0));
    
    // Animación de la opacidad
    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Animated.View style={[styles.container, { opacity: animationValue }]}>
                    <Image
                        source={require('../../assets/img/home.png')}
                        style={styles.logo}
                    />
                <Text style={styles.title}>Bienvenido</Text>
                <View style={styles.contLogin}>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.btnText}>Iniciar Sesion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.btn2}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.btnText2}>Crear Cuenta</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
        flex: 1,
    },
    logo: {
        position:'absolute',
        width:360,
        height:800,
        top:0,
        left:0,
        elevation: 5
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        marginTop: 400,
        marginLeft:70,
        color: '#422B13',
    },
    contLogin: {
        flex: 1,
        width: '80%',
        padding: 40,
    },
    btn: {
        backgroundColor: '#1B4725',
        width: '100%',
        height: 50,
        marginTop: 30,
        borderRadius: 10,
        paddingTop: 12,
    },
    btn2: {
        backgroundColor: '#f2f2f2',
        width: '100%',
        height: 50,
        marginTop: 30,
        borderRadius: 10,
        paddingTop: 12,
        borderWidth:2,
        borderColor: '#1B4725'
    },
    btnText: {
        color: '#f2f2f2',
        textAlign: 'center',
        fontSize: 20,
    },
    btnText2: {
        color: '#1B4725',
        textAlign: 'center',
        fontSize: 20,
        fontWeight:'bold'
    },
});

export default Inicio;

//#422B13
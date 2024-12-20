import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, Image, TextInput, Animated, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome, Fontisto } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alerta from '../components/Alerta';
// import { useAuthService } from '../services/authService';
import { loginService } from '../services/userServices';
import { authService } from '../services/authService';


const Login = ({navigation}) => {
    const [ver, setVer] = useState(true);
    const [animationValue] = useState(new Animated.Value(0));
    const [alertVisible, setAlertVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    // const { login } = useAuthService()


    // Alternar la visibilidad de la contraseña
    const verPassword = () => {
        setVer(!ver);
    };

    const showAlert = () => {
        setAlertVisible(true);
    };
    
    const closeAlert = () => {
        setAlertVisible(false);
    };

    const validacionLogin = () =>{
        setLoading(true);
        setMessage('');
        if (email.trim() === '' && password.trim() === '') {
            setMessage("Rellenar todos los campos");
            showAlert();
            setLoading(false);
        } else {
            handleLogin();
        } 
    }

    const handleLogin = async () => {
        setLoading(true);
        setMessage('');
        try {
            await authService.login(email, password);

            setLoading(false);
            navigation.navigate('Navegacion');
        } catch (error) {
            console.error('Error en la autenticación:', error);
            setMessage('Error en el inicio de sesión. Verifica tus credenciales.');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // Animación de la opacidad
    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            // keyboardVerticalOffset={headerHeight} // Ajustar para el header si usas navigation
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Animated.View style={[styles.container, { opacity: animationValue }]}>
                    <Image
                        source={require('../../assets/img/Logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Inicio de Sesion</Text>
                    <View style={styles.contLogin}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Correo"
                                keyboardType="email-address"
                                placeholderTextColor="#c2c2c2"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <FontAwesome name="user" size={25} style={styles.icon} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry={ver}
                                placeholderTextColor="#c2c2c2"
                                value={password}
                                onChangeText={setPassword}
                            />
                            <FontAwesome
                                name="lock"
                                size={25}
                                style={styles.icon}
                            />
                            <TouchableOpacity onPress={verPassword} style={styles.eyeIcon}>
                                <FontAwesome
                                    name={ver ? 'eye-slash' : 'eye'}
                                    size={25}
                                    color="#1B4725"
                                />
                            </TouchableOpacity>
                        </View>
                        {loading ? (
                            <ActivityIndicator style={styles.loandig} size={50} color="#1B4725" />
                        ) : (
                            <TouchableOpacity 
                            style={styles.btn}
                            // onPress={() => navigation.navigate('Navegacion')}
                            onPress={validacionLogin}
                            >
                                <Text style={styles.btnText}>Iniciar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Alerta
                        visible={alertVisible}
                        onClose={closeAlert}
                        message={message}
                    />
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        width: 200,
        height: 110,
        marginTop: 150,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        marginTop: 100,
        color: '#1B4725',
    },
    contLogin: {
        flex: 1,
        width: '90%',
        padding: 40,
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        position: 'relative',
    },
    input: {
        width: '100%',
        height: 50,
        paddingVertical: 10,
        paddingLeft: 40,
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
    icon: {
        position: 'absolute',
        left: 10,
        top: 32,
        zIndex: 1,
        color: '#1B4725',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 32,
        zIndex: 1,
    },
    btn: {
        backgroundColor: '#1B4725',
        width: '100%',
        height: 50,
        marginTop: 50,
        borderRadius: 10,
        paddingTop: 12,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
    },
    btnText: {
        color: '#f2f2f2',
        textAlign: 'center',
        fontSize: 20,
    },
    loandig:{
        marginTop:50
    }
});

export default Login;
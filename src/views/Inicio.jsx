import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Image, Animated, ScrollView, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalContext } from '../Context/GlobalContext';

const Inicio = ({navigation}) => {
    const animation = useRef(null);
    const [animationValue] = useState(new Animated.Value(0));
    const {user} = useContext(GlobalContext)

    // Animación de la opacidad
    useEffect( () => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Animated.View style={[styles.container, { opacity: animationValue }]}>
                <View style={styles.contAnimate}>
                    <LottieView
                        autoPlay // Puedes mantener esto si quieres que la animación inicie automáticamente
                        ref={animation} // Asignar la ref
                        style={{
                            width: '100%',
                            height: 300,
                        }}
                        source={require('../../assets/animations/LogoAnimate.json')}
                    />
                </View>
                <Text style={styles.title}>Bienvenido {user.nombre}</Text>
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
                        <Text style={styles.btnText2}>Crear Cuenta rol {user.rol} </Text>
                    </TouchableOpacity>
                    <View style={styles.contRedes}>
                        <View>
                            <Icon name="google" size={25} style={styles.icon} />
                        </View>
                        <View>
                            <Icon name="facebook" size={25} style={styles.icon} />
                        </View>
                    </View>
                </View>
            </Animated.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    contAnimate: {
        width:'100%',
        marginTop:100
    },
    title: {
        fontSize: 32,
        marginTop:20,
        fontWeight: '900',
        color: '#1B4725',
        textShadowColor: 'rgba(0, 0, 0, 0.4)', // Color de sombra
        textShadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        textShadowRadius: 1, // Radio de sombra
    },
    contLogin: {
        flex: 1,
        width: '80%',
        padding: 40
    },
    btn: {
        backgroundColor: '#1B4725',
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        paddingTop: 12,
    },
    btn2: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: 50,
        marginTop: 10,
        borderRadius: 10,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
        paddingTop: 12,
        borderWidth:2,
        borderColor: '#1B4725'
    },
    btnText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
    },
    btnText2: {
        color: '#1B4725',
        textAlign: 'center',
        fontSize: 20,
        fontWeight:'bold'
    },
    contRedes:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        marginTop:40,
    },
    icon: {
        width: 42,
        height:42,
        backgroundColor:'#1B4725',
        color:"#ffffff",
        borderRadius: 50,
        textAlign: 'center',
        padding:9,
        marginRight:10
    },
});

export default Inicio;

//#422B13
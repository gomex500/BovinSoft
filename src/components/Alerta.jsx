import React, {useState, useEffect} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Alerta = ({ visible, onClose, message }) => {

    const [animationValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View style={styles.alertContainer}>
                    <Icon
                        name={'exclamation-circle'}
                        size={50}
                        // color="#ce2b34"
                        color="#1B4725"
                    />
                    <Text style={styles.alertMessage}>{message}</Text>
                    <TouchableOpacity 
                        style={styles.btn}
                        // onPress={() => navigation.navigate('Navegacion')}
                        onPress={onClose}
                        >
                            <Text style={styles.btnText}>Cerrar</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
    },
    alertContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5, // Sombra en Android
    },
    alertMessage: {
        marginTop:20,
        marginBottom: 15,
        fontSize:20,
        fontWeight:'500',
        textAlign: 'center',
        color:'#1B4725',
    },
    btn:{
        marginTop:2,
        backgroundColor:'#1B4725',
        padding: 10,
        borderRadius:5
    },
    btnText:{
        color:'#fff',
        fontSize:18
    }
});

export default Alerta;
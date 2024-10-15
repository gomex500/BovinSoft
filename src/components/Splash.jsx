import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Splash = () => {
    // Mantener la referencia simple
    const animation = useRef(null);

    return (
        <View style={styles.container}>
            <LottieView
                autoPlay // Puedes mantener esto si quieres que la animación inicie automáticamente
                ref={animation} // Asignar la ref
                style={{
                    width: 300,
                    height: 300,
                }}
                source={require('../../assets/animations/LogoAnimate.json')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    lottie: {
        width: 300,
        height: 300,
    },
});

export default Splash;

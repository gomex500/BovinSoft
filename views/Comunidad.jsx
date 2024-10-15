import React, { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Comunidad = () => {
    return (
        <View style={styles.container}>
            <Text>Comunidad</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});

export default Comunidad;

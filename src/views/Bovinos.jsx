import React, { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Bovinos = () => {
    return (
        <View style={styles.container}>
            <Text>Bovino</Text>
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

export default Bovinos;

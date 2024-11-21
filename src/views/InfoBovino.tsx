import React, { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const InfoBovino = () => {
    return (
        <View style={styles.container}>
            <Text>InfoBovino</Text>
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

export default InfoBovino;

import { StyleSheet, View, Text } from 'react-native';
import Esquema from '../components/Esquema';



const Chatbot = () => {
    return (
        <View style={styles.container}>
            <Esquema styles= {styles.Esquema}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },Esquema:{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
    }
});

export default Chatbot;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const Signup = () => {
    const [ver, setVer] = useState(true);
    const [animationValue] = useState(new Animated.Value(0));
    const [image, setImage] = useState('');
    const [selectImg, setSelectImg] = useState(false);
    const [siguente, setSiguiente] = useState(false);
    const [boll, setBoll] = useState({
        colo1: '#1B4725',
        colo2: '#c2c2c2'
    })

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result.assets[0].uri);

        if (!result.canceled) {
            setSelectImg(true);
            setImage(result.assets[0].uri); // Asegúrate de que esto esté configurado correctamente
        }
    };

    const verPassword = () => {
        setVer(!ver);
    };

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: animationValue }]}>
            <View style={styles.contHeader}>
                <Image
                    source={require('../assets/img/splashLogo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Crear Cuenta</Text>
                <View style={styles.contImgProfile}>
                    <Image
                        source={selectImg ? { uri: image } : require('../assets/img/usuario.png')}
                        style={styles.imgProfile}
                    />
                    <Icon
                        name="plus"
                        size={25}
                        style={styles.iconProfile}
                        onPress={pickImage}
                    />
                </View>
            </View>
            <View style={styles.contLogin}>
                <View>
                    <TextInput style={styles.input} placeholder="Nombre" />
                    <Icon name="user" size={25} style={styles.icon} />
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido"
                        secureTextEntry={ver}
                    />
                    <Icon name="user" size={25} style={styles.icon} onPress={verPassword} />
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Telefono"
                        keyboardType='phone-pad'
                    />
                    <Icon name="phone" size={25} style={styles.icon} />
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Siguente</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:10 }}>
                    <View style={[styles.boll1, {backgroundColor:boll.colo1}]}></View>
                    <View style={[styles.boll2, {backgroundColor:boll.colo2}]}></View>
                </View>
            </View>
        </Animated.View>
    );
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        flex: 1,
    },
    logo:{
        width: 300,
        height: 95,
        marginTop: 50
    },
    title:{
        fontSize: 32,
        fontWeight: '900',
        marginTop:20,
        marginBottom:20,
        color: '#f2f2f2'
    },
    contLogin:{
        flex: 1,
        width:'90%',
        padding:40,
        alignItems: 'center',
    },
    input:{
        width:300,
        height: 50,
        color:'#252525',
        paddingVertical: 10,
        paddingLeft: 40,
        marginTop: 20,
        borderRadius:8,
        borderColor:'#1B4725',
        borderWidth: 2,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        fontSize:18,
        color:'#1B4725',
        fontWeight: 'bold'
    },
    icon: {
       position: 'absolute',
       left: 10,
       top: 32,
       zIndex: 1,
       color: '#1B4725'
    },
    btn:{
        backgroundColor:'#1B4725',
        width:"100%",
        height: 50,
        marginTop:50,
        borderRadius:10,
        paddingTop:12
    },
    btnText:{
        color: '#f2f2f2',
        textAlign:'center',
        fontSize:20
    },
    imgProfile:{
        width:150,
        height:150,
        borderColor:'#f2f2f2',
        borderWidth:5,
        borderRadius:75,
        backgroundColor: '#1B4725',
    },
    iconProfile: {
        position: 'absolute',
        width:40,
        height:40,
        left: 105,
        top: 105,
        zIndex: 1,
        color: '#f2f2f2',
        backgroundColor: '#1B4725',
        borderRadius: 50,
        paddingTop:8,
        textAlign: 'center',
        elevation:10
     },
     contHeader:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1B4725',
        width: '100%',
        height:'80%',
        paddingBottom:10,
     },
     contImgProfile:{
         marginBottom:5,
         backgroundColor: '#1B4725',
         borderRadius: 75,
         padding:3
     },
     boll1:{
         width:20,
         height:20,
         borderRadius: 50,
         marginRight:10
     },
     boll2:{
        width:20,
        height:20,
        borderRadius: 50,
    }
});

export default Signup;
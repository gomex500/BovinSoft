import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { NavigationProp } from '@react-navigation/native'
import { useAuthStore } from '../store/authStore'
import { authService } from '../services/authService'

interface IProfile {
  navigation: NavigationProp<any>
}

const Profile = ({ navigation }: IProfile) => {
  const { user } = useAuthStore()
  const [image, setImage] = useState(user.image)

  const cerrarSesion = async () => {
    await authService.logout()
    navigation.navigate('Inicio')
  }

  const pickImage = async () => {
    // Solicitar permisos de cámara y galería
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync()
    const { status: libraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (cameraStatus !== 'granted') {
      Alert.alert('Error', 'Se necesita permiso para acceder a la cámara.')
      return
    }

    if (libraryStatus !== 'granted') {
      Alert.alert('Error', 'Se necesita permiso para acceder a la galería.')
      return
    }

    // Mostrar un alert para que el usuario elija entre cámara o galería
    Alert.alert(
      'Selecciona una fuente',
      '¿Quieres tomar una foto o elegir una de la galería?',
      [
        {
          text: 'Galería',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            })

            if (!result.canceled) {
              setImage(result.assets[0].uri)
            }
          },
        },
        {
          text: 'Cámara',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            })

            if (!result.canceled) {
              setImage(result.assets[0].uri)
            }
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    )
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.name}>{`${user.nombre} ${user.apellido}`}</Text>
        <View style={styles.contImgProfile}>
          <Image
            source={
              image ? { uri: image } : require('../../assets/img/usuario.png')
            }
            style={styles.imgProfile}
          />
          <Icon
            name="plus"
            size={25}
            style={styles.iconProfile}
            onPress={pickImage}
          />
        </View>
        <View style={styles.datos}>
          <Text style={styles.info}>Fecha de Nacimiento:</Text>
          <View style={styles.contData}>
            <Text>
              {user.fecha_nacimiento}
              {/* <Icon
                                style={styles.icon}
                                name={'pencil-alt'}
                                size={18}
                                color="#1B4725"
                            /> */}
            </Text>
          </View>
          <Text style={styles.info}>Email:</Text>
          <View style={styles.contData}>
            <Text>
              {user.email}
              {/* <Icon
                                style={styles.icon}
                                name={'pencil-alt'}
                                size={18}
                                color="#1B4725"
                            /> */}
            </Text>
          </View>
          <Text style={styles.info}>Teléfono:</Text>
          <View style={styles.contData}>
            <Text>
              {user.telefono}
              {/* <Icon
                                style={styles.icon}
                                name={'pencil-alt'}
                                size={18}
                                color="#1B4725"
                            /> */}
            </Text>
          </View>
          <Text style={styles.info}>Tipo de Suscripción:</Text>
          <View style={styles.contData}>
            <Text>
              {user.tipoSuscripcion}
              {/* <Icon
                                style={styles.icon}
                                name={'pencil-alt'}
                                size={18}
                                color="#1B4725"
                            /> */}
            </Text>
          </View>
          <Text style={styles.info}>Rol:</Text>
          <View style={styles.contData}>
            <Text>
              {user.rol}
              {/* <Icon
                                style={styles.icon}
                                name={'pencil-alt'}
                                size={18}
                                color="#1B4725"
                            /> */}
            </Text>
          </View>
          <Text style={styles.info}>Dirección:</Text>
          <View style={styles.contData}>
            <Text>
              {user.direccion}
              {/* <Icon
                                style={styles.icon}
                                name={'pencil-alt'}
                                size={18}
                                color="#1B4725"
                            /> */}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btnCerrarSesion} onPress={cerrarSesion}>
          <Text style={styles.btntext}>Cerrar Sesion</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  contImgProfile: {
    borderRadius: 75,
    padding: 3,
  },
  imgProfile: {
    width: 130,
    height: 130,
    borderColor: '#f2f2f2',
    borderWidth: 5,
    borderRadius: 75,
  },
  iconProfile: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: 90,
    top: 90,
    zIndex: 1,
    color: '#f2f2f2',
    backgroundColor: '#1B4725',
    borderRadius: 50,
    paddingTop: 7,
    textAlign: 'center',
    elevation: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1B4725',
  },
  datos: {
    width: '95%',
    padding: 20,
  },
  contData: {
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1B4725',
  },
  btnCerrarSesion: {
    backgroundColor: '#1B4725',
    borderRadius: 10,
    padding: 15,
  },
  btntext: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
})

export default Profile

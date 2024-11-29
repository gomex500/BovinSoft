import { API_NOTIFICATIONS } from '@env';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

// Función para registrar el token de notificaciones
export const registerForPushNotificationsAsync = async () => {
  let token;

  // Verifica si las notificaciones están soportadas (solo para dispositivos físicos)
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permisos denegados', 'No se pueden enviar notificaciones push.');
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    Alert.alert('No compatible', 'Las notificaciones no son compatibles con este dispositivo.');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Función para enviar notificaciones
export const createWeatherNotification = async (idUsuario: string, idFinca:string) => {
  const notificacion = {
    idUsuario, // Reemplaza con un ObjectId válido de la colección Usuario
    tipoAlerta: "clima", // Puede ser 'vacunación', 'enfermedad', 'producción baja' o 'clima'
    detalles: {
      idFinca: idFinca, // Reemplaza con un ObjectId válido de la colección Fincas (opcional)
      idBovino: "67390db33af2038add07ed4e", // Reemplaza con un ObjectId válido de la colección Bovinos (opcional)
      mensaje: "La vacuna contra la fiebre aftosa debe aplicarse hoy.",
      titulo: "Reporte del clima",
    },
    leido: false, // Este campo es opcional; si no se incluye, se establecerá en false por defecto
    run_time: "00 08 * * *" // Campo adicional que has solicitado
  };

  try {

    const response = await axios.post(`${API_NOTIFICATIONS}/notifications`, notificacion);

    return "Notificación enviada correctamente.";
    
  } catch (error) {
    console.error('Error enviando notificación:', error);
    console.log("@createWeatherNotification");
    
    return "Error enviando notificación.";  
  }
}

export const sendTokenToServer = async (token: string, idUsuario:string) => {
  try {
    const response = await axios.post(`${API_NOTIFICATIONS}/notifications/register-token`, {
      token,
      id: idUsuario
    });

    if (response.status === 200) {
      console.log('Token registrado en el servidor.');
    } else {
      console.error('Error registrando el token.');
    }
  } catch (error) {
    console.error('Error conectando con el servidor:', error);
  }
}

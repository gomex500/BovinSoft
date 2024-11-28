import React, { useEffect, useState } from 'react'
import Navegacion from './src/components/Navegacion'
import Inicio from './src/views/Inicio'
import Login from './src/views/Login'
import Signup from './src/views/Signup'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TailwindProvider } from 'tailwind-rn'
import utilities from './tailwind.json'
import { LoadingScreen } from './src/components/LoadingStream'
// import { useAuthService } from './src/services/authService'
import { useAuthStore } from './src/store/authStore'
import { useFincaStore } from './src/store/fincaStore'
import { authService } from './src/services/authService'
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import 'whatwg-fetch';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Función para programar la notificación diaria
const scheduleDailyWeatherNotification = async (city) => {
  // const weatherMessage = await fetchWeatherData(city);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Actualización del clima 🌦️',
      body: "Nublado",
      sound: true,
    },
    trigger: { seconds: 5 }, // Para pruebas, notifica después de 5 segundos
    // trigger: {
    //   hour: 15,
    //   minute: 50,
    //   repeats: true, // Se repite todos los días
    // },
    
  });

  Alert.alert('Notificación programada', `Se enviará a las 9 PM diariamente`);
};

const Stack = createStackNavigator()

export default function App() {
  const { obtenerFincaById } = useFincaStore()
  const { isAuthenticated, isRestored } = useAuthStore()
  // const { validateToken } = useAuthService()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    scheduleDailyWeatherNotification('London')
    const checkLoginStatus = async () => {
      let response = await authService.validateToken()

      if (response.valid) {
        let rol = response.payload?.rol
        let condition = rol === 'WORKER' || rol === 'ADMIN'

        if (condition) {
          await obtenerFincaById(response.payload?.fincaId as string)
        }
      }
      setLoading(false)
    }

    isRestored && checkLoginStatus()
  }, [isRestored])

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesitan permisos para enviar notificaciones');
      }
    };

    getPermissions();
  }, []);

  if (loading) {
    return (
      //@ts-ignore
      <TailwindProvider utilities={utilities as any}>
        <LoadingScreen />
      </TailwindProvider>
    );
  }

  return (
    //@ts-ignore
    <TailwindProvider utilities={utilities as any}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name="Navegacion"
                component={Navegacion}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>

  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text style={{ fontSize: 18, marginBottom: 20 }}>Notificaciones del Clima</Text>
  //       <Button
  //         title="Programar Notificación"
  //         onPress={() => scheduleDailyWeatherNotification('London')}
  //       />
  // </View>
  )
}

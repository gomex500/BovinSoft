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
import { registerForPushNotificationsAsync, sendTokenToServer } from './src/helpers/notification'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator()

export default function App() {
  const { obtenerFincaById } = useFincaStore()
  const { isAuthenticated, isRestored, user } = useAuthStore()
  // const { validateToken } = useAuthService()
  const [loading, setLoading] = useState(true)

  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync().then(token => {
        setExpoPushToken(token as string);
        sendTokenToServer(token as string, user._id as string);
      });
    }

    // Escucha de notificaciones
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [user]);

  useEffect(() => {
    // scheduleDailyWeatherNotification('London')
    const checkLoginStatus = async () => {
      console.log("restore");
      
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


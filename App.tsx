import React, { useEffect, useState } from 'react'
import Navegacion from './src/components/Navegacion'
import Inicio from './src/views/Inicio'
import Login from './src/views/Login'
import Signup from './src/views/Signup'
import InfoFinca from './src/views/InfoFinca'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text } from 'react-native'
import Splash from './src/components/Splash'
import InfoBovino from './src/views/InfoBovino'
import { useUserStore } from './src/store/userStore'
import { TailwindProvider } from 'tailwind-rn'
import utilities from './tailwind.json'
import { LoadingScreen } from './src/components/LoadingStream'

const Stack = createStackNavigator()

// Recuperar datos
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value // Devuelve el valor recuperado
  } catch (error) {
    console.error('Error getting data:', error)
    return null // Devuelve null en caso de error
  }
}

export default function App() {
  const { isLoggedIn, setIsLoggedIn, obtenerUsuario } = useUserStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userId = await getData('id')
      const token = await getData('token')

      setIsLoggedIn(userId !== null) // Actualiza el estado según el valor recuperado
      if (userId !== null) {
        await obtenerUsuario(userId, (token as string))
      }

      setLoading(false)
    }

    checkLoginStatus() // Llama a la función para verificar el estado de inicio de sesión
  }, [])

  return (
    //@ts-ignore
    <TailwindProvider utilities={utilities as any}>
      <NavigationContainer>
        <Stack.Navigator>
          {loading ? ( // Mientras se está verificando el estado, puedes mostrar un cargando o similar
            <Stack.Screen
              name="Loading"
              component={LoadingScreen} // Crea un componente de carga si lo deseas
              options={{ headerShown: false }}
            />
          ) : isLoggedIn ? (
            <>
              <Stack.Screen
                name="Navegacion"
                component={Navegacion}
                options={({ navigation }) => ({
                  headerShown: false,
                })}
              />
              <Stack.Screen
                name="InfoBovino"
                component={InfoBovino}
                options={({ navigation }) => ({
                  headerStyle: { backgroundColor: 'red' }, // Color de fondo del header
                  headerTintColor: '#1B4725', // Color del texto en el header
                  headerTitleStyle: { fontWeight: 'bold' }, // Estilo del título
                })}
                
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={({ navigation }) => ({
                  headerShown: false,
                })}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={({ navigation }) => ({
                  headerShown: false,
                })}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={({ navigation }) => ({
                  headerShown: false,
                })}
              />
              <Stack.Screen
                name="Navegacion"
                component={Navegacion}
                options={({ navigation }) => ({
                  headerShown: false,
                })}
              />
              <Stack.Screen
                name="InfoBovino"
                component={InfoBovino}
                options={({ navigation }) => ({
                  headerStyle: { backgroundColor: 'red' }, // Color de fondo del header
                  headerTintColor: '#1B4725', // Color del texto en el header
                  headerTitleStyle: { fontWeight: 'bold' }, // Estilo del título
                })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  )
}
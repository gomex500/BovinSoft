import React, { useEffect, useState } from 'react'
import Navegacion from './src/components/Navegacion'
import Inicio from './src/views/Inicio'
import Login from './src/views/Login'
import Signup from './src/views/Signup'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import InfoBovino from './src/views/InfoBovino'
import { TailwindProvider } from 'tailwind-rn'
import utilities from './tailwind.json'
import { LoadingScreen } from './src/components/LoadingStream'
// import { useAuthService } from './src/services/authService'
import { useAuthStore } from './src/store/authStore'
import { useFincaStore } from './src/store/fincaStore'
import { authService } from './src/services/authService'

const Stack = createStackNavigator()

export default function App() {
  const { obtenerFincaById } = useFincaStore()
  const { isAuthenticated, isRestored } = useAuthStore()
  // const { validateToken } = useAuthService()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
              <Stack.Screen
                name="InfoBovino"
                component={InfoBovino}
                options={{
                  headerStyle: { backgroundColor: 'red' },
                  headerTintColor: '#1B4725',
                  headerTitleStyle: { fontWeight: 'bold' },
                }}
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
  )
}

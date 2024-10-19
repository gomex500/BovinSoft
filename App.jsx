import React, { useEffect, useState } from 'react';
import Navegacion from './src/components/Navegacion';
import { ProviderGlobalContext } from './src/Context/GlobalContext';
import Inicio from './src/views/Inicio';
import Login from './src/views/Login';
import Signup from './src/views/Signup';
import InfoFinca from './src/views/InfoFinca';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import Splash from './src/components/Splash';

const Stack = createStackNavigator();

// Recuperar datos
const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value; // Devuelve el valor recuperado
    } catch (error) {
        console.error('Error getting data:', error);
        return null; // Devuelve null en caso de error
    }
};

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // Estado para manejar la autenticación

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userId = await getData('id'); // Espera el resultado de getData
            setIsLoggedIn(userId !== null); // Actualiza el estado según el valor recuperado
        };

        checkLoginStatus(); // Llama a la función para verificar el estado de inicio de sesión
    }, []);

    return (
      <ProviderGlobalContext>
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn === null ? ( // Mientras se está verificando el estado, puedes mostrar un cargando o similar
                    <Stack.Screen 
                        name='Loading' 
                        component={LoadingScreen} // Crea un componente de carga si lo deseas
                        options={{ headerShown: false }}
                    />
                ) : isLoggedIn ? (
                    <>
                    <Stack.Screen 
                        name='Navegacion' 
                        component={Navegacion}
                        options={({navigation}) =>({
                          headerShown: false
                        })}
                    />
                    <Stack.Screen 
                            name='InfoFinca' 
                            component={InfoFinca}
                            options={({navigation}) =>({
                              headerShown: false
                            })}
                            />
                    </>
                    
                ) : (
                    <>
                        <Stack.Screen 
                            name='Inicio' 
                            component={Inicio}
                            options={({navigation}) =>({
                              headerShown: false
                            })}
                            />
                        <Stack.Screen 
                            name='Login' 
                            component={Login}
                            options={({navigation}) =>({
                              headerShown: false
                            })}
                        />
                        <Stack.Screen 
                            name='Signup' 
                            component={Signup}
                            options={({navigation}) =>({
                              headerShown: false
                            })}
                        />
                    <Stack.Screen 
                        name='Navegacion' 
                        component={Navegacion}
                        options={({navigation}) =>({
                          headerShown: false
                        })}
                    />
                    <Stack.Screen 
                            name='InfoFinca' 
                            component={InfoFinca}
                            screenOptions={{
                                headerStyle: { backgroundColor: 'red' }, // Color de fondo del header
                                headerTintColor: '#FFFFFF', // Color del texto en el header
                                headerTitleStyle: { fontWeight: 'bold' }, // Estilo del título
                              }}
                            />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
      </ProviderGlobalContext>
    );
}

// Componente de carga (opcional)
const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Splash/>
    </View>
);
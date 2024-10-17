import Navegacion from './src/components/Navegacion';
import Inicio from './src/views/Inicio';
import Login from './src/views/Login';
import Signup from './src/views/Signup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

// Recuperar datos
const getData = async (key) => {
    try {
    const value = await AsyncStorage.getItem(key);
        console.log(value);
    } catch (error) {
        console.error('Error getting data:', error);
    }
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {getData('id') === null ? (
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
        </>) : (
        <Stack.Screen 
          name='Navegacion' 
          component={Navegacion}
          options={({navigation}) =>({
            headerShown: false
          })}
        />)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

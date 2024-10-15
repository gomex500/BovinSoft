import Navegacion from './components/Navegacion';
import Splash from './components/Splash.jsx';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Signup from './views/Signup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

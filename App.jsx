import Navegacion from './src/components/Navegacion';
import { ProviderGlobalContext } from './src/Context/GlobalContext';
import Inicio from './src/views/Inicio';
import Login from './src/views/Login';
import Signup from './src/views/Signup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ProviderGlobalContext>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Inicio'
            component={Inicio}
            options={({ navigation }) => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={({ navigation }) => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            name='Signup'
            component={Signup}
            options={({ navigation }) => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            name='Navegacion'
            component={Navegacion}
            options={({ navigation }) => ({
              headerShown: false
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProviderGlobalContext>
  );
}

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TareasScreen from '../screens/TareasScreen';
import RegistroActividadesScreen from '../screens/RegistroActividadesScreen';

const Stack = createStackNavigator();

const TrabajadorStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tareas" component={TareasScreen} />
      <Stack.Screen name="RegistroActividades" component={RegistroActividadesScreen} />
    </Stack.Navigator>
  );
};

export default TrabajadorStackNavigator;

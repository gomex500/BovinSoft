import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import InventarioScreen from '../screens/InventarioScreen';
import GestionTrabajadoresScreen from '../screens/GestionTrabajadoresScreen';

const Stack = createStackNavigator();

const GanaderoStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Inventario" component={InventarioScreen} />
      <Stack.Screen name="GestionTrabajadores" component={GestionTrabajadoresScreen} />
    </Stack.Navigator>
  );
};

export default GanaderoStackNavigator;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();

const GanaderoStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Panel de control" component={DashboardScreen} />
   
    </Stack.Navigator>
  );
};

export default GanaderoStackNavigator;

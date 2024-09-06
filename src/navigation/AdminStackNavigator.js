import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GestionUsuariosScreen from '../screens/GestionUsuariosScreen';
import SupervisarActividadesScreen from '../screens/SupervisarActividadesScreen';
import ReportesMetricasScreen from '../screens/ReportesMetricasScreen';

const Stack = createStackNavigator();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GestionUsuarios" component={GestionUsuariosScreen} />
      <Stack.Screen name="SupervisarActividades" component={SupervisarActividadesScreen} />
      <Stack.Screen name="ReportesMetricas" component={ReportesMetricasScreen} />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;

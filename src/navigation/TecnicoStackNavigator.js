import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DiagnosticoScreen from '../screens/DiagnosticoScreen';
import HistorialIntervencionesScreen from '../screens/HistorialIntervencionesScreen';
import RecomendacionesScreen from '../screens/RecomendacionesScreen';

const Stack = createStackNavigator();

const TecnicoStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Diagnostico" component={DiagnosticoScreen} />
      <Stack.Screen name="HistorialIntervenciones" component={HistorialIntervencionesScreen} />
      <Stack.Screen name="Recomendaciones" component={RecomendacionesScreen} />
    </Stack.Navigator>
  );
};

export default TecnicoStackNavigator;

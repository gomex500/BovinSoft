import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GanaderoStackNavigator from './GanaderoStackNavigator';
import TrabajadorStackNavigator from './TrabajadorStackNavigator';
import TecnicoStackNavigator from './TecnicoStackNavigator';
import AdminStackNavigator from './AdminStackNavigator';

const Stack = createStackNavigator();

const MainStackNavigator = ({ userRole }) => {
  let StackNavigator;
  
  switch (userRole) {
    case 'ganadero':
      StackNavigator = GanaderoStackNavigator;
      break;
    case 'trabajador':
      StackNavigator = TrabajadorStackNavigator;
      break;
    case 'tecnico':
      StackNavigator = TecnicoStackNavigator;
      break;
    case 'admin':
      StackNavigator = AdminStackNavigator;
      break;
    default:
      StackNavigator = TrabajadorStackNavigator; // Por defecto para trabajadores.
  }

  return <StackNavigator />;
};

export default MainStackNavigator;

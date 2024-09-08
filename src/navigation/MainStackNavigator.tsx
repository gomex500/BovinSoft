import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import GanaderoStackNavigator from './GanaderoStackNavigator'
// import TrabajadorStackNavigator from './TrabajadorStackNavigator';
// import TecnicoStackNavigator from './TecnicoStackNavigator';
// import AdminStackNavigator from './AdminStackNavigator';

const Stack = createStackNavigator()

interface Props {
  userRole:string
}

const MainStackNavigator = ({ userRole }:Props) => {
  let StackNavigator

  switch (userRole) {
    case 'ganadero':
      StackNavigator = GanaderoStackNavigator
      break
    // case 'trabajador':
    //   StackNavigator = TrabajadorStackNavigator;
    //   break;
    // case 'tecnico':
    //   StackNavigator = TecnicoStackNavigator;
    //   break;
    // case 'admin':
    //   StackNavigator = AdminStackNavigator;
    //   break;
    default:
      StackNavigator = GanaderoStackNavigator // Por defecto para trabajadores.
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={StackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default MainStackNavigator

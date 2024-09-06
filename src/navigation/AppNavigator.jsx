import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';

const AppNavigator = () => {
  const isAuthenticated = true; // Este valor vendría del estado global o contexto
  const userRole = 'ganadero'; // Valor determinado al autenticarse

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <MainStackNavigator userRole={userRole} /> : <AuthStackNavigator />} */}
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;

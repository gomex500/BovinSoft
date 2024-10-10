import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Splash';
import Inicio from '../views/Inicio';

const Stack = createNativeStackNavigator();

const Navegacion = () =>{
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 10000); 
      }, []);
      
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoading ? (
              <Stack.Screen name="Splash" component={Splash} />
            ) : (
              <Stack.Screen name="Inicio" component={Inicio} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default Navegacion;
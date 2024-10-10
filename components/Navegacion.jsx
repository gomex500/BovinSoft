import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; 
import Chatbot from '../views/Chatbot';
import Fincas from '../views/Fincas';
import Metricas from '../views/Metricas';
import Comunidad from '../views/Comunidad';
import Bovinos from '../views/Bovinos';

const Tab = createBottomTabNavigator();

const Navegacion = () => {
  const [animationValues] = useState({});

  const handleTabPress = (navigation, label) => {
    // Inicia la animación
    if (!animationValues[label]) {
      animationValues[label] = new Animated.Value(1);
    }

    Animated.spring(animationValues[label], {
      toValue: 1.3, // Escalar a 1.2
      useNativeDriver: true,
      bounciness: 30, // Efecto de rebote
    }).start(() => {
      // Regresar a la escala original
      Animated.spring(animationValues[label], {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });

    // Navega a la pantalla correspondiente
    navigation.navigate(label);
  };

  const renderIcon = (iconName, label, isFocused, navigation) => {
    const color = isFocused ? '#f2f2f2' : 'gray'; // Color del ícono basado en el estado de enfoque

    return (
      <TouchableOpacity
        onPress={() => handleTabPress(navigation, label)} // Cambia la pantalla activa
        style={styles.iconContainer}
      >
        <Animated.View style={{ transform: [{ scale: animationValues[label] || 1 }] }}>
          <Icon name={iconName} size={28} color={color} />
        </Animated.View>
        {isFocused && ( // Solo muestra la etiqueta si está enfocada
          <Text style={styles.label}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1B4725',
            borderTopWidth: 0,
            elevation: 0,
            height: 75,
            borderTopLeftRadius: 15,
            borderTopEndRadius: 15,
          },
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === 'Comunidad') {
              iconName = 'hat-cowboy-side';
            } else if (route.name === 'Bovinos') {
              iconName = 'cow';
            } else if (route.name === 'Metricas') {
              iconName = 'chart-pie';
            } else if (route.name === 'Chatbot') {
              iconName = 'dice-d20';
            } else if (route.name === 'Fincas') {
              iconName = 'seedling';
            }

            return renderIcon(iconName, route.name, focused, navigation); // Aquí se pasa navigation correctamente
          },
        })}
      >
        <Tab.Screen name="Metricas" component={Metricas} options={{ tabBarLabel: () => null }} />
        <Tab.Screen name="Fincas" component={Fincas} options={{ tabBarLabel: () => null }} />
        <Tab.Screen name="Comunidad" component={Comunidad} options={{ tabBarLabel: () => null }} />
        <Tab.Screen name="Bovinos" component={Bovinos} options={{ tabBarLabel: () => null }} />
        <Tab.Screen name="Chatbot" component={Chatbot} options={{ tabBarLabel: () => null }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#1B4725',
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: '#f2f2f2', // Color de la etiqueta
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Color de sombra
    textShadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    textShadowRadius: 1, // Radio de sombra
  },
});

export default Navegacion;

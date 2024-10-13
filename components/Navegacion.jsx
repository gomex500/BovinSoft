import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Animated, Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; 
import Chatbot from '../views/Chatbot';
import Fincas from '../views/Fincas';
import Metricas from '../views/Metricas';
import Comunidad from '../views/Comunidad';
import Bovinos from '../views/Bovinos';

const Tab = createBottomTabNavigator();

const Navegacion = () => {
  const [animationValues] = useState({});
  const [tituloBar, setTituloBar] = useState('');

  const handleTabPress = (navigation, label) => {
    // Inicia la animación
    if (!animationValues[label]) {
      animationValues[label] = new Animated.Value(1);
    }

    Animated.spring(animationValues[label], {
      toValue: 1.3, // Escalar a 1.3
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
    setTituloBar(label);
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
      <View style={styles.container}>
        <View style={styles.appbar}>
          <Text style={styles.title}>{tituloBar}</Text>
          <TouchableOpacity onPress={() => alert('Foto de perfil presionada')}>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV4LhpLVBdrXKI_qE4E1bCEMuV0onLPIJaTw&s' }} // Reemplaza con la URL de tu foto de perfil
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        
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
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B4725',
    padding: 10,
    paddingTop:28,
    // borderBottomLeftRadius:15,
    // borderBottomRightRadius:15
  },
  title: {
    color: '#f2f2f2',
    fontSize: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
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

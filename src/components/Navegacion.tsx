import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, Animated, Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; 
import Chatbot from '../views/Chatbot';
import Fincas from '../views/Fincas';
import Metricas from '../views/Metricas';
import Comunidad from '../views/Comunidad';
import Bovinos from '../views/Bovinos';
import Profile from '../views/Profile';
import FormFinca from '../views/FormFinca';
import { createStackNavigator } from '@react-navigation/stack';
import FormBovino from '../views/FormBovino';
import InfoFinca from '../views/InfoFinca';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()

// Crear el stack para Fincas y FormFinca
const FincasStack = () => {
  return (
    <Stack.Navigator initialRouteName="FincasHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FincasHome" component={Fincas} />
      <Stack.Screen name="FormFinca" component={FormFinca} />
      <Stack.Screen name="InfoFinca" component={InfoFinca} />
    </Stack.Navigator>
  );
};

const BovinosStack = () => {
  return (
    <Stack.Navigator initialRouteName="Bovinos" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bovinos" component={Bovinos} />
      <Stack.Screen name="FormBovino" component={FormBovino} />
    </Stack.Navigator>
  );
};

const MyStackNavigation = () => {
  const [animationValues] = useState({});
 
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
          <Tab.Screen name="Fincas" component={FincasStack} options={{ tabBarLabel: () => null }} />
          <Tab.Screen name="Comunidad" component={Comunidad} options={{ tabBarLabel: () => null }} />
          <Tab.Screen name="Bovinos" component={BovinosStack} options={{ tabBarLabel: () => null }} />
          <Tab.Screen name="Chatbot" component={Chatbot} options={{ tabBarLabel: () => null }} />
        </Tab.Navigator>
      </View>
  );
};

const Navegacion = () => {
  return (
      <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        activeTintColor: '#f2f2f2',
        itemStyle: { marginVertical: 10 },
        drawerStyle: {
          backgroundColor: '#1B4725',
          width: 250,
          paddingTop:50,
        },
        headerStyle: {
          backgroundColor: '#1B4725', // Cambia este valor al color que desees
        },
        drawerActiveTintColor: '#f2f2f2',
        drawerInactiveTintColor: '#f2f2f2',
        headerTintColor:'#f2f2f2',
        headerTitle: () => null,
        // headerLeft: () => (
        //   <Icon.Button
        //     name="hat-cowboy" // Nombre del icono de FontAwesome
        //     backgroundColor="#1B4725" // Asegúrate de que coincida con el color del header
        //     onPress={() => navigation.toggleDrawer()}
        //   />
        // ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require('../../assets/img/usuario.png')} // Reemplaza con la ruta de tu imagen
              style={{ width: 32, height: 32, borderRadius: 15, marginRight: 10 }}
            />
          </TouchableOpacity>
        ),
      })}
      >
        <Drawer.Screen name="Bovinsoft" component={MyStackNavigation} />
        <Drawer.Screen name="Perfil" component={Profile}/>
      </Drawer.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
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

import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import Chatbot from '../views/Chatbot'
import Fincas from '../views/Fincas'
import Metricas from '../views/Metricas'
import Feed from '../views/Comunidad'
import Profile from '../views/Profile'
import { createStackNavigator } from '@react-navigation/stack'
import FormBovino from '../views/FormBovino'
import InfoFinca from '../views/InfoFinca'
import RecommendedActivities from '../views/RecommendedActivities'
import PostDetail from '../views/PostDetail'
import { useAuthStore } from '../store/authStore'
import { LoadingScreen } from './LoadingStream'
import Signup from '../views/Signup'
import { UpgradeSubscription } from './UpgradeSubscription'
import BovineCareCalendar from '../views/BovineCareCalendar'
import CareHistory from '../views/CareHistory'
import { CattleReproductionView } from '../views/CattleReproductionView'
import FarmActivitiesView from '../views/FarmActivitiesView'
import LivestockView from '../views/LivestockView'
import CattleDetailScreen from './Bovine/CattleDetailScreen'
import { Divider, Menu, PaperProvider, Snackbar, useTheme } from 'react-native-paper'
import { useSnackbarStore } from '../store/snackbarStore'
import AdminView from './Admin/AdminView'
import { UserManagement } from './Admin/UserManagement'
import { PremiumRequestsView } from './Admin/PremiumRequestsView'
import {
  FontAwesome6,
  AntDesign,
  FontAwesome5,
  Feather,
  Entypo,
} from '@expo/vector-icons'
import FarmerProfileScreen from './ProfileOwner/FarmerProfileScreen'
import WorkerManagementScreen from './ProfileOwner/WorkerManagementScreen'
import Avatar from './ProfileOwner/Avatar'
import { FormFinca } from '../views/FormFinca'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

// Crear el stack para Fincas y FormFinca
const FincasStack = () => {
  const { user } = useAuthStore()
  let viewALl = user.rol === 'ROOT' || user.rol === 'OWNER'

  return (
    <Stack.Navigator
      initialRouteName={viewALl ? 'FincasHome' : 'InfoFinca'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FincasHome" component={Fincas} />
      <Stack.Screen name="FormFinca" component={FormFinca} />
      <Stack.Screen name="InfoFinca" component={InfoFinca} />
      <Stack.Screen
        name="CattleReproductionByFarm"
        component={CattleReproductionView}
      />
      <Stack.Screen name="CareHistoryByFarm" component={CareHistory} />
      <Stack.Screen name="CareCalendarByFarm" component={BovineCareCalendar} />
      <Stack.Screen name="LivestockViewFarm" component={LivestockView} />
    </Stack.Navigator>
  )
}

const BovinosStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Livestock"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FormBovino" component={FormBovino} />
      <Stack.Screen name="CareCalendarBovine" component={BovineCareCalendar} />
      <Stack.Screen name="CareHistoryBovine" component={CareHistory} />
      <Stack.Screen
        name="CattleReproduction"
        component={CattleReproductionView}
      />
      <Stack.Screen name="FarmActivities" component={FarmActivitiesView} />
      <Stack.Screen name="Livestock" component={LivestockView} />
      <Stack.Screen name="CattleDetailBovine" component={CattleDetailScreen} />
    </Stack.Navigator>
  )
}

const MetricasStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MetricasHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MetricasHome" component={Metricas} />
      <Stack.Screen
        name="RecommendedActivities"
        component={RecommendedActivities}
      />
    </Stack.Navigator>
  )
}

const FeedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FeedHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FeedHome" component={Feed} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  )
}

const AdminStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AdminHome" component={AdminView} />
      <Stack.Screen name="UserManagement" component={UserManagement} />
      <Stack.Screen name="PremiumRequests" component={PremiumRequestsView} />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Profile" component={FarmerProfileScreen} />
      <Stack.Screen
        name="WorkerManagement"
        component={WorkerManagementScreen}
      />
    </Stack.Navigator>
  )
}

const MyStackNavigation = () => {
  const [animationValues] = useState({})

  const { hiddenSnackbar, snackbarMessage, snackbarVisible } = useSnackbarStore();
  const { user } = useAuthStore();

  const handleTabPress = (navigation, label) => {
    // Inicia la animación
    if (!animationValues[label]) {
      animationValues[label] = new Animated.Value(1)
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
      }).start()
    })

    // Navega a la pantalla correspondiente
    navigation.navigate(label)
  }

  const renderIcon = (iconName, label, isFocused, navigation) => {
    const color = isFocused ? '#f2f2f2' : 'gray' // Color del ícono basado en el estado de enfoque

    return (
      <TouchableOpacity
        onPress={() => handleTabPress(navigation, label)} // Cambia la pantalla activa
        style={styles.iconContainer}
      >
        <Animated.View
          style={{ transform: [{ scale: animationValues[label] || 1 }] }}
        >
          {iconName === 'tools' ? (
            <FontAwesome5 name={iconName} size={28} color={color} />
          ) : (
            <FontAwesome6 name={iconName} size={28} color={color} />
          )}
        </Animated.View>
        {isFocused && ( // Solo muestra la etiqueta si está enfocada
          <Text style={styles.label}>{label}</Text>
        )}
      </TouchableOpacity>
    )
  }

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
            let iconName

            if (route.name === 'Foro') {
              iconName = 'hat-cowboy-side'
            } else if (route.name === 'Bovinos') {
              iconName = 'cow'
            } else if (route.name === 'Metricas') {
              iconName = 'chart-pie'
            } else if (route.name === 'Chatbot') {
              iconName = 'dice-d20'
            } else if (route.name === 'Fincas') {
              iconName = 'seedling'
            } else if (route.name === 'Admin') {
              iconName = 'tools'
            }

            return renderIcon(iconName, route.name, focused, navigation) // Aquí se pasa navigation correctamente
          },
        })}
      >
        {
          user.tipoSuscripcion !== 'básica' && <Tab.Screen
            name="Metricas"
            component={MetricasStack}
            options={{ tabBarLabel: () => null }}
          />
        }
        <Tab.Screen
          name="Fincas"
          component={FincasStack}
          options={{ tabBarLabel: () => null }}
        />
        <Tab.Screen
          name="Foro"
          component={FeedStack}
          options={{ tabBarLabel: () => null }}
        />
        <Tab.Screen
          name="Bovinos"
          component={BovinosStack}
          options={{ tabBarLabel: () => null }}
        />
        <Tab.Screen
          name="Chatbot"
          component={Chatbot}
          options={{ tabBarLabel: () => null }}
        />
        {
          user.rol === 'ROOT' && <Tab.Screen
            name="Admin"
            component={AdminStack}
            options={{ tabBarLabel: () => null }}
          />
        }
      </Tab.Navigator>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={hiddenSnackbar}
        duration={3000}
        action={{
          label: 'OK',
          onPress: hiddenSnackbar,
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  )
}

const Navegacion = () => {
  const { user } = useAuthStore()
  const theme = useTheme()
  theme.colors.primary = '#1B5E20'

  if (user === null) {
    return <LoadingScreen />
  }

  return (
    <PaperProvider theme={theme}>
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          activeTintColor: '#f2f2f2',
          itemStyle: { marginVertical: 10 },
          drawerStyle: {
            backgroundColor: '#1B4725',
            width: 250,
            paddingTop: 50,
          },
          headerStyle: {
            backgroundColor: '#1B4725',
          },
          drawerActiveTintColor: '#f2f2f2',
          drawerInactiveTintColor: '#f2f2f2',
          headerTintColor: '#f2f2f2',
          headerTitle: () => <Text style={styles.title}>Bovinsoft</Text>,
          headerRight: () => (<Avatar navigation={navigation}/>),
        })}
      >
        <Drawer.Screen name="Bovinsoft" component={MyStackNavigation} />
        { user.rol !== 'ADMIN' && <Drawer.Screen name="Perfil" component={ProfileStack} /> } 
      </Drawer.Navigator>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#f2f2f2',
    fontWeight: 'bold',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  menuContainer: {
    marginRight: 10, // Espacio del lado derecho
    marginTop: 5, // Ajusta la posición vertical
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
})

export default Navegacion

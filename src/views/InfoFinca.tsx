import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { FincaModel } from '../interfaces/IFinca'
import { useTailwind } from 'tailwind-rn'
import { useFincaStore } from '../store/fincaStore'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../interfaces/navigationTypes'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { CustomPieChart, PieData } from '../components/CustomPieChart'
import { Button } from 'react-native-paper'
import { createWeatherNotification } from '../helpers/notification'
import { useAuthStore } from '../store/authStore'
import { UserModel } from '../interfaces/IUser'


type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const InfoFinca = () => {

  const fincaSelected  = useFincaStore.getState().fincaSelected as FincaModel;
  const navigation = useNavigation<NavigationProps>();
  const { user } = useAuthStore();

  useFocusEffect(
    React.useCallback(() => {
      if (!fincaSelected) {
        navigation.navigate('FincasHome', {});
      }
    }, [fincaSelected])
  )
  
  const tw = useTailwind()

  const [origin, setOrigin] = useState({
    latitude: parseFloat((fincaSelected?.coordenadas?.latitud as string) || "0"),
    longitude: parseFloat((fincaSelected?.coordenadas?.longitud as string) || "0"),
  })
  
  const gestionarGanado = async () => {
    navigation.navigate('Bovinos', {});
  };

  const [recursosN, setRecursosN] = useState(fincaSelected?.recursosN || [])

  if (!fincaSelected) return <></>;

  const data: PieData[] = [
    { key: 'Ternero', value: (fincaSelected?.cantidadClasificacionGanado?.ternero as number), color: '#1E2923' },
    { key: 'Novillo', value: (fincaSelected?.cantidadClasificacionGanado?.novillo as number), color: '#375746' },
    { key: 'Vaquilla', value: (fincaSelected?.cantidadClasificacionGanado?.vaquilla as number), color: '#4B7B62' },
    { key: 'Toro', value: (fincaSelected?.cantidadClasificacionGanado?.toro as number), color: '#5B9778' },
    { key: 'Vaca', value: (fincaSelected?.cantidadClasificacionGanado?.vaca as number), color: '#75c199' },
  ];

  const habilitarNotifications = async () => {
    let userId = (user as UserModel)._id as string;
    let fincaId = (fincaSelected as FincaModel)._id as string;
    const response = await createWeatherNotification(userId, fincaId);
    Alert.alert('Notificación enviada', response);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container} // Estilo para el contenido interno
      showsVerticalScrollIndicator={false} // Opcional: Oculta el indicador de scroll
    >
      <View>
        <Text style={styles.title}>{fincaSelected.nombre}</Text>
        <Image
          source={{ uri: fincaSelected.image }}
          style={{ width: '100%', height: 200, borderRadius: 8 }}
        />

        <Button buttonColor='#1B4725' textColor='#fff' onPress={habilitarNotifications}>
          Recibir Notificaciones del clima de su finca
         </Button>
          
        <Text style={[ tw('mt-4') ,styles.info]}>Descripción:</Text>
        <View style={styles.contData}>
          <Text>
            {fincaSelected.descripcion}
          </Text>
        </View>
        <Text style={styles.info}>Tamaño:</Text>
        <View style={styles.contData}>
          <Text>
            {fincaSelected.tamano} Hectarias
          </Text>
        </View>
        <Text style={styles.info}>Recursos Naturales</Text>
        {recursosN.map((item, index) => (
          <View style={styles.contData} key={index}>
            <Text>
              ~ {item}
            </Text>
          </View>
        ))}
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Clasificación del Ganado</Text>
          <CustomPieChart data={data} />
        </ScrollView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  btnGanado:{
    backgroundColor: '#1B4725',
    borderRadius: 10,
    padding: 15,
    marginTop:20,
  },
  btnText:{
    textAlign:'center',
    color:'#fff',
    fontSize:18
  },
  contData: {
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1B4725',
  },
 
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  title: {
    fontSize: 21,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 10,
    color: '#1B4725',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  par: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 5,
    color: '#000',
  },
  caratT: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 5,
    color: '#1B4725',
    fontWeight: 'bold',
  },
  carat: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 5,
    color: '#f9f9f9',
  },
  iconRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  chartContainer: {
    padding: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
})

export default InfoFinca

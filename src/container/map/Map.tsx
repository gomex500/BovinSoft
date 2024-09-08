import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps'
import { View, StyleSheet } from 'react-native'
import tailwind from 'tailwind-rn'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/card/CardIndex.tsx'
import React from 'react'
import { IOrigin } from './MapContainer'

interface IProps {
  origin:IOrigin
}


const Map = ({ origin }:IProps) => {
  return (
    <View
      style={tailwind(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 mt-4'
      )}
    >
      <Card className="col-span-full mb-2">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Property Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="h-60 bg-muted flex items-center justify-center">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
          >
            <Marker coordinate={origin} />
          </MapView>
        </CardContent>
      </Card>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  card: {
    flex: 1,
    marginTop: 5,
    borderRadius: 6,
    elevation: 3,
    padding: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  title: {
    fontSize: 21,
    marginTop: 5,
    marginLeft: 5,
    color: '#e0b0ff',
  },
  par: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 5,
    color: '#f9f9f9',
  },
  caratT: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 5,
    color: '#e0b0ff',
  },
  carat: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 5,
    color: '#f9f9f9',
  },
})

import { StyleSheet, Text, View, ScrollView } from 'react-native'
import tailwind from 'tailwind-rn'
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/card/CardIndex'
import Sun from './../../icon/Sun'
import Droplets from './../../icon/Droplets'
import Wind from './../../icon/Wind'
import Thermometer from './../../icon/Thermometer'


const ClimateConditionsView = () => {
  return (
    <View style={tailwind('grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12')}>
      <Card>
        <CardHeader>
          <CardTitle className2="text-sm font-medium">
            Climate Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className2="flex flex-col gap-4">
          <View
            style={tailwind(
              'flex flex-row items-center justify-between space-x-2'
            )}
          >
            <View style={tailwind('flex flex-row items-center space-x-2')}>
              <Sun />
              <Text>Sunny, 25°C</Text>
            </View>
            <View style={tailwind('flex flex-row items-center space-x-2')}>
              <Droplets className2="h-5 w-5 text-blue-500" />
              <Text>Humidity: 60%</Text>
            </View>
          </View>
          <View
            style={tailwind(
              'flex flex-row items-center justify-between space-x-2'
            )}
          >
            <View style={tailwind('flex flex-row items-center space-x-2')}>
              <Wind className2="h-5 w-5 text-gray-500" />
              <Text>Wind: 10 km/h</Text>
            </View>
            <View style={tailwind('flex flex-row items-center space-x-2')}>
              <Thermometer className2="h-5 w-5 text-red-500" />
              <Text>Soil Temp: 18°C</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  )
}

export default ClimateConditionsView

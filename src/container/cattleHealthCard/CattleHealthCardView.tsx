import { StyleSheet, Text, View, ScrollView } from 'react-native'
import tailwind from 'tailwind-rn'
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/card/CardIndex.tsx'

const CattleHealthCardView = () => {
  return (
    <Card className='w-11/12 mt-2 mb-2'>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Cattle Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <View>
          <Text>Last Vet Visit: 2 weeks ago</Text>
          <Text>Vaccinations: Up to date</Text>
        </View>
      </CardContent>
    </Card>
  )
}

export default CattleHealthCardView

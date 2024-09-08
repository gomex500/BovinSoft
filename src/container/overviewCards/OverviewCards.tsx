import { Text, View } from 'react-native'
import tailwind from 'tailwind-rn'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/card/CardIndex.tsx'
import Progress from "../../components/progressBar/ProgressBar"
import React from 'react'

const OverviewCards = () => {
  return (
    <View
      style={tailwind(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 mt-4'
      )}
    >
      <Card className="mb-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Cattle</CardTitle>
        </CardHeader>
        <CardContent>
          <Text style={tailwind('text-2xl font-bold')}>1,234</Text>
          <Text style={tailwind('text-xs text-muted-foreground')}>
            Across all properties
          </Text>
        </CardContent>
      </Card>
      <Card className="mb-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Average Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text style={tailwind('text-2xl font-bold')}>87%</Text>
          <Progress progress={87} />
        </CardContent>
      </Card>
      <Card className="mb-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Total Pasture Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text style={tailwind('text-2xl font-bold')}>5,000 acres</Text>
          <Text style={tailwind('text-xs text-muted-foreground')}>
            Across all properties
          </Text>
        </CardContent>
      </Card>
      <Card className="mb-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Alert Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Text style={tailwind('text-2xl font-bold text-green-500')}>
            Normal
          </Text>
          <Text style={tailwind('text-xs text-muted-foreground')}>
            No active alerts
          </Text>
        </CardContent>
      </Card>
    </View>
  )
}

export default OverviewCards

import Activity from './../../icon/Activity'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/card/CardIndex.tsx'
import TextWrapper from '../../components/componentTailwind/TextWrapper'
import ViewWrapper from '../../components/componentTailwind/ViewWrapper'
import React from 'react'

const CattleBehaviorCardView = () => {
  return (
    <Card className="w-11/12 mb-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Cattle Behavior</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
         <ViewWrapper className="flex flex-row justify-between items-center mb-2">
          <ViewWrapper className="flex flex-row justify-between items-center space-x-2">
            <Activity />
            <TextWrapper>Activity Level</TextWrapper>
          </ViewWrapper>
          <TextWrapper>Normal</TextWrapper>
        </ViewWrapper>
        <TextWrapper>Grazing Time: 6 hours/day</TextWrapper> 
        <TextWrapper>Water Consumption: 40 L/day/animal</TextWrapper>
      </CardContent>
    </Card>
  )
}

export default CattleBehaviorCardView

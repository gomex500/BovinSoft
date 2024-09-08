import tailwind from 'tailwind-rn'
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/card/CardIndex'
import TextWrapper from '../../components/componentTailwind/TextWrapper'
import ViewWrapper from '../../components/componentTailwind/ViewWrapper'
import SproutIcon from "./../../icon/Sprout"
import WarehouseIcon from "./../../icon/WarehouseIcon"

const FarmConditionCardView = () => {
  return (
    <Card className2='w-11/12 mb-2'>
      <CardHeader>
        <CardTitle className2='text-sm font-medium'>Farm Condition</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ViewWrapper className="flex flex-row justify-between items-center">
          <ViewWrapper className="flex flex-row items-center space-x-2">
            <SproutIcon />
            <TextWrapper>Pasture Quality</TextWrapper>
          </ViewWrapper>
          <TextWrapper>Bueno</TextWrapper>
        </ViewWrapper>
        <ViewWrapper className="flex flex-row justify-between items-center mb-2">
          <ViewWrapper className="flex flex-row items-center space-x-2">
            <WarehouseIcon />
            <TextWrapper>Feed Stock</TextWrapper>
          </ViewWrapper>
          <TextWrapper>75% full</TextWrapper>
        </ViewWrapper>
        <TextWrapper>Fences: Good condition</TextWrapper>
        <TextWrapper>Water Sources: Clean and accessible</TextWrapper>
      </CardContent>
    </Card>
  )
}

export default FarmConditionCardView

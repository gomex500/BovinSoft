import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import tailwind from 'tailwind-rn'
import React, { useState } from 'react'
import OverviewCardsContainer from '../container/overviewCards/OverviewCardsContainer'
import MapContainer from '../container/map/MapContainer'
import ClimateConditionsContainer from "../container/climateConditions/ClimateConditionsContainer"
import PropertySelectorContainer from "../container/propertySelector/PropertySelectorContainer"
import CattleHealthCardContainer from "../container/cattleHealthCard/CattleHealthCardContainer"
import CattleBehaviorCardContainer from "../container/cattleBehaviorCard/CattleBehaviorCardContainer"
import FarmConditionCardContainer from "../container/farmConditionCard/FarmConditionCardContainer"

export default function DashboardScreen() {

  return (
    <ScrollView>
      <View
        style={{
          ...tailwind(
            'flex flex-col bg-white flex-1 items-center justify-start'
          ),
        }}
      >
        <PropertySelectorContainer />
        <OverviewCardsContainer />
        <MapContainer />
        <ClimateConditionsContainer />
        <CattleHealthCardContainer />
        <CattleBehaviorCardContainer />
        <FarmConditionCardContainer />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  )
}

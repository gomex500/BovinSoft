import tailwind from 'tailwind-rn'
import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'

interface IProps {
  children:ReactNode
  className?:string
}

export const Card = ({ children, className= ''}:IProps) => {
  return (
    <View
      style={tailwind(
        `rounded-xl border bg-card text-card-foreground shadow ${className}`
      )}
    >
      {children}
    </View>
  )
}

export const CardHeader = ({ children, className = '' }:IProps) => {
  return (
    <View style={tailwind(`flex flex-col space-y-1.5 p-6 ${className}`)}>
      {children}
    </View>
  )
}

export const CardTitle = ({ children, className = '' }:IProps) => {
  return (
    <Text
      style={tailwind(
        `font-semibold leading-none tracking-tight ${className}`
      )}
    >
      {children}
    </Text>
  )
}

export const CardContent = ({ children, className = '' }:IProps) => {
  return <View style={tailwind(`p-6 pt-0 ${className}`)}>{children}</View>
}

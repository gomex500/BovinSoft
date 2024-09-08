import tailwind from 'tailwind-rn'
import { View, Text } from 'react-native'

export const Card = ({ children, className2= ''}) => {
  return (
    <View
      style={tailwind(
        `rounded-xl border bg-card text-card-foreground shadow ${className2}`
      )}
    >
      {children}
    </View>
  )
}

export const CardHeader = ({ children, className2 = '' }) => {
  return (
    <View style={tailwind(`flex flex-col space-y-1.5 p-6 ${className2}`)}>
      {children}
    </View>
  )
}

export const CardTitle = ({ children, className2 = '' }) => {
  return (
    <Text
      style={tailwind(
        `font-semibold leading-none tracking-tight ${className2}`
      )}
    >
      {children}
    </Text>
  )
}

export const CardContent = ({ children, className2 = '' }) => {
  return <View style={tailwind(`p-6 pt-0 ${className2}`)}>{children}</View>
}

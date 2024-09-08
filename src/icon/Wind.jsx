import { View, StyleSheet } from 'react-native'
import Svg, { Circle, Rect, Path } from 'react-native-svg'
import tailwind from 'tailwind-rn'

const Wind = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style={tailwind('lucide lucide-wind h-5 w-5 text-gray-500')}
      data-id="51"
    >
      <Path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></Path>
      <Path d="M9.6 4.6A2 2 0 1 1 11 8H2"></Path>
      <Path d="M12.6 19.4A2 2 0 1 0 14 16H2"></Path>
    </Svg>
  )
}

export default Wind
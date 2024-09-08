import { View, StyleSheet } from 'react-native'
import Svg, { Circle, Rect, Path } from 'react-native-svg'
import tailwind from 'tailwind-rn'

const Activity = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style={tailwind('lucide lucide-activity h-5 w-5 text-green-500')}
      data-id="74"
    >
      <Path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></Path>
    </Svg>
  )
}

export default Activity

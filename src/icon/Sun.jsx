import { View, StyleSheet } from 'react-native'
import Svg, { Circle, Rect, Path } from 'react-native-svg'
import tailwind from 'tailwind-rn'

const Sun = () => {
  return (
    <View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={tailwind('lucide lucide-sun h-5 w-5 text-yellow-500')}
        data-id="45"
      >
        <Circle cx="12" cy="12" r="4"></Circle>
        <Path d="M12 2v2"></Path>
        <Path d="M12 20v2"></Path>
        <Path d="m4.93 4.93 1.41 1.41"></Path>
        <Path d="m17.66 17.66 1.41 1.41"></Path>
        <Path d="M2 12h2"></Path>
        <Path d="M20 12h2"></Path>
        <Path d="m6.34 17.66-1.41 1.41"></Path>
        <Path d="m19.07 4.93-1.41 1.41"></Path>
      </Svg>
    </View>
  )
}

export default Sun

import { View, StyleSheet } from 'react-native'
import Svg, { Circle, Rect, Path } from 'react-native-svg'
import tailwind from 'tailwind-rn'

const Droplets = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={tailwind('lucide lucide-droplets h-5 w-5 text-blue-500')}
      data-id="48"
    >
      <Path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></Path>
      <Path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></Path>
    </Svg>
  )
}

export default Droplets

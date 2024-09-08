import tailwind from "tailwind-rn"
import Svg, { Path } from 'react-native-svg'

const Thermometer = () => {
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
      style={tailwind('lucide lucide-thermometer h-5 w-5 text-red-500')}
      data-id="54"
    >
      <Path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></Path>
    </Svg>
  )
}

export default Thermometer

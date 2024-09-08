import tailwind from "tailwind-rn"
import Svg, { Path, Rect } from 'react-native-svg'

const WarehouseIcon = () => {
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
      style={tailwind('lucide lucide-warehouse h-5 w-5 text-orange-500')}
      data-id="90"
    >
      <Path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"></Path>
      <Path d="M6 18h12"></Path>
      <Path d="M6 14h12"></Path>
      <Rect width="12" height="12" x="6" y="10"></Rect>
    </Svg>
  )
}

export default WarehouseIcon
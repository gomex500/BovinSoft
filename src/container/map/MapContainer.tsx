import Map from "./Map"
import React, { useState } from "react"

export interface IOrigin {
  latitude: number;
  longitude: number;
}

const MapContainer = () => {

  const [origin, setOrigin] = useState<IOrigin>({
    latitude: 12.115061913598108,
    longitude: -85.38451616420735,
  })

  return ( <Map origin={origin} /> );
}
 
export default MapContainer;
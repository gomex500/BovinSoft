import Map from "./Map"
import React, { useState } from "react"

const MapContainer = () => {

  const [origin, setOrigin] = useState({
    latitude: 12.115061913598108,
    longitude: -85.38451616420735,
  })

  return ( <Map origin={origin} /> );
}
 
export default MapContainer;
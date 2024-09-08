import React, { useState } from 'react'
import PropertySelectorView from "./PropertySelectorView" 

const PropertySelectorContainer = () => {
  const [selectedValue, setSelectedValue] = useState(null)

  const options = [
    { label: 'Finca norte', value: 'option1' },
    { label: 'Finca sur', value: 'option2' },
    { label: 'Finca este', value: 'option3' },
  ]

  return (
    <PropertySelectorView
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      options={options}
    />
  )
}

export default PropertySelectorContainer

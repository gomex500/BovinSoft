import CustomSelect, { IOption } from './../../components/customSelect/CustomSelect'
import React from 'react';

interface IProps {
  setSelectedValue: React.Dispatch<React.SetStateAction<string | any>>
  selectedValue: string | any
  options:IOption[]
}

const PropertySelectorView = ({ selectedValue, setSelectedValue, options }:IProps) => {
  return ( <CustomSelect
    options={options}
    onSelect={(value) => setSelectedValue(value)}
    selectedValue={selectedValue}
  /> );
}
 
export default PropertySelectorView;
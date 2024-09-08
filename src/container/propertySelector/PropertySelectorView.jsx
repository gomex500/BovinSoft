import CustomSelect from './../../components/customSelect/CustomSelect'

const PropertySelectorView = ({selectedValue, setSelectedValue, options}) => {
  return ( <CustomSelect
    options={options}
    onSelect={(value) => setSelectedValue(value)}
    selectedValue={selectedValue}
  /> );
}
 
export default PropertySelectorView;
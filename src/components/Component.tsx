import { View, Text, TouchableOpacity } from "react-native";

const NewComponent = () => {
  return ( <View>
    <Text>Hello World</Text>
    <Text>Hello World</Text>

    <TouchableOpacity onPress={() => console.log('hola')}>
      <Text>Hello World</Text>
      <Text>Hola Mundo</Text>
    </TouchableOpacity>

  </View> );
}
 
export default NewComponent;
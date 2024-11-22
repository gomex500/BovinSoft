import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interfaces/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useAuthStore } from "../store/authStore";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;


export const GoForm = () => {
  const navigation = useNavigation<NavigationProps>()
  const { user } = useAuthStore()

  const GO = () => {
    navigation.navigate('FormBovino', {})
  }
  return user.rol === 'WORKER' ? (
    <View>
    </View>
  ) : (
    <TouchableOpacity
      style={[
        styles.boton,
        { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
      ]}
      onPress={GO}
    >
      <Entypo name="plus" size={24} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  boton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B4725',
    padding: 10,
  }
})
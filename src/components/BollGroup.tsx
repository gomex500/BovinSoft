import { TouchableOpacity, View, StyleSheet } from 'react-native'

interface boll {
  colo1: string
  colo2: string
}

interface IBollGroup {
  boll: boll
  setBoll: (boll: boll) => void
}

export const BollGroup = ({ boll, setBoll }: IBollGroup) => {
  const handleBoll = () => {
    setBoll({
      colo1: boll.colo2,
      colo2: boll.colo1,
    })
  }

  return (
    <View style={styles.bollContainer}>
      <TouchableOpacity onPress={handleBoll}>
        <View style={[styles.boll1, { backgroundColor: boll.colo1 }]}></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBoll}>
        <View style={[styles.boll2, { backgroundColor: boll.colo2 }]}></View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  bollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  boll1: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight: 10,
  },
  boll2: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
})

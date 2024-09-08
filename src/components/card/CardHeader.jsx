const CardHeader = ({ children, className2 = '' }) => {
  return (
    <View style={tailwind(`flex flex-col space-y-1.5 p-6 ${className2}`)}>
      {children}
    </View>
  )
}

export default CardHeader
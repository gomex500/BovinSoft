const CardContent = ({ children, className2 = '' }) => {
  return <View style={tailwind(`p-6 pt-0 ${className2}`)}>{children}</View>
}


export default CardContent
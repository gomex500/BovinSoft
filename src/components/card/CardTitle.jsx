const CardTitle = ({ children, className2 = '' }) => {
  return (
    <Text
      style={tailwind(
        `font-semibold leading-none tracking-tight ${className2}`
      )}
    >
      {children}
    </Text>
  )
}

export default CardTitle
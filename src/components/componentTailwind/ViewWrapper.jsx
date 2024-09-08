import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import tailwind from 'tailwind-rn';

// Creamos el componente ViewWrapper
const ViewWrapper = ({ className = '', style, children }) => {
  // Convertimos las clases tailwind en estilos válidos de React Native
  const tailwindStyle = className.split(' ').map(cls => tailwind(cls));

  return (
    <View style={[...tailwindStyle, style]}>
      {children}
    </View>
  );
};

export default ViewWrapper;

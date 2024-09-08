import React from 'react';
import { Text } from 'react-native';
import tailwind from 'tailwind-rn';

// Creamos el componente TextWrapper
const TextWrapper = ({ className = '', style, children }) => {
  // Convertimos las clases tailwind en estilos válidos de React Native
  const tailwindStyle = className.split(' ').map(cls => tailwind(cls));

  return (
    <Text style={[...tailwindStyle, style]}>
      {children}
    </Text>
  );
};

export default TextWrapper;
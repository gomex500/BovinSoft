import React from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';
import tailwind from 'tailwind-rn';

interface IProps {
  className?:string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

// Creamos el componente TextWrapper
const TextWrapper = ({ className = '', style, children }:IProps) => {
  // Convertimos las clases tailwind en estilos válidos de React Native
  const tailwindStyle = className.split(' ').map(cls => tailwind(cls));

  return (
    <Text style={[...tailwindStyle, style]}>
      {children}
    </Text>
  );
};

export default TextWrapper;
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';

interface CustomInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: React.ReactNode;
  onBlur?: () => void;
  onPress?: () => void;
}

export function CustomInput({ placeholder = 'Nombre', value, onChangeText, icon, onBlur, onPress }: CustomInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {icon && icon}
        <TextInput
          onPress={onPress}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9E9E9E"
          value={value}
          onChangeText={onChangeText}
          onBlur={()=> onBlur && onBlur()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    padding: 0,
  },
});
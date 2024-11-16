import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export const RadioButtonGroup = ({ options, selectedValue, onSelect, placeholder, orientation = 'vertical' }) => {
  const flexDirection = orientation === 'horizontal' ? 'flex-row' : 'flex-col';
  const tailwind = useTailwind();

  return (
    <View style={tailwind(`w-full flex-col mt-4`)}>
    <Text style={tailwind('text-lg')}> {placeholder}</Text>

      <View style={tailwind(`w-full ${flexDirection} mt-2`)}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              tailwind('flex-row items-center'),
              orientation === 'horizontal' ? { marginRight: 10 } : { marginBottom: 10 } // Horizontal: marginRight, Vertical: marginBottom
            ]}
            onPress={() => onSelect(option.value)} // Cambia el valor seleccionado
          >
            <View
              style={[
                tailwind('w-5 h-5 rounded-full border-2 border-gray-500 mr-2'),
                selectedValue === option.value && styles.selectedRadioButton, // Condicional para el color de fondo
              ]}
            />
            <Text style={tailwind('text-lg')}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
  },
  selectedRadioButton: {
    backgroundColor: '#1B4725',
    borderColor: '#1B4725',
  },
  radioButtonLabel: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
  },
});

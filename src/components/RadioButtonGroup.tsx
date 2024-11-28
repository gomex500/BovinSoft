import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton } from './RadioButton';

interface Option {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, selectedValue, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          selected={selectedValue === option.value}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    gap: 18,
  },
});


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ label, value, selected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(value)}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1B4725',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#1B4725',
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#1B4725',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});


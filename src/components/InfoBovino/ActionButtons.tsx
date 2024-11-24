import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ActionButtonsProps {
  onReportPress: () => void;
  onInformePress: () => void;
}

export function ActionButtons({ onReportPress, onInformePress }: ActionButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onReportPress}>
        <Text style={styles.buttonText}>Reporte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onInformePress}>
        <Text style={styles.buttonText}>Informe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    backgroundColor: '#1B5E20',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '48%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


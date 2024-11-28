import React from 'react';
import { View, StyleSheet } from 'react-native';

export function DataGrid() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {[...Array(12)].map((_, index) => (
          <View key={index} style={styles.cell} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cell: {
    width: '25%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});


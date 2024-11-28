import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';

interface FilterBarProps {
  onFilter: (filterType: string) => void;
}

const filterTypes = ['Todos', 'Vacunación', 'Revisión', 'Desparasitación', 'Recorte de pezuñas', 'Evaluación nutricional'];

export function FilterBar({ onFilter }: FilterBarProps) {
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const handleFilterSelect = (filterType: string) => {
    setSelectedFilter(filterType);
    onFilter(filterType);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {filterTypes.map((filterType) => (
        <Chip
          key={filterType}
          selected={selectedFilter === filterType}
          onPress={() => handleFilterSelect(filterType)}
          style={styles.chip}
          textStyle={selectedFilter === filterType ? styles.selectedChipText : styles.chipText}
        >
          {filterType}
        </Chip>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 60,
    minHeight: 60,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  chip: {
    margin: 4,
    backgroundColor: '#E8F5E9',
  },
  chipText: {
    color: '#1B5E20',
  },
  selectedChipText: {
    color: '#422B13',
  },
});


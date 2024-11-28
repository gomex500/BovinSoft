import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { InfoSection } from '../components/InfoBovino/InfoSection';
import { DataGrid } from '../components/InfoBovino/DataGrid';
import { ActionButtons } from '../components/InfoBovino/ActionButtons';

export const SelectedType = () => {
  const handleReportPress = () => {
    console.log('Report pressed');
  };

  const handleInformePress = () => {
    console.log('Informe pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 21,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 10,
    color: '#1B4725',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


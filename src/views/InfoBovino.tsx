import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { InfoSection } from '../components/InfoBovino/InfoSection';
import { DataGrid } from '../components/InfoBovino/DataGrid';
import { ActionButtons } from '../components/InfoBovino/ActionButtons';
import { BovinoModel } from '../interfaces/IBovino';
import { RouteProp, useRoute } from '@react-navigation/native';

interface InfoBovinoRouteParams {
  newsItem: BovinoModel
}

export const InfoBovino = () => {

  const route =
  useRoute<
    RouteProp<
      Record<string, InfoBovinoRouteParams>,
      'InfoBovino'
    >
  >()
const newsItem = route.params?.newsItem

  const handleReportPress = () => {
    console.log('Report pressed');
  };

  const handleInformePress = () => {
    console.log('Informe pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{newsItem.nombre}</Text>
      <ScrollView style={styles.content}>
        <InfoSection bovino={newsItem} />
        <DataGrid />
        <ActionButtons onReportPress={handleReportPress} onInformePress={handleInformePress} />
      </ScrollView>
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


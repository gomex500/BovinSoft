import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Divider, IconButton } from 'react-native-paper';
import { CareEvent } from '../../interfaces/CareEvent';
import { Header } from '../CattleReproduction/Header';

interface CareEventDetailViewProps {
  event: CareEvent;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export function CareEventDetailView({ event, onEdit, onDelete, onBack }: CareEventDetailViewProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detalles del evento" leftAction={onBack} />
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.row}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.value}>{event.date}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>Tipo:</Text>
              <Text style={[styles.value, styles.typeText]}>{event.type}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>Descripción:</Text>
            </View>
            <Text style={styles.description}>{event.description}</Text>
            <Divider style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>Realizado por:</Text>
              <Text style={styles.value}>{event.performedBy}</Text>
            </View>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <IconButton icon="pencil" onPress={onEdit} iconColor="#1B5E20" />
            <IconButton icon="delete" onPress={onDelete} iconColor="#FF6B6B" />
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  typeText: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  actions: {
    justifyContent: 'flex-end',
  },
});


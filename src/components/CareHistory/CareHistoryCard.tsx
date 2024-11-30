import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { CareEvent } from '../../interfaces/CareEvent';

interface CareHistoryCardProps {
  event: CareEvent;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CareHistoryCard({ event, onPress, onEdit, onDelete }: CareHistoryCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Text style={styles.date}>{event.date}</Text>
            <Text style={styles.type}>{event.type}</Text>
          </View>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{event.description}</Text>
          <Text style={styles.performedBy}>Realizado por: {event.performedBy}</Text>
        </Card.Content>
        <Card.Actions>
          <IconButton icon="pencil" onPress={onEdit} iconColor="#1B5E20" />
          <IconButton icon="delete" onPress={onDelete} iconColor="#FF6B6B" />
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  performedBy: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});


import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CareEvent } from '../../views/BovineCareCalendar';

interface EventListProps {
  events: CareEvent[];
}

export function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay eventos para esta fecha</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.eventItem}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDescription}>{item.description}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  eventItem: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  eventDescription: {
    marginTop: 5,
    color: '#333',
  },
});


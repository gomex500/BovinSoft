import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { CareEvent } from '../../views/BovineCareCalendar';
import { IBovine } from '../../interfaces/Livestock';
import { EventItem } from './EventItem';

interface EventListProps {
  events: CareEvent[];
  selectedDate: string;
  bovino: IBovine;
  bovinosChoose: IBovine[];
  typeView: "cattle" | "farm" 
}

export function EventList({ events, selectedDate, bovino, bovinosChoose, typeView }: EventListProps) {
  if (events.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Paragraph>No hay eventos para el {selectedDate}</Paragraph>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (<EventItem item={item} bovino={bovino} bovinosChoose={bovinosChoose} typeView={typeView} />)}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  chip: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
});


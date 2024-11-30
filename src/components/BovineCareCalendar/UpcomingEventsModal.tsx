import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Modal, Portal, Button, Card, Title, Paragraph, Chip, useTheme, MD3LightTheme } from 'react-native-paper';
import { CareEvent } from '../../views/BovineCareCalendar';
import { IBovine } from '../../interfaces/Livestock';
import { EventItem } from './EventItem';

interface UpcomingEventsModalProps {
  visible: boolean;
  onClose: () => void;
  events: CareEvent[];
  bovino: IBovine;
  bovinosChoose: IBovine[];
  typeView: "cattle" | "farm" 
}

export function UpcomingEventsModal({ visible, onClose, events, bovino, bovinosChoose, typeView }: UpcomingEventsModalProps) {
  const theme = useTheme();

  const getEventTypeColor = (type: CareEvent['type']) => {
    switch (type) {
      case 'health':
        return theme.colors.error;
      case 'feeding':
        return theme.colors.primary;
      case 'breeding':
        return '#FF4081';
      default:
        return "#1B5E20";
    }
  };

  const getEventTypeLabel = (type: CareEvent['type']) => {
    switch (type) {
      case 'health':
        return 'Salud';
      case 'feeding':
        return 'Alimentación';
      case 'breeding':
        return 'Reproducción';
      default:
        return 'Otro';
    }
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Title style={styles.title}>Próximos eventos</Title>
        <FlatList
          data={sortedEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (<EventItem item={item} bovino={bovino} bovinosChoose={bovinosChoose} typeView={typeView} />)}
        />
        <Button onPress={onClose} style={styles.closeButton}>Cerrar</Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  title: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  chip: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  closeButton: {
    marginTop: 16,
  },
});


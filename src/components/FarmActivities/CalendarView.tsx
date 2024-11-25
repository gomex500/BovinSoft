import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, List, Avatar, FAB } from 'react-native-paper';
import { Calendar, DateData } from 'react-native-calendars';
import { FarmActivity, Field } from '../../interfaces/IFarmActivity';

interface CalendarViewProps {
  visible: boolean;
  onClose: () => void;
  fields: Field[];
  onActivityPress: (activity: FarmActivity) => void;
}

export function CalendarView({ visible, onClose, fields, onActivityPress }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getActivityIcon = (type: FarmActivity['type']) => {
    switch (type) {
      case 'planting': return 'seed';
      case 'harvesting': return 'barley';
      case 'maintenance': return 'wrench';
      case 'animal-care': return 'paw';
      default: return 'calendar';
    }
  };

  const getStatusColor = (status: FarmActivity['status']) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FFA000';
      case 'pending': return '#F44336';
      default: return '#000000';
    }
  };

  const markedDates = fields.reduce((acc, field) => {
    field.activities.forEach(activity => {
      const dateString = activity.date.split('T')[0];
      if (!acc[dateString]) {
        acc[dateString] = { marked: true, dotColor: getStatusColor(activity.status) };
      }
    });
    return acc;
  }, {} as { [key: string]: { marked: boolean; dotColor: string } });

  const allActivities = fields.flatMap(field => field.activities);

  const handleDayPress = useCallback((day: DateData) => {
    setSelectedDate(day.dateString);
  }, []);

  const activitiesForSelectedDate = selectedDate
    ? allActivities.filter(activity => activity.date.startsWith(selectedDate))
    : [];

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Calendar View</Text>
          <Button onPress={onClose}>Close</Button>
        </View>
        <Calendar
          markedDates={{
            ...markedDates,
            [selectedDate || '']: {
              ...markedDates[selectedDate || ''],
              selected: true,
              selectedColor: '#1B5E20',
            },
          }}
          onDayPress={handleDayPress}
          theme={{
            todayTextColor: '#1B5E20',
            selectedDayBackgroundColor: '#1B5E20',
            selectedDayTextColor: '#ffffff',
          }}
        />
        <ScrollView style={styles.activitiesList}>
          {selectedDate && (
            <Text style={styles.dateHeader}>
              Activities for {new Date(selectedDate).toLocaleDateString()}
            </Text>
          )}
          {activitiesForSelectedDate.map((activity) => (
            <List.Item
              key={activity.id}
              title={activity.description}
              description={`${activity.type} - ${activity.status}`}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon={getActivityIcon(activity.type)}
                  style={{ backgroundColor: getStatusColor(activity.status) }}
                />
              )}
              onPress={() => onActivityPress(activity)}
            />
          ))}
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => {/* Open add activity modal */}}
          label="Add Activity"
        />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    
margin: 0,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  activitiesList: {
    marginTop: 20,
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1B5E20',
  },
});


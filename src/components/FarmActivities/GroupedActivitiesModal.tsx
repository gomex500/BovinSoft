import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, List, Avatar, ProgressBar } from 'react-native-paper';
import { FarmActivity } from '../../interfaces/IFarmActivity';

interface GroupedActivitiesModalProps {
  visible: boolean;
  onClose: () => void;
  activities: FarmActivity[];
  onActivityPress: (activity: FarmActivity) => void;
}

export function GroupedActivitiesModal({ visible, onClose, activities, onActivityPress }: GroupedActivitiesModalProps) {
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

  const calculateOverallProgress = () => {
    const totalProgress = activities.reduce((sum, activity) => sum + activity.progress, 0);
    return totalProgress / activities.length / 100;
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.title}>Activities for {activities[0]?.date}</Text>
        <ProgressBar progress={calculateOverallProgress()} color="#1B5E20" style={styles.progressBar} />
        <ScrollView style={styles.scrollView}>
          {activities.map((activity) => (
            <List.Item
              key={activity.id}
              title={activity.description}
              description={`Status: ${activity.status} | Progress: ${activity.progress}% | Priority: ${activity.priority}`}
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
        <Button onPress={onClose} mode="contained" style={styles.closeButton}>Close</Button>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
  },
  progressBar: {
    marginBottom: 20,
    height: 8,
    borderRadius: 4,
  },
});


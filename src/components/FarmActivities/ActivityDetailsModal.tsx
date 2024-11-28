import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, ProgressBar } from 'react-native-paper';

interface ActivityDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  activity: any;
}

export function ActivityDetailsModal({ visible, onClose, activity }: ActivityDetailsModalProps) {
  if (!activity) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FFA000';
      case 'pending': return '#F44336';
      default: return '#000000';
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.title}>Activity Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{activity.type}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{activity.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{activity.description}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, { color: getStatusColor(activity.status) }]}>{activity.status}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.label}>Progress:</Text>
          <ProgressBar progress={activity.progress / 100} color={getStatusColor(activity.status)} style={styles.progressBar} />
          <Text style={styles.progressText}>{activity.progress}%</Text>
        </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    flex: 1,
  },
  value: {
    flex: 2,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  progressText: {
    textAlign: 'right',
    marginTop: 5,
  },
  closeButton: {
    marginTop: 20,
  },
});


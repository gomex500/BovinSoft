import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, SegmentedButtons } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddActivityModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (activity: any) => void;
  existingActivities: any[];
}

export function AddActivityModal({ visible, onClose, onAdd, existingActivities }: AddActivityModalProps) {
  const [type, setType] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    const newActivity = {
      id: Date.now().toString(),
      type,
      date: date.toISOString().split('T')[0],
      description,
      status: 'pending',
      progress: 0,
    };
    onAdd(newActivity);
    onClose();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.title}>Add New Activity</Text>
        <SegmentedButtons
          value={type}
          onValueChange={setType}
          buttons={[
            { value: 'planting', label: 'Planting' },
            { value: 'harvesting', label: 'Harvesting' },
            { value: 'maintenance', label: 'Maintenance' },
            { value: 'animal-care', label: 'Animal Care' },
          ]}
          style={styles.segmentedButtons}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <Button onPress={() => setShowDatePicker(true)} mode
="outlined" style={styles.dateButton}>
          {date.toDateString()}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
        <View style={styles.buttonContainer}>
          <Button onPress={onClose} style={styles.button}>Cancel</Button>
          <Button onPress={handleSubmit} mode="contained" style={styles.button}>Add Activity</Button>
        </View>
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
  segmentedButtons: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  dateButton: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 10,
  },
});


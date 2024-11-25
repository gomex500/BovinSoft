import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, List, IconButton, RadioButton } from 'react-native-paper';
import { ReproductiveEvent, ReproductiveEventType } from '../../interfaces/ReproductiveEvent';

interface AddEventModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (event: ReproductiveEvent) => void;
  existingEvents: ReproductiveEvent[];
}

const eventOrder: ReproductiveEventType[] = ['proestrus', 'insemination', 'gestation', 'parturition'];

export function AddEventModal({ visible, onClose, onAdd, existingEvents }: AddEventModalProps) {
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [treatments, setTreatments] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<{ name: string; value: string; unit?: string }[]>([]);
  const [newTreatment, setNewTreatment] = useState('');
  const [newTestName, setNewTestName] = useState('');
  const [newTestValue, setNewTestValue] = useState('');
  const [newTestUnit, setNewTestUnit] = useState('');
  const [inseminationMethod, setInseminationMethod] = useState<'artificial' | 'natural'>('artificial');
  const [fatherName, setFatherName] = useState('');

  const determineNextEventType = (): ReproductiveEventType | null => {
    if (existingEvents.length === 0) return 'proestrus';
    const lastEventType = existingEvents[existingEvents.length - 1].type;
    const nextIndex = eventOrder.indexOf(lastEventType) + 1;
    return nextIndex < eventOrder.length ? eventOrder[nextIndex] : null;
  };

  const nextEventType = determineNextEventType();

  const handleAdd = () => {
    if (date && nextEventType) {
      const newEventDate = new Date(date);

      // Validar que la fecha ingresada sea válida
    if (isNaN(newEventDate.getTime())) {
      Alert.alert('Invalid date.', 'Please enter a valid date in the format YYYY-MM-DD.');
      return;
    }
      
      // Obtener la fecha del último evento existente
      const lastEvent = existingEvents[existingEvents.length - 1];
      const lastEventDate = lastEvent ? new Date(lastEvent.date) : null;
  
      // Validar que la fecha del nuevo evento sea mayor que la del último evento
      if (lastEventDate && newEventDate <= lastEventDate) {
        Alert.alert('Invalid date.', 'The date must be greater than the last event date.' );
        return;
      }
  
      const newEvent: ReproductiveEvent = {
        id: Date.now().toString(),
        type: nextEventType,
        date,
        notes: notes.trim() || undefined,
        treatments: treatments.length > 0 ? treatments : undefined,
        testResults: testResults.length > 0 ? testResults : undefined,
      };
  
      if (nextEventType === 'insemination') {
        newEvent.inseminationMethod = inseminationMethod;
        if (inseminationMethod === 'natural') {
          newEvent.fatherName = fatherName.trim() || undefined;
        }
      }
  
      onAdd(newEvent);
      resetForm();
    } else {
      Alert.alert('Invalid event type.', 'Please fill in the date and ensure an event type is selected.' );
    }
  };

  const resetForm = () => {
    setDate('');
    setNotes('');
    setTreatments([]);
    setTestResults([]);
    setNewTreatment('');
    setNewTestName('');
    setNewTestValue('');
    setNewTestUnit('');
    setInseminationMethod('artificial');
    setFatherName('');
  };

  const addTreatment = () => {
    if (newTreatment.trim()) {
      setTreatments([...treatments, newTreatment.trim()]);
      setNewTreatment('');
    }
  };

  const addTestResult = () => {
    if (newTestName.trim() && newTestValue.trim()) {
      setTestResults([...testResults, {
        name: newTestName.trim(),
        value: newTestValue.trim(),
        unit: newTestUnit.trim() || undefined,
      }]);
      setNewTestName('');
      setNewTestValue('');
      setNewTestUnit('');
    }
  };

  if (!nextEventType) {
    return (
      <Portal>
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.title}>Reproduction Cycle Complete</Text>
          <Text>This reproduction cycle is finished. No more events can be added.</Text>
          <Button onPress={onClose} style={styles.button}>Close</Button>
        </Modal>
      </Portal>
    );
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.title}>Add {nextEventType.charAt(0).toUpperCase() + nextEventType.slice(1)} Event</Text>
          <TextInput
            label="Date (YYYY-MM-DD)"
            value={date}
            onChangeText={setDate}
            style={styles.input}
          />
          {nextEventType === 'insemination' && (
            <View>
              <Text style={styles.sectionTitle}>Insemination Method</Text>
              <RadioButton.Group onValueChange={(value) => setInseminationMethod(value as 'artificial' | 'natural')} value={inseminationMethod}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Item label="Artificial" value="artificial" />
                  <RadioButton.Item label="Natural" value="natural" />
                </View>
              </RadioButton.Group>
              {inseminationMethod === 'natural' && (
                <TextInput
                  label="Father's Name"
                  value={fatherName}
                  onChangeText={setFatherName}
                  style={styles.input}
                />
              )}
            </View>
          )}
          <TextInput
            label="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            multiline
            style={styles.input}
          />
          <Text style={styles.sectionTitle}>Treatments</Text>
          <View style={styles.inputRow}>
            <TextInput
              label="New Treatment"
              value={newTreatment}
              onChangeText={setNewTreatment}
              style={[styles.input, styles.flex1]}
            />
            <IconButton icon="plus" onPress={addTreatment} />
          </View>
          <List.Section>
            {treatments.map((treatment, index) => (
              <List.Item
                key={index}
                title={treatment}
                left={() => <List.Icon icon="medical-bag" />}
                right={() => (
                  <IconButton
                    icon="close"
                    onPress={() => setTreatments(treatments.filter((_, i) => i !== index))}
                  />
                )}
              />
            ))}
          </List.Section>
          <Text style={styles.sectionTitle}>Test Results</Text>
          <View style={styles.inputRow}>
            <TextInput
              label="Test Name"
              value={newTestName}
              onChangeText={setNewTestName}
              style={[styles.input, styles.flex1]}
            />
            <TextInput
              label="Value"
              value={newTestValue}
              onChangeText={setNewTestValue}
              style={[styles.input, styles.flex1]}
            />
            <TextInput
              label="Unit"
              value={newTestUnit}
              onChangeText={setNewTestUnit}
              style={[styles.input, styles.flex1]}
            />
            <IconButton icon="plus" onPress={addTestResult} />
          </View>
          <List.Section>
            {testResults.map((result, index) => (
              <List.Item
                key={index}
                title={result.name}
                description={`${result.value}${result.unit ? ' ' + result.unit : ''}`}
                left={() => <List.Icon icon="flask" />}
                right={() => (
                  <IconButton
                    icon="close"
                    onPress={() => setTestResults(testResults.filter((_, i) => i !== index))}
                  />
                )}
              />
            ))}
          </List.Section>
          <View style={styles.buttonContainer}>
            <Button onPress={onClose} style={styles.button}>Cancel</Button>
            <Button onPress={handleAdd} style={styles.button} mode="contained">Add</Button>
          </View>
        </ScrollView>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  flex1: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 8,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
});


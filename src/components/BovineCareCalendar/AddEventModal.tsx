import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { CareEvent } from '../../views/BovineCareCalendar';

interface AddEventModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (event: CareEvent) => void;
  selectedDate: string;
}

export function AddEventModal({ isVisible, onClose, onAdd, selectedDate }: AddEventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (title.trim() && description.trim()) {
      onAdd({
        id: Date.now().toString(),
        date: selectedDate,
        title: title.trim(),
        description: description.trim(),
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Añadir evento de cuidado</Text>
          <TextInput
            style={styles.input}
            placeholder="Título del evento"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción del evento"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAdd}>
              <Text style={styles.buttonText}>Añadir evento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 4,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
  },
  addButton: {
    backgroundColor: '#1B5E20',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


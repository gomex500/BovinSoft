import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';

interface AddFieldModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddFieldModal({ visible, onClose, onAdd }: AddFieldModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.title}>Add New Field</Text>
        <TextInput
          label="Field Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={onClose} style={styles.button}>Cancel</Button>
          <Button onPress={handleSubmit} mode="contained" style={styles.button}>Add Field</Button>
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
  input: {
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


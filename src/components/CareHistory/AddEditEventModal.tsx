import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, TextInput, Button, Text } from 'react-native-paper';
import { CareEvent } from '../../interfaces/CareEvent';
import DatePickerInput from '../DataPicker';
import { formatDate } from '../../helpers/gen';
import { CustomSelect } from '../CustomSelect';

interface AddEditEventModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (event: CareEvent) => void;
  event: CareEvent | null;
}

export function AddEditEventModal({ visible, onClose, onSave, event }: AddEditEventModalProps) {
  const [date, setDate] = useState<Date | string>(new Date());
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [performedBy, setPerformedBy] = useState('');

  useEffect(() => {
    if (event) {
      setDate(event.date);
      setType(event.type);
      setDescription(event.description);
      setPerformedBy(event.performedBy);
    } else {
      // setDate('');
      setType('');
      setDescription('');
      setPerformedBy('');
    }
  }, [event]);

  const handleSave = () => {
    const newEvent: CareEvent = {
      id: event ? event.id : Date.now().toString(),
      date: formatDate(date),
      type,
      description,
      performedBy,
    };
    onSave(newEvent);
    onClose();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.title}>{event ? 'Editar evento de atención' : 'Añadir evento de atención'}</Text>
        <DatePickerInput date={date} setDate={setDate}>
          {(setShow) => (
            <TextInput
            label="Fecha"
            value={formatDate(date)}
            onPress={() => setShow(true)}
            onChangeText={() => setShow(true)}
            left={<TextInput.Icon icon="calendar" />}
            multiline
          />
          )}
        </DatePickerInput>
        <TextInput
          label="Descripción"
          value={description}
          onChangeText={setDescription}
          left={<TextInput.Icon icon="card-text-outline" />}
          multiline
          style={styles.input}
        />
        <TextInput
          label="Realizado por"
          value={performedBy}
          left={<TextInput.Icon icon="account" />}
          onChangeText={setPerformedBy}
          style={styles.input}
        />
        <CustomSelect
          placeholder="Seleccione un tipo de evento"
          options={[
            { value: 'Vacunación', label: 'Vacunación' },
            { value: 'Revisión', label: 'Revisión' },
            { value: 'Desparasitación', label: 'Desparasitación' },
            { value: 'Recorte de pezuñas', label: 'Recorte de pezuñas' },
            { value: 'Evaluación nutricional', label: 'Evaluación nutricional' },
          ]}
          selectedValue={type}
          onValueChange={setType}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={onClose} style={styles.button} textColor='#fff' buttonColor="#FF6B6B">Cancelar</Button>
          <Button onPress={handleSave} style={styles.button} textColor='#fff' buttonColor="#1B5E20">Guardar</Button>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1B5E20',
  },
  input: {
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    marginLeft: 8,
  },
});


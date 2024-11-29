import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Modal, Portal, Button, TextInput, Title, SegmentedButtons } from 'react-native-paper';
import { CareEvent } from '../../views/BovineCareCalendar';
import { IBovine } from '../../interfaces/Livestock';
import { CustomSelect } from '../CustomSelect';

interface AddEventModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (event: CareEvent) => Promise<void>;
  selectedDate: string;
  animal: IBovine
  typeView: "cattle" | "farm"
  bovinosChoose: IBovine[]
}

export function AddEventModal({ visible, onClose, onAdd, selectedDate, animal, typeView, bovinosChoose }: AddEventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<CareEvent['type']>('other');
  const [bovinoId, setBovinoId] = useState(typeView === "cattle" ? animal.name : '');

  const handleAdd = async () => {
    if (title.trim() && description.trim()) {
      const today = new Date();
      const eventDate = new Date(selectedDate);
      
      if (eventDate <= today) {
        alert('Solo se pueden crear eventos para fechas futuras.');
        return;
      }

      await onAdd({
        id: Date.now().toString(),
        date: selectedDate,
        title: title.trim(),
        description: description.trim(),
        type,
        bovinoId: typeView === 'cattle' ? animal.id : bovinoId,
      });
      
      setTitle('');
      setDescription('');
      setType('other');
    } else {
      Alert.alert('Algunos campos no han sido completados', 'Por favor, rellena todos los campos antes de guardar el evento.');
    }
  };

  let name = bovinosChoose.find((item) => item.id === bovinoId)?.name

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Title style={styles.title}>Nuevo cuidado {typeView === "cattle" && `a ${animal.identifier}`}</Title>
        {typeView === "farm" && (
          <CustomSelect
          placeholder="Seleccione un bovino"
          options={
            bovinosChoose.map((item) => ({
              label: item.name,
              value: item.id,
            }))
          }
          selectedValue={bovinoId}
          onValueChange={(value) => setBovinoId(value)}
        >
          {(toggleModal) => (
            <Button textColor='#0D0D0D' onPress={() => toggleModal()} mode="outlined" style={styles.input}>
              Bovino: {name || 'Seleccionar'}
            </Button>
          )}
        </CustomSelect>
        )}
        <TextInput
          label="Título"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          label="Descripción"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          style={styles.input}
        />
        <SegmentedButtons
          value={type}
          onValueChange={(value) => setType(value as CareEvent['type'])}
          buttons={[
            { value: 'health', label: 'Salud' },
            { value: 'feeding', label: 'Alimentación' },
            { value: 'breeding', label: 'Reproducción' },
            { value: 'other', label: 'Otro' },
          ]}
          style={styles.segmentedButtons}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={onClose} style={styles.button}>Cancelar</Button>
          <Button mode="contained" onPress={handleAdd} style={styles.button}>Añadir</Button>
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
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  segmentedButtons: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 10,
  },
});


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, SegmentedButtons, ActivityIndicator } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IBovine } from '../../interfaces/Livestock';
import { CustomSelect } from '../CustomSelect';
import { useFincaStore } from '../../store/fincaStore';
import { useAuthStore } from '../../store/authStore';
import moment from 'moment';
import { parse } from '@babel/core';

interface CattleDetailsModalProps {
  visible: boolean;
  animal: IBovine | null;
  onClose: () => void;
  onUpdate: (animal: IBovine) => Promise<void>;
  onDelete: (id: string) => void;
}

export function CattleDetailsModal({ visible, animal, onClose, onUpdate, onDelete }: CattleDetailsModalProps) {
  const [editedAnimal, setEditedAnimal] = useState<IBovine | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const { obtenerFincaPorUsuario, fincas, fincaSelected } = useFincaStore()
  const { user } = useAuthStore()

  useEffect(() => {
    const fetchData = async () => {
      await obtenerFincaPorUsuario();
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (animal) {
      setEditedAnimal({ ...animal });
    }
  }, [animal]);

  if (!editedAnimal) return null;

  const handleUpdate = async () => {
    setLoadingUpdate(true);
    if (editedAnimal && validateForm()) {
      await onUpdate(editedAnimal);
    }
    setLoadingUpdate(false);
  };

  const handleDelete = () => {
    if (editedAnimal) {
      onDelete(editedAnimal.id);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!editedAnimal.breed) newErrors.breed = "Breed is required";
    if (!editedAnimal.farmId) newErrors.location = "Location is required";
    if (editedAnimal.weight <= 0) newErrors.weight = "Weight must be greater than 0";
    if (!editedAnimal.name) newErrors.name = "Name is required";
    if (!editedAnimal.image) newErrors.image = "Image is required";
    if (!editedAnimal.type) newErrors.type = "Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.title}>Detalles del ganado</Text>
          <TextInput
            label="Nombre"
            value={editedAnimal.name}
            onChangeText={(text) => setEditedAnimal({ ...editedAnimal, name: text })}
            style={styles.input}
            error={!!errors.name}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          <TextInput
            label="Imagen"
            value={editedAnimal.image}
            onChangeText={(text) => setEditedAnimal({ ...editedAnimal, image: text })}
            style={styles.input}
            error={!!errors.image}
          />
          <TextInput
            label="Raza"
            value={editedAnimal.breed}
            onChangeText={(text) => setEditedAnimal({ ...editedAnimal, breed: text })}
            style={styles.input}
            error={!!errors.breed}
            selectionColor='#1B4725'
            outlineColor='#1B4725'
            textColor='#1B4725'
            placeholderTextColor='#1B4725'
            activeOutlineColor='#1B4725'
            cursorColor='#1B4725'
            underlineColor='#1B4725'
          />
          {errors.breed && <Text style={styles.errorText}>{errors.breed}</Text>}
          <TextInput
            label="Peso (kg)"
            value={editedAnimal.weight.toString()}
            onChangeText={(text) => setEditedAnimal({ ...editedAnimal, weight: parseFloat(text) || 0 })}
            keyboardType="numeric"
            style={styles.input}
            error={!!errors.weight}
          />
          {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
          <CustomSelect
            placeholder="Seleccione un tipo de ganado"
            options={
              user.rol === 'ADMIN'
                ? [
                    {
                      label: fincaSelected.nombre,
                      value: fincaSelected._id,
                    },
                  ]
                : fincas && fincas.length > 0
                ? fincas.map((finca) => ({
                    label: finca.nombre,
                    value: finca._id as string,
                  }))
                : []}
            selectedValue={
              user.rol === 'ADMIN'
                ? (fincaSelected._id as string)
                : editedAnimal.farmId
            }
            onValueChange={(value) => setEditedAnimal({ ...editedAnimal, farmId: value as IBovine['farmId'], farmStr: fincas.find((item) => item._id === value)?.nombre })}
          >
            {(toggleModal) => (
              <Button disabled={user.rol === 'ADMIN'} textColor='#0D0D0D' onPress={() => toggleModal()} mode="outlined" style={styles.input}>
                Finca: {editedAnimal.farmStr}
              </Button>
            )}
          </CustomSelect>
          <Button onPress={() => setShowDatePicker(true)} textColor='#0D0D0D' mode="outlined" style={styles.input}>
            Fecha de nacimiento: {moment(editedAnimal.dateOfBirth).toDate().toLocaleDateString()}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={moment(editedAnimal.dateOfBirth).toDate()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setEditedAnimal({ ...editedAnimal, dateOfBirth: selectedDate.toISOString().split('T')[0] });
                }
              }}
            />
          )}
          <SegmentedButtons
            value={editedAnimal.status}
            onValueChange={(value) => setEditedAnimal({ ...editedAnimal, status: value as IBovine['status'] })}
            theme={{ colors: { secondaryContainer:  "rgba(27, 71, 37, 0.2)" } }}
            buttons={[
              { value: 'saludable', label: 'Saludable' },
              { value: 'enfermo', label: 'Enfermo' },
              { value: 'embarazada', label: 'Embarazada' },
              { value: 'lactancia', label: 'Lactancia' },
            ]}
            style={styles.segmentedButtons}
          />
          <SegmentedButtons
            theme={{ colors: { secondaryContainer:  "rgba(27, 71, 37, 0.2)" } }}
            value={editedAnimal.type}
            onValueChange={(value) => setEditedAnimal({ ...editedAnimal, type: value as IBovine['type'] })}
            buttons={[
              { value: 'carne', label: 'Carne' },
              { value: 'leche', label: 'Leche' },
              { value: 'mixto', label: 'Mixto' },
            ]}
            style={styles.segmentedButtons}
          />
          <SegmentedButtons
            theme={{ colors: { secondaryContainer:  "rgba(27, 71, 37, 0.2)" } }}
            value={editedAnimal.gender}
            onValueChange={(value) => setEditedAnimal({ ...editedAnimal, gender: value as 'macho' | 'hembra' })}
            buttons={[
              { value: 'macho', label: 'Macho' },
              { value: 'hembra', label: 'Hembra' },
            ]}
            style={styles.segmentedButtons}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={handleUpdate} mode="contained" buttonColor='#1B4725' style={styles.button}>
              {
                loadingUpdate ? <ActivityIndicator size={20} color="#1B4725" /> : 'Actualizar'
              }
            </Button>
            <Button onPress={handleDelete} mode="contained" buttonColor='#db3030' style={styles.button}>
              Eliminar
            </Button>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1B4725',
  },
  input: {
    marginBottom: 15,
    backgroundColor: "rgba(27, 71, 37, 0.2)",
  },
  segmentedButtons: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});


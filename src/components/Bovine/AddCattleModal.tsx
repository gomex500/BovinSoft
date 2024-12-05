import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  Modal,
  Portal,
  Text,
  Button,
  TextInput,
  SegmentedButtons,
  ActivityIndicator,
} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { IBovine } from '../../interfaces/Livestock'
import { CustomSelect } from '../CustomSelect'
import { useAuthStore } from '../../store/authStore'
import { useFincaStore } from '../../store/fincaStore'
import moment from 'moment'
import { useSnackbarStore } from '../../store/snackbarStore'
import { RolType } from '../../interfaces/IUser'

interface AddCattleModalProps {
  visible: boolean
  onClose: () => void
  onAdd: (animal: IBovine) => Promise<void>
}

export function AddCattleModal({
  visible,
  onClose,
  onAdd,
}: AddCattleModalProps) {
  const [newAnimal, setNewAnimal] = useState<Omit<IBovine, 'id'>>({
    identifier: '',
    breed: '',
    dateOfBirth: new Date().toISOString().split('T')[0],
    status: 'saludable',
    farmId: 'North Pasture',
    weight: 0,
    gender: 'hembra',
    name: '',
    type: 'carne',
    image: '',
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)

  const { obtenerFincaPorUsuario, fincas, fincaSelected } = useFincaStore.getState()
  const { user } = useAuthStore.getState()

  let fincaId = (fincaSelected?._id as string)
  let nombreFinca = (fincaSelected?.nombre as string)
  let userRol = (user?.rol as RolType)

  useEffect(() => {
    const fetchData = async () => {
      await obtenerFincaPorUsuario()
    }

    fetchData()
  }, [])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!newAnimal.breed) newErrors.breed = 'Breed is required'
    if (!newAnimal.farmId) newErrors.location = 'Location is required'
    if (newAnimal.weight <= 0)
      newErrors.weight = 'Weight must be greater than 0'
    if (!newAnimal.name) newErrors.name = 'Name is required'
    if (!newAnimal.type) newErrors.type = 'Type is required'
    if (!newAnimal.image) newErrors.image = 'Image is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAdd = async () => {
    setLoading(true)
    if (validateForm()) {
      await onAdd(newAnimal as IBovine)
      useSnackbarStore.getState().dispatchSnackbar('Ganado añadido con éxito')
      onClose()
    }
    setLoading(false)
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <ScrollView>
          <Text style={styles.title}>Añadir nuevo ganado</Text>
          <TextInput
            label="Name"
            placeholder='Nombre'
            value={newAnimal.name}
            onChangeText={(text) => setNewAnimal({ ...newAnimal, name: text })}
            style={styles.input}
            error={!!errors.name}
            testID='Name'
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          <TextInput
            label="Image"
            value={newAnimal.image}
            onChangeText={(text) => setNewAnimal({ ...newAnimal, image: text })}
            style={styles.input}
            error={!!errors.image}
            testID='Image'
          />
          {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}
          <TextInput
            label="Breed"
            value={newAnimal.breed}
            onChangeText={(text) => setNewAnimal({ ...newAnimal, breed: text })}
            style={styles.input}
            error={!!errors.breed}
            testID='Breed'
          />
          {errors.breed && <Text style={styles.errorText}>{errors.breed}</Text>}
          <TextInput
            label="Weight (kg)"
            value={newAnimal.weight.toString()}
            onChangeText={(text) =>
              setNewAnimal({ ...newAnimal, weight: parseFloat(text) || 0 })
            }
            keyboardType="numeric"
            style={styles.input}
            error={!!errors.weight}
            testID='Weight'
          />
          {errors.weight && (
            <Text style={styles.errorText}>{errors.weight}</Text>
          )}
          <CustomSelect
            placeholder="Seleccione una finca"
            options={
              user && user.rol === 'ADMIN'
                ? [
                    {
                      label: nombreFinca,
                      value: fincaId,
                    },
                  ]
                : fincas && fincas.length > 0
                ? fincas.map((finca) => ({
                    label: finca.nombre,
                    value: (finca._id as string) || '',
                  }))
                : []
            }
            selectedValue={
              user && user.rol === 'ADMIN'
                ? fincaId
                : newAnimal.farmId
            }
            onValueChange={(value) => {
              let nombre = ((fincas && fincas.find((item) => item._id === value))?.nombre as string)

              setNewAnimal({
                ...newAnimal,
                farmId: value as IBovine['farmId'],
                farmStr: nombre,
              })
            }
             
            }
          >
            {(toggleModal) => (
              <Button
                disabled={userRol === 'ADMIN'}
                textColor="#0D0D0D"
                onPress={() => toggleModal()}
                mode="outlined"
                style={styles.input}
              >
                Finca: {newAnimal.farmStr || 'Seleccionar'}
              </Button>
            )}
          </CustomSelect>
          {errors.location && (
            <Text style={styles.errorText}>{errors.location}</Text>
          )}
          <Button
            onPress={() => setShowDatePicker(true)}
            textColor="#0D0D0D"
            mode="outlined"
            style={styles.input}
          >
            Fecha de nacimiento:{' '}
            {moment(newAnimal.dateOfBirth).toDate().toLocaleDateString()}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={moment(newAnimal.dateOfBirth).toDate()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false)
                if (selectedDate) {
                  setNewAnimal({
                    ...newAnimal,
                    dateOfBirth: selectedDate.toISOString().split('T')[0],
                  })
                }
              }}
            />
          )}
          <SegmentedButtons
            value={newAnimal.status}
            onValueChange={(value) =>
              setNewAnimal({ ...newAnimal, status: value as IBovine['status'] })
            }
            theme={{ colors: { secondaryContainer: 'rgba(27, 71, 37, 0.2)' } }}
            buttons={[
              { value: 'saludable', label: 'Saludable' },
              { value: 'enfermo', label: 'Enfermo' },
              { value: 'embarazada', label: 'Embarazada' },
              { value: 'lactancia', label: 'Lactancia' },
            ]}
            style={styles.segmentedButtons}
          />
          <SegmentedButtons
            value={newAnimal.type}
            onValueChange={(value) =>
              setNewAnimal({ ...newAnimal, type: value as IBovine['type'] })
            }
            theme={{ colors: { secondaryContainer: 'rgba(27, 71, 37, 0.2)' } }}
            buttons={[
              { value: 'carne', label: 'Carne' },
              { value: 'leche', label: 'Leche' },
              { value: 'mixto', label: 'Mixto' },
            ]}
            style={styles.segmentedButtons}
          />
          <SegmentedButtons
            value={newAnimal.gender}
            onValueChange={(value) =>
              setNewAnimal({
                ...newAnimal,
                gender: value as 'macho' | 'hembra',
              })
            }
            theme={{ colors: { secondaryContainer: 'rgba(27, 71, 37, 0.2)' } }}
            buttons={[
              { value: 'macho', label: 'Macho' },
              { value: 'hembra', label: 'Hembra' },
            ]}
            style={styles.segmentedButtons}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={onClose} style={styles.button} textColor="#1B4725">
              Cancelar
            </Button>
            <Button
              onPress={handleAdd}
              mode="contained"
              buttonColor="#1B4725"
              style={styles.button}
            >
              {loading ? (
                <ActivityIndicator testID='activity-indicator' size={20} color="#1B4725" />
              ) : (
                'Crear'
              )}
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  )
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
    backgroundColor: 'rgba(27, 71, 37, 0.2)',
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
})

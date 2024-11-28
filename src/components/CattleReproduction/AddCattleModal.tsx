import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { IBovine } from '../../interfaces/Livestock';
import { CustomSelect } from '../CustomSelect';

interface AddCattleModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, bovinoId: string) => Promise<void>
  animal: IBovine
  type: "cattle" | "farm"
  bovinos: IBovine[]
}

export function AddCattleModal({ visible, onClose, onAdd, animal, type, bovinos }: AddCattleModalProps) {
  const [name, setName] = useState(type === "cattle" ? animal.name : '');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    name === "" && Alert.alert("Campo obligatorio", "El nombre del bovino es obligatorio");

    if (name.trim()) {
      if (type === "cattle") {
        await onAdd(name.trim(), animal.id);
      } else if (type === "farm") {
        await onAdd(name.trim(), bovinos.find((item) => item.name === name.trim())?.id);
      }

      setName('');
    }
    setLoading(false);
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.title}>Nuevo ciclo reproductivo</Text>
        {type === "cattle" && (
          <TextInput
            label="Bovino *"
            value={name}
            onChangeText={setName}
            style={styles.input}
            disabled={true}
          />
        )}
        {type === "farm" && (
          <CustomSelect
          placeholder="Seleccione un tipo de ganado"
          options={
            bovinos.map((item) => ({
              label: item.name,
              value: item.id,
            }))
          }
          selectedValue={name}
          onValueChange={(value) => setName(bovinos.find((item) => item.id === value)?.name)}
        >
          {(toggleModal) => (
            <Button textColor='#0D0D0D' onPress={() => toggleModal()} mode="outlined" style={styles.input}>
              Bovino: {name || 'Seleccionar'}
            </Button>
          )}
        </CustomSelect>
        )}
        <View style={styles.buttonContainer}>
          <Button onPress={onClose} textColor='#fff' style={styles.button} buttonColor='#db3030'>Cancelar</Button>
          <Button onPress={handleAdd} style={styles.button} mode="contained" buttonColor="#1B5E20">
            {
              loading ? <ActivityIndicator size={20} color="#fff" /> : 'Crear'
            }
          </Button>
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
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 8,
  },
});


import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Switch } from 'react-native-paper';
import { RolType, UserModel } from '../../interfaces/IUser';
import * as ImagePicker from 'expo-image-picker';

interface AddEditUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (user: UserModel) => void;
  user?: UserModel;
}

export function AddEditUserModal({ visible, onClose, onSave, user }: AddEditUserModalProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<RolType>('OWNER');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [premiumUser, setPremiumUser] = useState(false);
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setEmail(user.email);
      setRole(user.rol);
      setStatus(user.status);
      setPremiumUser(user.tipoSuscripcion !== 'básica');
    } else {
      resetForm();
    }
  }, [user]);

  const resetForm = () => {
    setNombre('');
    setEmail('');
    setRole('OWNER');
    setStatus('active');
    setPremiumUser(false);
  };

  const handleSave = () => {
    const updatedUser: UserModel = {
      nombre,
      email,
      rol: role,
      status,
      create_at: user ? user.create_at : new Date(),
      tipoSuscripcion: premiumUser ? 'premium' : 'básica',
      image,
      password: password,
    };

    if (user) {
      updatedUser._id = user._id;
    }
    onSave(updatedUser);
    onClose();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
};

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.title}>{user ? 'Edit User' : 'Add New User'}</Text>
        <TextInput
          label="Name"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button onPress={pickImage} >
          <Text>Cambiar Imagen</Text>
        </Button>

        <View style={styles.switchContainer}>
          <Text>Dueño</Text>
          <Switch
            value={role === 'OWNER'}
            onValueChange={(value) => setRole(value ? 'OWNER' : 'ADMIN')}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text>Active</Text>
          <Switch
            value={status === 'active'}
            onValueChange={(value) => setStatus(value ? 'active' : 'inactive')}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text>Premium User</Text>
          <Switch
            value={premiumUser}
            onValueChange={setPremiumUser}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={onClose} style={styles.button}>Cancel</Button>
          <Button onPress={handleSave} mode="contained" style={styles.button}>Save</Button>
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
    marginBottom: 16,
    color: '#1B5E20',
  },
  input: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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


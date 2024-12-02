import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { 
  List, 
  FAB, 
  Portal, 
  Dialog, 
  Button, 
  TextInput,
  Provider as PaperProvider,
  Title,
  Paragraph,
  Avatar,
  Card,
  Chip,
  IconButton,
  Searchbar,
  useTheme,
  DefaultTheme
} from 'react-native-paper';
import { UserModel } from '../../interfaces/IUser';
import { crearUsuarioServices, getAllUsersService } from '../../services/userServices';
import { useAuthStore } from '../../store/authStore';

export default function WorkerManagementScreen({ route }: { route: { params: { farmId: string } }}) {
  const { farmId } = route.params;
  const [workers, setWorkers] = useState<UserModel[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<UserModel[]>(workers);
  const [showNewWorkerDialog, setShowNewWorkerDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthStore();
  const [newWorker, setNewWorker] = useState<Omit<UserModel, '_id' | 'rol'>>({
    nombre: '',
    email: '',
    fincaId: farmId,
    password: '123456789',
    image: 'https://picsum.photos/200',
    tipoSuscripcion: user.tipoSuscripcion,
    create_at: new Date(),
    direccion: '',
    exp: 0,
    status: 'active',
  });

  const theme = useTheme();

  theme.colors.primary = '#1B5E20';

  useEffect(() => {
    const fetchData = async () => {
      let users = await getAllUsersService();
      const farmWorkers = users.filter(worker => worker.fincaId === farmId);
      setWorkers(farmWorkers);
      setFilteredWorkers(farmWorkers);
    }

    fetchData();
  }, [farmId]);

  const handleAddWorker = async () => {
    const workerWithId: UserModel = {
      ...newWorker,
      rol: 'ADMIN',
    };

    let { id } = await crearUsuarioServices(workerWithId);

    workerWithId._id = id;

    const updatedWorkers = [...workers, workerWithId];
    setWorkers(updatedWorkers);
    setFilteredWorkers(updatedWorkers);
    setShowNewWorkerDialog(false);
    setNewWorker({
      nombre: '',
      email: '',
      fincaId: farmId,
      password: '123456789',
      image: 'https://picsum.photos/200',
      tipoSuscripcion: 'básica',
      create_at: new Date(),
      direccion: '',
      exp: 0,
      status: 'active',
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = workers.filter(worker => 
      worker.nombre.toLowerCase().includes(query.toLowerCase()) ||
      worker.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredWorkers(filtered);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <PaperProvider theme={theme}>
      <ImageBackground
        source={{ uri: 'https://picsum.photos/800/400?grayscale&blur=2' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <ScrollView style={styles.container}>
          <Title style={styles.title}>Empleados de la finca</Title>
          <Searchbar
            placeholder="Search workers"
            onChangeText={handleSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
          {filteredWorkers.map((worker) => (
            <Card key={worker._id} style={styles.workerCard}>
              <Card.Title
                title={worker.nombre}
                subtitle={worker.email}
                left={(props) => <Avatar.Image {...props} source={{ uri: worker.image }} />}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="dots-vertical"
                    onPress={() => {
                      // Handle worker options (e.g., edit, delete)
                      console.log('Options for worker:', worker.nombre);
                    }}
                  />
                )}
              />
              <Card.Content>
                <Paragraph>Address: {worker.direccion}</Paragraph>
                <Paragraph>Experience: {worker.exp} years</Paragraph>
                <Paragraph>Joined: {formatDate(new Date(worker.create_at))}</Paragraph>
                <View style={styles.chipContainer}>
                  <Chip icon="badge-account" style={styles.chip}>{worker.rol}</Chip>
                  <Chip icon="star" style={styles.chip}>{worker.tipoSuscripcion}</Chip>
                  <Chip 
                    icon={worker.status === 'active' ? 'check-circle' : 'alert-circle'} 
                    style={[ styles.chip ]}
                  >
                    {worker.status}
                  </Chip>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </ImageBackground>

      <Portal>
        <Dialog visible={showNewWorkerDialog} onDismiss={() => setShowNewWorkerDialog(false)}>
          <Dialog.Title>Add New Worker</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Name"
              value={newWorker.nombre}
              onChangeText={(text) => setNewWorker({ ...newWorker, nombre: text })}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={newWorker.email}
              onChangeText={(text) => setNewWorker({ ...newWorker, email: text })}
              mode="outlined"
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              label="Address"
              value={newWorker.direccion}
              onChangeText={(text) => setNewWorker({ ...newWorker, direccion: text })}
              mode="outlined"
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowNewWorkerDialog(false)}>Cancel</Button>
            <Button mode='contained' onPress={() => handleAddWorker()}>Add Worker</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        color='#fff'
        onPress={() => setShowNewWorkerDialog(true)}
        label="Add Worker"
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
    textAlign: 'center',
  },
  searchBar: {
    marginBottom: 16,
  },
  workerCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "rgba(27, 71, 37, 0.2)",
    color: '#fff'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1B5E20',
  },
  input: {
    marginBottom: 12,
  },
});


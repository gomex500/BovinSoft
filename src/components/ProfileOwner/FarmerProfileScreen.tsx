import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { 
  Avatar, 
  Button, 
  Card, 
  Title, 
  Paragraph, 
  TextInput, 
  Divider,
  Portal,
  Dialog,
  Provider as PaperProvider,
  FAB,
  List,
  useTheme,
  Chip,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FincaModel } from '../../interfaces/IFinca';
import { UserModel } from '../../interfaces/IUser';
import moment from 'moment';
import { useUserStore } from '../../store/userStore';
import { useAuthStore } from '../../store/authStore';
import { obtenerFincaPorUsuarioService } from '../../services/fincaServices';
import { PremiumRequest } from '../../interfaces/Admin';
import { usePremiumRequestStore } from '../../store/premiumRequestStore';
import { useSnackbarStore } from '../../store/snackbarStore';

interface Farm {
  id: string;
  name: string;
  location: string;
  size: number;
  livestockTypes: string[];
  totalAnimals: number;
}

interface Farmer extends UserModel {
  farms: FincaModel[];
}

const initialFarmer: Farmer = {
  _id: '1',
  nombre: 'John Doe',
  email: 'john.doe@example.com',
  create_at: new Date('2023-01-15'),
  rol: 'OWNER',
  direccion: '123 Farm Lane, Countryside, CA 90210',
  password: '123456789',
  image: 'https://picsum.photos/200',
  tipoSuscripcion: 'básica',
  farms: []
};

export default function FarmerProfileScreen({ navigation }: { navigation: any }) {
  const { user } = useAuthStore();
  const [farmer, setFarmer] = useState<Farmer>({...user, farms: []});
  const [isEditing, setIsEditing] = useState(false);
  const [showNewFarmDialog, setShowNewFarmDialog] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [newFarm, setNewFarm] = useState<Omit<FincaModel, 'id'>>({
    nombre: '',
    direccion: '',
    tamano: '',
    recursosN: [],
    descripcion: '',
    idUsuario: '',
    coordenadas: {
      latitud: 0,
      longitud: 0,
    },
    image: '',
  });
  const theme = useTheme();

  theme.colors.primary = '#1B5E20';


  useEffect(() => {
    const fetchData = async () => {
      let farms = await obtenerFincaPorUsuarioService();
      setFarmer({ ...farmer, farms });
    }

    fetchData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the farmer data to a backend
    console.log('Saving farmer data:', farmer);
  };

  const handleAddFarm = () => {
    const farmWithId = { ...newFarm, id: Date.now().toString() };
    setFarmer({ ...farmer, farms: [...farmer.farms, farmWithId] });
    setShowNewFarmDialog(false);
    setNewFarm({ nombre: '', direccion: '', tamano: '', recursosN: [], descripcion: '', idUsuario: '', coordenadas: { latitud: 0, longitud: 0 }, image: '' });
  };

  const handleUpgradeSubscription = async () => {
    let premiumRequest: PremiumRequest = {
      userId: farmer._id,
      status: 'pending',
      requestDate: new Date().toString(),
    }

    await usePremiumRequestStore.getState().createPremiumRequest(premiumRequest);
    useSnackbarStore.getState().dispatchSnackbar('Solicitud enviada a admin');
    setShowUpgradeDialog(false);
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{ uri: user.image }}
          style={styles.coverPhoto}
        >
          <View style={styles.overlay} />
          <View style={styles.avatarContainer}>
            <Avatar.Image size={120} source={{ uri: user.image }} />
          </View>
        </ImageBackground>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.name}>{farmer.nombre}</Title>
            <Paragraph style={styles.email}>{farmer.email}</Paragraph>
            <View style={styles.infoContainer}>
              <MaterialCommunityIcons name="calendar" size={20} color={theme.colors.primary} />
              <Paragraph style={styles.infoText}>Member since {moment(farmer.create_at).format('DD/MM/YYYY')}</Paragraph>
            </View>
            <View style={styles.subscriptionContainer}>
              <Chip 
                icon={farmer.tipoSuscripcion !== 'básica' ? 'star' : 'star-outline'}
                mode="outlined"
                style={farmer.tipoSuscripcion !== 'básica' ? styles.premiumChip : styles.freeChip}
              >
                {farmer.tipoSuscripcion !== 'básica' ? 'Premium' : 'Free'} Subscription
              </Chip>
              {farmer.tipoSuscripcion === 'básica' && (
                <Button mode="contained" onPress={() => setShowUpgradeDialog(true)} style={styles.upgradeButton}>
                  Upgrade to Premium
                </Button>
              )}
            </View>
            <Divider style={styles.divider} />
            
            <Title style={styles.sectionTitle}>Farms</Title>
            {farmer.farms.map((farm) => (
              <List.Accordion
                key={farm._id}
                title={farm.nombre}
                description={farm.direccion}
                left={props => <List.Icon {...props} icon="barn" />}
              >
                <List.Item title={`Size: ${farm.tamano} acres`} />
                <List.Item title={`Total Animals: ${farm.cantidadBovinos}`} />
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate('WorkerManagement', { farmId: farm._id })}
                >
                  Manage Workers
                </Button>
              </List.Accordion>
            ))}
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            {isEditing ? (
              <Button mode="contained" onPress={handleSave}>Save</Button>
            ) : (
              <Button mode="outlined" onPress={handleEditToggle}>Edit Profile</Button>
            )}
          </Card.Actions>
        </Card>
      </ScrollView>

      <Portal>
        <Dialog visible={showNewFarmDialog} onDismiss={() => setShowNewFarmDialog(false)}>
          <Dialog.Title>Add New Farm</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Farm Name"
              value={newFarm.nombre}
              onChangeText={(text) => setNewFarm({ ...newFarm, nombre: text })}
              mode="outlined"
            />
            <TextInput
              label="Location"
              value={newFarm.direccion}
              onChangeText={(text) => setNewFarm({ ...newFarm, direccion: text })}
              mode="outlined"
            />
            <TextInput
              label="Size (acres)"
              value={newFarm.tamano.toString()}
              onChangeText={(text) => setNewFarm({ ...newFarm, tamano: text || '0' })}
              mode="outlined"
              keyboardType="numeric"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowNewFarmDialog(false)}>Cancel</Button>
            <Button onPress={handleAddFarm}>Add Farm</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={showUpgradeDialog} onDismiss={() => setShowUpgradeDialog(false)}>
          <Dialog.Title>Upgrade to Premium</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Upgrade to our Premium plan to unlock advanced features:</Paragraph>
            <List.Item title="Unlimited farms" left={() => <List.Icon icon="check" />} />
            <List.Item title="Advanced analytics" left={() => <List.Icon icon="check" />} />
            <List.Item title="Priority support" left={() => <List.Icon icon="check" />} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowUpgradeDialog(false)}>Cancel</Button>
            <Button onPress={handleUpgradeSubscription} mode="contained">Upgrade Now</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  coverPhoto: {
    height: 200,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: -60,
  },
  card: {
    margin: 16,
    marginTop: -60,
  },
  name: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
  },
  email: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
  },
  subscriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  premiumChip: {
    backgroundColor: 'gold',
  },
  freeChip: {
    backgroundColor: 'lightgray',
  },
  upgradeButton: {
    marginLeft: 8,
    marginTop: 8,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
    marginTop: 16,
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  certificationChip: {
    margin: 4,
  },
  cardActions: {
    justifyContent: 'center',
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1B5E20',
  },
});


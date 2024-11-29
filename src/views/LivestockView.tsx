import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  Text,
  Card,
  Button,
  FAB,
  Avatar,
  Searchbar,
  Chip,
  PaperProvider,
  Menu,
  Icon,
  Divider,
  DefaultTheme
} from 'react-native-paper'
import { IBovine, LivestockActivity } from '../interfaces/Livestock'
import { CattleDetailsModal } from '../components/Bovine/CattleDetailsModal'
import { AddCattleModal } from '../components/Bovine/AddCattleModal'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../interfaces/navigationTypes'
import { useBovinosStore } from '../store/useBovinoStore'
import { LoadingScreen } from '../components/LoadingStream'
import moment from 'moment'

// Mock data for demonstration
const mockAnimals: IBovine[] = [
  {
    id: '1',
    name: 'Angus',
    identifier: 'C001',
    breed: 'Angus',
    dateOfBirth: '2020-05-15',
    status: 'saludable',
    farmStr: 'North Pasture',
    weight: 550,
    gender: 'hembra',
    image:
      'https://enciclopediaiberoamericana.com/wp-content/uploads/2022/01/vaca.jpg',
    type: 'carne',
    farmId: 'North Pasture',
  },
  {
    id: '2',
    name: 'Hereford',
    identifier: 'C002',
    breed: 'Hereford',
    dateOfBirth: '2021-03-10',
    status: 'embarazada',
    farmStr: 'East Field',
    weight: 600,
    gender: 'hembra',
    image:
      'https://enciclopediaiberoamericana.com/wp-content/uploads/2022/01/vaca.jpg',
    type: 'leche',
    farmId: 'East Field',
  },
]

const mockActivities: LivestockActivity[] = [
  {
    id: '1',
    animalId: '1',
    type: 'health-check',
    date: '2024-03-20',
    description: 'Annual checkup',
    status: 'scheduled',
  },
  {
    id: '2',
    animalId: '2',
    type: 'feeding',
    date: '2024-03-18',
    description: 'Morning feed',
    status: 'completed',
  },
]

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

export default function LivestockView() {
  const [searchQuery, setSearchQuery] = useState('')
  const {
    bovinos,
    obtenerGanadoPorUsuario,
    obtenerGanadoPorFinca,
    crearGanado,
    updateGanado,
    deleteGanado,
  } = useBovinosStore()
  const [selectedAnimal, setSelectedAnimal] = useState<IBovine | null>(null)
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const navigation = useNavigation<NavigationProps>()
  const [loading, setLoading] = useState(true)
  const [menuVisible, setMenuVisible] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      await obtenerGanadoPorUsuario()
      setLoading(false)
    }
    fetchData()
  }, [])

  const getStatusColor = (status: IBovine['status']) => {
    switch (status) {
      case 'saludable':
        return '#4CAF50'
      case 'enfermo':
        return '#F44336'
      case 'embarazada':
        return '#2196F3'
      case 'lactancia':
        return '#E91E63'
      default:
        return '#000000'
    }
  }

  const filteredAnimals =
    bovinos.length > 0 &&
    bovinos.filter(
      (animal) =>
        animal.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const handleAddCattle = useCallback(async (newCattle: IBovine) => {
    await crearGanado(newCattle)
    setIsAddModalVisible(false)
  }, [])

  const handleUpdateCattle = useCallback(async (updatedCattle: IBovine) => {
    await updateGanado(updatedCattle)
    setIsDetailsModalVisible(false)
    setSelectedAnimal(null)
  }, [])

  const handleDeleteCattle = useCallback(async (id: string) => {
    await deleteGanado(id)
    setIsDetailsModalVisible(false)
    setSelectedAnimal(null)
  }, [])

  const confirmDelete = useCallback(
    async (id: string) => {
      Alert.alert(
        'Eliminar ganado',
        '¿Estás seguro de que quieres eliminar este ganado? Esta acción no se puede deshacer.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            onPress: () => handleDeleteCattle(id),
            style: 'destructive',
          },
        ]
      )
    },
    [handleDeleteCattle]
  )

  const toReproductiveView = (animal: IBovine) => {
    navigation.navigate('CattleReproduction', { animal, type: 'cattle' })
  }

  const toCareHistoryView = (animal: IBovine) => {
    navigation.navigate('CareHistoryBovine', { animal, type: 'cattle' })
  }

  const toCareCalendarView = (animal: IBovine) => {
    navigation.navigate('CareCalendarBovine', { animal, type: 'cattle' })
  }

  if (loading) {
    return <LoadingScreen />
  }

  const renderAnimalItem = (animal: IBovine) => (
    <Card
      key={animal.id}
      style={styles.card}
      onPress={() => navigation.navigate('CattleDetailBovine', { animal })}
    >
      <Card.Title
        title={`${animal.identifier} (${animal.breed})`}
        subtitle={`Nacido: ${moment(animal.dateOfBirth).format('DD/MM/YYYY')}`}
        left={(props) => (
          <Image
            source={{
              uri:
                animal.image ||
                'https://enciclopediaiberoamericana.com/wp-content/uploads/2022/01/vaca.jpg',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        right={(props) => (
          <Chip style={{ backgroundColor: getStatusColor(animal.status) }}>
            <Text style={{ color: '#fff' }}>{animal.status}</Text>
          </Chip>
        )}
      />
      <Card.Content>
        <Text>Finca: {animal.farmStr}</Text>
        <Text>Peso: {animal.weight} kg</Text>
        <Text>Género: {animal.gender}</Text>
      </Card.Content>
      <Card.Actions>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Menu
            theme={{ colors: { primary: 'green' } }}
            visible={menuVisible === animal.id}
            onDismiss={() => setMenuVisible(null)}
            style={{ backgroundColor: '#fff' }}
            anchor={
              <Button
                textColor="#1B4725"
                onPress={() => setMenuVisible(animal.id)}
              >
                Opciones
              </Button>
            }
            contentStyle={{ backgroundColor: '#fff' }}
          >
            <Menu.Item
            // style={{ backgroundColor: '#f0f0f0' }}
              onPress={() => {
                setSelectedAnimal(animal)
                setIsDetailsModalVisible(true)
                setMenuVisible(null)
              }}
              title="Editar"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                navigation.navigate('CattleDetailBovine', { animal })
                setMenuVisible(null)
              }}
              title="Detalles"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                confirmDelete(animal.id)
                setMenuVisible(null)
              }}
              title="Eliminar"
            />
            <Divider />
            {animal.gender === 'hembra' && (
              <>
                <Menu.Item
                  onPress={() => toReproductiveView(animal)}
                  title="Proceso reproductivo"
                />
                <Divider />
              </>
            )}
            <Menu.Item
              onPress={() => toCareHistoryView(animal)}
              title="Historico sanitario"
            />
            <Divider />
            <Menu.Item
              onPress={() => toCareCalendarView(animal)}
              title="Calendario de cuidados"
              />
          </Menu>
        </View>
      </Card.Actions>
    </Card>
  )

  return (
    <PaperProvider theme={DefaultTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search cattle"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
              iconColor='#000'
              placeholderTextColor={'#000'}
            />
          </View>
          <ScrollView style={styles.content}>
            {filteredAnimals.length > 0 ? (
              filteredAnimals.map(renderAnimalItem)
            ) : (
              <Text>No hay ganados encontrados</Text>
            )}
          </ScrollView>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => setIsAddModalVisible(true)}
            label="Añadir ganado"
            color="white"
          />
          <CattleDetailsModal
            visible={isDetailsModalVisible}
            animal={selectedAnimal}
            onClose={() => {
              setIsDetailsModalVisible(false)
              setSelectedAnimal(null)
            }}
            onUpdate={handleUpdateCattle}
            onDelete={confirmDelete}
          />
          <AddCattleModal
            visible={isAddModalVisible}
            onClose={() => setIsAddModalVisible(false)}
            onAdd={handleAddCattle}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#F0F0F0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 30,
    backgroundColor: '#1B5E20',
    color: '#fff',
  },
})

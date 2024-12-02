import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Menu, Divider } from 'react-native-paper'
import { IBovine } from '../../interfaces/Livestock'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../interfaces/navigationTypes'

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

interface CardActionBovineProps {
  animal: IBovine
  confirmDelete: (id: string) => Promise<void>
  menuVisible: string | null
  navigation: NavigationProps
  setIsDetailsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setMenuVisible: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedAnimal: React.Dispatch<React.SetStateAction<IBovine | null>>
  toCareCalendarView: (animal: IBovine) => void
  toCareHistoryView: (animal: IBovine) => void
  toReproductiveView: (animal: IBovine) => void
}

export function CardActionBovine({
  animal,
  confirmDelete,
  menuVisible,
  navigation,
  setIsDetailsModalVisible,
  setMenuVisible,
  setSelectedAnimal,
  toCareCalendarView,
  toCareHistoryView,
  toReproductiveView,
}: CardActionBovineProps) {
  return (
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

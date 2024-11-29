import { IBovine } from '../../interfaces/Livestock'
import { CareEvent } from '../../views/BovineCareCalendar'
import React from 'react'
import { View, StyleSheet, FlatList, Image } from 'react-native'
import {
  Card,
  Title,
  Paragraph,
  Chip,
  useTheme,
  Text,
} from 'react-native-paper'

interface EventListProps {
  item: CareEvent
  bovino: IBovine
  bovinosChoose: IBovine[]
  typeView: 'cattle' | 'farm'
}

export const EventItem = ({
  item,
  bovino,
  bovinosChoose,
  typeView,
}: EventListProps) => {
  const theme = useTheme()

  const getEventTypeColor = (type: CareEvent['type']) => {
    switch (type) {
      case 'health':
        return theme.colors.error
      case 'feeding':
        return theme.colors.primary
      case 'breeding':
        return '#FF4081'
      default:
        return '#1B5E20'
    }
  }

  const getEventTypeLabel = (type: CareEvent['type']) => {
    switch (type) {
      case 'health':
        return 'Salud'
      case 'feeding':
        return 'Alimentación'
      case 'breeding':
        return 'Reproducción'
      default:
        return 'Otro'
    }
  }

  const bovinoSelected =
    typeView === 'cattle'
      ? bovino
      : bovinosChoose.find((element) => element.id === item.bovinoId)

  return (
    <Card key={item.id} style={styles.card}>
      <Card.Title
        title={`${bovinoSelected.identifier} (${bovinoSelected.breed})`}
        left={(props) => (
          <Image
            source={{
              uri:
                bovinoSelected.image ||
                'https://enciclopediaiberoamericana.com/wp-content/uploads/2022/01/vaca.jpg',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        right={(props) => (
          <Chip
            style={[
              styles.chip,
              { backgroundColor: getEventTypeColor(item.type) },
            ]}
            textStyle={{ color: 'white' }}
          >
            {getEventTypeLabel(item.type)}
          </Chip>
        )}
      />
      <Card.Content>
        <Text>
          <Text style={styles.label}>Titulo:</Text> {item.title}
        </Text>
        <Text>
          <Text style={styles.label}>Descripción:</Text> {item.description}
        </Text>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  chip: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  label: {
    fontWeight: 'bold',
  },
})

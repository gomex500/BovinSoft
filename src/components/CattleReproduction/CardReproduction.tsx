import { Card, Text, Button, ProgressBar, Avatar } from 'react-native-paper'
import {
  calculateEstrusProgress,
  getDueDate,
  getReproductiveStatus,
  getStatusColor,
} from '../../helpers/cattleReproduction'
import {
  CattleReproduction,
  ReproductiveEvent,
} from '../../interfaces/ReproductiveEvent'
import { View, StyleSheet } from 'react-native'
import { Timeline } from './Timeline'
import { FontAwesome5, Feather } from '@expo/vector-icons'
import { useCattleReproductionStore } from '../../store/cattleReproductionStore'

interface CardReproductionProp {
  cattle: CattleReproduction
  setSelectedEvent: (event: ReproductiveEvent | null) => void
  setIsEventDetailsModalVisible: (isVisible: boolean) => void
}

export const CardReproduction = ({
  cattle,
  setIsEventDetailsModalVisible,
  setSelectedEvent,
}: CardReproductionProp) => {
  const { openAddModal } = useCattleReproductionStore.getState()
  const reproductiveStatus = getReproductiveStatus(cattle)
  const statusColor = getStatusColor(reproductiveStatus)
  const { phase, progress, color } = calculateEstrusProgress(cattle)
  return (
    <Card key={cattle.id} style={styles.card}>
      <Card.Title
        title={cattle.name}
        subtitle={reproductiveStatus}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon="cow"
            style={{ backgroundColor: statusColor }}
          />
        )}
        right={(props) => (
          <View style={styles.cardActions}>
            <Button mode="text" onPress={() => openAddModal(cattle)}>
              Add Event
            </Button>
          </View>
        )}
      />
      <Card.Content>
        <Timeline
          cattle={cattle}
          setSelectedEvent={setSelectedEvent}
          setIsEventDetailsModalVisible={setIsEventDetailsModalVisible}
        />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <FontAwesome5 name="calendar-alt" size={20} color="#1B5E20" />
            <Text style={styles.statText}>
              Last Event:{' '}
              {cattle.events[cattle.events.length - 1]?.date || 'N/A'}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Feather name="activity" size={20} color="#1B5E20" />
            <Text style={styles.statText}>
              Total Events: {cattle.events.length}
            </Text>
          </View>
          {reproductiveStatus === 'Pregnant' && (
            <View style={styles.statItem}>
              <FontAwesome5
                name="exclamation-triangle"
                size={20}
                color="#1B5E20"
              />
              <Text style={styles.statText}>
                Due Date: {(getDueDate(cattle) as Date).toLocaleDateString()}{' '}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Estrous Cycle: {phase}</Text>
          <ProgressBar
            progress={progress}
            color={color}
            style={styles.progressBar}
          />
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardActions: {
    flexDirection: 'row',
  },
  statsContainer: {
    marginTop: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
})

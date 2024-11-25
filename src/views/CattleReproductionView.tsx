import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Button, FAB, Avatar, Searchbar, Chip, ProgressBar, PaperProvider } from 'react-native-paper';
import { CattleReproduction, ReproductiveEvent, ReproductiveEventType } from '../interfaces/ReproductiveEvent';
import { Header } from '../components/CattleReproduction/Header';
import { AddEventModal } from '../components/CattleReproduction/AddEventModal';
import { EventDetailsModal } from '../components/CattleReproduction/EventDetailsModal';
import { AddCattleModal } from '../components/CattleReproduction/AddCattleModal';
import { FontAwesome5, Feather } from '@expo/vector-icons';

const mockData: CattleReproduction[] = [
  {
    id: '1',
    name: 'Daisy',
    events: [
      { id: '1', type: 'proestrus', date: '2024-01-01', notes: 'Normal cycle', treatments: ['Hormone therapy'], testResults: [{ name: 'Progesterone', value: '2.5', unit: 'ng/mL' }] },
      { id: '2', type: 'insemination', date: '2024-01-03', notes: 'AI performed', treatments: ['Semen deposition'], testResults: [{ name: 'Semen motility', value: '80', unit: '%' }] },
      { id: '3', type: 'gestation', date: '2024-01-15', notes: 'Pregnancy confirmed', testResults: [{ name: 'Pregnancy test', value: 'Positive' }] },
      { id: '4', type: 'parturition', date: '2024-10-12', notes: 'Normal delivery', treatments: ['Oxytocin administration'] },
    ],
  },
  {
    id: '2',
    name: 'Bella',
    events: [
      { id: '5', type: 'proestrus', date: '2024-02-15', notes: 'Strong signs', treatments: ['GnRH injection'] },
      { id: '6', type: 'insemination', date: '2024-02-17', notes: 'Natural breeding' },
      { id: '7', type: 'gestation', date: '2024-03-01', notes: 'Early pregnancy', testResults: [{ name: 'Ultrasound', value: 'Positive' }] },
    ],
  },
];

interface EstrusPhase {
  name: string;
  duration: number;
  color: string;
}

const estrusPhases: EstrusPhase[] = [
  { name: 'Proestrus', duration: 3, color: '#FFA726' },
  { name: 'Estrus', duration: 1, color: '#FF7043' },
  { name: 'Metestrus', duration: 4, color: '#66BB6A' },
  { name: 'Diestrus', duration: 14, color: '#42A5F5' },
];

const calculateEstrusProgress = (cattle: CattleReproduction) => {
  const lastProestrusEvent = cattle.events
    .filter(event => event.type === 'proestrus')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const lastGestationEvent = cattle.events
    .filter(event => event.type === 'gestation')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  // Si hay un evento de gestación o parturición, retornar el estado correspondiente
  if (lastGestationEvent) {
    return { phase: 'discontinued', progress: 1, color: '#FFB74D' }; // Color para la gestación
  }
  
  if (!lastProestrusEvent) {
    return { phase: 'Unknown', progress: 0, color: '#9E9E9E' };
  }

  const lastProestrusDate = new Date(lastProestrusEvent.date);
  const today = new Date();
  const daysSinceProestrus = Math.floor((today.getTime() - lastProestrusDate.getTime()) / (1000 * 3600 * 24));

  let accumulatedDays = 0;
  for (const phase of estrusPhases) {
    accumulatedDays += phase.duration;
    if (daysSinceProestrus < accumulatedDays) {
      const phaseProgress = (daysSinceProestrus - (accumulatedDays - phase.duration)) / phase.duration;
      return { phase: phase.name, progress: phaseProgress, color: phase.color };
    }
  }

  // If we've passed all phases, we're back to Proestrus
  const cycleLength = estrusPhases.reduce((sum, phase) => sum + phase.duration, 0);
  const daysIntoCycle = daysSinceProestrus % cycleLength;
  const proestrusProgress = daysIntoCycle / estrusPhases[0].duration;
  return { phase: 'Proestrus', progress: proestrusProgress, color: estrusPhases[0].color };
};

export default function CattleReproductionView() {
  const [cattleData, setCattleData] = useState<CattleReproduction[]>(mockData);
  const [selectedCattle, setSelectedCattle] = useState<CattleReproduction | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isAddCattleModalVisible, setIsAddCattleModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ReproductiveEvent | null>(null);
  const [isEventDetailsModalVisible, setIsEventDetailsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ReproductiveEventType | 'all'>('all');

  const handleAddEvent = (newEvent: ReproductiveEvent) => {
    if (selectedCattle) {
      const updatedEvents = [...selectedCattle.events, newEvent];
      const updatedCattleData = cattleData.map(cattle => 
        cattle.id === selectedCattle.id
          ? { ...cattle, events: updatedEvents }
          : cattle
      );
      setCattleData(updatedCattleData);
      setSelectedCattle(null);
      setIsAddModalVisible(false);
    }
  };

  const handleAddCattle = (name: string) => {
    const newCattle: CattleReproduction = {
      id: Date.now().toString(),
      name,
      events: [],
    };
    setCattleData([...cattleData, newCattle]);
    setIsAddCattleModalVisible(false);
  };

  const getEventIcon = (type: ReproductiveEventType) => {
    switch (type) {
      case 'proestrus':
        return 'heart';
      case 'insemination':
        return 'eyedropper-plus';
      case 'gestation':
        return 'baby';
      case 'parturition':
        return 'stethoscope';
      default:
        return 'calendar';
    }
  };

  const getEventColor = (type: ReproductiveEventType) => {
    switch (type) {
      case 'proestrus': return '#FFA726';
      case 'insemination': return '#2196F3';
      case 'gestation': return '#4CAF50';
      case 'parturition': return '#E91E63';
      default: return '#000000';
    }
  };

  const renderEventMarker = (event: ReproductiveEvent) => {
    return (
      <TouchableOpacity
        key={event.id}
        style={[styles.eventMarker, { backgroundColor: getEventColor(event.type) }]}
        onPress={() => {
          setSelectedEvent(event);
          setIsEventDetailsModalVisible(true);
        }}
      >
        <Avatar.Icon size={24} icon={getEventIcon(event.type)} style={{ backgroundColor: 'transparent' }} color="white" />
      </TouchableOpacity>
    );
  };

  const renderTimeline = (cattle: CattleReproduction) => {
    const sortedEvents = [...cattle.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const startDate = new Date(sortedEvents[0]?.date || new Date());
    const endDate = new Date(sortedEvents[sortedEvents.length - 1]?.date || new Date());
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) || 1;

    return (
      <View style={styles.timeline}>
        {sortedEvents.map((event, index) => {
          const eventDate = new Date(event.date);
          const daysFromStart = (eventDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
          const position = (daysFromStart / totalDays) * 100;

          return (
            <View key={event.id} style={[styles.eventMarkerContainer, { left: `${Math.max(Math.min(position, 95), 10 * (index + 0.5))}%` }]}>
              {renderEventMarker(event)}
            </View>
          );
        })}
      </View>
    );
  };

  const getReproductiveStatus = (cattle: CattleReproduction) => {
    const today = new Date();
    
    // Filtrar eventos de parturición
    const parturitionEvents = cattle.events.filter(event => event.type === 'parturition');
    
    if (parturitionEvents.length > 0) {
      // Obtener la fecha del último evento de parturición
      const lastParturitionEvent = parturitionEvents[parturitionEvents.length - 1];
      const lastParturitionDate = new Date(lastParturitionEvent.date);
      const daysSinceBirth = Math.floor((today.getTime() - lastParturitionDate.getTime()) / (1000 * 3600 * 24));
      
      // Definir un umbral, por ejemplo, 30 días
      const birthThreshold = 30; // Puedes ajustar este valor según tus necesidades
  
      if (daysSinceBirth > birthThreshold) {
        return 'Birth';
      } else {
        return 'Recent Birth';
      }
    } else if (cattle.events.some(event => event.type === 'gestation')) {
      return 'Pregnant';
    } else {
      return 'Open';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pregnant':
        return '#4CAF50';
      case 'Recent Birth':
        return '#2196F3';
      case 'Birth':
        return '#FFC107'; // Color para el estado 'Birth'
      case 'Open':
        return '#FF9800';
      default:
        return '#000000';
    }
  };

  const filteredCattleData = cattleData.filter(cattle => 
    cattle.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterType === 'all' || cattle.events.some(event => event.type === filterType))
  );

  const getDueDate = (cattle: CattleReproduction) => {
    const gestationEvents = cattle.events.filter(event => event.type === 'gestation');
    
    if (gestationEvents.length > 0) {
      const lastGestationEvent = gestationEvents[gestationEvents.length - 1];
      const gestationStartDate = new Date(lastGestationEvent.date);
      
      // Calcular la fecha de parto sumando 285 días
      const dueDate = new Date(gestationStartDate);
      dueDate.setDate(gestationStartDate.getDate() + 285);
      
      return dueDate;
    }
    
    return null; // No hay eventos de gestación
  };

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Header title="Cattle Reproduction" />
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search cattle"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
            <Chip
              selected={filterType === 'all'}
              onPress={() => setFilterType('all')}
              style={styles.filterChip}
            >
              All
            </Chip>
            <Chip
              selected={filterType === 'proestrus'}
              onPress={() => setFilterType('proestrus')}
              style={styles.filterChip}
            >
              Proestrus
            </Chip>
            <Chip
              selected={filterType === 'insemination'}
              onPress={() => setFilterType('insemination')}
              style={styles.filterChip}
            >
              Insemination
            </Chip>
            <Chip
              selected={filterType === 'gestation'}
              onPress={() => setFilterType('gestation')}
              style={styles.filterChip}
            >
              Gestation
            </Chip>
            <Chip
              selected={filterType === 'parturition'}
              onPress={() => setFilterType('parturition')}
              style={styles.filterChip}
            >
              Parturition
            </Chip>
          </ScrollView>
          <ScrollView style={styles.content}>
            {filteredCattleData.map(cattle => {
              const reproductiveStatus = getReproductiveStatus(cattle);
              const statusColor = getStatusColor(reproductiveStatus);
              const { phase, progress, color } = calculateEstrusProgress(cattle);
              return (
                <Card key={cattle.id} style={styles.card}>
                  <Card.Title
                    title={cattle.name}
                    subtitle={reproductiveStatus}
                    left={(props) => <Avatar.Icon {...props} icon="cow" style={{ backgroundColor: statusColor }} />}
                    right={(props) => (
                      <View style={styles.cardActions}>
                        <Button
                          mode="text"
                          onPress={() => {
                            setSelectedCattle(cattle);
                            setIsAddModalVisible(true);
                          }}
                        >
                          Add Event
                        </Button>
                      </View>
                    )}
                  />
                  <Card.Content>
                    {renderTimeline(cattle)}
                    <View style={styles.statsContainer}>
                      <View style={styles.statItem}>
                        <FontAwesome5 name="calendar-alt" size={20} color="#1B5E20" />
                        <Text style={styles.statText}>Last Event: {cattle.events[cattle.events.length - 1]?.date || 'N/A'}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Feather name="activity" size={20} color="#1B5E20" />
                        <Text style={styles.statText}>Total Events: {cattle.events.length}</Text>
                      </View>
                      {reproductiveStatus === 'Pregnant' && (
                        <View style={styles.statItem}>
                          <FontAwesome5 name="exclamation-triangle" size={20} color="#1B5E20" />
                          <Text style={styles.statText}>Due Date: {getDueDate(cattle).toLocaleDateString()} </Text>
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
              );
            })}
          </ScrollView>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => setIsAddCattleModalVisible(true)}
            color="white"
          />
          <AddEventModal
            visible={isAddModalVisible}
            onClose={() => setIsAddModalVisible(false)}
            onAdd={handleAddEvent}
            existingEvents={selectedCattle ? selectedCattle.events : []}
          />
          <EventDetailsModal
            visible={isEventDetailsModalVisible}
            onClose={() => setIsEventDetailsModalVisible(false)}
            event={selectedEvent}
          />
          <AddCattleModal
            visible={isAddCattleModalVisible}
            onClose={() => setIsAddCattleModalVisible(false)}
            onAdd={handleAddCattle}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#F0F0F0',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    maxHeight: 45,
    minHeight: 45,
  },
  filterChip: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  cardActions: {
    flexDirection: 'row',
  },
  timeline: {
    height: 60,
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    marginVertical: 20,
    position: 'relative',
  },
  eventMarkerContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -15 }],
    marginTop: 15,
  },
  eventMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventDate: {
    fontSize: 10,
    marginTop: 4,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
    backgroundColor: '#1B5E20',
  },
});


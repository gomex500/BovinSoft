import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Button, FAB, Avatar, Searchbar, Chip, ProgressBar, PaperProvider, DefaultTheme, useTheme } from 'react-native-paper';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { Header } from '../components/CattleReproduction/Header';
import { AddActivityModal } from '../components/FarmActivities/AddActivityModal';
import { ActivityDetailsModal } from '../components/FarmActivities/ActivityDetailsModal';
import { AddFieldModal } from '../components/FarmActivities/AddFieldModal';
import { GroupedActivitiesModal } from '../components/FarmActivities/GroupedActivitiesModal';
import { CalendarView } from '../components/FarmActivities/CalendarView';
import { FarmActivity, Field } from '../interfaces/IFarmActivity';

const mockData: Field[] = [
  {
    id: '1',
    name: 'North Field',
    activities: [
      { id: '1', type: 'planting', date: '2024-03-15', description: 'Plant corn', status: 'completed', progress: 100, priority: 'high', isRecurring: false },
      { id: '2', type: 'maintenance', date: '2024-04-01', description: 'Apply fertilizer', status: 'in-progress', progress: 50, priority: 'medium', isRecurring: true, recurringInterval: 'monthly' },
    ],
  },
  {
    id: '2',
    name: 'South Pasture',
    activities: [
      { id: '3', type: 'animal-care', date: '2024-03-20', description: 'Cattle vaccination', status: 'completed', progress: 100, priority: 'high', isRecurring: true, recurringInterval: 'yearly' },
      { id: '4', type: 'maintenance', date: '2024-04-05', description: 'Fence repair', status: 'pending', progress: 0, priority: 'low', isRecurring: false },
    ],
  },
];

export default function FarmActivitiesView() {
  const [fields, setFields] = useState<Field[]>(mockData);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isAddFieldModalVisible, setIsAddFieldModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<FarmActivity | null>(null);
  const [isActivityDetailsModalVisible, setIsActivityDetailsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FarmActivity['type'] | 'all'>('all');
  const [groupedActivities, setGroupedActivities] = useState<FarmActivity[]>([]);
  const [isGroupedActivitiesModalVisible, setIsGroupedActivitiesModalVisible] = useState(false);
  const [isCalendarViewVisible, setIsCalendarViewVisible] = useState(false);

  const theme = useTheme()
  theme.colors.primary = '#1B5E20';

  const handleAddActivity = (newActivity: FarmActivity) => {
    if (selectedField) {
      const updatedFields = fields.map(field => 
        field.id === selectedField.id
          ? { ...field, activities: [...field.activities, newActivity] }
          : field
      );
      setFields(updatedFields);
      setSelectedField(null);
      setIsAddModalVisible(false);
    }
  };

  const handleAddField = (name: string) => {
    const newField: Field = {
      id: Date.now().toString(),
      name,
      activities: [],
    };
    setFields([...fields, newField]);
    setIsAddFieldModalVisible(false);
  };

  const getActivityIcon = (type: FarmActivity['type']) => {
    switch (type) {
      case 'planting': return 'seedling';
      case 'harvesting': return 'wheat';
      case 'maintenance': return 'tools';
      case 'animal-care': return 'paw';
      default: return 'calendar';
    }
  };

  const getActivityColor = (type: FarmActivity['type']) => {
    switch (type) {
      case 'planting': return '#4CAF50';
      case 'harvesting': return '#FFA000';
      case 'maintenance': return '#2196F3';
      case 'animal-care': return '#E91E63';
      default: return '#000000';
    }
  };

  const getStatusColor = (status: FarmActivity['status']) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FFA000';
      case 'pending': return '#F44336';
      default: return '#000000';
    }
  };

  const renderActivityMarker = (activity: FarmActivity) => {
    return (
      <TouchableOpacity
        key={activity.id}
        style={[styles.eventMarker, { backgroundColor: getActivityColor(activity.type) }]}
        onPress={() => {
          setSelectedActivity(activity);
          setIsActivityDetailsModalVisible(true);
        }}
      >
        <Avatar.Icon size={24} icon={getActivityIcon(activity.type)} style={{ backgroundColor: 'transparent' }} color="white" />
      </TouchableOpacity>
    );
  };

  const renderTimeline = (field: Field) => {
    const groupedActivities = field.activities.reduce((acc, activity) => {
      if (!acc[activity.date]) {
        acc[activity.date] = [];
      }
      acc[activity.date].push(activity);
      return acc;
    }, {} as Record<string, FarmActivity[]>);

    const sortedDates = Object.keys(groupedActivities).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const startDate = new Date(sortedDates[0]);
    const endDate = new Date(sortedDates[sortedDates.length - 1]);
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) || 1;

    return (
      <View style={styles.timeline}>
        {sortedDates.map((date, index) => {
          const activities = groupedActivities[date];
          const activityDate = new Date(date);
          const daysFromStart = (activityDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
          const position = (daysFromStart / totalDays) * 100;

          return (
            <View key={date} style={[styles.eventMarkerContainer, { left: `${Math.max(Math.min(position, 95), 5)}%` }]}>
              <TouchableOpacity
                style={[styles.eventMarker, { backgroundColor: getActivityColor(activities[0].type) }]}
                onPress={() => {
                  setGroupedActivities(activities);
                  setIsGroupedActivitiesModalVisible(true);
                }}
              >
                <Text style={styles.eventMarkerText}>{activities.length}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  const filteredFields = fields.filter(field => 
    field.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterType === 'all' || field.activities.some(activity => activity.type === filterType))
  );

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Header title="Farm Activities" />
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search fields"
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
              selected={filterType === 'planting'}
              onPress={() => setFilterType('planting')}
              style={styles.filterChip}
            >
              Planting
            </Chip>
            <Chip
              selected={filterType === 'harvesting'}
              onPress={() => setFilterType('harvesting')}
              style={styles.filterChip}
            >
              Harvesting
            </Chip>
            <Chip
              selected={filterType === 'maintenance'}
              onPress={() => setFilterType('maintenance')}
              style={styles.filterChip}
            >
              Maintenance
            </Chip>
            <Chip
              selected={filterType === 'animal-care'}
              onPress={() => setFilterType('animal-care')}
              style={styles.filterChip}
            >
              Animal Care
            </Chip>
          </ScrollView>
          <Button mode="contained" onPress={() => setIsCalendarViewVisible(true)} style={styles.calendarButton}>
            Calendar View
          </Button>
          <ScrollView style={styles.content}>
            {filteredFields.map(field => (
              <Card key={field.id} style={styles.card}>
                <Card.Title
                  title={field.name}
                  subtitle={`Total Activities: ${field.activities.length}`}
                  left={(props) => <Avatar.Icon {...props} icon="terrain" />}
                  right={(props) => (
                    <Button
                      mode="text"
                      onPress={() => {
                        setSelectedField(field);
                        setIsAddModalVisible(true);
                      }}
                    >
                      Add Activity
                    </Button>
                  )}
                />
                <Card.Content>
                  {renderTimeline(field)}
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <FontAwesome5 name="calendar-alt" size={20} color="#1B5E20" />
                      <Text style={styles.statText}>Last Activity: {field.activities[field.activities.length - 1]?.date || 'N/A'}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Feather name="activity" size={20} color="#1B5E20" />
                      <Text style={styles.statText}>Total Activities: {field.activities.length}</Text>
                    </View>
                  </View>
                  <View style={styles.progressContainer}>
                    <Text style={styles.progressLabel}>Overall Progress</Text>
                    <ProgressBar
                      progress={field.activities.reduce((acc, curr) => acc + curr.progress, 0) / (field.activities.length * 100)}
                      color="#1B5E20"
                      style={styles.progressBar}
                    />
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => setIsAddFieldModalVisible(true)}
            color="white"
          />
          <AddActivityModal
            visible={isAddModalVisible}
            onClose={() => setIsAddModalVisible(false)}
            onAdd={handleAddActivity}
            existingActivities={selectedField ? selectedField.activities : []}
          />
          <ActivityDetailsModal
            visible={isActivityDetailsModalVisible}
            onClose={() => setIsActivityDetailsModalVisible(false)}
            activity={selectedActivity}
          />
          <AddFieldModal
            visible={isAddFieldModalVisible}
            onClose={() => setIsAddFieldModalVisible(false)}
            onAdd={handleAddField}
          />
          <GroupedActivitiesModal
            visible={isGroupedActivitiesModalVisible}
            onClose={() => setIsGroupedActivitiesModalVisible(false)}
            activities={groupedActivities}
            onActivityPress={(activity) => {
              setSelectedActivity(activity);
              setIsActivityDetailsModalVisible(true);
            }}
          />
          <CalendarView
            visible={isCalendarViewVisible}
            onClose={() => setIsCalendarViewVisible(false)}
            fields={fields}
            onActivityPress={(activity) => {
              setSelectedActivity(activity);
              setIsActivityDetailsModalVisible(true);
            }}
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
  calendarButton: {
    margin: 16,
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
    backgroundColor: '#fff',
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
  eventMarkerText: {
    color: 'white',
    fontWeight: 'bold',
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


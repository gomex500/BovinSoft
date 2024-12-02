import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';

interface ScrollBarProps {
  selectedSection: string
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>
}

export default function ScrollBar({ selectedSection, setSelectedSection }: ScrollBarProps) {

  return ( <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
    <Chip
      selected={selectedSection === 'dashboard'}
      onPress={() => setSelectedSection('dashboard')}
      style={styles.tab}
    >
      Dashboard
    </Chip>
    <Chip
      selected={selectedSection === 'users'}
      onPress={() => setSelectedSection('users')}
      style={styles.tab}
    >
      Users
    </Chip>
    <Chip
      selected={selectedSection === 'premium'}
      onPress={() => setSelectedSection('premium')}
      style={styles.tab}
    >
      Premium Requests
    </Chip>
    {/* <Chip
      selected={selectedSection === 'activity'}
      onPress={() => setSelectedSection('activity')}
      style={styles.tab}
    >
      Activity Logs
    </Chip>
    <Chip
      selected={selectedSection === 'support'}
      onPress={() => setSelectedSection('support')}
      style={styles.tab}
    >
      Support Tickets
    </Chip>
    <Chip
      selected={selectedSection === 'settings'}
      onPress={() => setSelectedSection('settings')}
      style={styles.tab}
    >
      Settings
    </Chip> */}
  </ScrollView> );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: 55,
  },
  tab: {
    marginRight: 8,
    backgroundColor: '#E8F5E9',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    marginBottom: 16,
  },
  metricContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLeft: {
    flex: 1,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666666',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  metricIcon: {
    padding: 8,
    borderRadius: 8,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1B5E20',
  },
  statusItem: {
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666666',
  },
  statusBar: {
    height: 8,
    borderRadius: 4,
  },
  statusValue: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    textAlign: 'right',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityContent: {
    marginLeft: 12,
    flex: 1,
  },
  activityText: {
    fontSize: 14,
  },
  activityTime: {
    fontSize: 12,
    color: '#666666',
  },
  viewAllButton: {
    marginTop: 8,
  },
});
 
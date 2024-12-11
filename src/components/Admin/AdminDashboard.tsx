import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  Text,
  Card,
  Button,
  ProgressBar,
} from 'react-native-paper'
import {
  FontAwesome6,
  AntDesign,
  FontAwesome5,
  Feather,
  Entypo,
} from '@expo/vector-icons'

interface AdminDashboardProps {
  userCount: number
  premiumUserCount: number
  pendingRequestCount: number
  openTicketCount: number
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>
}

export default function AdminDashboard({
  userCount,
  premiumUserCount,
  pendingRequestCount,
  openTicketCount,
  setSelectedSection,
}: AdminDashboardProps) {
  const renderMetricCard = (
    title: string,
    value: string,
    icon: React.ReactNode,
    color: string
  ) => (
    <Card
      style={[
        styles.metricCard,
        { borderLeftColor: color, borderLeftWidth: 4 },
      ]}
    >
      <Card.Content style={styles.metricContent}>
        <View style={styles.metricLeft}>
          <Text style={styles.metricTitle}>{title}</Text>
          <Text style={styles.metricValue}>{value}</Text>
        </View>
        <View style={[styles.metricIcon, { backgroundColor: `${color}20` }]}>
          {icon}
        </View>
      </Card.Content>
    </Card>
  )

  return (
    <ScrollView style={styles.content}>
      <View style={styles.metricsContainer}>
        {renderMetricCard(
          'Total Users',
          '16',
          <FontAwesome6 name="users" size={24} color="#1B5E20" />,
          '#1B5E20'
        )}
        {renderMetricCard(
          'Premium Users',
          '7',
          <FontAwesome5 name="crown" size={24} color="#FFA000" />,
          '#FFA000'
        )}
        {renderMetricCard(
          'New Requests',
          '2',
          <AntDesign name="adduser" size={24} color="#1976D2" />,
          '#1976D2'
        )}
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>System Status</Text>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Server Load</Text>
            <ProgressBar
              progress={0.7}
              color="#1B5E20"
              style={styles.statusBar}
            />
            <Text style={styles.statusValue}>70%</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Storage Usage</Text>
            <ProgressBar
              progress={0.45}
              color="#1B5E20"
              style={styles.statusBar}
            />
            <Text style={styles.statusValue}>45%</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>API Response Time</Text>
            <ProgressBar
              progress={0.2}
              color="#1B5E20"
              style={styles.statusBar}
            />
            <Text style={styles.statusValue}>200ms</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          {[1, 2, 3].map((_, index) => (
            <View key={index} style={styles.activityItem}>
              <Feather name="activity" size={20} color="#1B5E20" />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>New user registration</Text>
                <Text style={styles.activityTime}>2 minutes ago</Text>
              </View>
            </View>
          ))}
          <Button
            mode="outlined"
            onPress={() => setSelectedSection('activity')}
            style={styles.viewAllButton}
          >
            View All Activity
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  )
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
})

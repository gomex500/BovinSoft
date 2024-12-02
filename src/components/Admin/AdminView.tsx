import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  PaperProvider,
  DefaultTheme,
  useTheme,
} from 'react-native-paper'
import {
  ActivityLog,
  PremiumRequest,
  SupportTicket,
  User,
} from '../../interfaces/Admin'
import AdminDashboard from './AdminDashboard'
import ScrollBar from './ScrollBar'
import { UserManagement } from './UserManagement'
import { PremiumRequestsView } from './PremiumRequestsView'
import { useUserStore } from '../../store/userStore'
import { usePremiumRequestStore } from '../../store/premiumRequestStore'
import { UserModel } from '../../interfaces/IUser'

// Mock data fetching functions (replace with actual API calls)
const fetchUsers = (): Promise<User[]> =>
  Promise.resolve([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      createdAt: '2023-01-01',
      premiumUser: false,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'admin',
      status: 'active',
      createdAt: '2023-02-15',
      premiumUser: true,
    },
  ])

const fetchPremiumRequests = (): Promise<PremiumRequest[]> =>
  Promise.resolve([
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      status: 'pending',
      requestDate: '2023-06-01',
    },
  ])

const fetchActivityLogs = (): Promise<ActivityLog[]> =>
  Promise.resolve([
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      action: 'Logged in',
      timestamp: '2023-06-10T10:30:00Z',
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      action: 'Updated profile',
      timestamp: '2023-06-10T11:45:00Z',
    },
  ])

const fetchSupportTickets = (): Promise<SupportTicket[]> =>
  Promise.resolve([
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      subject: 'Cannot access premium features',
      status: 'open',
      priority: 'high',
      createdAt: '2023-06-09T09:00:00Z',
      lastUpdated: '2023-06-09T09:00:00Z',
    },
  ])

export default function AdminView() {
  const [selectedSection, setSelectedSection] = useState('dashboard')

  const { getAllUsers } = useUserStore();
  const { getAllPremiumRequests } = usePremiumRequestStore();
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  theme.colors.primary = '#1B5E20';

  useEffect(() => {
    const loadData = async () => {
      try {
          await Promise.all([getAllUsers(), getAllPremiumRequests()])

      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollBar
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
          {selectedSection === 'dashboard' ? (
            <AdminDashboard
              userCount={1}
              premiumUserCount={1}
              pendingRequestCount={1}
              openTicketCount={1}
              setSelectedSection={setSelectedSection}
            />
          ) : selectedSection === 'users' ? (
            <UserManagement />
          ) : selectedSection === 'premium' ? (
            <PremiumRequestsView />
          ) : (
            <AdminDashboard
              userCount={1}
              premiumUserCount={1}
              pendingRequestCount={1}
              openTicketCount={1}
              setSelectedSection={setSelectedSection}
            />
          )}
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

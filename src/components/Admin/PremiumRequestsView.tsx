import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, Searchbar, Badge, Avatar, Chip } from 'react-native-paper';
import { PremiumRequest } from '../../interfaces/Admin';
import { usePremiumRequestStore } from '../../store/premiumRequestStore';

export function PremiumRequestsView() {
  const [searchQuery, setSearchQuery] = useState('');

  const { premiumRequests, onApprove, onReject } = usePremiumRequestStore();

  if (premiumRequests.length === 0) {
    return <Text>No hay solicitudes pendientes</Text>
  }

  const filteredRequests = premiumRequests.filter(request =>
    request.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFA000';
      case 'approved':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const renderRequestCard = ({ item }: { item: PremiumRequest }) => (
    <Card style={styles.card} key={item.id}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Avatar.Text size={40} label={item.userName.substring(0, 2).toUpperCase()} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.userEmail}>{item.userEmail}</Text>
          </View>
          <Chip
            style={[
              styles.chip,
              { backgroundColor: getStatusColor(item.status) },
            ]}
            textStyle={{ color: 'white' }}
          >
           {item.status}
          </Chip>
         
        </View>
        <Text style={styles.dateText}>Request Date: {new Date(item.requestDate).toLocaleDateString()}</Text>
        {item.status === 'pending' && (
          <View style={styles.actions}>
            <Button mode="contained" onPress={() => onApprove(item.id)} style={styles.approveButton}>
              Approve
            </Button>
            <Button mode="contained" buttonColor='#db3030' onPress={() => onReject(item.id)} style={styles.rejectButton}>
              Reject
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search requests..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={filteredRequests}
        renderItem={renderRequestCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1B5E20',
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    marginRight: 12,
    backgroundColor: '#1B5E20',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
  },
  statusBadge: {
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  approveButton: {
    marginRight: 8,
    backgroundColor: '#1B5E20',
  },
  rejectButton: {
    borderColor: '#F44336',
  },
  chip: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
});


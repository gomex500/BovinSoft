import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, FAB, Searchbar, Avatar, Menu, IconButton } from 'react-native-paper';
import { AddEditUserModal } from './AddEditUserModal';
import { UserModel } from '../../interfaces/IUser';
import { useUserStore } from '../../store/userStore';


export function UserManagement() {

  const { users, onEditUser, onAddUser } = useUserStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserModel | undefined>(undefined);

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    setUserToEdit(undefined);
    setIsModalVisible(true);
  };

  const handleEditUser = (user: UserModel) => {
    setUserToEdit(user);
    setIsModalVisible(true);
  };

  const handleSaveUser = (user: UserModel) => {
    if (userToEdit) {
      onEditUser(user);
    } else {
      onAddUser(user);
    }
    setIsModalVisible(false);
  };

  const renderUserCard = ({ item }: { item: UserModel }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Avatar.Text size={40} label={item.nombre.substring(0, 2).toUpperCase()} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.nombre}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
          <Menu
            visible={selectedUser === item._id}
            onDismiss={() => setSelectedUser(null)}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={() => setSelectedUser(item._id)}
              />
            }
          >
            <Menu.Item onPress={() => {
              handleEditUser(item);
              setSelectedUser(null);
            }} title="Edit" />
          </Menu>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.detailText}>Role: {item.rol}</Text>
          <Text style={[styles.detailText, styles.statusText, { color: item.status === 'active' ? '#4CAF50' : '#F44336' }]}>
            Status: {item.status}
          </Text>
          <Text style={styles.detailText}>Created: {new Date(item.create_at).toLocaleDateString()}</Text>
          <Text style={styles.detailText}>Premium: {item.tipoSuscripcion !== 'básica' ? 'Yes' : 'No'}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search users..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={filteredUsers}
        renderItem={renderUserCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddUser}
        label="Añadir usuario"
        color='white'
      />
      <AddEditUserModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveUser}
        user={userToEdit}
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
  userDetails: {
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 4,
  },
  statusText: {
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1B5E20',
  },
});


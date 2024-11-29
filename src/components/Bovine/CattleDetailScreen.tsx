import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, Chip, Button } from 'react-native-paper';
import { IBovine } from '../../interfaces/Livestock';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../interfaces/navigationTypes';
import { useNavigation } from '@react-navigation/native';

interface CattleDetailScreenProps {
  route: {
    params: {
      animal: IBovine;
    };
  };
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function CattleDetailScreen({ route }: CattleDetailScreenProps) {
  const { animal } = route.params;

  const getStatusColor = (status: IBovine['status']) => {
    switch (status) {
      case 'saludable': return '#4CAF50';
      case 'enfermo': return '#F44336';
      case 'embarazada': return '#2196F3';
      case 'lactancia': return '#E91E63';
      default: return '#000000';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: animal.image }} />
        <Card.Title
          title={`${animal.name} (${animal.identifier})`}
          subtitle={animal.breed}
          right={(props) => (
            <Chip style={{ backgroundColor: getStatusColor(animal.status) }}>
              {animal.status}
            </Chip>
          )}
        />
        <Card.Content>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text>{new Date(animal.dateOfBirth).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Location:</Text>
            <Text>{animal.farmStr}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Weight:</Text>
            <Text>{animal.weight} kg</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Gender:</Text>
            <Text>{animal.gender}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Type:</Text>
            <Text>{animal.type}</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  button: {
    height: 50,
    textAlignVertical: 'center',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
});


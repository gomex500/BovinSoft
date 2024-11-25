import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, Card, Avatar, Divider } from 'react-native-paper';
import { ReproductiveEvent } from '../../interfaces/ReproductiveEvent';
import { Calendar, Clipboard, FlaskRoundIcon as Flask, CrossIcon as MedicalCross } from 'lucide-react';
import { FontAwesome5 } from '@expo/vector-icons';

interface EventDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  event: ReproductiveEvent | null;
}

export function EventDetailsModal({ visible, onClose, event }: EventDetailsModalProps) {
  if (!event) return null;

  const getEventIcon = (type: string) => {
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

  const getEventColor = (type: string) => {
    switch (type) {
      case 'proestrus':
        return '#FFA726';
      case 'insemination':
        return '#2196F3';
      case 'gestation':
        return '#4CAF50';
      case 'parturition':
        return '#E91E63';
      default:
        return '#000000';
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <ScrollView>
          <Card style={styles.card}>
            <Card.Title
              title={event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              subtitle={event.date}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon={getEventIcon(event.type)}
                  style={{ backgroundColor: getEventColor(event.type) }}
                />
              )}
            />
            <Card.Content>
              {event.type === 'insemination' && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitleInse}>Insemination Method</Text>
                  <Text style={styles.sectionContentInse}>{event.inseminationMethod === 'natural' ? 'Natural Mating' : 'Artificial Insemination'}</Text>
                  {event.inseminationMethod === 'natural' && event.fatherName && (
                    <Text style={styles.sectionContentInse}>Father's Name: {event.fatherName}</Text>
                  )}
                </View>
              )}

              {event.notes && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <FontAwesome5
                      name="clipboard-list"
                      size={20}
                      color="#1B4725"
                    />
                    <Text style={styles.sectionTitle}>Notes</Text>
                  </View>
                  <Text style={styles.sectionContent}>{event.notes}</Text>
                </View>
              )}

              {event.treatments && event.treatments.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <FontAwesome5
                      name="briefcase-medical"
                      size={20}
                      color="#1B4725"
                    />
                    <Text style={styles.sectionTitle}>Treatments</Text>
                  </View>
                  {event.treatments.map((treatment, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.listItemText}>{treatment}</Text>
                    </View>
                  ))}
                </View>
              )}

              {event.testResults && event.testResults.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <FontAwesome5
                      name="flask"
                      size={20}
                      color="#1B4725"
                    />
                    <Text style={styles.sectionTitle}>Test Results</Text>
                  </View>
                  {event.testResults.map((result, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.listItemText}>
                        {result.name}: {result.value}
                        {result.unit ? ` ${result.unit}` : ''}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </Card.Content>
          </Card>
          <Button mode="contained" onPress={onClose} style={styles.closeButton}>
            Close
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  card: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#1B5E20',
  },
  sectionContent: {
    fontSize: 16,
  },
  sectionTitleInse: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  sectionContentInse: {
    fontSize: 16,
  },
  listItem: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#1B5E20',
  },
});


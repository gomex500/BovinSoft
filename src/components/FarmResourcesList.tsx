import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';

interface FarmResourcesListProps {
  resources: string[];
  setResources: React.Dispatch<React.SetStateAction<string[]>>
}

export function FarmResourcesList({ resources, setResources }: FarmResourcesListProps) {

const [res, setres] = useState();
  const handleAddResource = (resource: string) => {
    setResources((prevResources: string[]) => [...prevResources, resource]);
  };

  return (
    <View style={stylesFarmResourcesList.container}>
      <Text style={stylesFarmResourcesList.title}>Recursos Naturales</Text>
      <FarmResourceInput onSubmit={handleAddResource} />
      <ScrollView style={stylesFarmResourcesList.scrollView} contentContainerStyle={stylesFarmResourcesList.resourcesContainer}>
        {resources.length > 0 ? (
          resources.map((resource, index) => (
            <View key={index} style={stylesFarmResourcesList.badge}>
              <Text style={stylesFarmResourcesList.badgeText}>{resource}</Text>
            </View>
          ))
        ) : (
          <Text style={stylesFarmResourcesList.emptyText}>No resources added yet</Text>
        )}
      </ScrollView>
    </View>
  );
}

const stylesFarmResourcesList = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1B4725',
  },
  scrollView: {
    height: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 16,
    padding: 8,
  },
  resourcesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    margin: 4,
  },
  badgeText: {
    fontSize: 14,
    color: '#333333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9E9E9E',
    marginTop: 16,
  },
});



interface CustomInputProps {
  onSubmit: (text: string) => void;
}

function FarmResourceInput({ onSubmit }: CustomInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <FontAwesome6
          name="seedling"
          size={20}
          color="#1B4725"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Recurso"
          placeholderTextColor="#9E9E9E"
          value={value}
          onChangeText={setValue}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.iconContainer}>
          <Feather name="plus" size={20} color="#2E7D32" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    padding: 0,
  },
  iconContainer: {
    padding: 4,
  },
});




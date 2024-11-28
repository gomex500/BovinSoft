import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  children?: (toggleModal: () => void) => React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(option => option.value === selectedValue);

  const toggleModal = () => setModalVisible(!modalVisible);

  const handleSelect = (value: string) => {
    onValueChange(value);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      {children ? children(toggleModal) : (
        <TouchableOpacity onPress={toggleModal} disabled={disabled} style={styles.selectContainer}>
        <Text style={[styles.selectText, !selectedValue && styles.placeholder]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Feather name="chevron-down" size={20} color="#1B4725" />
      </TouchableOpacity>
      )}
      

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                  {item.value === selectedValue && (
                    <Feather name="check" size={20} color="#1B4725" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectText: {
    fontSize: 16,
    color: '#000000',
  },
  placeholder: {
    color: '#9E9E9E',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1B4725',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


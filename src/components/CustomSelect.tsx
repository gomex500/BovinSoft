import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Style, useTailwind } from 'tailwind-rn';
import { IOptions } from '../interfaces/IGen';

interface ICustomSelect {
  options: IOptions[];
  onSelect: (value: string) => void;
  selectedValue: string;
  placeholder: string;
  customStyle?: Style;
}

export const CustomSelect = ({ options, onSelect, selectedValue, placeholder, customStyle }:ICustomSelect) => {
  const [modalVisible, setModalVisible] = useState(false);
  const tailwind = useTailwind();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tailwind('p-4 border-b border-gray-300')}
      onPress={() => {
        onSelect(item.value);
        setModalVisible(false);
      }}
    >
      <Text style={tailwind('text-lg')}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[tailwind('mt-4'), customStyle]}>
      <Text style={tailwind('text-lg')}> {placeholder}</Text>
      {/* Botón para abrir el modal */}
      <TouchableOpacity
        style={tailwind('p-4 border border-gray-400 rounded')}
        onPress={() => setModalVisible(true)}
      >
        <Text style={tailwind('text-lg')}>
          {selectedValue
            ? options.find((opt) => opt.value === selectedValue)?.label
            : 'Seleccione una opcion'}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
      >
        <View style={[tailwind('flex-1 justify-center items-center'), styles.modalBackground]}>
          {/* Contenedor de las opciones */}
          <View style={[tailwind('w-80 min-h-32 max-h-96 rounded-lg'), styles.optionsContainer]}>
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo negro semi-transparente
  },
  optionsContainer: {
    backgroundColor: 'white', // Fondo blanco sólido
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para Android
  },
});

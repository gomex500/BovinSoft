import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';

const CustomSelect = ({ options, onSelect, selectedValue }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
    <View style={tailwind("w-11/12")}>
      <TouchableOpacity
        style={tailwind('p-4 border border-gray-400 rounded')}
        onPress={() => setModalVisible(true)}
      >
        <Text style={tailwind('text-lg')}>
          {selectedValue ? options.find(opt => opt.value === selectedValue)?.label : 'Select an option'}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tailwind('flex-1 justify-center items-center bg-black bg-opacity-50')}>
          <View style={tailwind('bg-white w-80 rounded')}>
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

export default CustomSelect;

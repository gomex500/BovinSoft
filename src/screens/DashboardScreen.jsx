import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import CustomSelect from "./../gen/CustomSelect"
import React, { useState } from 'react';

export default function DashboardScreen() {

  const [selectedValue, setSelectedValue] = useState(null);

  const options = [
    { label: 'Finca norte', value: 'option1' },
    { label: 'Finca sur', value: 'option2' },
    { label: 'Finca este', value: 'option3' },
  ];

  return (
    <View style={{...tailwind('flex flex-col bg-white flex-1 items-center justify-start')}}>
      <CustomSelect
        options={options}
        onSelect={(value) => setSelectedValue(value)}
        selectedValue={selectedValue}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
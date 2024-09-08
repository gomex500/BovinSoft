import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';

interface IProps {
  progress:number
}

const Progress = ({ progress }:IProps) => {
  // Asegúrate de que el valor de progreso esté entre 0 y 100
  const progressPercentage = Math.max(0, Math.min(progress, 100));

  return (
    <View style={tailwind('w-full')}>
      <View style={tailwind('bg-gray-200 h-4 rounded')}>
        <View
          style={[
            tailwind('h-full rounded'),
            { width: `${progressPercentage}%`, backgroundColor: '#4caf50' },
          ]}
        />
      </View>
    </View>
  );
};

export default Progress;

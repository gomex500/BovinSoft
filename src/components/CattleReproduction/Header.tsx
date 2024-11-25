import React from 'react';
import { Appbar } from 'react-native-paper';

interface HeaderProps {
  title: string;
  leftAction?: () => void;
}

export function Header({ title, leftAction }: HeaderProps) {
  return (
    <Appbar.Header style={{ backgroundColor: '#1B5E20' }}>
      {leftAction && <Appbar.BackAction onPress={leftAction} color="white" />}
      <Appbar.Content title={title} titleStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} />
    </Appbar.Header>
  );
}


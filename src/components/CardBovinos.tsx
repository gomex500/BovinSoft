import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { BovinoModel } from '../interfaces/IBovino'

interface CardBovinosProps {
  item: BovinoModel
}

export const CardBovinos: React.FC<CardBovinosProps> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.imagen} />
      <Text style={styles.codigo}>{item.nombre}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
  },
  imagen: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  codigo: {
    marginTop: 10,
    color: '#1B4725',
    fontWeight: 'bold',
    fontSize: 12,
  },
})


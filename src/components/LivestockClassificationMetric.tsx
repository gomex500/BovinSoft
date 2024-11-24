import { FincaModel } from '../interfaces/IFinca'
import { CustomPieChart, PieData } from './CustomPieChart'
import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'

interface LivestockClassificationProps {
  fincas: FincaModel[]
}

export const LivestockClassificationMetric = ({
  fincas,
}: LivestockClassificationProps) => {
  const sumTernero = fincas.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue?.cantidadClasificacionGanado?.ternero,
    0
  )

  const sumNovillo = fincas.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue?.cantidadClasificacionGanado?.novillo,
    0
  )

  const sumVaquilla = fincas.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue?.cantidadClasificacionGanado?.vaquilla,
    0
  )

  const sumToro = fincas.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue?.cantidadClasificacionGanado?.toro,
    0
  )

  const sumVaca = fincas.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue?.cantidadClasificacionGanado?.vaca,
    0
  )

  const dataPie: PieData[] = [
    { key: 'Ternero', value: sumTernero, color: '#1E2923' },
    { key: 'Novillo', value: sumNovillo, color: '#375746' },
    { key: 'Vaquilla', value: sumVaquilla, color: '#4B7B62' },
    { key: 'Toro', value: sumToro, color: '#5B9778' },
    { key: 'Vaca', value: sumVaca, color: '#75c199' },
  ]

  return (
    <ScrollView contentContainerStyle={styles.containerClasificacion}>
      <Text style={styles.titleClasificacion}>Clasificación del Ganado</Text>
      <CustomPieChart data={dataPie} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerClasificacion: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  titleClasificacion: {
    fontSize: 21,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 10,
    color: '#1B4725',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

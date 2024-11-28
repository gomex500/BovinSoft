import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BarChart2 } from 'lucide-react';
import { PieChart } from 'react-native-chart-kit';
import { BovinoModel } from '../../interfaces/IBovino';
import moment from 'moment';
import { calcularDiferenciaDeTiempo } from '../../helpers/gen';

interface InfoSectionProps {
  bovino: BovinoModel
}

export function InfoSection({ bovino }: InfoSectionProps) {

  const data2 = [
    {
      name: 'Comida',
      population: 215,
      color: '#1E2923', // Color de la paleta anterior
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Transporte',
      population: 130,
      color: '#375746', // Color de la paleta anterior
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Entretenimiento',
      population: 90,
      color: '#4B7B62', // Color de la paleta anterior
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Otros',
      population: 50,
      color: '#5B9778', // Color de la paleta anterior
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ]

  function clasificarGanado(fechaNacimiento, genero) {
    const fechaNacimientoMoment = moment(fechaNacimiento);
    const edadMeses = moment().diff(fechaNacimientoMoment, 'months');

    let clasificacion = '';

    // Determinar si es ternero, vaquilla o novillo
    if (edadMeses < 12) {
        clasificacion = 'Ternero';
    } else if (genero.toLowerCase() === 'macho') {

      if (edadMeses >= 12 && edadMeses < 24) {
        clasificacion = 'Novillo';
    } else {
      clasificacion = 'Toro';
    }

    } else if (genero.toLowerCase() === 'hembra') {
      if (edadMeses >= 12 && edadMeses < 24) {
        clasificacion = 'Vaquilla';
    } else {
      clasificacion = 'Vaca';
    }
    }

    return clasificacion;
}

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: bovino.image || 'https://enciclopediaiberoamericana.com/wp-content/uploads/2022/01/vaca.jpg' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>{clasificarGanado(bovino.fechaNacimiento, bovino.genero)} - {bovino.raza}</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>estado de salud: {bovino.estadoSalud}</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>codigo: {bovino.codigo}</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>edad: {calcularDiferenciaDeTiempo(bovino.fechaNacimiento)}</Text>
        </View>
      </View>
      <View style={styles.iconRow}>
        <View style={styles.chartContainer}>
          <PieChart
              data={data2}
              width={360} // Ancho del gráfico
              height={220} // Altura del gráfico
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              accessor="population" // Propiedad que se usará para calcular el tamaño de las secciones
              backgroundColor="transparent"
              paddingLeft="15"
              absolute // Si se establece en true, el gráfico mostrará valores absolutos
            />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  textContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  iconRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartContainer: {
    padding: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  qrContainer: {
    padding: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  qrText: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
});


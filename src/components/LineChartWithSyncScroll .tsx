import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface IDataMetric {
  labels: string[];
  datasets: {
      data: number[];
      color: (opacity?: number) => string;
      strokeWidth: number;
  }[];
}

interface LineChartWithSyncScrollProps {
  data: IDataMetric;
  handleDataPointClick?: (data: any) => void;
}

const LineChartWithDynamicYAxis = ({ data, handleDataPointClick }: LineChartWithSyncScrollProps) => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.max(screenWidth, data.labels.length * 100); 
  const chartHeight = 220;
  const refScrollView = useRef<ScrollView>(null);

  const [showStaticYAxis, setShowStaticYAxis] = useState(false);

  const handleScroll = (e) => {
    const scrollX = e.nativeEvent.contentOffset.x;
    setShowStaticYAxis(scrollX > 60);
  };

  // Generar etiquetas del eje Y estático
  const generateYAxisLabels = () => {
    const max = Math.max(...data.datasets[0].data); // Máximo valor del dataset
    const min = Math.min(...data.datasets[0].data); // Mínimo valor del dataset
    
    const step = (max - min) / 4; // Dividir en 5 partes iguales
    return Array.from({ length: 5 }, (_, i) => (max - i * step).toFixed(2)); // Formato numérico consistente
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start',  borderRadius: 16, overflow: 'hidden' }}>
        {/* Eje Y estático */}
        {showStaticYAxis && (
          <View style={[styles.yAxis, { height: chartHeight, paddingBottom: 36, paddingTop: 2 }]}>
            {generateYAxisLabels().map((value, index) => (
              <Text key={index} style={styles.yAxisText}>
                {value}
              </Text>
            ))}
          </View>
        )}

        {/* Gráfico desplazable */}
        <ScrollView
          ref={refScrollView}
          horizontal
          contentContainerStyle={{ width: chartWidth }}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Frecuencia del evento onScroll
        >
          <LineChart
            data={data}
            width={chartWidth}
            height={chartHeight}
            chartConfig={{
              backgroundColor: '#1E2923',
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              decimalPlaces: 2, // Cantidad de decimales
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: showStaticYAxis ? 0 : 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              borderRadius: showStaticYAxis ? 0 : 16,
              }}
              onDataPointClick={handleDataPointClick}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  yAxis: {
    width: 50,
    justifyContent: 'space-between', // Espaciado proporcional entre valores
    alignItems: 'flex-end',
    backgroundColor: '#1E2923', // Opcional, para destacar el eje
  },
  yAxisText: {
    fontSize: 10,
    color: '#fff',
  },
});

export default LineChartWithDynamicYAxis;

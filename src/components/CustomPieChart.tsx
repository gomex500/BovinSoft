import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Svg, G, Path, Text as SvgText } from 'react-native-svg'
import * as d3 from 'd3-shape'

export type PieData = {
  key: string
  value: number
  color: string
}

interface CustomPieChartProps {
  data: PieData[]
}

export const CustomPieChart = ({ data }: CustomPieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Generate pie chart slices
  const pieData = d3.pie<PieData>().value((d) => d.value)(data)
  const arcGenerator = d3
    .arc<d3.PieArcDatum<PieData>>()
    .innerRadius(0)
    .outerRadius(100)

  return (
    <View style={styles.chartContainer}>
      <Svg width={250} height={250}>
        <G x={125} y={125}>
          {pieData.map((slice) => {
            const { data: sliceData } = slice
            const percentage = ((sliceData.value / total) * 100).toFixed(1)
            return (
              <G key={sliceData.key}>
                <Path d={arcGenerator(slice)!} fill={sliceData.color} />
                {sliceData.value > 0 && (
                  <SvgText
                    fill="#fff"
                    fontSize="12"
                    x={arcGenerator.centroid(slice)[0]}
                    y={arcGenerator.centroid(slice)[1]}
                    textAnchor="middle"
                  >
                    {`${percentage}%`}
                  </SvgText>
                )}
              </G>
            )
          })}
        </G>
      </Svg>

      {/* Legend */}
      <View style={styles.legendContainer}>
        {data.map((item) => (
          <View key={item.key} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}> {item.value} - {item.key}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1B4725',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendContainer: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#000',
  },
})

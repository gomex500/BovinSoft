import { ScrollView, StyleSheet } from 'react-native'
import useCattleReproductionStore from '../../store/cattleReproductionStore'
import { Chip } from 'react-native-paper'

const FilterBar = () => {
  const { filterType, setFilterType } = useCattleReproductionStore()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
    >
      <Chip
        selected={filterType === 'all'}
        onPress={() => setFilterType('all')}
        style={styles.filterChip}
      >
        All
      </Chip>
      <Chip
        selected={filterType === 'proestrus'}
        onPress={() => setFilterType('proestrus')}
        style={styles.filterChip}
      >
        Proestrus
      </Chip>
      <Chip
        selected={filterType === 'insemination'}
        onPress={() => setFilterType('insemination')}
        style={styles.filterChip}
      >
        Insemination
      </Chip>
      <Chip
        selected={filterType === 'gestation'}
        onPress={() => setFilterType('gestation')}
        style={styles.filterChip}
      >
        Gestation
      </Chip>
      <Chip
        selected={filterType === 'parturition'}
        onPress={() => setFilterType('parturition')}
        style={styles.filterChip}
      >
        Parturition
      </Chip>
    </ScrollView>
  )
}

export default FilterBar

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    maxHeight: 45,
    minHeight: 45,
  },
  filterChip: {
    marginRight: 8,
  },
})

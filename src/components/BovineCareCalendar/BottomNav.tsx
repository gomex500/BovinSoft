import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import {
  Calendar,
  Activity,
  ClipboardList,
  Users,
  Settings,
} from 'lucide-react'
import { Feather, FontAwesome6 } from '@expo/vector-icons'

export function BottomNav() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton}>
      <FontAwesome6
          name="seedling"
          size={24}
          color="#fff"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
      <FontAwesome6
          name="seedling"
          size={24}
          color="#fff"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
      <FontAwesome6
          name="seedling"
          size={24}
          color="#fff"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <FontAwesome6
          name="seedling"
          size={24}
          color="#fff"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
      <FontAwesome6
          name="seedling"
          size={24}
          color="#fff"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1B5E20',
    paddingVertical: 12,
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    marginRight: 8,
  },
})

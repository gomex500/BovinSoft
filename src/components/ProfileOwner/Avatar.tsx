import { useState } from 'react'
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native'
import { Menu, useTheme, Divider } from 'react-native-paper'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../services/authService'

const Avatar = ({ navigation }) => {
  const { user } = useAuthStore()
  const theme = useTheme()

  theme.colors.primary = '#1B5E20'

  const [visible, setVisible] = useState(false)

  const cerrarSesion = async (navigation) => {
    setVisible(false)
    await authService.logout()
    navigation.navigate('Inicio')
  }

  const openProfile = () => {
    setVisible(false)
    navigation.navigate('Perfil')
  }

  return (
    <View style={styles.menuContainer}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Image
              source={
                user.image
                  ? { uri: user.image }
                  : require('../../../assets/img/usuario.png')
              }
              style={styles.userImage}
            />
          </TouchableOpacity>
        }
        contentStyle={{ backgroundColor: '#fff', marginTop: 90 }}
      >
        {user.rol !== 'ADMIN' && (
          <>
            <Menu.Item
              leadingIcon="account"
              onPress={openProfile}
              title="Perfil"
            />
            <Divider />
          </>
        )}

        <Menu.Item
          leadingIcon="logout"
          onPress={cerrarSesion}
          title="Cerrar sesión"
        />
      </Menu>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#f2f2f2',
    fontWeight: 'bold',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  menuContainer: {
    marginRight: 10, // Espacio del lado derecho
    marginTop: 5, // Ajusta la posición vertical
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#1B4725',
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: '#f2f2f2', // Color de la etiqueta
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Color de sombra
    textShadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    textShadowRadius: 1, // Radio de sombra
  },
})

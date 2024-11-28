import { jwtDecode } from 'jwt-decode';
import { Alert } from 'react-native';
import { UserModel } from '../interfaces/IUser';
import { useAuthStore } from '../store/authStore';
import { loginService } from './userServices';


export const authService = {
    async login(email: string, password: string) {
        try {

            const response = await loginService(email, password)

            let token = response.data.token

            const decoded = jwtDecode(token) as UserModel;
            Alert.alert('Sesión iniciada', 'Iniciaste sesión con éxito');
            useAuthStore.getState().setSession(decoded, token);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Alert.alert('Error', 'No se pudo iniciar sesión. Inténtalo de nuevo.');
        }
    },

    async logout() {
        try {
            useAuthStore.getState().clearSession();
            Alert.alert('Sesión Cerrada', 'Has cerrado sesión correctamente.');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
        }
    },

    async validateToken() {
      try {
          const { token } = useAuthStore.getState();
          if (!token) {
              useAuthStore.getState().clearSession();
              return { valid: false, reason: 'No token found' };
          }
  
          const decoded = jwtDecode(token) as UserModel;
          const currentTime = Date.now() / 1000;
  
          if (decoded.exp && decoded.exp < currentTime) {
              Alert.alert('Sesión Expirada', 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
              await this.logout();
              return { valid: false, reason: 'Token expired' };
          }
  
          useAuthStore.getState().setSession(decoded, token);
          return { valid: true, payload: decoded };
      } catch (error) {
          console.error('Error al validar el token:', error);
          useAuthStore.getState().clearSession();
          return { valid: false, reason: 'Invalid token' };
      }
  }  
};

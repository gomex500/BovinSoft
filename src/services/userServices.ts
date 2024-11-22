import axios from 'axios'
import { createAxiosInstance, PATH_LIST } from '../helpers/axiosIntance'
import { API_URL } from '@env'

export const obtenerUsuarioServices = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('LLega el response')

    console.log(response.data)

    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

export const crearUsuarioServices = async (usuario: any) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.SignIn)
    const response = await axiosInstance.post(``, usuario)
    const data = response.data
    return data
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

export const loginService = async (email: string, password: string) => {
  try {
    let loginData = {
      email,
      password,
    }
    const axiosInstance = createAxiosInstance(PATH_LIST.Login)
    const response = await axiosInstance.post(``, loginData)
    return response
  } catch (error) {
    console.error('Error  user:', error)
  }
}

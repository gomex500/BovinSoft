import axios from 'axios'
import { createAxiosInstance, PATH_LIST } from '../helpers/axiosIntance'
import { API_URL } from '@env'
import { UserModel } from '../interfaces/IUser'

export const obtenerUsuarioServices = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

export const getAllUsersService = async () => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Usuarios)
    const response = await axiosInstance.get(``)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

export const crearUsuarioServices = async (usuario: UserModel) => {
  try {
    
    const axiosInstance = createAxiosInstance(PATH_LIST.SignIn)
    const response = await axiosInstance.post(``, usuario)
    const data = response.data
    return data
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

export const updateUserService = async (user: UserModel) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.Usuario)
    const response = await axiosInstance.put(`/${user._id}`, user)
    return response
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

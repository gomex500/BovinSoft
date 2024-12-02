import { createAxiosInstance, PATH_LIST } from "../helpers/axiosIntance"
import { PremiumRequest } from "../interfaces/Admin"

export const getAllPremiumRequestsService = async () => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.PremiumRequest)
    const response = await axiosInstance.get(``)
    return response.data.premium_requests
  } catch (error) {
    console.error('Error fetching premium requests:', error)
  }
}

export const createPremiumRequestService = async (data: PremiumRequest) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.PremiumRequest)
    const response = await axiosInstance.post(``, data)
    return response.data
  } catch (error) {
    console.error('Error creating premium request:', error)
  }
}

export const updatePremiumRequestService = async (data: PremiumRequest) => {
  try {
    const axiosInstance = createAxiosInstance(PATH_LIST.PremiumRequest)
    const response = await axiosInstance.put(`/${data.id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating premium request:', error)
  }
}
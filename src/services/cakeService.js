import { BASE_URL } from '@/config/constants'
import api from './api'

export async function getCakesByCategory(category) {
  const response = await api.get(`${BASE_URL}/getCakesByCategory/${category}`)
  return response.data
}

export async function getCakeById(id) {
  const response = await api.get(`${BASE_URL}/findCakeById/${id}`)
  return response.data
}

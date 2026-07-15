import api from './api'
import { BASE_URL } from '@/config/constants'

export async function getOrders() {
  const response = await api.get(`${BASE_URL}/orders`)
  return response.data
}

export async function getOrder(id) {
  const response = await api.get(`${BASE_URL}/orders/${id}`)
  return response.data
}

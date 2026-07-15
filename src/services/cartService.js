import { BASE_URL } from '@/config/constants'
import api from './api'

export async function addToCart(items) {
  const response = await api.post(`${BASE_URL}/addToCart`, items)
  return response.data
}

export async function getCart(userID) {
  const response = await api.get(`${BASE_URL}/cartItemByuser/${userID}`)
  return response.data
}

export async function removeItem(cartID) {
  const response = await api.delete(`${BASE_URL}/deleteItem/${cartID}`)
  return response.data
}

export async function updateCart(cartID, item) {
  const response = await api.put(`${BASE_URL}/updateCart/${cartID}`, item)

  return response.data
}

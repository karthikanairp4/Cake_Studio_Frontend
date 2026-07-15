import { BASE_URL } from '@/config/constants'
import api from './api'

export async function checkout(data) {
  const response = await api.post(`${BASE_URL}/checkout`, data)
  return response.data
}

export async function createPaymentIntent() {
  const response = await api.post(`${BASE_URL}/create-payment-intent`)
  return response.data
}

export async function createBuyNowPaymentIntent(data) {
  const response = await api.post(`${BASE_URL}/create-buy-now-payment-intent`, data)
  return response.data
}

export async function buyNow(data) {
  console.log(data, 'data')
  const response = await api.post(`${BASE_URL}/buy-now`, data)
  return response.data
}

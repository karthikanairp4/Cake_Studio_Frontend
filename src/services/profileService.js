import api from './api'
import { BASE_URL } from '@/config/constants'

export async function getProfile() {
  const response = await api.get(`${BASE_URL}/profile`)
  return response.data
}

export async function updateProfile(profile) {
  const response = await api.put(`${BASE_URL}/profile`, profile)
  return response.data
}
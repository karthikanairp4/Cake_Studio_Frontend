import axios from 'axios'
import { BASE_URL } from '@/config/constants'

export async function login(email, password) {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  })

  return response.data
}

export async function register(user) {
  const response = await axios.post(`${BASE_URL}/auth/register`, user)

  return response.data
}

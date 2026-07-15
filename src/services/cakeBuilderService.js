import { BASE_URL } from '@/config/constants'
// import axios from 'axios'
import api from './api'

export async function getAllCakeOptions() {
  const response = await api.get(`${BASE_URL}/all`)

  return response.data
}

// export async function getAllCakeOptions() {
//   const response = await fetch(`${BASE_URL}/all`)

//   if (!response.ok) {
//     throw new Error('Failed to fetch all options')
//   }

//   return await response.json()
// }

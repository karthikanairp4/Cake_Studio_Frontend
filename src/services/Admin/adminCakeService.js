import api from '../api'
import { BASE_URL } from '@/config/constants'

// Get all cakes for admin
export async function getAdminCakes() {
  const response = await api.get(`${BASE_URL}/admin/cakes`)
  return response.data
}

// Add cake
export async function addCake(cake) {
  const response = await api.post(`${BASE_URL}/admin/cakes`, cake)
  return response.data
}

// Update cake
export async function updateCake(id, cake) {
  const response = await api.put(`${BASE_URL}/admin/cakes/${id}`, cake)
  return response.data
}

// Activate / Deactivate cake
export async function updateCakeStatus(id, active) {
  const response = await api.put(`${BASE_URL}/admin/cakes/${id}/status`, null, {
    params: {
      active: active,
    },
  })

  return response.data
}

export async function getAdminCakeOptions() {
  const response = await api.get(`${BASE_URL}/admin/cake-options`)
  return response.data
}

export async function addCakeOption(option) {
  const response = await api.post(`${BASE_URL}/admin/cake-options`, option)
  return response.data
}

export async function updateCakeOption(id, option) {
  const response = await api.put(`${BASE_URL}/admin/cake-options/${id}`, option)
  return response.data
}

export async function updateCakeOptionStatus(id, active) {
  const response = await api.put(`${BASE_URL}/admin/cake-options/${id}/status`, null, {
    params: {
      active,
    },
  })

  return response.data
}

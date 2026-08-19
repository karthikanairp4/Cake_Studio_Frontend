import api from '../api'
import { BASE_URL } from '@/config/constants'

export async function getDashboardStats() {
  const response = await api.get(`${BASE_URL}/admin/dashboard`)
  console.log('response', response)
  return response.data
}

export async function getAdminOrders() {
  const response = await api.get(`${BASE_URL}/admin/orders`)
  return response.data
}

export async function updateOrderStatus(orderId, status) {
  const response = await api.put(
    `${BASE_URL}/admin/${orderId}/status`,
    {},
    {
      params: {
        status: status,
      },
    },
  )

  return response.data
}

export async function getRevenueOverview(days = 7) {
  const response = await api.get(`${BASE_URL}/admin/dashboard/revenue`, {
    params: {
      days,
    },
  })

  return response.data
}

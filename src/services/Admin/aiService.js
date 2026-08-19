import api from '@/services/api'
import { BASE_URL } from '@/config/constants'

export async function getAIInsights() {
  const response = await api.get(`${BASE_URL}/admin/ai/insights`)
  return response.data
}

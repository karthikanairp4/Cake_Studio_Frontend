import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    user: {
      id: Number(localStorage.getItem('userID')) || null,
      email: localStorage.getItem('email'),
    },
  }),

  // getters: {
  //   isLoggedIn: (state) => !!state.token,
  // },
  getters: {
    isLoggedIn: (state) => {
      if (!state.token) return false

      try {
        const decoded = jwtDecode(state.token)

        return decoded.exp * 1000 > Date.now()
      } catch {
        return false
      }
    },
  },

  actions: {
    login(response) {
      this.token = response.token
      this.user = {
        id: response.userId,
        email: response.email,
      }

      localStorage.setItem('token', response.token)
      localStorage.setItem('userID', response.userId)
      localStorage.setItem('email', response.email)
    },

    logout() {
      this.token = null
      this.user = {
        id: null,
        email: null,
      }

      localStorage.removeItem('token')
      localStorage.removeItem('userID')
      localStorage.removeItem('email')
    },
  },
})

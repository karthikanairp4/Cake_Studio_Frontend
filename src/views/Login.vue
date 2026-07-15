<template>
  <NavBar />

  <section class="login-page">
    <div class="login-card">
      <h1>Welcome Back</h1>

      <p>Login to continue shopping.</p>

      <input type="email" v-model="email" placeholder="Email" />

      <input type="password" v-model="password" placeholder="Password" />

      <button @click="login">Login</button>

      <div class="divider">
        <span>OR</span>
      </div>

      <button class="google-btn" @click="loginWithGoogle">
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
        Continue with Google
      </button>

      <p class="register">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </section>

  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { login } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'

export default {
  components: {
    NavBar,
    Footer,
  },

  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    async login() {
      try {
        const response = await login(this.email, this.password)
        console.log('login data:', response)

        if (response) {
          const auth = useAuthStore()
          auth.login(response)
          alert('Login Successful')

          this.$router.push('/')
        } else {
          alert('Invalid Credentials')
        }
      } catch (error) {
        alert('Login Failed')
        console.error(error)
      }
    },
    loginWithGoogle() {
      window.location.href = 'http://localhost:8000/oauth2/authorization/google'
    },
  },
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: #fff8e8;
}

.login-card {
  width: 420px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
}

.login-card h1 {
  text-align: center;
  color: #564743;
}

.login-card p {
  text-align: center;
  margin-bottom: 30px;
}

input {
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

button {
  width: 100%;
  padding: 15px;
  background: #ffc43d;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

button:hover {
  background: #5ed3d1;
}

.register {
  margin-top: 20px;
}

.divider {
  display: flex;
  align-items: center;
  margin: 25px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #ddd;
}

.divider span {
  padding: 0 15px;
  color: #888;
  font-size: 0.9rem;
}

.google-btn {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  background: white;
  color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 600;
}

.google-btn:hover {
  background: #f5f5f5;
}

.google-btn img {
  width: 20px;
  height: 20px;
}

.register {
  margin-top: 25px;
  text-align: center;
}
</style>

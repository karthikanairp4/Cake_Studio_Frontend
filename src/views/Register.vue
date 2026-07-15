<template>
  <NavBar />

  <section class="register-page">
    <div class="register-card">
      <h1>Create Account</h1>

      <p>Join The Cake Studio today.</p>

      <div class="row">
        <input type="text" placeholder="First Name" v-model="user.firstName" />

        <input type="text" placeholder="Last Name" v-model="user.lastName" />
      </div>

      <input type="email" placeholder="Email" v-model="user.email" />

      <input type="text" placeholder="Phone Number" v-model="user.phone" />

      <input type="password" placeholder="Password" v-model="user.password" />

      <input type="password" placeholder="Confirm Password" v-model="confirmPassword" />

      <button @click="registerUser">Create Account</button>

      <p class="login">
        Already have an account?

        <router-link to="/login"> Login </router-link>
      </p>
    </div>
  </section>

  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { register } from '@/services/authService'

export default {
  components: {
    NavBar,
    Footer,
  },

  data() {
    return {
      confirmPassword: '',

      user: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
      },
    }
  },

  methods: {
    async registerUser() {
      if (
        !this.user.firstName ||
        !this.user.lastName ||
        !this.user.email ||
        !this.user.phone ||
        !this.user.password
      ) {
        alert('Please fill all fields.')
        return
      }

      if (this.user.password !== this.confirmPassword) {
        alert('Passwords do not match.')
        return
      }

      try {
        await register(this.user)

        alert('Registration Successful')

        this.$router.push('/login')
      } catch (error) {
        console.error(error)
        alert('Registration Failed')
      }
    },
  },
}
</script>

<style scoped>
.register-page {
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff8e8;
}

.register-card {
  width: 600px;
  background: white;
  padding: 45px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.register-card h1 {
  text-align: center;
  color: #564743;
  margin-bottom: 10px;
}

.register-card p {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

input {
  width: 100%;
  padding: 15px;
  margin-bottom: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #5ed3d1;
}

button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 30px;
  background: #ffc43d;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #5ed3d1;
}

.login {
  margin-top: 20px;
}
</style>

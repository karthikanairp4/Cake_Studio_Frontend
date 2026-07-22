<template>
  <section class="register-page">
    <!-- Logo -->
    <router-link to="/" class="logo-link">
      <img :src="logo" alt="Paprika Bakes" class="logo" />
    </router-link>

    <div class="register-card">
      <h1>Create Account</h1>

      <p class="subtitle">Join Paprika Bakes and start ordering delicious cakes.</p>

      <div class="row">
        <input type="text" placeholder="First Name" v-model="user.firstName" />

        <input type="text" placeholder="Last Name" v-model="user.lastName" />
      </div>

      <input type="email" placeholder="Email Address" v-model="user.email" />

      <input type="text" placeholder="Phone Number" v-model="user.phone" />

      <input type="password" placeholder="Password" v-model="user.password" />

      <input type="password" placeholder="Confirm Password" v-model="confirmPassword" />

      <button class="register-btn" @click="registerUser">Create Account</button>

      <p class="login">
        Already have an account?

        <router-link to="/login"> Login </router-link>
      </p>
    </div>
  </section>
</template>

<script>
import logo from '@/assets/images/pbakes.png'

import { register } from '@/services/authService'

export default {
  data() {
    return {
      logo,

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
  min-height: 100vh;

  background: var(--background);

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  padding: 20px;

  box-sizing: border-box;
}

/* Logo */

.logo-link {
  display: inline-block;

  margin-bottom: 10px;
}

.logo {
  height: 90px;

  cursor: pointer;

  transition: 0.3s;

  max-width: 100%;
}

.logo:hover {
  transform: scale(1.05);
}

/* Card */

.register-card {
  width: 100%;

  max-width: 620px;

  background: var(--white);

  border-radius: 28px;

  padding: clamp(24px, 5vw, 45px);

  box-shadow: 0 15px 45px rgba(23, 20, 20, 0.08);

  box-sizing: border-box;
}

/* Heading */

.register-card h1 {
  margin: 0;

  text-align: center;

  color: var(--primary);

  font-size: clamp(1.4rem, 4vw, 2rem);

  font-weight: 700;
}

.subtitle {
  margin: 12px 0 35px;

  text-align: center;

  color: var(--text-light);

  font-size: 0.95rem;
}

/* Two Column */

.row {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 16px;
}

/* Inputs */

input {
  width: 100%;

  padding: 14px 16px;

  margin-bottom: 18px;

  border: 1px solid #e5e5e5;

  border-radius: 14px;

  /* 16px avoids iOS Safari auto-zoom on focus */
  font-size: 16px;

  color: var(--text);

  background: white;

  outline: none;

  transition: 0.3s;

  box-sizing: border-box;
}

input::placeholder {
  color: #999;
}

input:focus {
  border-color: var(--secondary);

  box-shadow: 0 0 0 4px rgba(209, 170, 103, 0.15);
}

/* Register Button */

.register-btn {
  width: 100%;

  height: 55px;

  margin-top: 8px;

  border: none;

  border-radius: 999px;

  background: var(--secondary);

  color: white;

  font-size: 1rem;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;
}

.register-btn:hover {
  background: var(--secondary-hover);

  transform: translateY(-2px);

  box-shadow: 0 10px 25px rgba(209, 170, 103, 0.25);
}

/* Login Link */

.login {
  margin-top: 30px;

  text-align: center;

  color: var(--text-light);

  font-size: 0.95rem;
}

.login a {
  color: var(--secondary);

  text-decoration: none;

  font-weight: 600;

  transition: 0.3s;
}

.login a:hover {
  color: var(--secondary-hover);
}

/* Responsive */

@media (max-width: 768px) {
  .register-page {
    padding: 16px;
  }

  .register-card {
    padding: 30px 24px;
  }

  .row {
    grid-template-columns: 1fr;

    gap: 0;
  }

  .logo {
    height: 70px;
  }

  .subtitle {
    margin-bottom: 26px;
  }
}

@media (max-width: 420px) {
  .register-card {
    padding: 24px 18px;

    border-radius: 20px;
  }

  .logo {
    height: 56px;
  }

  .register-btn {
    height: 50px;
  }

  .login {
    margin-top: 22px;
  }
}
</style>

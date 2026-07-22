<template>
  <section class="login-page">
    <!-- Logo -->
    <router-link to="/" class="logo-link">
      <img :src="logo" alt="Paprika Bakes" class="logo" />
    </router-link>
    <!-- Login Card -->
    <div class="login-card">
      <h1>Welcome Back</h1>
      <p class="subtitle">Login to continue shopping.</p>
      <input type="email" v-model="email" placeholder="Email Address" />
      <input type="password" v-model="password" placeholder="Password" />
      <button class="login-btn" @click="login">Login</button>
      <div class="divider">
        <span>OR</span>
      </div>
      <button class="google-btn" @click="loginWithGoogle">
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
        Continue with Google
      </button>
      <p class="register">
        Don't have an account?
        <router-link to="/register"> Register </router-link>
      </p>
    </div>
  </section>
</template>
<script>
import logo from '@/assets/images/pbakes.png'
import { login } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'
export default {
  data() {
    return {
      logo,
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        const response = await login(this.email, this.password)
        if (response) {
          const auth = useAuthStore()
          auth.login(response)
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
      window.location.href = 'https://cake-studio-backend.onrender.com/oauth2/authorization/google'
    },
  },
}
</script>
<style scoped>
.login-page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--background);
  padding: 20px;
  box-sizing: border-box;
}
/* Logo */
.logo-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 28px;
}
.logo {
  width: auto;
  height: 90px;
  display: block;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}
/* Login Card */
.login-card {
  width: 100%;
  max-width: 430px;

  background: var(--white);

  border-radius: 28px;

  padding: 42px;

  box-shadow: 0 15px 45px rgba(23, 20, 20, 0.08);

  box-sizing: border-box;
}
/* Heading */
.login-card h1 {
  margin: 0;
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
  font-weight: 700;
}
.subtitle {
  margin: 12px 0 35px;
  text-align: center;
  color: var(--text-light);
  font-size: 1rem;
}
/* Inputs */
input {
  width: 100%;
  padding: 16px;
  margin-bottom: 18px;
  border: 1px solid #e5e5e5;
  border-radius: 14px;
  font-size: 1rem;
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
/* Login Button */
.login-btn {
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 999px;
  background: var(--secondary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}
.login-btn:hover {
  background: var(--secondary-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(209, 170, 103, 0.25);
}
/* Divider */
.divider {
  display: flex;
  align-items: center;
  margin: 30px 0;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e6e6e6;
}
.divider span {
  margin: 0 18px;
  color: var(--text-light);
  font-size: 0.9rem;
  font-weight: 500;
}
/* Google Button */
.google-btn {
  width: 100%;
  height: 55px;
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: var(--primary);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}
.google-btn:hover {
  border-color: var(--secondary);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(209, 170, 103, 0.15);
}
.google-btn img {
  width: 20px;
  height: 20px;
}
/* Register */
.register {
  margin-top: 30px;
  text-align: center;
  color: var(--text-light);
  font-size: 0.95rem;
}
.register a {
  color: var(--secondary);
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
}
.register a:hover {
  color: var(--secondary-hover);
}
/* =========================
   Tablet
========================= */

@media (max-width: 992px) {
  .login-card {
    max-width: 420px;
    padding: 36px;
  }

  .logo {
    height: 80px;
  }
}

/* =========================
   Mobile
========================= */

@media (max-width: 768px) {
  .login-page {
    padding: 20px 16px;
  }

  .logo-link {
    margin-bottom: 22px;
  }

  .logo {
    height: 70px;
  }

  .login-card {
    max-width: 100%;
    padding: 32px 24px;
    border-radius: 22px;
  }

  .login-card h1 {
    font-size: 1.7rem;
  }

  .subtitle {
    margin-bottom: 26px;
    font-size: 0.95rem;
  }

  input {
    padding: 14px;
    font-size: 0.95rem;
  }

  .login-btn,
  .google-btn {
    height: 50px;
    font-size: 0.95rem;
  }

  .divider {
    margin: 24px 0;
  }

  .register {
    margin-top: 24px;
  }
}

/* =========================
   Small Phones
========================= */

@media (max-width: 480px) {
  .logo {
    height: 60px;
  }

  .login-card {
    padding: 28px 20px;
  }

  .login-card h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .register {
    font-size: 0.9rem;
  }
}

/* =========================
   Extra Small Phones
========================= */

@media (max-width: 360px) {
  .login-page {
    padding: 16px;
  }

  .logo {
    height: 52px;
  }

  .login-card {
    padding: 22px 16px;
  }

  .login-card h1 {
    font-size: 1.3rem;
  }

  input {
    padding: 12px;
    font-size: 0.9rem;
  }

  .login-btn,
  .google-btn {
    height: 46px;
    font-size: 0.9rem;
  }
}
</style>

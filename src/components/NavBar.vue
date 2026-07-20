<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <router-link class="brand" to="/">
        <img :src="logo" alt="logo" class="logo" />
      </router-link>

      <!-- Center Menu -->
      <ul class="nav-menu">
        <li>
          <router-link to="/">Home</router-link>
        </li>

        <li>
          <router-link to="/classic-cakes">Classic Cakes</router-link>
        </li>
        <!-- 
        <li>
          <router-link to="/make-cake">Make Your Own Cake</router-link>
        </li> -->

        <li>
          <router-link to="/theme-cakes">Themed Cakes</router-link>
        </li>

        <li>
          <router-link to="/contact-us">Contact Us</router-link>
        </li>
      </ul>

      <!-- Right Side -->
      <div class="nav-actions">
        <button class="search-btn"><i class="bi bi-search"></i></button>

        <div class="cart-wrapper" @click="goToBag">
          <button class="cart-btn"><i class="bi bi-bag"></i></button>
        </div>

        <!-- Show Login -->
        <router-link v-if="!auth.isLoggedIn" class="login-btn" to="/login"> Login </router-link>

        <!-- Show Account -->
        <div v-else class="user-menu" ref="userMenu" @click.stop>
          <button class="profile-btn" @click="toggleMenu"><i class="bi bi-person"></i></button>

          <div class="dropdown" v-if="showUserMenu">
            <router-link to="/profile" @click="closeDropdown"> My Profile </router-link>

            <router-link to="/my-orders" @click="closeDropdown"> My Orders </router-link>

            <button @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { useAuthStore } from '@/stores/authStore'
import logo from '@/assets/images/pbakes.png'

export default {
  components: {},
  setup() {
    const auth = useAuthStore()

    return { auth }
  },

  data() {
    return {
      showUserMenu: false,
      logo,
    }
  },

  mounted() {
    document.addEventListener('click', this.closeMenu)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.closeMenu)
  },

  methods: {
    goToBag() {
      this.$router.push('/bag')
    },
    toggleMenu() {
      this.showUserMenu = !this.showUserMenu
    },

    closeDropdown() {
      this.showUserMenu = false
    },

    closeMenu(event) {
      if (this.$refs.userMenu && !this.$refs.userMenu.contains(event.target)) {
        this.showUserMenu = false
      }
    },

    logout() {
      this.closeDropdown()

      this.showCart = false

      this.auth.logout()

      this.$router.push('/')
    },
  },
}
</script>
<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--background);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e8e0da;
}

.nav-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
}

.logo {
  height: 72px;
  width: auto;
  display: block;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  text-decoration: none;
  color: var(--primary);
  font-weight: 500;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.search-btn,
.cart-btn,
.profile-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--primary);
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.search-btn {
  font-size: 1.5rem;
}

.search-btn:hover,
.cart-btn:hover,
.profile-btn:hover {
  color: var(--secondary-hover);
  transform: scale(1.08);
}

.cart-btn {
  font-size: 1.5rem;
}

.profile-btn {
  font-size: 1.8rem;
}

.cart-wrapper {
  position: relative;
  cursor: pointer;
}

.user-menu {
  position: relative;
}

/* .profile-btn {
  display: flex;
  align-items: center; 
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #564743;
  font-size: 1rem;
  font-weight: 600;
} */

.dropdown {
  position: absolute;

  top: 48px;
  right: 0;

  width: 220px;

  background: white;

  border-radius: 15px;

  overflow: hidden;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);

  z-index: 999;
}

.dropdown a,
.dropdown button {
  display: block;

  width: 100%;

  padding: 14px 20px;

  border: none;

  background: white;

  text-align: left;

  color: #564743;

  text-decoration: none;

  cursor: pointer;

  transition: 0.25s;

  font-size: 0.95rem;
}

.dropdown a:hover,
.dropdown button:hover {
  background: #fff8e8;
}

.login-btn {
  text-decoration: none;
  background: var(--secondary);
  color: white;
  padding: 10px 20px;
  /* border-radius: 25px; */
  font-weight: 600;
  transition: 0.3s;
}

.login-btn:hover {
  background: var(--secondary-hover);
}
</style>

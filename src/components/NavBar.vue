<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <router-link class="brand" to="/"> The Cake Studio </router-link>

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
        <button class="icon-btn">🔍</button>

        <div class="cart-wrapper" @click="showCart = true">
          <button class="icon-btn">🛒</button>
        </div>

        <!-- Show Login -->
        <router-link v-if="!auth.isLoggedIn" class="login-btn" to="/login"> Login </router-link>

        <!-- Show Account -->
        <div v-else class="user-menu" ref="userMenu" @click.stop>
          <button class="profile-btn" @click="toggleMenu">👤 Account ▼</button>

          <div class="dropdown" v-if="showUserMenu">
            <router-link to="/profile" @click="closeDropdown"> My Profile </router-link>

            <router-link to="/my-orders" @click="closeDropdown"> My Orders </router-link>

            <button @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <CartDrawer :show="showCart" @close="showCart = false" />
</template>
<script>
import CartDrawer from '@/components/CartDrawer.vue'
import { useAuthStore } from '@/stores/authStore'

export default {
  components: {
    CartDrawer,
  },

  setup() {
    const auth = useAuthStore()

    return { auth }
  },

  data() {
    return {
      showCart: false,
      showUserMenu: false,
    }
  },

  mounted() {
    document.addEventListener('click', this.closeMenu)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.closeMenu)
  },

  methods: {
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
  padding: 20px 40px;
  background-color: #fff7e6;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  color: #4b3f3f;
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
  color: #4b3f3f;
  font-weight: 500;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.icon-btn {
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
}

.cart-wrapper {
  position: relative;
  cursor: pointer;
}

.user-menu {
  position: relative;
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 8px;

  background: transparent;
  border: none;

  cursor: pointer;

  color: #564743;

  font-size: 1rem;
  font-weight: 600;
}

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

  background: #ffc43d;

  color: white;

  padding: 10px 20px;

  border-radius: 25px;

  font-weight: 600;

  transition: 0.3s;
}

.login-btn:hover {
  background: #f5b400;
}
</style>

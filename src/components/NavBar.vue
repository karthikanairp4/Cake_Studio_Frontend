<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <router-link class="brand" to="/" @click="closeMobileMenu">
        <img :src="logo" alt="Paprika Bakes" class="logo" />
      </router-link>

      <!-- Desktop Menu -->
      <ul class="nav-menu">
        <li>
          <router-link to="/">Home</router-link>
        </li>

        <li>
          <router-link to="/classic-cakes">Classic Cakes</router-link>
        </li>

        <li>
          <router-link to="/theme-cakes">Themed Cakes</router-link>
        </li>

        <li>
          <router-link to="/contact-us">Contact Us</router-link>
        </li>
      </ul>

      <!-- Right Actions -->
      <div class="nav-actions">
        <button class="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <div class="cart-wrapper" @click="goToBag">
          <button class="cart-btn">
            <i class="bi bi-bag"></i>
          </button>
        </div>

        <!-- Desktop Login -->
        <router-link v-if="!auth.isLoggedIn" class="login-btn desktop-only" to="/login">
          Login
        </router-link>

        <!-- Desktop User -->
        <div v-else class="user-menu desktop-only" ref="userMenu" @click.stop>
          <button class="profile-btn" @click="toggleMenu">
            <i class="bi bi-person"></i>
          </button>

          <div class="dropdown" v-if="showUserMenu">
            <router-link to="/profile" @click="closeDropdown"> My Profile </router-link>

            <router-link to="/my-orders" @click="closeDropdown"> My Orders </router-link>

            <button @click="logout">Logout</button>
          </div>
        </div>

        <!-- Mobile Hamburger -->
        <button class="menu-btn" @click="toggleMobileMenu">
          <i class="bi" :class="showMobileMenu ? 'bi-x-lg' : 'bi-list'"></i>
        </button>
      </div>
    </div>

    <!-- Overlay -->
    <div v-if="showMobileMenu" class="mobile-overlay" @click="closeMobileMenu"></div>

    <!-- Mobile Drawer -->
    <div class="mobile-menu" :class="{ active: showMobileMenu }">
      <router-link to="/" @click="closeMobileMenu"> Home </router-link>

      <router-link to="/classic-cakes" @click="closeMobileMenu"> Classic Cakes </router-link>

      <router-link to="/theme-cakes" @click="closeMobileMenu"> Themed Cakes </router-link>

      <router-link to="/contact-us" @click="closeMobileMenu"> Contact Us </router-link>

      <router-link to="/bag" @click="closeMobileMenu"> Shopping Bag </router-link>

      <template v-if="!auth.isLoggedIn">
        <router-link to="/login" @click="closeMobileMenu"> Login </router-link>
      </template>

      <template v-else>
        <router-link to="/profile" @click="closeMobileMenu"> My Profile </router-link>

        <router-link to="/my-orders" @click="closeMobileMenu"> My Orders </router-link>

        <button @click="logout">Logout</button>
      </template>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import logo from '@/assets/images/pbakes.png'

export default {
  setup() {
    const auth = useAuthStore()

    return { auth }
  },

  data() {
    return {
      logo,
      showUserMenu: false,
      showMobileMenu: false,
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
      this.closeMobileMenu()
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

    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },

    closeMobileMenu() {
      this.showMobileMenu = false
    },

    logout() {
      this.closeDropdown()
      this.closeMobileMenu()

      this.auth.logout()

      this.$router.push('/')
    },
  },
}
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--background);
  border-bottom: 1px solid #e8e0da;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.nav-container {
  max-width: 1400px;
  margin: auto;
  padding: 0 30px;
  min-height: 82px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  position: relative;
  z-index: 1001;
}

.logo {
  height: 72px;
  display: block;
  max-width: 100%;
}

/* ===========================
   Desktop Menu
=========================== */

.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  text-decoration: none;
  color: var(--primary);
  font-weight: 500;
  transition: 0.3s;
}

.nav-menu a:hover,
.nav-menu .router-link-active {
  color: var(--secondary);
}

/* ===========================
   Right Actions
=========================== */

.nav-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.search-btn,
.cart-btn,
.profile-btn,
.menu-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--primary);
  transition: 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn,
.cart-btn {
  font-size: 1.45rem;
}

.profile-btn {
  font-size: 1.8rem;
}

.search-btn:hover,
.cart-btn:hover,
.profile-btn:hover,
.menu-btn:hover {
  color: var(--secondary);
}

.cart-wrapper {
  cursor: pointer;
}

.login-btn {
  text-decoration: none;
  background: var(--secondary);
  color: white;
  padding: 10px 22px;
  border-radius: 999px;
  font-weight: 600;
  transition: 0.3s;
  white-space: nowrap;
}

.login-btn:hover {
  background: var(--secondary-hover);
}

/* ===========================
   User Dropdown
=========================== */

.user-menu {
  position: relative;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;

  width: 220px;
  max-width: 80vw;

  background: white;

  border-radius: 16px;

  overflow: hidden;

  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.dropdown a,
.dropdown button {
  width: 100%;
  display: block;

  padding: 14px 20px;

  border: none;

  background: white;

  color: var(--primary);

  text-align: left;

  cursor: pointer;

  text-decoration: none;

  transition: 0.25s;

  font-size: 0.95rem;

  box-sizing: border-box;
}

.dropdown a:hover,
.dropdown button:hover {
  background: #faf4ee;
}

/* ===========================
   Mobile
=========================== */

.menu-btn {
  display: none;
  font-size: 2rem;

  width: 44px;
  height: 44px;
}

/* Overlay */

.mobile-overlay {
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  z-index: 998;
}

/* Drawer */

.mobile-menu {
  position: fixed;

  top: 0;
  right: -320px;

  width: 300px;
  max-width: 85vw;

  height: 100vh;
  height: 100dvh;

  background: white;

  display: flex;
  flex-direction: column;

  padding-top: 82px;

  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);

  transition: right 0.35s ease;

  z-index: 999;

  overflow-y: auto;

  box-sizing: border-box;
}

.mobile-menu.active {
  right: 0;
}

.mobile-menu a,
.mobile-menu button {
  padding: 18px 28px;

  border: none;

  background: white;

  text-align: left;

  text-decoration: none;

  color: var(--primary);

  font-size: 1rem;

  cursor: pointer;

  transition: 0.25s;

  box-sizing: border-box;
}

.mobile-menu a:hover,
.mobile-menu button:hover {
  background: #faf4ee;
}

.mobile-menu .router-link-active {
  color: var(--secondary);
  font-weight: 600;
}

/* ===========================
   Tablet
=========================== */

@media (max-width: 992px) {
  .nav-container {
    padding: 0 20px;
  }

  .nav-menu {
    gap: 22px;
  }
}

/* ===========================
   Mobile
=========================== */

@media (max-width: 768px) {
  html,
  body {
    overflow-x: hidden;
  }

  .logo {
    height: 58px;
  }

  .nav-container {
    min-height: 72px;
    padding: 0 16px;
  }

  .nav-menu {
    display: none;
  }

  .desktop-only {
    display: none;
  }

  .menu-btn {
    display: flex;
  }

  .nav-actions {
    gap: 10px;
  }

  .search-btn {
    display: none;
  }

  .mobile-menu {
    padding-top: 72px;
  }
}

/* ===========================
   Small Phones
=========================== */

@media (max-width: 480px) {
  .logo {
    height: 50px;
  }

  .cart-btn {
    font-size: 1.3rem;
  }

  .menu-btn {
    font-size: 1.8rem;
  }

  .mobile-menu {
    width: 270px;
  }
}

/* ===========================
   Very Small Phones
=========================== */

@media (max-width: 360px) {
  .nav-container {
    padding: 0 12px;
  }

  .logo {
    height: 44px;
  }

  .nav-actions {
    gap: 6px;
  }

  .mobile-menu {
    width: 240px;
  }

  .mobile-menu a,
  .mobile-menu button {
    padding: 16px 20px;
  }
}
</style>

<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <router-link to="/admin">
        <img :src="logo" alt="Paprika Bakes" />
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-menu">
      <router-link to="/admin" class="menu-item">
        <i class="bi bi-grid-1x2-fill"></i>
        <span>Dashboard</span>
      </router-link>

      <router-link to="/admin/orders" class="menu-item">
        <i class="bi bi-bag-check"></i>
        <span>Orders</span>
      </router-link>

      <router-link to="/admin/cakes" class="menu-item">
        <i class="bi bi-cake2"></i>
        <span>Cakes</span>
      </router-link>

      <router-link to="/admin/reports" class="menu-item">
        <i class="bi bi-bar-chart"></i>
        <span>Reports</span>
      </router-link>
    </nav>

    <!-- Bottom -->
    <div class="sidebar-bottom">
      <button class="website-btn" @click="goToWebsite">
        <i class="bi bi-globe"></i>
        <span>View Website</span>
      </button>

      <button class="logout-btn" @click="logout">
        <i class="bi bi-box-arrow-left"></i>
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script>
import logo from '@/assets/images/pbakes.png'
import { useAuthStore } from '@/stores/authStore'

export default {
  data() {
    return {
      logo,
    }
  },

  setup() {
    const auth = useAuthStore()

    return {
      auth,
    }
  },

  methods: {
    goToWebsite() {
      this.$router.push('/')
    },

    logout() {
      this.auth.logout()

      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.sidebar {
  position: fixed;

  left: 0;
  top: 0;
  bottom: 0;

  width: 250px;

  background: var(--background);

  border-right: 1px solid #e8e0da;

  display: flex;
  flex-direction: column;

  z-index: 1000;
}

/* Logo */

.sidebar-logo {
  height: 90px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid #e8e0da;
}

.sidebar-logo a {
  display: block;
}

.sidebar-logo img {
  width: 130px;

  height: auto;

  display: block;
}

/* Menu */

.sidebar-menu {
  flex: 1;

  padding: 25px 15px;
}

.menu-item {
  display: flex;

  align-items: center;

  gap: 14px;

  padding: 13px 18px;

  margin-bottom: 6px;

  border-radius: 12px;

  color: var(--primary);

  text-decoration: none;

  font-size: 0.95rem;

  font-weight: 500;

  transition: 0.25s;
}

.menu-item i {
  font-size: 1.2rem;

  min-width: 20px;

  text-align: center;
}

.menu-item:hover {
  background: #faf3e8;
}

.menu-item.router-link-exact-active {
  background: var(--secondary);

  color: white;
}

/* Bottom */

.sidebar-bottom {
  padding: 15px;

  border-top: 1px solid #e8e0da;
}

.website-btn,
.logout-btn {
  width: 100%;

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 12px 18px;

  border: none;

  background: transparent;

  color: var(--primary);

  cursor: pointer;

  border-radius: 10px;

  font-size: 0.95rem;

  text-align: left;

  transition: 0.25s;
}

.website-btn:hover {
  background: #faf3e8;
}

.logout-btn {
  color: #b94a48;
}

.logout-btn:hover {
  background: #fff0ef;
}

/* Tablet */

@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }

  .sidebar-logo {
    height: 72px;
  }

  .sidebar-logo img {
    width: 45px;

    height: 45px;

    object-fit: contain;
  }

  .menu-item {
    justify-content: center;

    padding: 13px;
  }

  .menu-item span,
  .sidebar-bottom span {
    display: none;
  }

  .sidebar-bottom {
    padding: 10px;
  }

  .website-btn,
  .logout-btn {
    justify-content: center;

    padding: 12px;
  }
}

/* Small phones */

@media (max-width: 480px) {
  .sidebar {
    width: 60px;
  }

  .sidebar-logo img {
    width: 38px;

    height: 38px;
  }
}
</style>

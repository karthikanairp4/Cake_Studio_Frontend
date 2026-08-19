<template>
  <div class="admin-page">
    <AdminSidebar />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Topbar -->
      <header class="topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin.</p>
        </div>

        <div class="admin-profile">
          <div class="admin-icon">
            <i class="bi bi-person"></i>
          </div>

          <div>
            <strong>Administrator</strong>
            <span>Admin</span>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <section class="dashboard-content">
        <!-- Summary Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon revenue-icon">
              <i class="bi bi-currency-dollar"></i>
            </div>

            <div class="stat-info">
              <span>Total Revenue</span>
              <h2>₹{{ Number(todayRevenue).toFixed(2) }}</h2>
              <small>Today</small>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon order-icon">
              <i class="bi bi-bag-check"></i>
            </div>

            <div class="stat-info">
              <span>Total Orders</span>
              <h2>{{ Number(todayOrders) }}</h2>
              <small>Today</small>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon customer-icon">
              <i class="bi bi-people"></i>
            </div>

            <div class="stat-info">
              <span>Total Customers</span>
              <h2>{{ Number(totalCustomers) }}</h2>
              <small>Registered customers</small>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon pending-icon">
              <i class="bi bi-clock-history"></i>
            </div>

            <div class="stat-info">
              <span>Pending Orders</span>
              <h2>{{ Number(pendingOrders) }}</h2>
              <small>Need attention</small>
            </div>
          </div>
        </div>

        <!-- Revenue + Recent Orders -->
        <div class="dashboard-grid">
          <!-- Revenue Chart -->
          <div class="dashboard-card revenue-card">
            <div class="card-header">
              <div>
                <h3>Revenue Overview</h3>
                <p>Sales performance over time</p>
              </div>

              <select v-model="selectedPeriod" @change="loadRevenue">
                <option :value="7">Last 7 Days</option>
                <option :value="30">Last 30 Days</option>
                <option :value="90">Last 90 Days</option>
              </select>
            </div>

            <div class="chart-container">
              <canvas ref="revenueChart"></canvas>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="dashboard-card orders-card">
            <div class="card-header">
              <div>
                <h3>Recent Orders</h3>
                <p>Latest customer orders</p>
              </div>

              <router-link to="/admin/orders"> View All </router-link>
            </div>

            <div v-if="recentOrders.length" class="recent-orders-list">
              <div v-for="order in recentOrders" :key="order.id" class="recent-order">
                <div class="order-main">
                  <div class="order-id">#{{ order.id }}</div>

                  <div class="customer-info">
                    <strong>
                      {{ order.user?.firstName }}
                      {{ order.user?.lastName }}
                    </strong>

                    <span>
                      {{ formatDate(order.orderDate) }}
                    </span>
                  </div>
                </div>

                <div class="order-right">
                  <strong class="order-amount">
                    ${{ Number(order.totalAmount).toFixed(2) }}
                  </strong>

                  <span class="order-status" :class="getStatusClass(order.status)">
                    {{ order.status }}
                  </span>
                </div>
              </div>
            </div>

            <div v-else class="empty-orders">
              <i class="bi bi-bag"></i>

              <p>No recent orders</p>
            </div>
          </div>
        </div>

      </section>
    </main>

  </div>
</template>

<script>
import logo from '@/assets/images/pbakes.png'
import { useAuthStore } from '@/stores/authStore'
import AdminSidebar from '@/components/Admin/AdminSidebar.vue'
import {
  getDashboardStats,
  getRevenueOverview,
  getAdminOrders,
} from '@/services/Admin/adminService'
import Chart from 'chart.js/auto'

export default {
  data() {
    return {
      logo,
      showInsight: false,
      insightLoading: false,
      insightTitle: '',
      insightResult: '',

      todayRevenue: 0,
      todayOrders: 0,
      totalCustomers: 0,
      pendingOrders: 0,
      revenueData: [],
      revenueChart: null,
      selectedPeriod: 7,
      loading: false,
      recentOrders: [],
    }
  },
  components: {
    AdminSidebar,
  },
  async mounted() {
    await this.loadDashboard()
    await this.loadRevenue()
    await this.loadRecentOrders()
  },

  // setup() {
  //   const auth = useAuthStore()
  //   return {
  //     auth,
  //   }
  // },

  methods: {
    goToWebsite() {
      this.$router.push('/')
    },
    logout() {
      this.auth.logout()

      this.$router.push('/login')
    },
    async generateInsight(type) {
      this.showInsight = true

      this.insightLoading = true

      this.insightResult = ''

      if (type === 'summary') {
        this.insightTitle = "Today's Summary"
      }

      if (type === 'best-seller') {
        this.insightTitle = 'Best Selling Cake'
      }

      if (type === 'customers') {
        this.insightTitle = 'Customer Insights'
      }

      if (type === 'forecast') {
        this.insightTitle = 'Revenue Forecast'
      }

      setTimeout(() => {
        this.insightLoading = false

        this.insightResult =
          'AI insights will be generated here once the n8n and AI integration is connected.'
      }, 800)
    },

    closeInsight() {
      this.showInsight = false
    },
    async loadDashboard() {
      try {
        const data = await getDashboardStats()
        console.log('admin-dash', data)

        this.todayRevenue = data.todayRevenue
        this.todayOrders = data.todayOrders
        this.totalCustomers = data.totalCustomers
        this.pendingOrders = data.pendingOrders
      } catch (error) {
        console.error('Failed to load admin dashboard:', error)
      }
    },
    async loadRevenue() {
      try {
        this.revenueData = await getRevenueOverview(Number(this.selectedPeriod))

        this.renderRevenueChart()
      } catch (error) {
        console.error('Failed to load revenue:', error)
      }
    },
    renderRevenueChart() {
      if (this.revenueChart) {
        this.revenueChart.destroy()
      }

      const labels = this.revenueData.map((item) => item.label)
      const values = this.revenueData.map((item) => item.revenue)
      const ctx = this.$refs.revenueChart.getContext('2d')
      this.revenueChart = new Chart(ctx, {
        type: 'line',

        data: {
          labels,
          datasets: [
            {
              label: 'Revenue',
              data: values,
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            },
          ],
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },

          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback(value) {
                  return '$' + value
                },
              },
            },
          },
        },
      })
    },
    async loadRecentOrders() {
      try {
        const orders = await getAdminOrders()
        this.recentOrders = orders.slice(0, 5)
      } catch (error) {
        console.error('Failed to load recent orders:', error)
        this.recentOrders = []
      }
    },
    formatDate(date) {
      if (!date) return ''

      return new Date(date).toLocaleDateString()
    },

    getStatusClass(status) {
      return status?.toLowerCase()
    },
  },
}
</script>

<style scoped>
/* ================================
   Main Layout
================================ */

.admin-page {
  min-height: 100vh;
  display: flex;
  background: #f8f6f3;
  color: var(--primary);
}

/* ================================
   Main Content
================================ */

.main-content {
  margin-left: 250px;

  width: calc(100% - 250px);

  min-height: 100vh;
}

/* ================================
   Topbar
================================ */

.topbar {
  min-height: 90px;

  padding: 20px 35px;

  background: var(--background);

  border-bottom: 1px solid #e8e0da;

  display: flex;

  align-items: center;

  justify-content: space-between;

  box-sizing: border-box;
}

.topbar h1 {
  margin: 0;

  font-size: 1.8rem;

  color: var(--primary);
}

.topbar p {
  margin: 5px 0 0;

  color: var(--text-light);

  font-size: 0.9rem;
}

.admin-profile {
  display: flex;

  align-items: center;

  gap: 12px;
}

.admin-icon {
  width: 42px;

  height: 42px;

  border-radius: 50%;

  background: #f5e8d2;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.3rem;

  color: var(--secondary);
}

.admin-profile strong {
  display: block;

  font-size: 0.9rem;
}

.admin-profile span {
  display: block;

  margin-top: 3px;

  color: var(--text-light);

  font-size: 0.8rem;
}

/* ================================
   Dashboard
================================ */

.dashboard-content {
  padding: 30px 35px;
}

/* ================================
   Statistics
================================ */

.stats-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 20px;

  margin-bottom: 25px;
}

.stat-card {
  background: white;

  border-radius: 18px;

  padding: 22px;

  display: flex;

  align-items: center;

  gap: 16px;

  box-shadow: 0 5px 20px rgba(23, 20, 20, 0.04);
}

.stat-icon {
  width: 50px;

  height: 50px;

  border-radius: 14px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.4rem;
}

.revenue-icon {
  background: #f7ead4;
  color: #b9822d;
}

.order-icon {
  background: #e8f3ef;
  color: #4d8d76;
}

.customer-icon {
  background: #eeeaf7;
  color: #7661a8;
}

.pending-icon {
  background: #f9e9e4;
  color: #bb6b50;
}

.stat-info span {
  display: block;

  color: var(--text-light);

  font-size: 0.85rem;
}

.stat-info h2 {
  margin: 4px 0;

  font-size: 1.5rem;

  color: var(--primary);
}

.stat-info small {
  color: #999;

  font-size: 0.75rem;
}

/* ================================
   Dashboard Cards
================================ */

.dashboard-grid {
  display: grid;

  grid-template-columns: 1.6fr 1fr;

  gap: 20px;

  margin-bottom: 30px;
}

.dashboard-card {
  background: white;

  border-radius: 18px;

  padding: 25px;

  box-shadow: 0 5px 20px rgba(23, 20, 20, 0.04);
}

.card-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;
}

.card-header h3 {
  margin: 0;

  font-size: 1.1rem;
}

.card-header p {
  margin: 5px 0 0;

  color: var(--text-light);

  font-size: 0.8rem;
}

.card-header select {
  border: 1px solid #ddd;

  padding: 8px 12px;

  border-radius: 8px;

  background: white;

  color: var(--primary);

  outline: none;
}

.card-header a {
  color: var(--secondary);

  text-decoration: none;

  font-size: 0.85rem;

  font-weight: 600;
}

/* ================================
   Chart
================================ */

.chart-container {
  position: relative;
  width: 100%;
  height: 300px;
  min-width: 0;
  overflow: hidden;
  box-sizing: border-box;
}
/* ================================
   Orders
================================ */
.recent-orders-list {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.recent-order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f0eeee;
}

.recent-order:last-child {
  border-bottom: none;
}

.order-main {
  display: flex;
  align-items: center;
  gap: 15px;
}

.order-id {
  font-weight: 700;
  color: var(--primary);
  min-width: 55px;
}

.customer-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.customer-info strong {
  font-size: 14px;
}

.customer-info span {
  font-size: 12px;
  color: var(--text-light);
}

.order-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.order-amount {
  font-size: 15px;
  color: var(--secondary);
}

.order-status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.order-status.pending {
  background: #fff3df;
  color: #c28a2c;
}

.order-status.confirmed {
  background: #e8f5ee;
  color: #3b8c5a;
}

.order-status.completed {
  background: #e8f1ff;
  color: #4276b5;
}

.order-status.cancelled {
  background: #fff0f0;
  color: #b64b4b;
}

.empty-state i {
  font-size: 2rem;
}

.empty-state p {
  margin-top: 10px;
}

/* ================================
   AI Section
================================ */

.ai-section {
  margin-top: 10px;
}

.section-heading {
  display: flex;

  justify-content: space-between;

  align-items: flex-end;

  margin-bottom: 20px;
}

.ai-label {
  display: inline-flex;

  align-items: center;

  gap: 6px;

  color: var(--secondary);

  font-size: 0.7rem;

  font-weight: 700;

  letter-spacing: 1px;
}

.section-heading h2 {
  margin: 7px 0 5px;

  font-size: 1.5rem;
}

.section-heading p {
  margin: 0;

  color: var(--text-light);

  font-size: 0.9rem;
}

.view-ai-btn {
  padding: 10px 18px;

  border: 1px solid var(--secondary);

  border-radius: 999px;

  color: var(--secondary);

  text-decoration: none;

  font-size: 0.85rem;

  font-weight: 600;

  transition: 0.25s;
}

.view-ai-btn:hover {
  background: var(--secondary);

  color: white;
}

/* ================================
   AI Cards
================================ */

.ai-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 18px;
}

.ai-card {
  background: white;

  border-radius: 18px;

  padding: 22px;

  box-shadow: 0 5px 20px rgba(23, 20, 20, 0.04);

  border: 1px solid transparent;

  transition: 0.25s;
}

.ai-card:hover {
  border-color: #e5d4b9;

  transform: translateY(-2px);
}

.ai-card-icon {
  width: 42px;

  height: 42px;

  border-radius: 12px;

  background: #faf0df;

  color: var(--secondary);

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.2rem;

  margin-bottom: 15px;
}

.ai-card h3 {
  margin: 0 0 8px;

  font-size: 1rem;
}

.ai-card p {
  min-height: 55px;

  margin: 0 0 18px;

  color: var(--text-light);

  font-size: 0.82rem;

  line-height: 1.5;
}

.ai-card button {
  width: 100%;

  padding: 10px;

  border: none;

  border-radius: 10px;

  background: var(--secondary);

  color: white;

  cursor: pointer;

  font-size: 0.85rem;

  font-weight: 600;

  transition: 0.25s;
}

.ai-card button:hover {
  background: var(--secondary-hover);
}

/* ================================
   AI Modal
================================ */

.insight-overlay {
  position: fixed;

  inset: 0;

  background: rgba(23, 20, 20, 0.45);

  backdrop-filter: blur(4px);

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

  z-index: 3000;

  box-sizing: border-box;
}

.insight-modal {
  width: 100%;

  max-width: 600px;

  background: white;

  border-radius: 22px;

  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);

  overflow: hidden;
}

.insight-header {
  padding: 25px;

  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  border-bottom: 1px solid #eee;
}

.insight-header h2 {
  margin: 8px 0 0;

  font-size: 1.4rem;
}

.close-btn {
  width: 38px;

  height: 38px;

  border: none;

  border-radius: 50%;

  background: #f7f4f0;

  color: var(--primary);

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;
}

.insight-body {
  padding: 30px;

  min-height: 180px;
}

.insight-loading {
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  min-height: 150px;

  color: var(--text-light);
}

.spinner {
  width: 30px;

  height: 30px;

  border: 3px solid #eee;

  border-top-color: var(--secondary);

  border-radius: 50%;

  animation: spin 0.8s linear infinite;

  margin-bottom: 15px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.insight-result {
  color: var(--primary);

  line-height: 1.7;

  font-size: 0.95rem;
}

/* ================================
   Tablet
================================ */

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .ai-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

/* ================================
   Mobile
================================ */

@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }

  .sidebar-logo {
    height: 72px;
  }

  .sidebar-logo img {
    width: 45px;

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

  .main-content {
    margin-left: 70px;

    width: calc(100% - 70px);
  }

  .topbar {
    padding: 18px 20px;
  }

  .topbar h1 {
    font-size: 1.4rem;
  }

  .admin-profile div:last-child {
    display: none;
  }

  .dashboard-content {
    padding: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;

    gap: 12px;
  }

  .stat-card {
    padding: 16px;

    gap: 10px;
  }

  .stat-icon {
    width: 42px;

    height: 42px;

    font-size: 1.1rem;
  }

  .stat-info h2 {
    font-size: 1.2rem;
  }

  .ai-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* ================================
   Small Mobile
================================ */

@media (max-width: 480px) {
  .sidebar {
    width: 60px;
  }

  .sidebar-logo img {
    width: 38px;
  }

  .main-content {
    margin-left: 60px;

    width: calc(100% - 60px);
  }

  .dashboard-content {
    padding: 15px;
  }

  .topbar {
    padding: 15px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-grid {
    gap: 15px;
  }

  .ai-grid {
    grid-template-columns: 1fr;
  }

  .section-heading {
    flex-direction: column;

    align-items: flex-start;

    gap: 15px;
  }

  .view-ai-btn {
    width: 100%;

    text-align: center;

    box-sizing: border-box;
  }

  .card-header {
    align-items: flex-start;

    gap: 10px;
  }

  .card-header select {
    font-size: 0.75rem;
  }
}
</style>

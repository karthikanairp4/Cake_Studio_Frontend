<template>
  <div class="admin-orders">
    <AdminSidebar />

    <main class="admin-content">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage customer orders and update order status.</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters">
        <div class="search-box">
          <i class="bi bi-search"></i>

          <input v-model="search" type="text" placeholder="Search orders..." />
        </div>

        <select v-model="statusFilter">
          <option value="ALL">All Orders</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="message">Loading orders...</div>

      <!-- No Orders -->
      <div v-else-if="filteredOrders.length === 0" class="message">No orders found.</div>

      <!-- Orders -->
      <div v-else class="orders-container">
        <div v-for="order in filteredOrders" :key="order.id" class="order-card">
          <!-- Order Information -->
          <div class="order-info">
            <div class="order-title">
              <h3>Order #{{ order.id }}</h3>

              <span :class="['status', order.status.toLowerCase()]">
                {{ order.status }}
              </span>
            </div>

            <div class="customer">
              <i class="bi bi-person"></i>

              <span>
                {{ order.user.firstName }}
                {{ order.user.lastName }}
              </span>
            </div>

            <div class="order-date">
              <i class="bi bi-calendar"></i>

              {{ formatDate(order.orderDate) }}
            </div>

            <div v-if="order.pickupDate" class="pickup">
              <i class="bi bi-calendar-event"></i>

              Pickup:
              {{ formatDate(order.pickupDate) }}

              <span v-if="order.pickupTime"> • {{ order.pickupTime }} </span>
            </div>
          </div>

          <!-- Amount -->
          <div class="order-amount">
            <span>Total</span>

            <strong> ${{ Number(order.totalAmount).toFixed(2) }} </strong>
          </div>

          <!-- Actions -->
          <div class="order-actions">
            <!-- Pending -->
            <template v-if="order.status === 'PENDING'">
              <button class="confirm-btn" @click="updateStatus(order, 'CONFIRMED')">
                <i class="bi bi-check-circle"></i>
                Confirm
              </button>

              <button class="cancel-btn" @click="updateStatus(order, 'CANCELLED')">
                <i class="bi bi-x-circle"></i>
                Cancel
              </button>
            </template>

            <!-- Confirmed -->
            <button
              v-if="order.status === 'CONFIRMED'"
              class="complete-btn"
              @click="updateStatus(order, 'COMPLETED')"
            >
              <i class="bi bi-check2-circle"></i>
              Mark Completed
            </button>

            <!-- Completed -->
            <span v-if="order.status === 'COMPLETED'" class="completed-label">
              <i class="bi bi-check-circle-fill"></i>
              Completed
            </span>

            <!-- Cancelled -->
            <span v-if="order.status === 'CANCELLED'" class="cancelled-label">
              <i class="bi bi-x-circle-fill"></i>
              Cancelled
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AdminSidebar from '@/components/Admin/AdminSidebar.vue'

import { getAdminOrders, updateOrderStatus } from '@/services/Admin/adminService'

export default {
  components: {
    AdminSidebar,
  },

  data() {
    return {
      orders: [],
      search: '',
      statusFilter: 'ALL',
      loading: false,
    }
  },

  computed: {
    filteredOrders() {
      let result = this.orders

      // Status filter
      if (this.statusFilter !== 'ALL') {
        result = result.filter((order) => order.status === this.statusFilter)
      }

      // Search
      if (this.search.trim()) {
        const keyword = this.search.toLowerCase().trim()

        result = result.filter((order) => {
          const orderId = String(order.id).toLowerCase()

          const firstName = order.user?.firstName?.toLowerCase() || ''

          const lastName = order.user?.lastName?.toLowerCase() || ''

          const email = order.user?.email?.toLowerCase() || ''

          return (
            orderId.includes(keyword) ||
            firstName.includes(keyword) ||
            lastName.includes(keyword) ||
            email.includes(keyword)
          )
        })
      }

      return result
    },
  },

  async mounted() {
    await this.loadOrders()
  },

  methods: {
    async loadOrders() {
      try {
        this.loading = true

        this.orders = await getAdminOrders()
      } catch (error) {
        console.error('Failed to load admin orders:', error)
      } finally {
        this.loading = false
      }
    },

    async updateStatus(order, status) {
      let message = ''
      if (status === 'CONFIRMED') {
        message = `Confirm Order #${order.id}?`
      }

      if (status === 'CANCELLED') {
        message = `Cancel Order #${order.id}?`
      }

      if (status === 'COMPLETED') {
        message = `Mark Order #${order.id} as completed?`
      }

      const confirmed = window.confirm(message)
      if (!confirmed) {
        return
      }
      
      try {
        await updateOrderStatus(order.id, status)

        // Update immediately on screen
        order.status = status
      } catch (error) {
        console.error('Failed to update order status:', error)

        alert(error.response?.data?.message || 'Failed to update order status.')
      }
    },

    formatDate(date) {
      if (!date) {
        return ''
      }

      return new Date(date).toLocaleDateString()
    },
  },
}
</script>
<style scoped>
.admin-orders {
  min-height: 100vh;
  background: var(--background);
  display: flex;
}

.admin-content {
  flex: 1;
  padding: 40px;
  margin-left: 250px;
}

/* Header */

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0;
  color: var(--primary);
  font-size: 2rem;
}

.page-header p {
  margin-top: 8px;
  color: var(--text-light);
}

/* Filters */

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.search-box {
  flex: 1;
  max-width: 500px;
  height: 48px;

  display: flex;
  align-items: center;
  gap: 10px;

  background: white;
  border: 1px solid #e8e0da;
  border-radius: 12px;

  padding: 0 16px;
  box-sizing: border-box;
}

.search-box i {
  color: var(--text-light);
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;

  font-size: 0.95rem;
  color: var(--primary);
}

.filters select {
  height: 48px;
  padding: 0 18px;

  border: 1px solid #e8e0da;
  border-radius: 12px;

  background: white;
  color: var(--primary);

  cursor: pointer;
  outline: none;
}

/* Orders */

.orders-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-card {
  background: white;
  border-radius: 18px;

  padding: 22px 25px;

  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 30px;

  box-shadow: 0 8px 25px rgba(23, 20, 20, 0.05);

  transition: 0.25s;
}

.order-card:hover {
  transform: translateY(-2px);

  box-shadow: 0 12px 30px rgba(23, 20, 20, 0.08);
}

/* Order Info */

.order-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.order-title h3 {
  margin: 0;

  color: var(--primary);
  font-size: 1.05rem;
}

.customer,
.order-date,
.pickup {
  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--text-light);

  font-size: 0.9rem;

  margin-top: 6px;
}

.customer i,
.order-date i,
.pickup i {
  color: var(--secondary);
}

/* Status */

.status {
  padding: 5px 12px;

  border-radius: 999px;

  font-size: 0.75rem;
  font-weight: 600;
}

.status.pending {
  background: #fff3d9;
  color: #a87516;
}

.status.confirmed {
  background: #e6f4ea;
  color: #2e7d32;
}

.status.completed {
  background: #e4f0ff;
  color: #2864a6;
}

.status.cancelled {
  background: #ffe8e8;
  color: #b04a4a;
}

/* Amount */

.order-amount {
  text-align: right;
}

.order-amount span {
  display: block;

  color: var(--text-light);
  font-size: 0.8rem;

  margin-bottom: 4px;
}

.order-amount strong {
  color: var(--secondary);
  font-size: 1.4rem;
}

/* Actions */

.order-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.order-actions button {
  height: 40px;

  padding: 0 16px;

  border-radius: 999px;

  border: none;

  font-size: 0.85rem;
  font-weight: 600;

  cursor: pointer;

  transition: 0.25s;

  white-space: nowrap;
}

/* Confirm */

.confirm-btn {
  background: var(--secondary);
  color: white;
}

.confirm-btn:hover {
  background: var(--secondary-hover);
  transform: translateY(-1px);
}

/* Cancel */

.cancel-btn {
  background: transparent;
  color: #b04a4a;
  border: 1px solid #d9aaaa !important;
}

.cancel-btn:hover {
  background: #fff1f1;
}

/* Complete */

.complete-btn {
  background: #4f8f5b;
  color: white;
}

.complete-btn:hover {
  background: #417849;
  transform: translateY(-1px);
}

/* Labels */

.completed-label {
  color: #2e7d32;
  font-size: 0.85rem;
  font-weight: 600;
}

.cancelled-label {
  color: #b04a4a;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Empty / Loading */

.message {
  background: white;
  border-radius: 18px;

  padding: 50px;

  text-align: center;

  color: var(--text-light);
}

/* Responsive */

@media (max-width: 1100px) {
  .order-card {
    grid-template-columns: 1fr auto;
  }

  .order-actions {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .admin-content {
    margin-left: 0;
    padding: 25px 18px;
  }

  .filters {
    flex-direction: column;
  }

  .search-box {
    max-width: none;
  }

  .filters select {
    width: 100%;
  }

  .order-card {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .order-amount {
    text-align: left;
  }

  .order-actions {
    grid-column: auto;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>

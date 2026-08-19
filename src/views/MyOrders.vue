<template>
  <NavBar />

  <section class="orders-page">
    <div class="page-header">
      <h1>My Orders</h1>
      <p>Track your orders and view your previous purchases.</p>
    </div>

    <div v-if="orders.length">
      <div class="order-card" v-for="order in orders" :key="order.id">
        <div class="left">
          <div class="order-number">Order #{{ order.id }}</div>

          <div class="order-date"><strong>Placed:</strong> {{ formatDate(order.orderDate) }}</div>

          <div class="pickup-info" v-if="order.pickupDate || order.pickupTime">
            <div v-if="order.pickupDate">
              <i class="bi bi-calendar-event"></i>
              <strong>Pickup:</strong>
              {{ formatDate(order.pickupDate) }}
            </div>

            <div v-if="order.pickupTime">
              <i class="bi bi-clock"></i>
              <strong>Time:</strong>
              {{ order.pickupTime }}
            </div>
          </div>

          <span class="status">
            {{ order.status }}
          </span>
        </div>

        <div class="right">
          <div class="amount">${{ order.totalAmount.toFixed(2) }}</div>

          <div class="order-actions">
            <button @click="openOrder(order)">View Details</button>

            <button v-if="canCancel(order)" class="cancel-btn" @click="cancelOrder(order.id)">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-orders">
      <div class="empty-icon">
        <i class="bi bi-cake2-fill"></i>
      </div>

      <h2>No Orders Yet</h2>

      <p>Your delicious cakes will appear here once you place an order.</p>
    </div>
  </section>

  <OrderDetailsModal v-if="selectedOrder" :order="selectedOrder" @close="selectedOrder = null" />

  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { getOrders, cancelOrder as cancelOrderApi } from '@/services/orderService'

import OrderDetailsModal from '@/modal/OrderDetailsModal.vue'

export default {
  components: {
    NavBar,
    Footer,
    OrderDetailsModal,
  },

  data() {
    return {
      orders: [],
      selectedOrder: null,
    }
  },

  async mounted() {
    try {
      this.orders = await getOrders()
    } catch (error) {
      console.error('Failed to load orders:', error)
    }
  },

  methods: {
    openOrder(order) {
      this.selectedOrder = order
    },

    formatDate(date) {
      if (!date) {
        return ''
      }

      return new Date(date).toLocaleDateString()
    },

    canCancel(order) {
      if (!order.pickupDate || !order.pickupTime) {
        return false
      }

      // Only pending and confirmed orders can be cancelled
      if (order.status !== 'PENDING' && order.status !== 'CONFIRMED') {
        return false
      }

      // Get the starting time from:
      // "12:00 PM - 2:00 PM"
      const startTime = order.pickupTime.split('-')[0].trim()

      // Extract hour, minute and AM/PM
      const timeParts = startTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)

      if (!timeParts) {
        console.error('Invalid pickup time:', order.pickupTime)
        return false
      }

      // IMPORTANT: declare these variables
      let hours = parseInt(timeParts[1], 10)
      const minutes = parseInt(timeParts[2], 10)
      const period = timeParts[3].toUpperCase()

      // Convert 12-hour time to 24-hour time
      if (period === 'PM' && hours !== 12) {
        hours += 12
      }

      if (period === 'AM' && hours === 12) {
        hours = 0
      }

      // Create pickup date/time
      const pickupDateTime = new Date(
        `${order.pickupDate}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`,
      )

      if (isNaN(pickupDateTime.getTime())) {
        console.error('Invalid pickup date/time:', order.pickupDate, order.pickupTime)

        return false
      }

      // 48 hours before pickup
      const cancellationDeadline = new Date(pickupDateTime.getTime() - 48 * 60 * 60 * 1000)

      const now = new Date()

      return now < cancellationDeadline
    },

    async cancelOrder(orderId) {
      const confirmed = window.confirm('Are you sure you want to cancel this order?')

      if (!confirmed) {
        return
      }

      try {
        await cancelOrderApi(orderId)

        alert('Order cancelled successfully.')

        // Reload orders
        this.orders = await getOrders()
      } catch (error) {
        console.error('Failed to cancel order:', error)

        alert(error.response?.data?.message || 'Unable to cancel the order.')
      }
    },
  },
}
</script>
<style scoped>
.orders-page {
  width: min(1100px, 92%);

  margin: auto;

  padding: 80px 0;

  min-height: 80vh;
}

/* Header */

.page-header {
  margin-bottom: 45px;
}

.page-header h1 {
  margin: 0;

  font-size: 2.8rem;

  color: var(--primary);
}

.page-header p {
  margin-top: 10px;

  color: var(--text-light);

  font-size: 1.05rem;
}

/* Order Card */

.order-card {
  background: white;

  border-radius: 24px;

  padding: 30px;

  margin-bottom: 24px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  box-shadow: 0 15px 40px rgba(23, 20, 20, 0.06);

  transition: 0.3s;
}

.order-card:hover {
  transform: translateY(-4px);

  box-shadow: 0 25px 55px rgba(23, 20, 20, 0.12);
}

.left {
  display: flex;

  flex-direction: column;

  gap: 12px;
}

.order-number {
  font-size: 1.3rem;

  font-weight: 700;

  color: var(--primary);
}

.order-date {
  color: var(--text-light);

  font-size: 0.95rem;
}

.status {
  width: fit-content;

  padding: 8px 18px;

  border-radius: 999px;

  background: rgba(209, 170, 103, 0.15);

  color: var(--secondary);

  font-size: 0.85rem;

  font-weight: 600;
}

.right {
  text-align: right;
}

.amount {
  font-size: 2rem;

  font-weight: 700;

  color: var(--secondary);

  margin-bottom: 18px;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.order-actions button {
  border: none;
  height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

/* View Details */

.order-actions button:first-child {
  background: var(--secondary);
  color: white;
}

.order-actions button:first-child:hover {
  background: var(--secondary-hover);
  transform: translateY(-2px);
}

/* Cancel Order */

.order-actions .cancel-btn {
  background: transparent;
  color: #b04a4a;
  border: 1px solid #d9aaaa;
}

.order-actions .cancel-btn:hover {
  background: #fff1f1;
  border-color: #b04a4a;
  transform: translateY(-2px);
}

/* Empty State */

.empty-orders {
  background: white;

  border-radius: 24px;

  padding: 70px 40px;

  text-align: center;

  box-shadow: 0 15px 40px rgba(23, 20, 20, 0.06);
}

.empty-icon {
  font-size: 4.5rem;
  color: var(--secondary);
  margin-bottom: 20px;
}

.empty-orders h2 {
  margin: 0;

  color: var(--primary);

  font-size: 2rem;
}

.empty-orders p {
  margin-top: 12px;

  color: var(--text-light);

  font-size: 1rem;
}

/* Responsive */

@media (max-width: 768px) {
  .order-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .right {
    width: 100%;
    text-align: left;
  }

  .order-actions {
    flex-direction: column;
    width: 100%;
  }

  .order-actions button {
    width: 100%;
  }

  .amount {
    margin-bottom: 16px;
  }
}
</style>

<template>
  <NavBar />

  <div class="order-card" v-for="order in orders" :key="order.id">
    <div class="left">
      <h3>Order #{{ order.id }}</h3>

      <p>{{ formatDate(order.orderDate) }}</p>

      <span class="status">
        {{ order.status }}
      </span>
    </div>

    <div class="right">
      <h2>${{ order.totalAmount.toFixed(2) }}</h2>

      <button @click="openOrder(order)">View Details</button>
    </div>
  </div>
  <OrderDetailsModal v-if="selectedOrder" :order="selectedOrder" @close="selectedOrder = null" />

  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { getOrders } from '@/services/orderService'
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
    this.orders = await getOrders()
  },

  methods: {
    async openOrder(order) {
      this.selectedOrder = order
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
  },
}
</script>
<style>
.orders-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 20px;
  min-height: 80vh;
}

.orders-page h1 {
  color: #564743;
  font-size: 2.2rem;
  margin-bottom: 35px;
}

.order-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #ffffff;
  border-radius: 18px;

  padding: 25px 30px;
  margin-bottom: 22px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

  transition: 0.25s ease;
}

.order-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.left h3 {
  margin: 0;
  color: #564743;
  font-size: 1.3rem;
}

.left p {
  margin: 10px 0;
  color: #777;
}

.status {
  display: inline-block;

  margin-top: 8px;

  padding: 6px 14px;

  border-radius: 20px;

  background: #5ed3d1;
  color: white;

  font-size: 0.85rem;
  font-weight: 600;
}

.right {
  text-align: right;
}

.right h2 {
  margin: 0 0 15px;
  color: #564743;
}

.right button {
  border: none;

  background: #ffc43d;

  color: white;

  padding: 12px 22px;

  border-radius: 30px;

  cursor: pointer;

  font-size: 0.95rem;
  font-weight: 600;

  transition: 0.3s;
}

.right button:hover {
  background: #f5b400;
}

.empty-orders {
  background: white;
  border-radius: 15px;
  padding: 60px;
  text-align: center;
  color: #777;
}

.empty-orders h2 {
  color: #564743;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .order-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .right {
    width: 100%;
    text-align: left;
  }

  .right button {
    width: 100%;
  }
}
</style>

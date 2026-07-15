<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="header">
        <h2>Order #{{ order.id }}</h2>

        <button @click="$emit('close')">✕</button>
      </div>

      <div class="section">
        <p>
          <strong>Status</strong>

          {{ order.status }}
        </p>

        <p>
          <strong>Payment</strong>

          {{ order.paymentStatus }}
        </p>

        <p>
          <strong>Date</strong>

          {{ formatDate(order.orderDate) }}
        </p>
      </div>

      <div class="section">
        <h3>Shipping Address</h3>

        <p>{{ order.street }}</p>

        <p>{{ order.city }}</p>

        <p>{{ order.province }}</p>

        <p>{{ order.postalCode }}</p>
      </div>

      <div class="item" v-for="item in order.orderItems" :key="item.id">
        <img :src="BASE_URL + item.cake.imgUrl" />

        <div>
          <h3>
            {{ item.cake.name }}
          </h3>

          <p>Qty : {{ item.quantity }}</p>

          <p>Weight : {{ item.weight }} Kg</p>

          <p v-if="item.sponge">
            Sponge :

            {{ item.sponge.name }}
          </p>

          <p v-if="item.filling">
            Filling :

            {{ item.filling.name }}
          </p>

          <p v-if="item.frosting">
            Frosting :

            {{ item.frosting.name }}
          </p>

          <p v-if="item.message">"{{ item.message }}"</p>
        </div>

        <strong> ${{ item.price.toFixed(2) }} </strong>
      </div>

      <div class="footer">
        <h2>Total ${{ order.totalAmount.toFixed(2) }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/config/constants'

export default {
  props: {
    order: Object,
  },

  data() {
    return {
      BASE_URL,
    }
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
  },
}
</script>
<style>
.modal-overlay {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.5);

  display: flex;

  justify-content: center;

  align-items: center;

  z-index: 1000;
}

.modal {
  background: white;

  width: 700px;

  max-height: 90vh;

  overflow: auto;

  border-radius: 15px;

  padding: 30px;
}

.header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;
}

.section {
  margin-bottom: 25px;
}

.item {
  display: flex;

  gap: 20px;

  padding: 20px 0;

  border-bottom: 1px solid #eee;
}

.item img {
  width: 120px;

  border-radius: 10px;
}

.footer {
  margin-top: 25px;

  text-align: right;
}
</style>

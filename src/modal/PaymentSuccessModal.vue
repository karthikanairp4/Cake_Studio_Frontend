<template>
  <div class="overlay">
    <div class="modal">
      <h2>✔ Order Placed Successfully</h2>

      <p>Thank you for your purchase!</p>

      <p>
        <strong>Order #{{ order.id }}</strong>
      </p>

      <p>Total: ${{ order.totalAmount.toFixed(2) }}</p>

      <p>Status: {{ order.status }}</p>

      <button @click="$router.push('/')">Continue Shopping</button>

      <button @click="$router.push('/my-orders')">View My Orders</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  width: 420px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
}

button {
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  border: none;
  border-radius: 30px;
  background: #ffc43d;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #f5b400;
}
</style>

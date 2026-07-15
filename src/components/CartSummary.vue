<template>
  <div class="summary">
    <div class="subtotal">
      <span>Subtotal</span>

      <strong>${{ total.toFixed(2) }}</strong>
    </div>

    <button class="checkout-btn" @click="checkout">Continue to Checkout</button>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    total() {
      return this.cart.reduce((sum, item) => {
        return sum + this.calculatePrice(item)
      }, 0)
    },
  },

  methods: {
    calculatePrice(item) {
      let total = item.cake.basePrice * item.weight

      if (item.sponge) total += item.sponge.price
      if (item.filling) total += item.filling.price
      if (item.frosting) total += item.frosting.price
      if (item.cake.category === 'THEMED') total += 10

      return total * item.quantity
    },

    checkout() {
      sessionStorage.setItem('checkoutMode', 'CART')
      sessionStorage.removeItem('buyNow')
      this.$router.push('/checkout')
    },
  },
}
</script>

<style scoped>
.summary {
  border-top: 1px solid #e5e5e5;
  padding: 24px;
  background: white;
}

.subtotal {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;

  font-size: 1.1rem;

  color: #564743;
}

.subtotal strong {
  font-size: 1.4rem;
}

.checkout-btn {
  width: 100%;

  border: none;

  background: #ffc43d;

  color: white;

  font-size: 1.05rem;

  font-weight: 600;

  padding: 16px;

  border-radius: 35px;

  cursor: pointer;

  transition: 0.3s;
}

.checkout-btn:hover {
  background: #f5b400;
}
</style>

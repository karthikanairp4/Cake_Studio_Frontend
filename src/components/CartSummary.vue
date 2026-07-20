<template>
  <div class="summary-card">
    <div class="summary-header">
      <h2>Order Summary</h2>

      <p>Review your order before proceeding to checkout.</p>
    </div>

    <div class="summary-body">
      <div class="summary-row">
        <span>Items</span>

        <span>{{ cart.length }}</span>
      </div>

      <div class="summary-row">
        <span>Subtotal</span>

        <span>${{ total.toFixed(2) }}</span>
      </div>

      <div class="summary-row">
        <span>Delivery</span>

        <span class="free">Calculated at checkout</span>
      </div>

      <div class="summary-row">
        <span>Taxes</span>

        <span class="free">Calculated at checkout</span>
      </div>

      <hr />

      <div class="total-row">
        <span>Total</span>

        <span class="price"> ${{ total.toFixed(2) }} </span>
      </div>
    </div>

    <button class="checkout-btn" @click="checkout">Proceed to Checkout</button>

    <div class="secure-checkout">
      <i class="bi bi-shield-lock"></i>

      Secure checkout with encrypted payment.
    </div>
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
/*==========================
      SUMMARY CARD
===========================*/

.summary-card {
  background: white;

  border-radius: 28px;

  padding: 32px;

  box-shadow: 0 18px 40px rgba(23, 20, 20, 0.08);

  position: sticky;

  top: 110px;
}

/*==========================
      HEADER
===========================*/

.summary-header {
  margin-bottom: 30px;
}

.summary-header h2 {
  color: var(--primary);

  font-size: 1.8rem;

  margin-bottom: 8px;
}

.summary-header p {
  color: var(--text-light);

  line-height: 1.7;
}

/*==========================
      BODY
===========================*/

.summary-body {
  display: flex;

  flex-direction: column;

  gap: 18px;
}

.summary-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  color: var(--text-light);
}

.summary-row span:last-child {
  color: var(--primary);

  font-weight: 600;
}

.free {
  color: var(--secondary) !important;
}

/*==========================
      DIVIDER
===========================*/

hr {
  border: none;

  border-top: 1px solid rgba(0, 0, 0, 0.08);

  margin: 10px 0;
}

/*==========================
      TOTAL
===========================*/

.total-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  font-size: 1.2rem;

  font-weight: 700;

  color: var(--primary);
}

.price {
  color: var(--secondary);

  font-size: 2rem;
}

/*==========================
      BUTTON
===========================*/

.checkout-btn {
  width: 100%;

  margin-top: 30px;

  padding: 18px;

  border: none;

  border-radius: 50px;

  background: var(--primary);

  color: white;

  font-size: 1rem;

  font-weight: 600;

  cursor: pointer;

  transition: 0.35s;
}

.checkout-btn:hover {
  background: var(--secondary);

  transform: translateY(-3px);

  box-shadow: 0 15px 30px rgba(23, 20, 20, 0.15);
}

/*==========================
      SECURITY
===========================*/

.secure-checkout {
  margin-top: 22px;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 10px;

  color: var(--text-light);

  font-size: 0.9rem;
}

.secure-checkout i {
  color: var(--secondary);
}

/*==========================
      RESPONSIVE
===========================*/

@media (max-width: 992px) {
  .summary-card {
    position: static;
  }
}
</style>

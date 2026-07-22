<template>
  <NavBar />

  <section class="checkout-page">
    <div class="checkout-container">
      <div class="left-column">
        <div class="card">
          <h1>Checkout</h1>

          <p class="subtitle">Complete your order securely.</p>
        </div>

        <div class="card">
          <h3>Shipping Address</h3>

          <input v-model="checkout.street" placeholder="Street Address" />

          <input v-model="checkout.city" placeholder="City" />

          <div class="two-column">
            <input v-model="checkout.province" placeholder="Province" />

            <input v-model="checkout.postalCode" placeholder="Postal Code" />
          </div>
        </div>
        <h3>Cake Collection</h3>

        <div class="form-group">
          <label>Pickup Date</label>

          <input type="date" v-model="checkout.pickupDate" :min="minPickupDate" />

          <small class="hint">
            {{
              cart.some((item) => item.cake.category === 'THEMED')
                ? 'Themed cakes require at least 3 days notice.'
                : 'Classic cakes require at least 1 day notice.'
            }}
          </small>
        </div>

        <div class="form-group">
          <label>Preferred Pickup Time</label>

          <select v-model="checkout.pickupTime">
            <option disabled value="">Select Time</option>

            <option>10:00 AM - 12:00 PM</option>

            <option>12:00 PM - 2:00 PM</option>

            <option>2:00 PM - 4:00 PM</option>

            <option>4:00 PM - 6:00 PM</option>
          </select>
        </div>

        <div class="form-group">
          <label>Special Instructions (Optional)</label>

          <textarea
            rows="4"
            v-model="checkout.notes"
            placeholder="Anything you'd like us to know?"
          ></textarea>
        </div>

        <h3>Payment Details</h3>
        <div class="card">
          <h3>Payment</h3>

          <StripePayment @payment-success="paymentSuccess" />
        </div>
      </div>

      <div class="summary-card">
        <h2>Order Summary</h2>

        <div class="summary-item" v-for="item in cart" :key="item.id">
          <div>
            <h4>{{ item.cake.name }}</h4>

            <small>
              {{ item.quantity }}
              ×
              {{ item.weight }} Kg
            </small>
          </div>

          <strong> ${{ calculatePrice(item).toFixed(2) }} </strong>
        </div>

        <hr />

        <div class="summary-total">
          <span>Total</span>

          <strong> ${{ total.toFixed(2) }} </strong>
        </div>
      </div>
    </div>
  </section>
  <PaymentSuccessModal
    v-if="showSuccessModal"
    :order="placedOrder"
    @close="showSuccessModal = false"
  />
  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { getCart } from '@/services/cartService'
import { buyNow, checkout } from '@/services/checkout'
import StripePayment from '@/components/StripePayment.vue'
import PaymentSuccessModal from '@/modal/PaymentSuccessModal.vue'
import { getProfile } from '@/services/profileService'
export default {
  components: {
    NavBar,
    Footer,
    PaymentSuccessModal,
    StripePayment,
  },

  data() {
    return {
      cart: [],
      checkout: {
        street: '',
        city: '',
        province: '',
        postalCode: '',
        pickupDate: '',
        pickupTime: '',
        notes: '',
      },
      showSuccessModal: false,
      placedOrder: null,
      isBuyNow: false,
      buyNowItem: null,
    }
  },

  computed: {
    total() {
      return this.cart.reduce((sum, item) => {
        return sum + this.calculatePrice(item)
      }, 0)
    },
    minPickupDate() {
      const date = new Date()

      const hasThemedCake = this.cart.some((item) => item.cake.category === 'THEMED')

      if (hasThemedCake) {
        date.setDate(date.getDate() + 3)
      } else {
        date.setDate(date.getDate() + 1)
      }

      return date.toISOString().split('T')[0]
    },
  },

  async mounted() {
    console.log('Checkout mounted')
    try {
      const profile = await getProfile()

      this.checkout.street = profile.street || ''
      this.checkout.city = profile.city || ''
      this.checkout.province = profile.province || ''
      this.checkout.postalCode = profile.postalCode || ''
    } catch (err) {
      console.error(err)
    }

    const mode = sessionStorage.getItem('checkoutMode')

    console.log('checkoutMode:', sessionStorage.getItem('checkoutMode'))
    console.log('buyNow:', sessionStorage.getItem('buyNow'))

    if (mode === 'BUY_NOW') {
      console.log('inside buy now')
      this.isBuyNow = true

      this.buyNowItem = JSON.parse(sessionStorage.getItem('buyNow'))
      console.log('Parent:', this.buyNowItem)
      this.cart = [this.buyNowItem]
    } else {
      this.isBuyNow = false

      const userId = localStorage.getItem('userID')

      this.cart = await getCart(userId)
    }
    console.log('Checkout finished loading')
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
    async paymentSuccess() {
      let order
      if (this.isBuyNow) {
        order = await buyNow({ ...this.buyNowItem, ...this.checkout })
        sessionStorage.removeItem('buyNow')
      } else {
        order = await checkout(this.checkout)
        this.cart = []
      }
      this.placedOrder = order
      this.showSuccessModal = true
      sessionStorage.removeItem('buyNow')
      sessionStorage.removeItem('checkoutMode')
      //   const order = await checkout(this.checkout)
      //   this.cart = []
      //   this.placedOrder = order
      //   this.showSuccessModal = true
    },
  },
}
</script>

<style scoped>
.checkout-page {
  background: var(--background);

  padding: 80px 0;

  min-height: 100vh;
}

.checkout-container {
  width: min(1200px, 92%);

  margin: auto;

  display: grid;

  grid-template-columns: 2fr 1fr;

  gap: 40px;

  align-items: start;
}

.left-column {
  display: flex;

  flex-direction: column;

  gap: 30px;
}

.card {
  background: white;

  border-radius: 24px;

  padding: 35px;

  box-shadow: 0 15px 40px rgba(23, 20, 20, 0.06);
}

.card h1 {
  margin: 0;

  color: var(--primary);

  font-size: 2.4rem;
}

.subtitle {
  margin-top: 10px;

  color: var(--text-light);
}

.card h3 {
  margin-bottom: 25px;

  color: var(--primary);
}

.card input {
  width: 100%;

  height: 55px;

  padding: 0 18px;

  border-radius: 14px;

  border: 1px solid #e7e7e7;

  margin-bottom: 18px;

  transition: 0.3s;

  box-sizing: border-box;

  font-size: 15px;
}

.card input:focus {
  outline: none;

  border-color: var(--secondary);

  box-shadow: 0 0 0 4px rgba(209, 170, 103, 0.15);
}

.two-column {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 18px;
}

/* Summary */

.summary-card {
  position: sticky;

  top: 120px;

  background: white;

  border-radius: 24px;

  padding: 30px;

  box-shadow: 0 15px 40px rgba(23, 20, 20, 0.06);
}

.summary-card h2 {
  margin-top: 0;

  color: var(--primary);

  margin-bottom: 25px;
}

.summary-item {
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  margin-bottom: 22px;
}

.summary-item h4 {
  margin: 0;

  color: var(--primary);

  font-size: 16px;
}

.summary-item small {
  color: var(--text-light);
}

.summary-item strong {
  color: var(--secondary);

  font-size: 17px;
}

.summary-card hr {
  border: none;

  border-top: 1px solid #ececec;

  margin: 25px 0;
}

.summary-total {
  display: flex;

  justify-content: space-between;

  align-items: center;
}

.summary-total span {
  font-size: 18px;

  color: var(--primary);
}

.summary-total strong {
  font-size: 2rem;

  color: var(--secondary);
}

@media (max-width: 900px) {
  .checkout-container {
    grid-template-columns: 1fr;
  }

  .summary-card {
    position: relative;

    top: 0;
  }

  .two-column {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--primary);
  font-weight: 600;
}

select,
textarea {
  width: 100%;

  padding: 14px 16px;

  border-radius: 14px;

  border: 1px solid #e6e6e6;

  font-size: 15px;

  box-sizing: border-box;

  transition: 0.3s;

  background: white;
}

textarea {
  resize: vertical;

  min-height: 120px;
}

select:focus,
textarea:focus {
  outline: none;

  border-color: var(--secondary);

  box-shadow: 0 0 0 4px rgba(209, 170, 103, 0.15);
}

.hint {
  display: block;

  margin-top: 8px;

  color: var(--text-light);

  font-size: 0.85rem;
}
</style>

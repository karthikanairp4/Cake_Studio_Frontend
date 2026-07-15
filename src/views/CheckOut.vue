<template>
  <NavBar />

  <section class="checkout-page">
    <div class="container">
      <!-- Left Side -->
      <div class="checkout-form">
        <h2>Checkout</h2>

        <h3>Shipping Address</h3>

        <input v-model="checkout.street" type="text" placeholder="Street Address" />

        <input v-model="checkout.city" type="text" placeholder="City" />

        <input v-model="checkout.province" type="text" placeholder="Province" />

        <input v-model="checkout.postalCode" type="text" placeholder="Postal Code" />

        <h3>Payment Details</h3>

        <StripePayment :buyNowItem="buyNowItem" @payment-success="paymentSuccess" />
      </div>
    </div>

    <!-- Right Side -->
    <div class="summary">
      <h2>Order Summary</h2>

      <div class="item" v-for="item in cart" :key="item.id">
        <span>
          {{ item.cake.name }}
          × {{ item.quantity }}
        </span>

        <strong>${{ calculatePrice(item).toFixed(2) }}</strong>
      </div>

      <hr />

      <div class="total">
        <span>Total</span>

        <strong>${{ total.toFixed(2) }}</strong>
      </div>

      <!-- <button @click="placeOrder">Place Order</button> -->
    </div>
    <!-- </div> -->
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
  },

  async mounted() {
    const mode = sessionStorage.getItem('checkoutMode')
    if (mode === 'BUY_NOW') {
      this.isBuyNow = true
      this.buyNowItem = JSON.parse(sessionStorage.getItem('buyNow'))
      this.cart = [this.buyNowItem]
    } else {
      this.isBuyNow = false
      const userId = localStorage.getItem('userID')
      this.cart = await getCart(userId)
    }
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
  background: #fff8e8;
  min-height: 90vh;
  padding: 50px;
}

.container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.checkout-form {
  flex: 2;
  background: white;
  border-radius: 15px;
  padding: 35px;
}

.checkout-form h2 {
  margin-bottom: 25px;
  color: #564743;
}

.checkout-form h3 {
  margin-top: 30px;
  color: #564743;
}

.checkout-form input {
  width: 100%;
  padding: 14px;
  margin-top: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.row {
  display: flex;
  gap: 15px;
}

.summary {
  width: 350px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  position: sticky;
  top: 20px;
}

.summary h2 {
  margin-bottom: 25px;
  color: #564743;
}

.item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.total {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 1.3rem;
}

button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 30px;
  background: #ffc43d;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #f5b400;
}
</style>

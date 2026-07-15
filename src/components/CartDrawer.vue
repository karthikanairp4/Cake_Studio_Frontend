<template>
  <transition name="cart">
    <div v-if="show" class="overlay" @click.self="$emit('close')">
      <div class="drawer">
        <!-- Header -->

        <div class="header">
          <h2>Your Cart</h2>

          <button class="close-btn" @click="$emit('close')">✕</button>
        </div>

        <!-- Body -->

        <div class="body">
          <div v-if="loading" class="loading">Loading...</div>

          <div v-else-if="cart.length === 0" class="empty">Your cart is empty.</div>

          <CartItem
            v-for="item in cart"
            :key="item.id"
            :item="item"
            @removed="loadCart"
            @updated="loadCart"
          />
        </div>

        <!-- Footer -->

        <CartSummary :cart="cart" />
      </div>
    </div>
  </transition>
</template>

<script>
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'

import { getCart } from '@/services/cartService'

export default {
  components: {
    CartItem,
    CartSummary,
  },

  props: {
    show: Boolean,
  },

  data() {
    return {
      cart: [],

      loading: false,
    }
  },

  watch: {
    show: {
      immediate: true,

      handler(value) {
        if (value) {
          this.loadCart()
        }
      },
    },
  },

  methods: {
    async loadCart() {
      try {
        this.loading = true

        const userId = localStorage.getItem('userID')

        const response = await getCart(userId)
        console.log('response', response)

        this.cart = response
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  z-index: 999;

  display: flex;

  justify-content: flex-end;
}

.drawer {
  width: 430px;

  background: white;

  height: 100vh;

  display: flex;

  flex-direction: column;
}

.header {
  padding: 25px;

  border-bottom: 1px solid #eee;

  display: flex;

  justify-content: space-between;

  align-items: center;
}

.header h2 {
  margin: 0;

  color: #564743;
}

.close-btn {
  border: none;

  background: none;

  font-size: 28px;

  cursor: pointer;
}

.body {
  flex: 1;

  overflow-y: auto;

  padding: 20px;
}

.loading,
.empty {
  text-align: center;

  margin-top: 60px;

  color: #777;
}

.cart-enter-active,
.cart-leave-active {
  transition: 0.3s;
}

.cart-enter-from .drawer,
.cart-leave-to .drawer {
  transform: translateX(100%);
}
</style>

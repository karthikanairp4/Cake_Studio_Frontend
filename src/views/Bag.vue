<template>
  <NavBar />
  <section class="bag-page">
    <div class="container">
      <div class="page-header">
        <p class="subtitle">SHOPPING BAG</p>

        <h1>Your Bag</h1>

        <p>
          {{ cart.length }}
          {{ cart.length === 1 ? 'Item' : 'Items' }}
        </p>
      </div>

      <div v-if="loading" class="loading">Loading...</div>

      <div v-else-if="cart.length === 0" class="empty">
        <i class="bi bi-bag-x"></i>

        <h2>Your bag is empty</h2>

        <router-link to="/classic-cakes" class="shop-btn"> Continue Shopping </router-link>
      </div>

      <div v-else class="bag-layout">
        <div>
          <CartItem
            v-for="item in cart"
            :key="item.id"
            :item="item"
            @removed="loadCart"
            @updated="loadCart"
          />
        </div>

        <CartSummary :cart="cart" />
      </div>
    </div>
  </section>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
import CartSummary from '@/components/CartSummary.vue'
import NavBar from '@/components/NavBar.vue'
import { getCart } from '@/services/cartService'

export default {
  components: {
    CartItem,
    CartSummary,
    NavBar,
  },

  data() {
    return {
      cart: [],
      loading: false,
    }
  },

  mounted() {
    this.loadCart()
  },

  methods: {
    async loadCart() {
      this.loading = true

      const userId = localStorage.getItem('userID')

      this.cart = await getCart(userId)
      console.log('this.cart', this.cart)
      this.loading = false
    },
  },
}
</script>

<style scoped>
.bag-page {
  padding-top: 140px;

  padding-bottom: 80px;

  background: var(--background);

  min-height: 100vh;
}

.container {
  width: min(92%, 1400px);

  margin: auto;
}

.page-header {
  margin-bottom: 45px;
}

.subtitle {
  color: var(--secondary);

  font-weight: 700;

  letter-spacing: 2px;

  margin-bottom: 8px;
}

.page-header h1 {
  font-size: 3rem;

  color: var(--primary);
}

.bag-layout {
  display: grid;

  grid-template-columns: 2fr 420px;

  gap: 50px;

  align-items: start;
}

.bag-layout > :last-child {
  position: sticky;

  top: 120px;
}

.empty {
  text-align: center;

  padding: 120px 0;
}

.shop-btn {
  display: inline-block;

  margin-top: 30px;

  padding: 14px 28px;

  background: var(--primary);

  color: white;

  text-decoration: none;

  border-radius: 40px;
}

@media (max-width: 1100px) {
  .bag-layout {
    grid-template-columns: 1fr;
  }

  .bag-layout > :last-child {
    position: static;
  }
}
</style>

<template>
  <NavBar />

  <section class="cake-details">
    <!-- Breadcrumb -->

    <div class="breadcrumb">
      <router-link to="/">Home</router-link>

      /

      <router-link :to="cake.category === 'THEMED' ? '/theme-cakes' : '/classic-cakes'">
        {{ cake.category === 'THEMED' ? 'Themed Cakes' : 'Classic Cakes' }}
      </router-link>

      /

      <span>{{ cake.name }}</span>
    </div>

    <!-- Product -->

    <div class="details-container">
      <!-- Left -->

      <div class="image-section">
        <img v-if="cake.imgUrl" :src="`${BASE_URL}${cake.imgUrl}`" :alt="cake.name" />
      </div>

      <!-- Right -->

      <div class="info-section">
        <h1>{{ cake.name }}</h1>

        <div class="rating">
          ⭐⭐⭐⭐⭐

          <span>(4.9)</span>
        </div>

        <h2 class="price">From ${{ cake.basePrice }}</h2>

        <p class="description">
          {{ cake.description }}
        </p>

        <hr />

        <!-- Product Options -->

        <ProductOptions
          :cake="cake"
          :sponges="options.sponges"
          :fillings="options.fillings"
          :frostings="options.frostings"
          v-model="selectedOptions"
        />

        <!-- Quantity only for Classic -->

        <QuantitySelector v-model="quantity" />

        <!-- Order Summary -->

        <PriceSummary :cake="cake" :selected="selectedOptions" :quantity="quantity" />

        <!-- Buttons -->

        <div class="buttons">
          <button class="cart-btn" @click="addToCart">Add To Cart</button>

          <button class="buy-btn" @click="buyNow">Buy Now</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Description / Ingredients -->

  <ProductInformation :cake="cake" />

  <Footer />
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import ProductOptions from '@/components/ProductOptions.vue'
import QuantitySelector from '@/components/QuantitySelector.vue'
import PriceSummary from '@/components/PriceSummary.vue'
import ProductInformation from '@/components/ProductInformation.vue'

import { BASE_URL } from '@/config/constants'

import { getCakeById } from '@/services/cakeService'
import { getAllCakeOptions } from '@/services/cakeBuilderService'
import { addToCart } from '@/services/cartService'

export default {
  components: {
    NavBar,
    Footer,
    ProductOptions,
    QuantitySelector,
    PriceSummary,
    ProductInformation,
  },

  data() {
    return {
      BASE_URL,
      cake: {},
      quantity: 1,
      options: {
        sponges: [],
        fillings: [],
        frostings: [],
      },
      selectedOptions: {
        weight: '1 Kg',
        sponge: null,
        filling: null,
        frosting: null,
        message: '',
      },

      cart: [],
      weightMap: {
        '500 g': 0.5,
        '1 Kg': 1,
        '2 Kg': 2,
        '3 Kg': 3,
      },
    }
  },

  async mounted() {
    await this.loadCake()
  },

  methods: {
    async loadCake() {
      try {
        const id = this.$route.params.id

        this.cake = await getCakeById(id)

        if (this.cake.category === 'THEMED') {
          this.options = await getAllCakeOptions()
          this.selectedOptions.sponge = this.options.sponges.find(
            (item) => item.name === 'Vanilla Sponge',
          )

          this.selectedOptions.frosting = this.options.frostings.find(
            (item) => item.name === 'Whipped Cream',
          )
          this.selectedOptions.filling = this.options.fillings.find((item) => item.name === 'None')
          console.log(this.options)
        }
      } catch (error) {
        console.error(error)
      }
    },

    async addToCart() {
      console.log('add to cart button clicked!')
      const user_id = localStorage.getItem('userID')
      const cartItem = {
        userId: Number(user_id),
        cakeId: this.cake.id,
        quantity: this.quantity,
        weight: this.weightMap[this.selectedOptions.weight],
        message: this.selectedOptions.message,
        sponge_id: this.selectedOptions.sponge?.id ?? null,
        fillingId: this.selectedOptions.filling?.id ?? null,
        frostingId: this.selectedOptions.frosting?.id ?? null,
      }

      console.log('cartItem', cartItem)

      await addToCart(cartItem)
      // console.log(this.cart, 'Cart Item')
      console.log('added')

      alert('Added to Cart')
    },
    buyNow() {
      const item = {
        // Objects for Checkout UI
        cake: this.cake,
        sponge: this.selectedOptions.sponge,
        filling: this.selectedOptions.filling,
        frosting: this.selectedOptions.frosting,

        // IDs for backend
        cakeId: this.cake.id,
        spongeId: this.selectedOptions.sponge?.id,
        fillingId: this.selectedOptions.filling?.id,
        frostingId: this.selectedOptions.frosting?.id,

        quantity: this.quantity,

        // Convert "1 Kg" -> 1
        weight: this.weightMap[this.selectedOptions.weight],

        message: this.selectedOptions.message,
      }
      sessionStorage.setItem('checkoutMode', 'BUY_NOW')
      sessionStorage.setItem('buyNow', JSON.stringify(item))

      this.$router.push('/checkout')
    },
  },
}
</script>
<style scoped>
.cake-details {
  width: 90%;
  max-width: 1450px;
  margin: 60px auto;
}

/* ===========================
   Breadcrumb
=========================== */

.breadcrumb {
  margin-bottom: 40px;
  font-size: 0.95rem;
  color: #888;
}

.breadcrumb a {
  color: #5ed3d1;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

/* ===========================
   Layout
=========================== */

.details-container {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 70px;
  align-items: start;
}

/* ===========================
   Image
=========================== */

.image-section {
  position: sticky;
  top: 100px;
}

.image-section img {
  width: 100%;
  border-radius: 24px;
  object-fit: cover;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
  transition: 0.4s;
}

.image-section img:hover {
  transform: scale(1.02);
}

/* ===========================
   Product Info
=========================== */

.info-section h1 {
  font-size: 3rem;
  color: #564743;
  margin-bottom: 15px;
}

.rating {
  color: #ffc43d;
  margin-bottom: 20px;
  font-size: 1.15rem;
}

.rating span {
  color: #888;
  margin-left: 10px;
}

.price {
  color: #5ed3d1;
  font-size: 2.2rem;
  margin-bottom: 25px;
}

.description {
  color: #666;
  line-height: 1.8;
  margin-bottom: 35px;
}

hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 35px 0;
}

/* ===========================
   Buttons
=========================== */

.buttons {
  display: flex;
  gap: 20px;
  margin-top: 35px;
}

.cart-btn,
.buy-btn {
  flex: 1;
  padding: 18px;
  border: none;
  border-radius: 40px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.3s;
}

.cart-btn {
  background: #ffc43d;
}

.buy-btn {
  background: #5ed3d1;
}

.cart-btn:hover {
  background: #5ed3d1;
  transform: translateY(-2px);
}

.buy-btn:hover {
  background: #ffc43d;
  transform: translateY(-2px);
}

/* ===========================
   Responsive
=========================== */

@media (max-width: 1100px) {
  .details-container {
    grid-template-columns: 1fr;
  }

  .image-section {
    position: static;
  }
}

@media (max-width: 768px) {
  .info-section h1 {
    font-size: 2.3rem;
  }

  .price {
    font-size: 1.8rem;
  }

  .buttons {
    flex-direction: column;
  }
}
</style>

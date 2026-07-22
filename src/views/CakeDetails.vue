<template>
  <NavBar />

  <section class="cake-details">
    <!-- Breadcrumb -->

    <div class="breadcrumb">
      <router-link to="/"> Home </router-link>

      <i class="bi bi-chevron-right"></i>

      <router-link :to="cake.category === 'THEMED' ? '/theme-cakes' : '/classic-cakes'">
        {{ cake.category === 'THEMED' ? 'Themed Cakes' : 'Classic Cakes' }}
      </router-link>

      <i class="bi bi-chevron-right"></i>

      <span>
        {{ cake.name }}
      </span>
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
        <div class="product-highlights">
          <div class="highlight">
            <i class="bi bi-award"></i>

            <span>Premium Ingredients</span>
          </div>

          <div class="highlight">
            <i class="bi bi-truck"></i>

            <span>Local Delivery Available</span>
          </div>

          <div class="highlight">
            <i class="bi bi-heart"></i>

            <span>Freshly Baked Daily</span>
          </div>
        </div>

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
        <div class="trust-badges">
          <div>
            <i class="bi bi-shield-check"></i>

            <span>Secure Checkout</span>
          </div>

          <div>
            <i class="bi bi-cake2"></i>

            <span>Freshly Made to Order</span>
          </div>

          <div>
            <i class="bi bi-patch-check"></i>

            <span>Quality Guaranteed</span>
          </div>
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
      const user = localStorage.getItem('userID')
      if (user) {
        console.log('add to cart button clicked!')
        const user_id = localStorage.getItem('userID')
        const cartItem = {
          userId: Number(user_id),
          cakeId: this.cake.id,
          quantity: this.quantity,
          weight: this.weightMap[this.selectedOptions.weight],
          message: this.selectedOptions.message,
          spongeId: this.selectedOptions.sponge?.id ?? null,
          fillingId: this.selectedOptions.filling?.id ?? null,
          frostingId: this.selectedOptions.frosting?.id ?? null,
        }

        console.log('cartItem', cartItem)

        const response = await addToCart(cartItem)
        // console.log(this.cart, 'Cart Item')
        console.log('response cart', response)
        alert('Added to Cart')
      } else {
        alert('Please login')
        this.$router.push('/login')
      }
    },
    buyNow() {
      const user = localStorage.getItem('userID')
      if (user) {
        const item = {
          cake: this.cake,
          sponge: this.selectedOptions.sponge,
          filling: this.selectedOptions.filling,
          frosting: this.selectedOptions.frosting,

          cakeId: this.cake.id,
          spongeId: this.selectedOptions.sponge?.id,
          fillingId: this.selectedOptions.filling?.id,
          frostingId: this.selectedOptions.frosting?.id,

          quantity: this.quantity,

          weight: this.weightMap[this.selectedOptions.weight],

          message: this.selectedOptions.message,
        }
        sessionStorage.setItem('checkoutMode', 'BUY_NOW')
        sessionStorage.setItem('buyNow', JSON.stringify(item))

        this.$router.push('/checkout')
      } else {
        alert('Please login')
        this.$router.push('/login')
      }
    },
  },
}
</script>
<style scoped>
.breadcrumb {
  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 45px;

  font-size: 0.95rem;

  color: var(--text-light);
}

.breadcrumb a {
  color: var(--secondary);

  text-decoration: none;

  font-weight: 600;

  transition: 0.3s;
}

.breadcrumb a:hover {
  color: var(--primary);
}

.breadcrumb span {
  color: var(--primary);

  font-weight: 600;
}

.breadcrumb i {
  font-size: 0.75rem;

  color: #bbb;
}

/*==========================
    Layout
===========================*/

.cake-details {
  width: min(92%, 1450px);

  margin: 70px auto 100px;
}

.details-container {
  display: grid;

  grid-template-columns: 1.1fr 1fr;

  gap: 90px;

  align-items: start;
}

/*==========================
      Image
===========================*/

.image-section {
  position: sticky;

  top: 110px;

  background: white;

  padding: 30px;

  border-radius: 30px;

  box-shadow: 0 18px 45px rgba(23, 20, 20, 0.08);
}

.image-section img {
  width: 100%;

  display: block;

  border-radius: 24px;

  transition: 0.4s;
}

.image-section img:hover {
  transform: scale(1.03);
}

/*==========================
      Product Info
===========================*/

.info-section h1 {
  font-size: clamp(2.8rem, 5vw, 4rem);

  color: var(--primary);

  margin-bottom: 18px;

  line-height: 1.2;
}

.rating {
  display: flex;

  align-items: center;

  gap: 14px;

  color: var(--secondary);

  font-size: 1rem;

  margin-bottom: 28px;
}

.rating span {
  color: var(--text-light);
}

.price {
  color: var(--secondary);

  font-size: 2.4rem;

  margin-bottom: 25px;
}

.description {
  color: var(--text-light);

  font-size: 1.05rem;

  line-height: 1.9;

  margin-bottom: 35px;
}

hr {
  border: none;

  border-top: 1px solid rgba(0, 0, 0, 0.08);

  margin: 40px 0;
}
/*==========================
      ACTION BUTTONS
===========================*/

.buttons {
  display: flex;

  gap: 18px;

  margin-top: 40px;
}

.cart-btn,
.buy-btn {
  flex: 1;

  padding: 18px 30px;

  border: none;

  border-radius: 50px;

  font-size: 1rem;

  font-weight: 600;

  cursor: pointer;

  transition: 0.35s ease;
}

.cart-btn {
  background: var(--primary);

  color: white;
}

.buy-btn {
  background: var(--secondary);

  color: white;
}

.cart-btn:hover {
  background: var(--secondary);

  transform: translateY(-3px);

  box-shadow: 0 12px 25px rgba(23, 20, 20, 0.15);
}

.buy-btn:hover {
  background: var(--primary);

  transform: translateY(-3px);

  box-shadow: 0 12px 25px rgba(23, 20, 20, 0.15);
}

/*==========================
     PRODUCT HIGHLIGHTS
===========================*/

.product-highlights {
  display: flex;

  flex-wrap: wrap;

  gap: 18px;

  margin-bottom: 35px;
}

.highlight {
  display: flex;

  align-items: center;

  gap: 10px;

  background: white;

  padding: 12px 18px;

  border-radius: 50px;

  box-shadow: 0 8px 18px rgba(23, 20, 20, 0.06);
}

.highlight i {
  color: var(--secondary);

  font-size: 1.1rem;
}

.highlight span {
  color: var(--primary);

  font-weight: 500;
}
/*==========================
      TRUST BADGES
===========================*/

.trust-badges {
  display: flex;

  gap: 28px;

  margin-top: 35px;

  flex-wrap: wrap;
}

.trust-badges div {
  display: flex;

  align-items: center;

  gap: 10px;

  color: var(--text-light);

  font-size: 0.95rem;
}

.trust-badges i {
  color: var(--secondary);

  font-size: 1.2rem;
}
/*==========================
      RESPONSIVE
===========================*/

@media (max-width: 1100px) {
  .details-container {
    grid-template-columns: 1fr;

    gap: 50px;
  }

  .image-section {
    position: static;
  }
}

@media (max-width: 768px) {
  .cake-details {
    margin: 40px auto 80px;
  }

  .info-section h1 {
    font-size: 2.5rem;
  }

  .price {
    font-size: 2rem;
  }

  .buttons {
    flex-direction: column;
  }

  .product-highlights {
    flex-direction: column;
  }

  .trust-badges {
    gap: 18px;
  }
  
  .breadcrumb{
    margin-top: 100px;
  }
}
</style>

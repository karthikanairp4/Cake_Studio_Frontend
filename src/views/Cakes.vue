<template>
  <NavBar />
  <section class="cakes-page">
    <div class="page-header">
      <p class="subtitle">OUR COLLECTION</p>
      <h1>Classic Cakes</h1>
      <p class="description">
        Timeless flavours handcrafted with premium ingredients, perfect for birthdays,
        anniversaries, and every celebration.
      </p>
    </div>
    <div class="cakes-grid">
      <CakeCard v-for="cake in cakes" :key="cake.id" :cake="cake" />
    </div>
  </section>
  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import CakeCard from '@/components/CakeCard.vue'

import { getCakesByCategory } from '@/services/cakeService'

export default {
  components: {
    NavBar,
    Footer,
    CakeCard,
  },

  data() {
    return {
      cakes: [],
    }
  },
  async mounted() {
    try {
      this.cakes = await getCakesByCategory('CLASSIC')
      console.log(this.cakes)
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style scoped>
.cakes-page {
  width: min(92%, 1400px);
  margin: auto;
  padding: 50px 0 100px;
}

.page-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 45px;
}

.subtitle {
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 50px;
}

.page-header h1 {
  color: var(--primary);

  font-size: clamp(2.6rem, 4vw, 4rem);

  margin-bottom: 20px;
}

.description {
  max-width: 620px;
  margin: auto;
}

/* ===========================
        GRID
=========================== */

.cakes-grid {
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  gap: 35px;
}
</style>

<template>
  <NavBar />

  <section class="cakes-page">
    <div class="page-header">
      <h1>Our Cakes</h1>

      <p>Freshly baked classics for every celebration.</p>
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
  width: 90%;

  max-width: 1450px;

  margin: 70px auto;
}

.page-header {
  text-align: center;

  margin-bottom: 70px;
}

.page-header h1 {
  font-size: 4rem;

  color: #564743;
}

.page-header p {
  margin-top: 15px;

  color: #666;

  font-size: 1.2rem;
}

.cakes-grid {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

  gap: 35px;
}
</style>

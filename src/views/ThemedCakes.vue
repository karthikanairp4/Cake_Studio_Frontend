<template>
  <NavBar />

  <section class="cakes-page">
    <div class="page-header">
      <p class="page-subtitle">OUR COLLECTION</p>

      <h1>Themed Cakes</h1>

      <p class="page-description">
        Beautiful custom-designed cakes for birthdays, weddings, baby showers and every special
        occasion. Every cake can be personalized to match your celebration.
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
      this.cakes = await getCakesByCategory('THEMED')
    } catch (error) {
      console.error(error)
    }
  },
}
</script>

<style scoped>
.cakes-page {
  width: min(92%, 1400px);
  margin: 70px auto;
}

.page-header {
  text-align: center;
  margin-bottom: 70px;
}

.page-subtitle {
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 18px;
  margin-top: 110px;
}

.page-header h1 {
  color: var(--primary);
  font-size: clamp(3rem, 5vw, 4.8rem);
  margin-bottom: 25px;
}

.page-description {
  max-width: 720px;
  margin: auto;
  color: var(--text-light);
  line-height: 1.9;
  font-size: 1.1rem;
}

.cakes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 35px;
}

@media (max-width: 768px) {
  .page-header {
    margin-bottom: 50px;
  }

  .page-header h1 {
    font-size: 2.8rem;
  }

  .page-description {
    font-size: 1rem;
  }
}
</style>

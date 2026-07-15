<template>
  <NavBar />

  <!-- Hero -->

  <section class="hero">
    <div class="hero-content">
      <h1>Themed Cakes</h1>

      <p>
        Discover beautifully handcrafted themed cakes for birthdays, baby showers, weddings and
        every special celebration. Personalize the flavour, filling, frosting and size to make it
        uniquely yours.
      </p>
    </div>
  </section>

  <!-- Cakes -->

  <section class="cakes-page">
    <div class="section-title">
      <h2>Choose Your Favourite Theme</h2>

      <p>
        Every themed cake can be customized with your preferred sponge, filling, frosting and cake
        size.
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
/* ================= HERO ================= */

.hero {
  position: relative;

  background: #5ed3d1;

  color: white;

  padding: 130px 20px;

  display: flex;

  justify-content: center;

  align-items: center;

  text-align: center;

  overflow: hidden;
}

.hero::before {
  content: '';

  position: absolute;

  inset: 0;

  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.15) 0,
    rgba(255, 255, 255, 0.15) 1px,
    transparent 1px,
    transparent 120px
  );
}

.hero-content {
  position: relative;

  z-index: 2;

  max-width: 850px;
}

.hero h1 {
  font-size: 4rem;

  margin-bottom: 25px;
}

.hero p {
  font-size: 1.2rem;

  line-height: 1.8;
}

/* Wave */

.hero::after {
  content: '';

  position: absolute;

  left: 0;

  bottom: -1px;

  width: 100%;

  height: 30px;

  background: radial-gradient(circle at 20px 0, white 22px, transparent 23px);

  background-size: 40px 30px;

  background-repeat: repeat-x;
}

/* ================= PAGE ================= */

.cakes-page {
  width: 90%;

  max-width: 1450px;

  margin: 80px auto;
}

.section-title {
  text-align: center;

  margin-bottom: 60px;
}

.section-title h2 {
  font-size: 2.7rem;

  color: #564743;

  margin-bottom: 20px;
}

.section-title p {
  color: #666;

  font-size: 1.1rem;

  max-width: 700px;

  margin: auto;

  line-height: 1.8;
}

/* ================= GRID ================= */

.cakes-grid {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

  gap: 35px;
}

/* ================= Responsive ================= */

@media (max-width: 768px) {
  .hero {
    padding: 100px 20px;
  }

  .hero h1 {
    font-size: 3rem;
  }

  .section-title h2 {
    font-size: 2rem;
  }
}
</style>

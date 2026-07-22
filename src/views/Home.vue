<template>
  <NavBar />

  <section class="hero-section">
    <div class="hero-container">
      <!-- Left Side -->
      <div class="hero-content">
        <p class="subtitle">Freshly Baked Every Day</p>

        <h1>
          Handcrafted Cakes
          <br />
          <span>For Every Celebration</span>
        </h1>

        <p class="description">
          From elegant wedding cakes to personalized birthday creations, every cake is baked with
          premium ingredients and crafted to make your special moments unforgettable.
        </p>

        <div class="hero-buttons">
          <router-link class="btn-primary" to="/classic-cakes"> Browse Cakes </router-link>

          <router-link class="btn-secondary" to="/theme-cakes"> Design Your Cake </router-link>
        </div>
      </div>

      <!-- Right Side -->
      <div class="hero-images">
        <div class="image-card">
          <img :src="homeimg1" alt="Handcrafted celebration cake" />
        </div>

        <div class="image-card">
          <img :src="homeimg2" alt="Freshly baked cake" />
        </div>

        <div class="image-card">
          <img :src="homeimg3" alt="Custom decorated cake" />
        </div>

        <div class="image-card">
          <img :src="homeimg4" alt="Themed celebration cake" />
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Cakes -->
  <section class="featured-cakes-section">
    <div class="section-title">
      <h2>Discover Our Cakes</h2>
      <p>Freshly Baked • Crafted With Love</p>
    </div>

    <div class="swiper-wrapper-custom">
      <!-- Left Arrow -->
      <button class="custom-prev" aria-label="Previous cake">
        <i class="bi bi-chevron-left"></i>
      </button>

      <Swiper
        :modules="[Navigation]"
        :navigation="{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }"
        :slides-per-view="4"
        :space-between="25"
        :loop="cakes.length > 4"
        :speed="800"
        :breakpoints="{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }"
        class="cake-swiper"
      >
        <SwiperSlide v-for="cake in cakes" :key="cake.id">
          <div class="cake-card">
            <img :src="`${BASE_URL}${cake.imgUrl}`" :alt="cake.name" />

            <div class="cake-content">
              <h3>{{ cake.name }}</h3>

              <p>${{ cake.basePrice }}</p>

              <button class="cake-btn" @click="goToDetails(cake.id)">Order Now</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Right Arrow -->
      <button class="custom-next" aria-label="Next cake">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </section>

  <!-- About Section -->
  <section class="about-section">
    <div class="about-container">
      <div class="about-image">
        <img
          class="about-photo"
          src="@/assets/images/about-cake.jpg"
          alt="Founder of Paprika Bakes"
        />
      </div>

      <div class="about-content">
        <p class="about-subtitle">OUR STORY</p>

        <h2>
          It All Started With
          <br />
          <span>₹2,000 & a Dream</span>
        </h2>

        <p class="about-description">
          Ever since I was a little girl, I dreamed of baking beautiful cakes. Every Christmas, I
          would watch baking shows on television, imagining the day I could create cakes of my own.
        </p>

        <p class="about-description">
          In 2020, while pursuing my engineering degree, I invested
          <strong>₹2,000</strong> from my Prime Minister's Scholarship to buy my first hand mixer
          and baking essentials. That simple decision marked the beginning of Paprika Bakes.
        </p>

        <p class="about-description">
          My very first cake wasn't perfectly decorated, but everyone loved the taste. After sharing
          it with family and neighbours, I received my first order and today, I've handcrafted and
          delivered
          <strong>150+ cakes</strong>, each made with love and care.
        </p>

        <router-link class="about-btn" to="/classic-cakes"> Explore Our Cakes </router-link>
      </div>
    </div>
  </section>

  <!-- Menu Section -->
  <section class="menu-section">
    <div class="menu-header">
      <p class="menu-subtitle">SHOP BY CATEGORY</p>
      <h2>Find the Perfect Cake for Every Celebration</h2>
    </div>

    <div class="menu-cards">
      <!-- Card 1 -->
      <div class="menu-card">
        <div class="card-image">
          <img :src="dessertImg" alt="Classic Cakes" />
        </div>
        <h3>Classic Cakes</h3>
        <p>
          Timeless cakes handcrafted for birthdays, anniversaries and every special celebration.
        </p>
        <router-link to="/classic-cakes" class="category-btn"> Explore Collection </router-link>
      </div>

      <!-- Card 2 -->
      <div class="menu-card">
        <div class="card-image">
          <img :src="cakeImg" alt="Themed Cakes" />
        </div>

        <h3>Themed Cakes</h3>

        <p>Creative character, floral and designer cakes made to impress on every occasion.</p>

        <router-link to="/theme-cakes" class="category-btn"> Explore Collection </router-link>
      </div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section class="gallery-section">
    <div class="gallery-container">
      <!-- Left Content -->
      <div class="gallery-content">
        <p class="gallery-subtitle">WHY CHOOSE US</p>

        <h2>
          Crafted with Care,
          <br />
          <span>Baked to Perfection</span>
        </h2>

        <p>
          Every cake is handcrafted with premium ingredients, creative designs, and attention to
          every detail. We're committed to making every celebration memorable.
        </p>

        <ul class="gallery-features">
          <li>
            <i class="bi bi-check-circle-fill"></i>
            Premium Ingredients
          </li>

          <li>
            <i class="bi bi-check-circle-fill"></i>
            Freshly Baked Daily
          </li>

          <li>
            <i class="bi bi-check-circle-fill"></i>
            Custom Cake Designs
          </li>

          <li>
            <i class="bi bi-check-circle-fill"></i>
            Perfect for Every Celebration
          </li>
        </ul>
      </div>

      <!-- Top Image -->
      <div class="gallery-image image-one">
        <img :src="gallery1" alt="Bakery gallery photo one" />
      </div>

      <!-- Top Image -->
      <div class="gallery-image image-two">
        <img :src="gallery2" alt="Bakery gallery photo two" />
      </div>

      <!-- Bottom Left -->
      <div class="gallery-image image-three">
        <img :src="gallery3" alt="Bakery gallery photo three" />
      </div>

      <!-- Bottom Right -->
      <div class="gallery-image image-four">
        <img :src="gallery4" alt="Bakery gallery photo four" />
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonial-section">
    <div class="testimonial-heading">
      <p>HAPPY CUSTOMERS</p>
      <h2>What Our Customers Are Saying</h2>
    </div>

    <div class="testimonial-container">
      <div class="testimonial-card">
        <div class="stars">★★★★★</div>
        <p class="review">
          "The cake was absolutely delicious and beautifully decorated. Everyone at our birthday
          party loved it. We will definitely order again!"
        </p>

        <div class="customer">
          <div>
            <h3>Krishnakumar</h3>
            <span>Birthday Customer</span>
          </div>
        </div>
      </div>

      <div class="testimonial-card">
        <div class="stars">★★★★★</div>
        <p class="review">
          "The custom cake looked exactly like the design we requested. Amazing craftsmanship and
          excellent customer service."
        </p>

        <div class="customer">
          <div>
            <h3>Hridhi</h3>
            <span>Wedding Customer</span>
          </div>
        </div>
      </div>

      <div class="testimonial-card">
        <div class="stars">★★★★★</div>
        <p class="review">
          "Fresh, soft and full of flavour. The Cake Studio has become our family's favourite bakery
          for every special occasion."
        </p>

        <div class="customer">
          <div>
            <h3>Sundappi</h3>
            <span>Regular Customer</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { getCakesByCategory } from '@/services/cakeService'
import { BASE_URL } from '@/config/constants'

import homeimg1 from '@/assets/images/home-one.jpg'
import homeimg2 from '@/assets/images/home-two.jpg'
import homeimg3 from '@/assets/images/home-three.jpg'
import homeimg4 from '@/assets/images/home-four.jpg'

import dessertImg from '@/assets/images/cupcake-home.png'
import cakeImg from '@/assets/images/cake2-home.png'

import gallery1 from '@/assets/images/gallary_1.png'
import gallery2 from '@/assets/images/gallary_2.png'
import gallery3 from '@/assets/images/gallary_3.png'
import gallery4 from '@/assets/images/gallary_4.jpg'

export default {
  name: 'HomeView',

  components: {
    NavBar,
    Swiper,
    SwiperSlide,
    Footer,
  },

  data() {
    return {
      homeimg1,
      homeimg2,
      homeimg3,
      homeimg4,
      dessertImg,
      cakeImg,
      gallery1,
      gallery2,
      gallery3,
      gallery4,
      Navigation,
      BASE_URL,
      cakes: [],
    }
  },

  async mounted() {
    try {
      this.cakes = await getCakesByCategory('CLASSIC')
    } catch (error) {
      console.error('Failed to load cakes:', error)
    }
  },

  methods: {
    goToDetails(id) {
      this.$router.push(`/cakes/${id}`)
    },
  },
}
</script>

<style scoped>
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #fcf8f5 0%, #f7efea 100%);
  overflow: hidden;
  padding: 60px 0 70px;
}

.hero-container {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 1400px;
  margin: auto;
  padding-top: 80px;
  min-height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
}

.hero-content {
  width: 48%;
}

.subtitle {
  color: var(--secondary);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 700;
  margin-bottom: 20px;
}

.hero-content h1 {
  font-size: 3.5rem;
  line-height: 1.08;
  color: var(--primary);
  font-weight: 800;
  margin-bottom: 30px;
}

.hero-content h1 span {
  color: var(--secondary);
}

.description {
  max-width: 500px;
  font-size: 1.1rem;
  line-height: 1.9;
  color: var(--text-light);
}

.hero-buttons {
  display: flex;
  gap: 25px;
  margin-top: 20px;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 16px 34px;
  border-radius: 40px;
  font-weight: 600;
  transition: 0.3s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--secondary);
}

.btn-secondary {
  border: 2px solid var(--primary);
  color: var(--primary);
  background: transparent;
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-3px);
}

.hero-images {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.image-card {
  overflow: hidden;
  border-radius: 28px;
  background: white;
  box-shadow: 0 18px 40px rgba(23, 20, 20, 0.12);
  transition: 0.35s;
}

.image-card:hover {
  transform: translateY(-8px);
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: 0.5s;
}

.image-card:hover img {
  transform: scale(1.05);
}

.image-card:nth-child(1) {
  height: 200px;
}

.image-card:nth-child(2) {
  height: 220px;
}

.image-card:nth-child(3) {
  height: 220px;
}

.image-card:nth-child(4) {
  height: 200px;
  margin-top: 20px;
}

/* ==========================
   FEATURED CAKES
========================== */

.featured-cakes-section {
  padding: 20px 0;
  background: #fcf8f5;
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
}

.section-title h2 {
  font-size: clamp(2.5rem, 4vw, 3.8rem);
  color: var(--primary);
  margin-bottom: 12px;
}

.section-title p {
  color: var(--secondary);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  font-family: inherit;
}

.cake-content {
  padding: 20px;
}

.cake-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(23, 20, 20, 0.08);
  transition: 0.35s;
  text-align: left;
}

.cake-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(23, 20, 20, 0.14);
}

.cake-card img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.cake-card h3 {
  color: var(--primary);
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.cake-card p {
  color: var(--secondary);
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.cake-btn {
  margin-top: 12px;
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 30px;
  background: var(--primary);
  color: white;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;
}

.cake-btn:hover {
  background: var(--secondary);
}

.cake-swiper {
  width: min(92%, 1400px);
  margin: auto;
}

.swiper-wrapper-custom {
  position: relative;
  width: min(92%, 1400px);
  margin: auto;
}

.custom-prev,
.custom-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: white;
  box-shadow: 0 10px 25px rgba(23, 20, 20, 0.12);
  cursor: pointer;
  z-index: 50;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-prev {
  left: -50px;
}

.custom-next {
  right: -50px;
}

.custom-prev i,
.custom-next i {
  font-size: 1.5rem;
  color: var(--primary);
  transition: 0.3s;
}

.custom-prev:hover,
.custom-next:hover {
  background: var(--primary);
  transform: translateY(-50%) scale(1.05);
}

.custom-prev:hover i,
.custom-next:hover i {
  color: white;
}

.swiper-button-next,
.swiper-button-prev {
  display: none !important;
}

/* ==========================
   ABOUT SECTION
========================== */

.about-section {
  background: var(--background);
  padding: 100px 0;
}

.about-container {
  width: min(92%, 1400px);
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.about-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-image img {
  width: 100%;
  max-width: 460px;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(23, 20, 20, 0.12);
}

.about-subtitle {
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 18px;
}

.about-content h2 {
  font-size: clamp(2.5rem, 4vw, 3.8rem);
  color: var(--primary);
  line-height: 1.15;
  margin-bottom: 28px;
}

.about-content span {
  color: var(--secondary);
}

.about-description {
  color: var(--text-light);
  font-size: 1.05rem;
  line-height: 1.9;
  margin-bottom: 15px;
  max-width: 560px;
}

.about-features {
  list-style: none;
  padding: 0;
  margin: 0 0 40px;
}

.about-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: var(--text);
  font-size: 1rem;
  font-weight: 500;
}

.about-features i {
  color: var(--secondary);
  font-size: 1.15rem;
}

.about-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 15px 36px;
  border-radius: 40px;
  background: var(--primary);
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* ==========================
   MENU / SHOP BY CATEGORY
========================== */

.menu-section {
  background: white;
  padding: 80px 0;
}

.menu-header {
  text-align: center;
  margin-bottom: 90px;
}

.menu-subtitle {
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 18px;
}

.menu-header h2 {
  font-size: clamp(2.5rem, 4vw, 3.8rem);
  color: var(--primary);
  line-height: 1.2;
}

.menu-cards {
  width: min(92%, 1100px);
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
}

.menu-card {
  background: var(--background);
  border-radius: 24px;
  padding: 120px 35px 40px;
  position: relative;
  text-align: center;
  box-shadow: 0 15px 35px rgba(23, 20, 20, 0.08);
  transition: all 0.35s ease;
}

.menu-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 45px rgba(23, 20, 20, 0.15);
}

.card-image {
  position: absolute;
  top: -85px;
  left: 50%;
  transform: translateX(-50%);
  width: 170px;
  height: 170px;
  background: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 25px rgba(23, 20, 20, 0.12);
}

.card-image img {
  width: 130px;
  transition: transform 0.35s ease;
}

.menu-card:hover .card-image img {
  transform: scale(1.08);
}

.menu-card h3 {
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 20px;
}

.menu-card p {
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 35px;
  min-height: 90px;
}

.category-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 14px 32px;
  border-radius: 35px;
  background: var(--primary);
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background: var(--secondary);
  transform: translateY(-2px);
}

/* ==========================
   GALLERY SECTION
========================== */

.gallery-section {
  background: white;
  padding: 100px 0;
}

.gallery-container {
  width: min(92%, 1450px);
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 0.7fr 0.9fr;
  grid-template-rows: auto 320px;
  gap: 25px;
  align-items: stretch;
}

.gallery-content {
  background: linear-gradient(135deg, var(--primary), #322b2b);
  border-radius: 28px;
  padding: 60px 45px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 18px 40px rgba(23, 20, 20, 0.12);
  transition: all 0.35s ease;
}

.gallery-content:hover {
  transform: translateY(-6px);
}

.gallery-subtitle {
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 18px;
}

.gallery-content h2 {
  font-size: clamp(2.4rem, 4vw, 3.5rem);
  line-height: 1.15;
  color: white;
  margin-bottom: 25px;
}

.gallery-content span {
  color: var(--secondary);
}

.gallery-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.9;
  margin-bottom: 35px;
}

.gallery-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.gallery-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
}

.gallery-features i {
  color: var(--secondary);
  font-size: 1.1rem;
}

.gallery-image {
  overflow: hidden;
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(23, 20, 20, 0.1);
  position: relative;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-image:hover img {
  transform: scale(1.05);
}

.image-one {
  grid-column: 2;
  grid-row: 1;
}

.image-two {
  grid-column: 3;
  grid-row: 1;
}

.image-three {
  grid-column: 1;
  grid-row: 2;
}

.image-four {
  grid-column: 2 / span 2;
  grid-row: 2;
}

/* ==========================
   TESTIMONIALS
========================== */

.testimonial-section {
  background: var(--background);
  padding: 100px 0;
}

.testimonial-heading {
  text-align: center;
  margin-bottom: 70px;
}

.testimonial-heading p {
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 18px;
}

.testimonial-heading h2 {
  font-size: clamp(2.5rem, 4vw, 3.8rem);
  color: var(--primary);
  line-height: 1.2;
}

.testimonial-container {
  width: min(92%, 1400px);
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 35px;
}

.testimonial-card {
  background: white;
  border-radius: 24px;
  padding: 35px;
  box-shadow: 0 15px 35px rgba(23, 20, 20, 0.08);
  transition: 0.35s;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 45px rgba(23, 20, 20, 0.14);
}

.stars {
  color: #f4b400;
  font-size: 1rem;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.review {
  color: var(--text-light);
  line-height: 1.9;
  font-size: 1rem;
  min-height: 150px;
}

.customer {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 30px;
}

.customer img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  object-fit: cover;
}

.customer h3 {
  color: var(--primary);
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.customer span {
  color: var(--secondary);
  font-size: 0.9rem;
}

@media (max-width: 1100px) {
  .gallery-container {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 260px 260px;
    gap: 20px;
  }

  .gallery-content {
    grid-column: 1 / -1;
  }

  .image-one {
    grid-column: 1;
    grid-row: 2;
  }

  .image-two {
    grid-column: 2;
    grid-row: 2;
  }

  .image-three {
    grid-column: 1;
    grid-row: 3;
  }

  .image-four {
    grid-column: 2;
    grid-row: 3;
  }
}

@media (max-width: 992px) {
  html,
  body {
    overflow-x: hidden;
  }

  .hero-container {
    flex-direction: column;
    text-align: center;
    gap: 45px;
    padding-top: 40px;
  }

  .hero-content {
    width: 100%;
  }

  .description {
    margin-inline: auto;
  }

  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-images {
    width: 100%;
    max-width: 560px;
  }

  .custom-prev,
  .custom-next {
    width: 46px;
    height: 46px;
  }

  .custom-prev {
    left: 5px;
  }

  .custom-next {
    right: 5px;
  }

  .custom-prev i,
  .custom-next i {
    font-size: 1.2rem;
  }

  .about-container {
    grid-template-columns: 1fr;
    gap: 50px;
    text-align: center;
  }

  .about-description {
    margin-inline: auto;
  }

  .about-features li {
    justify-content: center;
  }

  .about-image img {
    max-width: 480px;
  }

  .menu-cards {
    grid-template-columns: 1fr;
    gap: 120px;
  }

  .menu-card {
    max-width: 500px;
    /* width: 100%; */
    margin: auto;
  }

  .testimonial-container {
    grid-template-columns: 1fr;
  }

  .testimonial-card {
    max-width: 600px;
    margin: auto;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0 50px;
  }

  .hero-content h1 {
    font-size: 2.4rem;
  }

  .hero-images {
    gap: 18px;
  }

  .image-card:nth-child(1),
  .image-card:nth-child(2),
  .image-card:nth-child(3),
  .image-card:nth-child(4) {
    height: 150px;
    margin-top: 0;
  }

  .about-section {
    padding: 70px 0;
  }

  .about-content h2 {
    font-size: 2.4rem;
  }

  .about-btn {
    /* width: 100%; */
    /* max-width: 300px; */
  }

  /* .about-image img {
    max-width: 100%;
  } */

  .menu-section {
    padding: 70px 0;
  }

  .menu-header {
    margin-bottom: 70px;
  }

  .card-image {
    width: 150px;
    height: 150px;
    top: -75px;
  }

  .card-image img {
    width: 115px;
  }

  .menu-card {
    padding: 110px 30px 35px;
  }

  .menu-card h3 {
    font-size: 1.7rem;
  }

  .category-btn {
    /* width: 100%; */
  }

  .gallery-section {
    padding: 70px 0;
  }

  .gallery-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto repeat(4, 260px);
  }

  .gallery-content,
  .image-one,
  .image-two,
  .image-three,
  .image-four {
    grid-column: auto;
    grid-row: auto;
  }

  .gallery-content {
    text-align: center;
  }

  .gallery-features li {
    justify-content: center;
  }

  .gallery-content h2 {
    font-size: 2.3rem;
  }
}

@media (max-width: 480px) {
  .category-btn,
  .about-btn {
    min-width: 0;
    box-sizing: border-box;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary,
  .btn-secondary {
    min-width: 0;
    box-sizing: border-box;
    padding: 14px 20px;
    white-space: normal;
    text-align: center;
  }

  .review {
    min-height: 0;
  }
}
</style>

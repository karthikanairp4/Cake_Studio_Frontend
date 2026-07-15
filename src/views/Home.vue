<template>
  <NavBar />
  <section class="hero-section">
    <div class="hero-container">
      <!-- Left Side -->
      <div class="hero-content">
        <p class="subtitle">Sweet Bakery 128</p>

        <h1>
          Satisfy Your
          <br />
          Sweet Tooth
        </h1>

        <p class="description">
          Explore our wide range of baked goods, lovingly crafted with the finest ingredients and an
          extra dash of love.
        </p>

        <div class="hero-buttons">
          <button class="btn-yellow">About Us</button>

          <button class="btn-blue">Our Menu</button>
        </div>
      </div>

      <!-- Right Side -->
      <div class="hero-images">
        <div class="image-card">
          <img :src="homeimg1" alt="" />
        </div>

        <div class="image-card">
          <img :src="homeimg2" alt="" />
        </div>

        <div class="image-card">
          <img :src="homeimg3" alt="" />
        </div>

        <div class="image-card">
          <img :src="homeimg4" alt="" />
        </div>
      </div>
    </div>

    <div class="circle-bg"></div>
  </section>

  <!-- Featured Cakes -->
  <section class="featured-cakes-section">
    <div class="section-title">
      <h2>Discover Our Cakes</h2>
      <p>Taste Our Finest Creations</p>
    </div>

    <Swiper
      :modules="[Navigation]"
      :slides-per-view="4"
      :space-between="30"
      :navigation="true"
      :loop="cakes.length > 4"
      :speed="800"
      class="cake-swiper"
    >
      <SwiperSlide v-for="cake in cakes" :key="cake.id">
        <div class="cake-card">
          <img :src="`${BASE_URL}${cake.imgUrl}`" :alt="cake.name" />

          <h3>{{ cake.name }}</h3>

          <p>${{ cake.basePrice }}</p>

          <button class="cake-btn" @click="goToDetails(cake.id)">View Cake</button>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
  <!-- About Section -->
  <section class="about-section">
    <div class="about-container">
      <!-- <div class="about-image">
        <div>
          <img src="@/assets/images/cross-bg.png" alt="Croissant" />
        </div>

        <img src="@/assets/images/crossant.png" alt="Croissant" />
      </div> -->
      <div class="about-image">
        <div class="croissant-bg"></div>

        <img class="croissant" src="@/assets/images/crossant.png" alt="Croissant" />
      </div>

      <div class="about-content">
        <p class="about-subtitle">About Us</p>

        <h2>
          The <span>Taste</span> You Need,
          <br />
          For Your Pleasure
        </h2>

        <p class="about-description">
          At The Cake Studio, we believe that every celebration deserves something special. From
          handcrafted cakes to custom-designed masterpieces, we create desserts that bring joy to
          every occasion.
        </p>

        <button class="about-btn">More About Us</button>
      </div>
    </div>
  </section>

  <!-- Menu Section -->
  <section class="menu-section">
    <div class="menu-header">
      <p class="menu-subtitle">Awesome Menu</p>
      <h2>Bakery For Lovely People</h2>
    </div>

    <div class="menu-cards">
      <!-- Card 1 -->
      <div class="menu-card desserts">
        <div class="card-image">
          <img :src="dessertImg" alt="" />
        </div>

        <h3>Desserts</h3>

        <p>Delicious pastries, cupcakes and sweet treats crafted fresh every day.</p>

        <button>Order Now</button>
      </div>

      <!-- Card 2 -->
      <div class="menu-card cakes">
        <div class="card-image">
          <img :src="cakeImg" alt="" />
        </div>

        <h3>Cakes</h3>

        <p>Explore our collection of birthday, wedding and celebration cakes.</p>

        <button>Order Now</button>
      </div>

      <!-- Card 3 -->
      <div class="menu-card custom">
        <div class="card-image">
          <img :src="customCakeImg" alt="" />
        </div>

        <h3>Custom Cakes</h3>

        <p>Design your dream cake exactly the way you imagine it.</p>

        <button>Order Now</button>
      </div>
    </div>
  </section>
  <!-- Gallery Section -->
  <section class="gallery-section">
    <div class="shape shape1"></div>
    <div class="shape shape2"></div>
    <div class="shape shape3"></div>
    <div class="shape shape4"></div>
    <div class="gallery-container">
      <!-- Left Content -->
      <div class="gallery-content">
        <h2>
          Made by Hand with
          <br />
          Big Love
        </h2>

        <p>
          At The Cake Studio, every cake is handcrafted using premium ingredients and baked fresh
          every day. From birthdays to weddings and every special occasion in between, we create
          desserts that make unforgettable memories.
        </p>

        <button class="gallery-btn">Explore Our Cakes →</button>
      </div>

      <!-- Top Image -->
      <div class="gallery-image image-one">
        <img :src="gallery1" alt="" />
      </div>

      <!-- Top Image -->
      <div class="gallery-image image-two">
        <img :src="gallery2" alt="" />
      </div>

      <!-- Bottom Left -->
      <div class="gallery-image image-three">
        <img :src="gallery3" alt="" />
      </div>

      <!-- Bottom Right -->
      <div class="gallery-image image-four">
        <img :src="gallery4" alt="" />
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonial-section">
    <div class="testimonial-heading">
      <p>Testimonials</p>

      <h2>What Our Customers Are Saying</h2>
    </div>

    <div class="testimonial-container">
      <div class="testimonial-card">
        <p class="review">
          "The cake was absolutely delicious and beautifully decorated. Everyone at our birthday
          party loved it. We will definitely order again!"
        </p>

        <div class="customer">
          <img :src="customer1" alt="Customer" />

          <div>
            <h3>Robert Ban</h3>

            <span>Birthday Customer</span>
          </div>
        </div>
      </div>

      <div class="testimonial-card">
        <p class="review">
          "The custom cake looked exactly like the design we requested. Amazing craftsmanship and
          excellent customer service."
        </p>

        <div class="customer">
          <img :src="customer2" alt="Customer" />

          <div>
            <h3>Nensi Links</h3>

            <span>Wedding Customer</span>
          </div>
        </div>
      </div>

      <div class="testimonial-card">
        <p class="review">
          "Fresh, soft and full of flavour. The Cake Studio has become our family's favourite bakery
          for every special occasion."
        </p>

        <div class="customer">
          <img :src="customer3" alt="Customer" />

          <div>
            <h3>Olga Fox</h3>

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
import homeimg1 from '@/assets/images/home-one.jpg'
import homeimg2 from '@/assets/images/home-two.jpg'
import homeimg3 from '@/assets/images/home-three.jpg'
import homeimg4 from '@/assets/images/home-four.jpg'

import dessertImg from '@/assets/images/cupcake-home.png'
import cakeImg from '@/assets/images/cake2-home.png'
import customCakeImg from '@/assets/images/bread-home.png'

import gallery1 from '@/assets/images/gallary_1.png'
import gallery2 from '@/assets/images/gallary_2.png'
import gallery3 from '@/assets/images/gallary_3.png'
import gallery4 from '@/assets/images/gallary_4.png'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import Footer from '@/components/Footer.vue'
import { getCakesByCategory } from '@/services/cakeService'
import { BASE_URL } from '@/config/constants'

export default {
  data() {
    return {
      homeimg1,
      homeimg2,
      homeimg3,
      homeimg4,
      dessertImg,
      cakeImg,
      customCakeImg,
      Navigation,
      gallery1,
      gallery2,
      gallery3,
      gallery4,
      cakes: [],
      BASE_URL,
    }
  },
  components: {
    NavBar,
    Swiper,
    SwiperSlide,
    Footer,
  },
  async mounted() {
    try {
      this.cakes = await getCakesByCategory('CLASSIC')
      console.log(this.cakes)
    } catch (error) {
      console.log(error)
    }
  },
  computed: {},
  methods: {
    goToDetails(id) {
      this.$router.push(`/cakes/${id}`)
    },
  },
}
</script>

<style>
.hero-section {
  position: relative;
  min-height: 90vh;
  background: #fff3d6;
  overflow: hidden;
}

/* Background stripes */

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;

  background-image: repeating-linear-gradient(
    90deg,
    #fdf8ec,
    #fff1d8,
    8px,
    transparent 8px,
    transparent 120px
  );

  z-index: 0;
}

.hero-container {
  position: relative;
  z-index: 2;

  width: 90%;
  max-width: 1400px;

  margin: auto;
  padding-top: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-content {
  width: 45%;
}

.subtitle {
  color: #5ed3d1;
  font-size: 1.8rem;
  font-family: cursive;
  margin-bottom: 20px;
}

.hero-content h1 {
  font-size: 5rem;
  line-height: 1.1;
  color: #4b3f3f;
  font-weight: 700;
}

.description {
  margin-top: 30px;
  max-width: 550px;
  font-size: 1.3rem;
  color: #666;
}

.hero-buttons {
  display: flex;
  gap: 25px;
  margin-top: 50px;
}

.btn-yellow,
.btn-blue {
  border: none;
  padding: 18px 45px;
  border-radius: 40px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
}

.btn-yellow {
  background: #ffc43d;
}

.btn-blue {
  background: #5ed3d1;
}

.hero-images {
  width: 48%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.image-card:nth-child(1) {
  height: 230px;
}

.image-card:nth-child(2) {
  height: 320px;
}

.image-card:nth-child(3) {
  height: 320px;
  margin-top: -60px;
}

.image-card:nth-child(4) {
  height: 260px;
}

.image-card {
  height: 260px;
  border-radius: 20px;
  overflow: hidden;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.circle-bg {
  position: absolute;
  width: 700px;
  height: 700px;
  border: 12px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  right: -150px;
  top: 120px;
}

/* about */

.about-section {
  background: #f7f7f7;
  padding: 120px 0;
}

.about-container {
  width: 85%;
  max-width: 1400px;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
}

/* .about-image {
  flex: 1;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
} */

.about-image {
  flex: 1;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 550px;
}
.croissant-bg {
  position: absolute;

  width: 420px;
  height: 420px;

  background: url('@/assets/images/cross-bg.png') center center no-repeat;
  background-size: contain;

  z-index: 1;
}

.croissant {
  position: relative;

  width: 620px;

  z-index: 2;

  animation: swing 4s ease-in-out infinite;
  transform-origin: top center;
}

.circle-bg-about {
  position: absolute;

  width: 500px;
  height: 350px;

  background: #71d4d2;
  border-radius: 50%;
  z-index: 1;
}

.about-image img {
  position: relative;
  z-index: 2;

  width: 600px;
  max-width: 100%;
}

.about-content {
  flex: 1;
}

.about-subtitle {
  color: #71d4d2;
  font-size: 1.5rem;
  font-family: cursive;
  margin-bottom: 20px;
}

.about-content h2 {
  font-size: 4rem;
  line-height: 1.2;
  color: #564743;
  margin-bottom: 30px;
}

.about-content span {
  color: #ffc43d;
}

.about-description {
  color: #666;
  font-size: 1.25rem;
  line-height: 1.8;
  margin-bottom: 40px;
}

.about-btn {
  background: #ffc43d;
  color: white;
  border: none;
  border-radius: 40px;
  padding: 18px 40px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
}
.about-image img {
  animation: swing 4s ease-in-out infinite;
  transform-origin: top center;
}

@keyframes swing {
  0% {
    transform: rotate(-4deg);
  }

  50% {
    transform: rotate(4deg);
  }

  100% {
    transform: rotate(-4deg);
  }
}

/* menu */
.menu-section {
  background: #f8f8f8;
  padding: 120px 0;
}

.menu-header {
  text-align: center;
  margin-bottom: 100px;
}

.menu-subtitle {
  color: #5ed3d1;
  font-size: 1.6rem;
  font-family: cursive;
  margin-bottom: 15px;
}

.menu-header h2 {
  font-size: 4rem;
  color: #564743;
}

.menu-cards {
  width: 85%;
  margin: auto;

  display: flex;
  justify-content: center;
  gap: 40px;
}

.menu-card {
  width: 380px;
  border-radius: 20px;
  padding: 120px 35px 50px;
  position: relative;
  text-align: center;
}

.desserts {
  background: #dff2f3;
}

.cakes {
  background: #f7dfea;
}

.custom {
  background: #f8efd3;
}

.card-image {
  position: absolute;
  top: -90px;
  left: 50%;
  transform: translateX(-50%);

  width: 180px;
  height: 180px;

  background: white;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.card-image img {
  width: 140px;
  transition: 0.4s;
}

.menu-card:hover .card-image img {
  transform: scale(1.08) rotate(5deg);
}

.menu-card h3 {
  font-size: 2.5rem;
  margin-bottom: 25px;
  color: #564743;
}

.menu-card p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  min-height: 120px;
}

.menu-card button {
  border: none;
  background: white;
  color: #5ed3d1;

  padding: 15px 40px;
  border-radius: 40px;

  font-size: 1.2rem;
  font-weight: 600;

  margin-top: 25px;
  cursor: pointer;
}

/* featured cakes */
/* ==========================
   FEATURED CAKES
========================== */

.featured-cakes-section {
  padding: 120px 0;
  background: #ffffff;
}

.section-title {
  text-align: center;
  margin-bottom: 70px;
}

.section-title h2 {
  font-size: 4rem;
  color: #564743;
  margin-bottom: 15px;
}

.section-title p {
  color: #5ed3d1;
  font-size: 1.5rem;
  font-family: cursive;
}

.cake-swiper {
  width: 92%;
  margin: auto;
  overflow: visible;
}

.cake-card {
  text-align: center;
  transition: 0.3s;
}

.cake-card:hover {
  transform: translateY(-10px);
}

.cake-card img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 20px;
}

.cake-card h3 {
  margin-top: 20px;
  color: #4b3f3f;
  font-size: 1.5rem;
}

.cake-card p {
  color: #5ed3d1;
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 10px;
}

.cake-btn {
  margin-top: 20px;
  border: none;
  background: #ffc43d;
  color: white;
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.cake-btn:hover {
  background: #5ed3d1;
}

/* ==========================
   SWIPER ARROWS
========================== */

.swiper-button-next,
.swiper-button-prev {
  width: 80px !important;
  height: 80px !important;

  background: white;
  border-radius: 50%;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);

  transition: all 0.3s ease;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 30px !important;
  font-weight: 700;
  color: #5ed3d1;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: #5ed3d1;
  transform: scale(1.08);
}

.swiper-button-next:hover::after,
.swiper-button-prev:hover::after {
  color: white;
}

.swiper-button-prev {
  left: -10px !important;
}

.swiper-button-next {
  right: -10px !important;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  color: #ffc43d;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: #ffc43d;
}
.swiper-button-next,
.swiper-button-prev {
  color: #ffc43d !important;
}

/* ==========================
      GALLERY SECTION
========================== */

.gallery-section {
  background: #fff6df;
  padding: 120px 0;
}

.gallery-container {
  width: 90%;
  max-width: 1450px;

  margin: auto;

  display: grid;

  grid-template-columns: 1fr 0.7fr 0.9fr;

  grid-template-rows: 300px 320px;

  gap: 25px;
}

/* LEFT CARD */

.gallery-content {
  background: linear-gradient(135deg, #ffc43d, #ffb300);

  border-radius: 20px;

  padding: 45px;

  color: white;

  display: flex;

  flex-direction: column;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  transition: 0.4s;
}

.gallery-content:hover {
  transform: translateY(-8px);
}

.gallery-content h2 {
  font-size: 2.8rem;
  line-height: 1.2;
  margin-bottom: 25px;
  color: white;
}

.gallery-content p {
  font-size: 1rem;
  line-height: 1.8;
  margin-top: 10px;
}

.gallery-btn {
  margin-top: 30px;

  width: 240px;

  border: none;

  padding: 18px;

  border-radius: 40px;

  background: #5ed3d1;

  color: white;

  font-size: 1.2rem;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;
}

.gallery-btn:hover {
  background: white;

  color: #5ed3d1;
}

/* IMAGE BOXES */

.gallery-image {
  border-radius: 20px;

  overflow: hidden;

  position: relative;
}

.gallery-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: 0.5s;
}

.gallery-image img {
  transition: 0.5s;
}

.gallery-image:hover img {
  transform: scale(1.08);
}

/* Layout */

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

.shape {
  position: absolute;
  border-radius: 50px;
  opacity: 0.35;
}

.gallery-section {
  position: relative;
  overflow: hidden;
}

.shape1 {
  width: 90px;
  height: 18px;
  background: #5ed3d1;

  left: -20px;
  top: 180px;

  transform: rotate(-40deg);
}

.shape2 {
  width: 70px;
  height: 18px;
  background: #ff8aa1;

  right: 40px;
  top: 60px;

  transform: rotate(40deg);
}

.shape3 {
  width: 70px;
  height: 18px;
  background: #ffd166;

  left: 80px;
  top: 220px;

  transform: rotate(45deg);
}

.shape4 {
  width: 80px;
  height: 18px;
  background: #9be564;

  right: 80px;
  bottom: 80px;

  transform: rotate(-35deg);
}

/*==========================
      TESTIMONIALS
===========================*/

.testimonial-section {
  padding: 120px 0;
  background: white;
  position: relative;
}

/* Decorative top & bottom border */

.testimonial-section::before,
.testimonial-section::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 20px;
  background: radial-gradient(circle at 20px 0, #fff6df 22px, transparent 23px) repeat-x;
  background-size: 40px 20px;
}

.testimonial-section::before {
  top: 0;
}

.testimonial-section::after {
  bottom: 0;
  transform: rotate(180deg);
}

.testimonial-heading {
  text-align: center;
  margin-bottom: 80px;
}

.testimonial-heading p {
  color: #5ed3d1;
  font-size: 1.5rem;
  font-family: cursive;
  margin-bottom: 15px;
}

.testimonial-heading h2 {
  font-size: 4rem;
  color: #564743;
}

.testimonial-container {
  width: 90%;
  max-width: 1400px;

  margin: auto;

  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 40px;
}

.testimonial-card {
  padding: 30px;

  border-right: 2px dashed #9ce7e6;

  transition: 0.35s;
}

.testimonial-card:last-child {
  border-right: none;
}

.testimonial-card:hover {
  transform: translateY(-10px);
}

.review {
  color: #666;

  font-size: 1.2rem;

  line-height: 1.8;

  min-height: 180px;
}

.customer {
  display: flex;

  align-items: center;

  gap: 20px;

  margin-top: 40px;
}

.customer img {
  width: 90px;

  height: 90px;

  border-radius: 50%;

  object-fit: cover;
}

.customer h3 {
  color: #564743;

  font-size: 1.8rem;

  margin-bottom: 6px;
}

.customer span {
  color: #999;
}
</style>

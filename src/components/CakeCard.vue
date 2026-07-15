<template>
  <div class="cake-card" @click="goToDetails">
    <div class="cake-image">
      <img :src="`${BASE_URL}${cake.imgUrl}`" :alt="cake.name" />

      <div v-if="cake.category === 'THEMED'" class="overlay">THEMED</div>
    </div>

    <div class="cake-details">
      <div v-if="cake.category === 'THEMED'" class="badge">✨ Fully Customizable</div>

      <h3>{{ cake.name }}</h3>

      <div class="freshly-baked">🎂 Freshly Baked</div>

      <p class="price">From ${{ cake.basePrice }}</p>

      <button class="details-btn" @click.stop="goToDetails">
        {{ cake.category === 'THEMED' ? 'Customize Cake' : 'View Details' }}
      </button>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/config/constants'

export default {
  props: {
    cake: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      BASE_URL,
    }
  },

  methods: {
    goToDetails() {
      // if (this.cake.category === 'THEMED') {
      //   this.$router.push(`/themed-cakes/${this.cake.id}`)
      // } else {
      //   this.$router.push(`/cakes/${this.cake.id}`)
      // }
      this.$router.push(`/cakes/${this.cake.id}`)
    },
  },
}
</script>

<style scoped>
.cake-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: 0.35s;
}

.cake-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
}

.cake-image {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.cake-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}

.cake-card:hover img {
  transform: scale(1.08);
}

/* ---------- THEMED TAG ---------- */

.overlay {
  position: absolute;
  top: 18px;
  left: 18px;
  background: #ff9800;
  color: white;
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* ---------- DETAILS ---------- */

.cake-details {
  padding: 25px;
}

.badge {
  display: inline-block;
  background: #fff7e4;
  color: #ff9800;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.cake-details h3 {
  color: #564743;
  margin-bottom: 12px;
  font-size: 1.6rem;
}

.freshly-baked {
  color: #777;
  margin-bottom: 18px;
  font-size: 0.95rem;
}

.price {
  color: #5ed3d1;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 20px;
}

/* ---------- BUTTON ---------- */

.details-btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 40px;
  background: #ffc43d;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.details-btn:hover {
  background: #5ed3d1;
  transform: translateY(-2px);
}
</style>

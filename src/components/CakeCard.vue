<template>
  <div class="cake-card" @click="goToDetails">
    <div class="cake-image">
      <img :src="`${BASE_URL}${cake.imgUrl}`" :alt="cake.name" />

      <div v-if="cake.category === 'THEMED'" class="overlay">THEMED</div>
    </div>

    <div class="cake-details">
      <div v-if="cake.category === 'THEMED'" class="badge">Fully Customizable</div>

      <h3>{{ cake.name }}</h3>

      <div class="freshly-baked">Handcrafted Daily</div>

      <p class="price">
        {{ cake.category === 'THEMED' ? `Starting at ₹${cake.basePrice}` : `₹${cake.basePrice}` }}
      </p>

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
  background: var(--white);
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 12px 35px rgba(23, 20, 20, 0.08);
  transition: all 0.35s ease;
}

.cake-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 50px rgba(23, 20, 20, 0.14);
}


.cake-image {
  position: relative;
  height: 340px;
  overflow: hidden;
}

.cake-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.cake-card:hover .cake-image img {
  transform: scale(1.06);
}

/* ===========================
      CATEGORY LABEL
=========================== */

.overlay {
  position: absolute;
  top: 18px;
  left: 18px;

  background: rgba(23, 20, 20, 0.92);

  color: white;

  padding: 8px 16px;

  border-radius: 30px;

  font-size: 0.75rem;

  font-weight: 600;

  letter-spacing: 1px;

  text-transform: uppercase;
}

/* ===========================
      CONTENT
=========================== */

.cake-details {
  padding: 22px;
}

.badge {
  display: inline-block;

  margin-bottom: 16px;

  padding: 7px 14px;

  border-radius: 30px;

  background: rgba(166, 124, 82, 0.12);

  color: var(--secondary);

  font-size: 0.8rem;

  font-weight: 600;
}

.cake-details h3 {
  color: var(--primary);

  font-size: 1.55rem;

  font-weight: 700;

  margin-bottom: 10px;
}

.freshly-baked {
  display: inline-block;
  /* margin-bottom: 14px; */

  padding: 6px 14px;

  background: #f8f5f1;

  border-radius: 30px;

  color: var(--text-light);

  font-size: 0.85rem;

  font-weight: 500;
}

.price {
  /* margin-bottom: 18px; */

  color: var(--secondary);

  font-size: 1.8rem;

  font-weight: 700;
}

/* ===========================
      BUTTON
=========================== */

.details-btn {
  width: 100%;

  padding: 15px;

  border: none;

  border-radius: 40px;

  background: var(--primary);

  color: white;

  font-size: 1rem;

  font-weight: 600;

  cursor: pointer;

  transition: all 0.3s ease;
}

.details-btn:hover {
  background: var(--secondary);
}

/* ===========================
      RESPONSIVE
=========================== */

@media (max-width: 992px) {
  .cake-image {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .cake-image {
    height: 260px;
  }

  .cake-details {
    padding: 22px;
  }

  .cake-details h3 {
    font-size: 1.35rem;
  }

  .price {
    font-size: 1.5rem;
  }
}
</style>

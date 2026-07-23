<template>
  <section class="product-info">
    <div class="section-heading">
      <p class="section-subtitle">PRODUCT DETAILS</p>

      <h2>Everything You Need to Know</h2>
    </div>

    <div class="tabs">
      <button :class="{ active: activeTab === 'description' }" @click="activeTab = 'description'">
        Description
      </button>

      <button :class="{ active: activeTab === 'ingredients' }" @click="activeTab = 'ingredients'">
        Ingredients
      </button>

      <button :class="{ active: activeTab === 'allergens' }" @click="activeTab = 'allergens'">
        Allergens
      </button>

      <button :class="{ active: activeTab === 'delivery' }" @click="activeTab = 'delivery'">
        Delivery
      </button>
    </div>

    <div class="content-card">
      <template v-if="activeTab === 'description'">
        <h3>Product Description</h3>

        <p>
          {{ cake.description }}
        </p>
      </template>

      <template v-else-if="activeTab === 'ingredients'">
        <h3>Ingredients</h3>

        <ul>
          <li>Premium Flour</li>

          <li>Fresh Eggs</li>

          <li>Fresh Dairy Cream</li>

          <li>Premium Chocolate</li>

          <li>Natural Flavours</li>
        </ul>
      </template>

      <template v-else-if="activeTab === 'allergens'">
        <h3>Allergen Information</h3>

        <p>Contains Milk, Eggs, Wheat and Soy.</p>
      </template>

      <template v-else>
        <h3>Delivery & Storage</h3>

        <ul>
          <li>Freshly baked to order.</li>

          <li>Store refrigerated.</li>

          <li>Consume within 3 days.</li>

          <li>Delivery available across Kottayam.</li>
        </ul>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    cake: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      activeTab: 'description',
    }
  },
}
</script>

<style scoped>
/*==========================
      SECTION
===========================*/

.product-info {
  width: min(92%, 1400px);

  margin: 120px auto;
}

/*==========================
      HEADER
===========================*/

.section-heading {
  text-align: center;

  margin-bottom: 50px;
}

.section-subtitle {
  color: var(--secondary);

  text-transform: uppercase;

  letter-spacing: 3px;

  font-size: 0.9rem;

  font-weight: 700;

  margin-bottom: 16px;
}

.section-heading h2 {
  color: var(--primary);

  font-size: clamp(2.3rem, 4vw, 3.5rem);
}

/*==========================
      TABS
===========================*/

.tabs {
  display: flex;

  justify-content: center;

  flex-wrap: wrap;

  gap: 16px;

  margin-bottom: 40px;
}

.tabs button {
  border: none;

  background: white;

  color: var(--primary);

  padding: 14px 28px;

  border-radius: 40px;

  cursor: pointer;

  font-weight: 600;

  transition: 0.3s;

  box-shadow: 0 8px 18px rgba(23, 20, 20, 0.06);
}

.tabs button:hover {
  background: var(--secondary);

  color: white;
}

.tabs button.active {
  background: var(--primary);

  color: white;
}

/*==========================
      CONTENT
===========================*/

.content-card {
  background: white;

  border-radius: 30px;

  padding: 45px;

  box-shadow: 0 18px 40px rgba(23, 20, 20, 0.08);

  animation: fade 0.3s;
}

.content-card h3 {
  color: var(--primary);

  margin-bottom: 20px;

  font-size: 1.7rem;
}

.content-card p {
  color: var(--text-light);

  line-height: 1.9;

  font-size: 1.05rem;
}

.content-card ul {
  padding-left: 20px;
}

.content-card li {
  margin-bottom: 14px;

  color: var(--text-light);

  line-height: 1.8;
}

/*==========================
      ANIMATION
===========================*/

@keyframes fade {
  from {
    opacity: 0;

    transform: translateY(8px);
  }

  to {
    opacity: 1;

    transform: none;
  }
}

/*==========================
      RESPONSIVE
===========================*/

@media (max-width: 768px) {
  .content-card {
    padding: 30px;
  }

  .tabs {
    justify-content: flex-start;

    overflow: auto;

    padding-bottom: 10px;
  }

  .tabs button {
    white-space: nowrap;
  }
}
</style>

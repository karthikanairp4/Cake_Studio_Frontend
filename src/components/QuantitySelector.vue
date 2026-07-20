<template>
  <div class="quantity-section">
    <div class="section-header">
      <h3>Quantity</h3>
      <p>Select how many cakes you'd like to order.</p>
    </div>

    <div class="quantity-card">
      <button class="qty-btn" @click="decrease" :disabled="modelValue <= 1">
        <i class="bi bi-dash-lg"></i>
      </button>

      <div class="quantity-value">
        {{ modelValue }}
      </div>

      <button class="qty-btn" @click="increase">
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
  },

  emits: ['update:modelValue'],

  methods: {
    increase() {
      this.$emit('update:modelValue', this.modelValue + 1)
    },

    decrease() {
      if (this.modelValue > 1) {
        this.$emit('update:modelValue', this.modelValue - 1)
      }
    },
  },
}
</script>

<style scoped>
/*==========================
      QUANTITY SECTION
===========================*/

.quantity-section {
  margin: 40px 0;
}

/*==========================
      HEADER
===========================*/

.section-header {
  margin-bottom: 18px;
}

.section-header h3 {
  color: var(--primary);

  font-size: 1.5rem;

  margin-bottom: 6px;
}

.section-header p {
  color: var(--text-light);

  font-size: 0.95rem;
}

/*==========================
      CARD
===========================*/

.quantity-card {
  display: inline-flex;

  align-items: center;

  gap: 18px;

  background: white;

  border-radius: 20px;

  padding: 12px 18px;

  box-shadow: 0 12px 30px rgba(23, 20, 20, 0.08);
}

/*==========================
      BUTTON
===========================*/

.qty-btn {
  width: 48px;

  height: 48px;

  border: none;

  border-radius: 50%;

  background: var(--primary);

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  transition: 0.3s;
}

.qty-btn:hover:not(:disabled) {
  background: var(--secondary);

  transform: translateY(-2px);
}

.qty-btn:disabled {
  background: #ddd;

  cursor: not-allowed;

  transform: none;
}

/*==========================
      VALUE
===========================*/

.quantity-value {
  min-width: 40px;

  text-align: center;

  font-size: 1.4rem;

  font-weight: 700;

  color: var(--primary);
}

/*==========================
      RESPONSIVE
===========================*/

@media (max-width: 768px) {
  .quantity-card {
    padding: 10px 16px;

    gap: 14px;
  }

  .qty-btn {
    width: 42px;

    height: 42px;
  }

  .quantity-value {
    font-size: 1.2rem;
  }
}
</style>

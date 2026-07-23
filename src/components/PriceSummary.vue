<template>
  <div class="summary-card">
    <div class="summary-header">
      <h2>Order Summary</h2>
      <p>Review your customized cake before checkout.</p>
    </div>

    <div class="summary-body">
      <div class="summary-row">
        <span>Base Cake</span>
        <span>₹{{ Number(cake.basePrice || 0).toFixed(2) }}</span>
      </div>

      <div v-if="selected.weight" class="summary-row">
        <span>Weight</span>
        <span>{{ selected.weight }}</span>
      </div>

      <div v-if="selected.sponge" class="summary-row">
        <span>{{ selected.sponge.name }}</span>
        <span>+₹{{ Number(selected.sponge.price).toFixed(2) }}</span>
      </div>

      <div v-if="selected.filling" class="summary-row">
        <span>{{ selected.filling.name }}</span>
        <span>+₹{{ Number(selected.filling.price).toFixed(2) }}</span>
      </div>

      <div v-if="selected.frosting" class="summary-row">
        <span>{{ selected.frosting.name }}</span>
        <span>+₹{{ Number(selected.frosting.price).toFixed(2) }}</span>
      </div>

      <div v-if="cake.category === 'THEMED'" class="summary-row">
        <span>Customization</span>
        <span>+	₹200.00</span>
      </div>

      <div class="summary-row">
        <span>Quantity</span>
        <span>{{ quantity }}</span>
      </div>

      <hr />

      <div class="total-row">
        <span>Total</span>

        <span class="price"> ₹{{ total.toFixed(2) }} </span>
      </div>
    </div>

    <div class="summary-note">
      <i class="bi bi-info-circle"></i>

      Final pricing includes all selected customizations.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cake: Object,
    selected: Object,
    quantity: Number,
  },

  computed: {
    total() {
      const weightMultiplier = {
        '500 g': 0.5,
        '1 Kg': 1,
        '2 Kg': 2,
        '3 Kg': 3,
        Custom: 1, // Temporary. You can change this later.
      }

      let total = Number(this.cake.basePrice || 0)

      // Calculate price based on selected weight
      const multiplier = weightMultiplier[this.selected.weight] || 1
      total *= multiplier

      // Extra charges for themed cakes
      if (this.cake.category === 'THEMED') {
        if (this.selected.sponge) total += Number(this.selected.sponge.price)

        if (this.selected.filling) total += Number(this.selected.filling.price)

        if (this.selected.frosting) total += Number(this.selected.frosting.price)

        // Decoration fee
        total += 200
      }

      // Apply quantity
      total *= this.quantity

      return total
    },
  },
}
</script>

<style scoped>
/*==========================
      SUMMARY CARD
===========================*/

.summary-card {
  background: white;

  border-radius: 28px;

  padding: 32px;

  box-shadow: 0 15px 35px rgba(23, 20, 20, 0.08);
}

/*==========================
      HEADER
===========================*/

.summary-header {
  margin-bottom: 30px;
}

.summary-header h2 {
  color: var(--primary);

  font-size: 1.8rem;

  margin-bottom: 8px;
}

.summary-header p {
  color: var(--text-light);

  line-height: 1.7;
}

/*==========================
      ROWS
===========================*/

.summary-body {
  display: flex;

  flex-direction: column;

  gap: 16px;
}

.summary-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  color: var(--text-light);

  font-size: 0.98rem;
}

.summary-row span:last-child {
  color: var(--primary);

  font-weight: 600;
}

/*==========================
      DIVIDER
===========================*/

hr {
  border: none;

  border-top: 1px solid rgba(0, 0, 0, 0.08);

  margin: 10px 0;
}

/*==========================
      TOTAL
===========================*/

.total-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-top: 5px;

  font-size: 1.2rem;

  font-weight: 700;

  color: var(--primary);
}

.price {
  color: var(--secondary);

  font-size: 2rem;
}

/*==========================
      FOOTER NOTE
===========================*/

.summary-note {
  margin-top: 28px;

  padding: 16px;

  border-radius: 16px;

  background: #faf7f4;

  color: var(--text-light);

  display: flex;

  align-items: center;

  gap: 10px;

  font-size: 0.92rem;
}

.summary-note i {
  color: var(--secondary);

  font-size: 1rem;
}

/*==========================
      RESPONSIVE
===========================*/

@media (max-width: 768px) {
  .summary-card {
    padding: 24px;
  }

  .summary-header h2 {
    font-size: 1.5rem;
  }

  .price {
    font-size: 1.8rem;
  }
}
</style>

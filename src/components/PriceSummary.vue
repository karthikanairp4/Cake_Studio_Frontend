<template>
  <div class="summary-card">
    <h2>Order Summary</h2>

    <div class="summary-row">
      <span>Base Cake</span>
      <span>${{ cake.basePrice || 0 }}</span>
    </div>

    <div v-if="selected.sponge" class="summary-row">
      <span>{{ selected.sponge.name }}</span>
      <span>+${{ selected.sponge.price }}</span>
    </div>

    <div v-if="selected.filling" class="summary-row">
      <span>{{ selected.filling.name }}</span>
      <span>+${{ selected.filling.price }}</span>
    </div>

    <div v-if="selected.frosting" class="summary-row">
      <span>{{ selected.frosting.name }}</span>
      <span>+${{ selected.frosting.price }}</span>
    </div>

    <div v-if="selected.size" class="summary-row">
      <span>{{ selected.size.name }}</span>
      <span>+${{ selected.size.price }}</span>
    </div>

    <div v-if="cake.category === 'THEMED'" class="summary-row">
      <span>Customization Fee</span>
      <span>+$10.00</span>
    </div>

    <hr />

    <div class="total">
      <span>Total</span>

      <span>${{ total.toFixed(2) }}</span>
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
        total += 10
      }

      // Apply quantity
      total *= this.quantity

      return total
    },
  },
}
</script>

<style scoped>
.summary-card {
  background: white;

  border-radius: 20px;

  padding: 30px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);

  top: 100px;
}

.summary-card h2 {
  margin-bottom: 25px;

  color: #564743;
}

.summary-row {
  display: flex;

  justify-content: space-between;

  margin-bottom: 18px;

  color: #666;
}

hr {
  margin: 25px 0;

  border: none;

  border-top: 1px solid #eee;
}

.total {
  display: flex;

  justify-content: space-between;

  font-size: 1.3rem;

  font-weight: bold;

  color: #564743;
}
</style>

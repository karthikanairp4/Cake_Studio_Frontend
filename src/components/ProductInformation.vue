<template>
  <section class="product-info">
    <div class="info-box">
      <h2>Description</h2>

      <p>
        {{ cake.description }}
      </p>
    </div>

    <div class="info-box">
      <h2>Ingredients</h2>

      <ul>
        <li>Premium Flour</li>
        <li>Fresh Eggs</li>
        <li>Fresh Dairy Cream</li>
        <li>Premium Chocolate</li>
        <li>Natural Flavours</li>
      </ul>
    </div>

    <div class="info-box">
      <h2>Allergens</h2>

      <p>Contains Milk, Eggs, Wheat and Soy.</p>
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
}
</script>

<style scoped>
.product-info {
  width: 90%;

  max-width: 1400px;

  margin: 80px auto;

  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 30px;
}

.info-box {
  background: #fff8e8;

  border-radius: 20px;

  padding: 35px;

  transition: 0.3s;
}

.info-box:hover {
  transform: translateY(-5px);

  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
}

.info-box h2 {
  color: #564743;

  margin-bottom: 20px;
}

.info-box p,
.info-box li {
  color: #666;

  line-height: 1.8;
}

.info-box ul {
  padding-left: 20px;
}

@media (max-width: 900px) {
  .product-info {
    grid-template-columns: 1fr;
  }
}
</style>

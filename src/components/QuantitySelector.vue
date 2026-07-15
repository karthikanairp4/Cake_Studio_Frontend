<template>
  <div class="quantity-section">
    <h3>Quantity</h3>

    <div class="quantity-box">
      <button @click="decrease">−</button>

      <span>{{ modelValue }}</span>

      <button @click="increase">+</button>
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
.quantity-section {
  margin-top: 30px;
}

.quantity-section h3 {
  color: #564743;
  margin-bottom: 15px;
}

.quantity-box {
  display: flex;
  align-items: center;
  gap: 20px;
}

.quantity-box button {
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  background: #ffc43d;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  transition: 0.3s;
}

.quantity-box button:hover {
  background: #5ed3d1;
}

.quantity-box span {
  font-size: 1.3rem;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}
</style>

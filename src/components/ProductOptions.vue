<template>
  <div class="options-card">
    <!-- CLASSIC CAKE -->

    <template v-if="cake.category === 'CLASSIC'">
      <div class="option">
        <label>Weight</label>

        <select v-model="selected.weight">
          <option v-for="weight in weights" :key="weight" :value="weight">
            {{ weight }}
          </option>
        </select>
      </div>
    </template>

    <!-- THEMED CAKE -->

    <template v-else>
      <div class="option">
        <label>Sponge</label>

        <select v-model="selected.sponge">
          <option disabled value="">Select Sponge</option>

          <option v-for="item in sponges" :key="item.id" :value="item">
            {{ item.name }} (+${{ item.price }})
          </option>
        </select>
      </div>

      <div class="option">
        <label>Filling</label>

        <select v-model="selected.filling">
          <option disabled value="">Select Filling</option>

          <option v-for="item in fillings" :key="item.id" :value="item">
            {{ item.name }} (+${{ item.price }})
          </option>
        </select>
      </div>

      <div class="option">
        <label>Frosting</label>

        <select v-model="selected.frosting">
          <option disabled value="">Select Frosting</option>

          <option v-for="item in frostings" :key="item.id" :value="item">
            {{ item.name }} (+${{ item.price }})
          </option>
        </select>
      </div>
      <div class="option">
        <label>Weight</label>

        <select v-model="selected.weight">
          <option v-for="weight in weights" :key="weight" :value="weight">
            {{ weight }}
          </option>
        </select>
      </div>
    </template>

    <!-- COMMON -->

    <div class="option">
      <label>Cake Message</label>

      <input
        type="text"
        maxlength="40"
        placeholder="Happy Birthday John"
        v-model="selected.message"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cake: Object,

    sponges: Array,

    fillings: Array,

    frostings: Array,

    modelValue: Object,
  },

  emits: ['update:modelValue'],

  computed: {
    selected: {
      get() {
        return this.modelValue
      },

      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },

  data() {
    return {
      weights: ['500 g', '1 Kg', '2 Kg', '3 Kg', 'Custom'],
    }
  },
}
</script>

<style scoped>
.options-card {
  background: white;

  padding: 35px;

  border-radius: 20px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.option {
  margin-bottom: 25px;
}

.option:last-child {
  margin-bottom: 0;
}

label {
  display: block;

  margin-bottom: 10px;

  font-weight: 600;

  color: #564743;
}

select,
input {
  width: 100%;

  padding: 15px;

  border-radius: 10px;

  border: 1px solid #ddd;

  font-size: 1rem;

  transition: 0.3s;
}

select:focus,
input:focus {
  outline: none;

  border-color: #5ed3d1;

  box-shadow: 0 0 10px rgba(94, 211, 209, 0.2);
}
</style>

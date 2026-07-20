<template>
  <div class="options-card">
    <div class="section-title">
      <h3>Customize Your Cake</h3>
      <p>Choose your preferred options before adding to your cart.</p>
    </div>

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
          <option disabled value="">Choose Sponge</option>

          <option v-for="item in sponges" :key="item.id" :value="item">
            {{ item.name }} (+${{ Number(item.price).toFixed(2) }})
          </option>
        </select>
      </div>

      <div class="option">
        <label>Filling</label>

        <select v-model="selected.filling">
          <option disabled value="">Choose Filling</option>

          <option v-for="item in fillings" :key="item.id" :value="item">
            {{ item.name }} (+${{ Number(item.price).toFixed(2) }})
          </option>
        </select>
      </div>

      <div class="option">
        <label>Frosting</label>

        <select v-model="selected.frosting">
          <option disabled value="">Choose Frosting</option>

          <option v-for="item in frostings" :key="item.id" :value="item">
            {{ item.name }} (+${{ Number(item.price).toFixed(2) }})
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

    <!-- MESSAGE -->

    <div class="option">
      <label>Cake Message</label>

      <input
        type="text"
        maxlength="40"
        placeholder="Happy Birthday Emma"
        v-model="selected.message"
      />

      <small>{{ selected.message.length }}/40 characters</small>
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
/*==========================
      OPTIONS CARD
===========================*/

.options-card {
  background: white;

  border-radius: 28px;

  padding: 35px;

  box-shadow: 0 15px 35px rgba(23, 20, 20, 0.08);
}

/*==========================
      TITLE
===========================*/

.section-title {
  margin-bottom: 35px;
}

.section-title h3 {
  color: var(--primary);

  font-size: 1.7rem;

  margin-bottom: 8px;
}

.section-title p {
  color: var(--text-light);

  line-height: 1.7;
}

/*==========================
      OPTION
===========================*/

.option {
  margin-bottom: 28px;
}

.option:last-child {
  margin-bottom: 0;
}

/*==========================
      LABEL
===========================*/

label {
  display: block;

  margin-bottom: 10px;

  font-weight: 600;

  color: var(--primary);
}

/*==========================
      INPUTS
===========================*/

select,
input {
  width: 100%;

  padding: 16px 18px;

  background: #faf7f4;

  border: 1px solid rgba(0, 0, 0, 0.08);

  border-radius: 14px;

  font-size: 1rem;

  transition: 0.3s;

  color: var(--primary);
}

select {
  cursor: pointer;
}

select:focus,
input:focus {
  outline: none;

  border-color: var(--secondary);

  box-shadow: 0 0 0 4px rgba(209, 170, 103, 0.15);
}

/*==========================
      PLACEHOLDER
===========================*/

input::placeholder {
  color: #999;
}

/*==========================
      SMALL TEXT
===========================*/

small {
  display: block;

  margin-top: 8px;

  color: var(--text-light);

  font-size: 0.85rem;
}

/*==========================
      RESPONSIVE
===========================*/

@media (max-width: 768px) {
  .options-card {
    padding: 25px;
  }

  .section-title h3 {
    font-size: 1.5rem;
  }
}
</style>

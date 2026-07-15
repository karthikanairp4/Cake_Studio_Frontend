<template>
  <div class="overlay">
    <div class="modal" v-if="editedItem">
      <!-- Header -->
      <div class="header">
        <h2>Edit Cart Item</h2>

        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <!-- Cake -->
      <div class="cake-info">
        <img :src="`${BASE_URL}${editedItem.cake.imgUrl}`" :alt="editedItem.cake.name" />

        <div class="cake-details">
          <h3>{{ editedItem.cake.name }}</h3>

          <p class="base-price">
            Base Price
            <strong>${{ editedItem.cake.basePrice.toFixed(2) }}</strong>
          </p>
        </div>
      </div>

      <!-- Form -->

      <div class="form">
        <!-- Weight -->

        <div class="form-group">
          <label>Weight</label>

          <select v-model="selectedOptions.weight">
            <option v-for="weight in weights" :key="weight" :value="weight">
              {{ weight }}
            </option>
          </select>
        </div>

        <!-- Theme Options -->

        <template v-if="editedItem.cake.category === 'THEMED'">
          <div class="form-group">
            <label>Sponge</label>

            <select v-model="selectedOptions.sponge">
              <option v-for="item in options.sponges" :key="item.id" :value="item">
                {{ item.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Filling</label>

            <select v-model="selectedOptions.filling">
              <option :value="null">No Filling</option>

              <option v-for="item in options.fillings" :key="item.id" :value="item">
                {{ item.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Frosting</label>

            <select v-model="selectedOptions.frosting">
              <option v-for="item in options.frostings" :key="item.id" :value="item">
                {{ item.name }}
              </option>
            </select>
          </div>
        </template>

        <!-- Message -->

        <div class="form-group">
          <label>Message</label>

          <textarea
            rows="3"
            maxlength="40"
            placeholder="Happy Birthday..."
            v-model="selectedOptions.message"
          />
        </div>

        <!-- Quantity -->

        <div class="form-group">
          <label>Quantity</label>

          <div class="qty-wrapper">
            <button class="qty-btn" @click="decrease">−</button>

            <span class="qty-value">
              {{ quantity }}
            </span>

            <button class="qty-btn" @click="increase">+</button>
          </div>
        </div>
      </div>

      <!-- Summary -->

      <div class="summary">
        <div class="summary-row">
          <span>Estimated Total</span>

          <strong> ${{ totalPrice.toFixed(2) }} </strong>
        </div>
      </div>

      <!-- Footer -->

      <div class="footer-buttons">
        <button class="cancel-btn" @click="$emit('close')">Cancel</button>

        <button class="save-btn" @click="save">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/config/constants'
import { getAllCakeOptions } from '@/services/cakeBuilderService'
import { updateCart } from '@/services/cartService'

export default {
  props: {
    item: Object,
  },

  emits: ['close', 'updated'],

  data() {
    return {
      BASE_URL,

      editedItem: null,

      quantity: 1,

      weights: ['500 g', '1 Kg', '2 Kg', '3 Kg'],

      options: {
        sponges: [],
        fillings: [],
        frostings: [],
      },

      selectedOptions: {
        weight: '1 Kg',
        sponge: null,
        filling: null,
        frosting: null,
        message: '',
      },

      weightMap: {
        '500 g': 0.5,
        '1 Kg': 1,
        '2 Kg': 2,
        '3 Kg': 3,
      },
    }
  },

  watch: {
    item: {
      immediate: true,

      async handler(item) {
        if (!item) return

        this.editedItem = JSON.parse(JSON.stringify(item))

        this.quantity = item.quantity

        this.selectedOptions.weight = this.getWeightLabel(item.weight)

        this.selectedOptions.sponge = item.sponge

        this.selectedOptions.filling = item.filling

        this.selectedOptions.frosting = item.frosting

        this.selectedOptions.message = item.message || ''

        if (item.cake.category === 'THEMED') {
          this.options = await getAllCakeOptions()
        }
      },
    },
  },

  computed: {
    totalPrice() {
      if (!this.editedItem) return 0

      let total = this.editedItem.cake.basePrice * this.weightMap[this.selectedOptions.weight]

      if (this.selectedOptions.sponge) total += this.selectedOptions.sponge.price

      if (this.selectedOptions.filling) total += this.selectedOptions.filling.price

      if (this.selectedOptions.frosting) total += this.selectedOptions.frosting.price

      if (this.editedItem.cake.category === 'THEMED') total += 10

      return total * this.quantity
    },
  },

  methods: {
    increase() {
      this.quantity++
    },

    decrease() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },

    getWeightLabel(weight) {
      switch (weight) {
        case 0.5:
          return '500 g'
        case 1:
          return '1 Kg'
        case 2:
          return '2 Kg'
        case 3:
          return '3 Kg'
        default:
          return '1 Kg'
      }
    },

    async save() {
      try {
        const dto = {
          quantity: this.quantity,
          weight: this.weightMap[this.selectedOptions.weight],
          message: this.selectedOptions.message,
          sponge_id: this.selectedOptions.sponge?.id ?? null,
          filling_id: this.selectedOptions.filling?.id ?? null,
          frosting_id: this.selectedOptions.frosting?.id ?? null,
        }

        await updateCart(this.editedItem.id, dto)

        this.$emit('updated')
        this.$emit('close')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

.modal {
  width: 600px;
  max-height: 90vh;

  overflow-y: auto;

  background: #fff;

  border-radius: 18px;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);

  animation: popup 0.25s ease;
}

@keyframes popup {
  from {
    opacity: 0;
    transform: translateY(25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 22px 28px;

  border-bottom: 1px solid #ececec;

  position: sticky;
  top: 0;

  background: white;
  z-index: 10;
}

.header h2 {
  margin: 0;

  color: #564743;

  font-size: 1.5rem;
}

.close-btn {
  width: 38px;
  height: 38px;

  border: none;

  border-radius: 50%;

  background: #f5f5f5;

  font-size: 20px;

  cursor: pointer;

  transition: 0.25s;
}

.close-btn:hover {
  background: #ececec;
}

/* Cake */

.cake-info {
  display: flex;

  gap: 20px;

  align-items: center;

  padding: 25px 28px;
}

.cake-info img {
  width: 100px;
  height: 100px;

  object-fit: cover;

  border-radius: 12px;

  border: 1px solid #eee;
}

.cake-details h3 {
  margin: 0;

  color: #564743;
}

.base-price {
  margin-top: 10px;

  color: #777;
}

.base-price strong {
  color: #5ed3d1;

  font-size: 1.2rem;
}

/* Form */

.form {
  padding: 0 28px 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;

  margin-bottom: 8px;

  font-weight: 600;

  color: #564743;
}

select,
input,
textarea {
  width: 100%;

  padding: 12px 14px;

  border: 1px solid #ddd;

  border-radius: 10px;

  font-size: 15px;

  transition: 0.25s;

  box-sizing: border-box;
}

textarea {
  resize: none;
}

select:focus,
input:focus,
textarea:focus {
  outline: none;

  border-color: #5ed3d1;

  box-shadow: 0 0 0 3px rgba(94, 211, 209, 0.15);
}

/* Quantity */

.qty-wrapper {
  display: inline-flex;

  align-items: center;

  border: 1px solid #ddd;

  border-radius: 50px;

  overflow: hidden;
}

.qty-btn {
  width: 44px;
  height: 44px;

  border: none;

  background: #5ed3d1;

  color: white;

  font-size: 20px;

  cursor: pointer;

  transition: 0.25s;
}

.qty-btn:hover {
  background: #42bebc;
}

.qty-value {
  width: 60px;

  text-align: center;

  font-size: 18px;

  font-weight: 600;
}

/* Summary */

.summary {
  margin: 10px 28px 20px;

  background: #fafafa;

  border: 1px solid #ececec;

  border-radius: 12px;

  padding: 18px 22px;
}

.summary-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  font-size: 18px;
}

.summary-row strong {
  color: #5ed3d1;

  font-size: 24px;
}

/* Footer */

.footer-buttons {
  position: sticky;

  bottom: 0;

  background: white;

  padding: 22px 28px;

  border-top: 1px solid #ececec;

  display: flex;

  justify-content: flex-end;

  gap: 15px;
}

.cancel-btn,
.save-btn {
  padding: 13px 28px;

  border: none;

  border-radius: 30px;

  cursor: pointer;

  font-size: 15px;

  transition: 0.25s;
}

.cancel-btn {
  background: #ececec;
}

.cancel-btn:hover {
  background: #d9d9d9;
}

.save-btn {
  background: #5ed3d1;

  color: white;
}

.save-btn:hover {
  background: #43b9b7;
}

/* Scrollbar */

.modal::-webkit-scrollbar {
  width: 8px;
}

.modal::-webkit-scrollbar-thumb {
  background: #d5d5d5;

  border-radius: 20px;
}
</style>

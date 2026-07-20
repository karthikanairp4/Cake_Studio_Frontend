<template>
  <div class="overlay" v-if="editedItem">
    <div class="modal">
      <!-- Header -->

      <div class="header">
        <div>
          <p class="subtitle">Edit Your Cake</p>
          <h2>{{ editedItem.cake.name }}</h2>
        </div>

        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <!-- Body -->

      <div class="body">
        <!-- LEFT COLUMN -->

        <div class="left-column">
          <div class="cake-image-card">
            <img :src="`${BASE_URL}${editedItem.cake.imgUrl}`" :alt="editedItem.cake.name" />
          </div>

          <div class="price-card">
            <span>Base Price</span>

            <h3>${{ editedItem.cake.basePrice.toFixed(2) }}</h3>

            <small> Before customizations </small>
          </div>

          <div class="summary-card">
            <h4>Estimated Total</h4>

            <div class="summary-price">${{ totalPrice.toFixed(2) }}</div>

            <small> Including selected customizations </small>
          </div>
        </div>

        <!-- RIGHT COLUMN -->

        <div class="right-column">
          <!-- Weight -->

          <div class="form-group">
            <label>Weight</label>

            <select v-model="selectedOptions.weight">
              <option v-for="weight in weights" :key="weight" :value="weight">
                {{ weight }}
              </option>
            </select>
          </div>

          <!-- Sponge -->

          <template v-if="editedItem.cake.category === 'THEMED'">
            <div class="form-group">
              <label>Sponge</label>

              <select v-model="selectedOptions.sponge">
                <option v-for="item in options.sponges" :key="item.id" :value="item">
                  {{ item.name }}
                </option>
              </select>
            </div>

            <!-- Filling -->

            <div class="form-group">
              <label>Filling</label>

              <select v-model="selectedOptions.filling">
                <option :value="null">No Filling</option>

                <option v-for="item in options.fillings" :key="item.id" :value="item">
                  {{ item.name }}
                </option>
              </select>
            </div>

            <!-- Frosting -->

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
            <label>Message on Cake</label>

            <textarea
              rows="4"
              maxlength="40"
              placeholder="Happy Birthday..."
              v-model="selectedOptions.message"
            />
          </div>

          <!-- Quantity -->

          <div class="form-group">
            <label>Quantity</label>

            <div class="quantity-box">
              <button class="qty-btn" @click="decrease">−</button>

              <span class="qty-value">
                {{ quantity }}
              </span>

              <button class="qty-btn" @click="increase">+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->

      <div class="footer">
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

        this.selectedOptions.message = item.message || ''

        if (item.cake.category === 'THEMED') {
          this.options = await getAllCakeOptions()

          this.selectedOptions.sponge =
            this.options.sponges.find((s) => s.id === item.sponge?.id) ?? null

          this.selectedOptions.filling =
            this.options.fillings.find((f) => f.id === item.filling?.id) ?? null

          this.selectedOptions.frosting =
            this.options.frostings.find((f) => f.id === item.frosting?.id) ?? null
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
  background: rgba(23, 20, 20, 0.45);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;

  backdrop-filter: blur(4px);
}

/* Modal */

.modal {
  width: 760px;
  max-width: 95vw;
  max-height: 92vh;

  overflow-y: auto;

  background: var(--white);

  border-radius: 26px;

  box-shadow: 0 30px 70px rgba(23, 20, 20, 0.15);

  animation: popup 0.25s ease;
}

@keyframes popup {
  from {
    opacity: 0;
    transform: translateY(30px);
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

  padding: 28px 32px;

  border-bottom: 1px solid #eee;
}

.subtitle {
  margin: 0;

  font-size: 0.8rem;

  text-transform: uppercase;

  letter-spacing: 2px;

  color: var(--secondary);

  font-weight: 600;
}

.header h2 {
  margin: 6px 0 0;

  color: var(--primary);

  font-size: 2rem;
}

.close-btn {
  width: 42px;
  height: 42px;

  border: none;

  border-radius: 50%;

  background: #f5f5f5;

  cursor: pointer;

  transition: 0.25s;
}

.close-btn:hover {
  background: var(--secondary);

  color: white;
}

/* Body */

.body {
  display: grid;

  grid-template-columns: 280px 1fr;

  gap: 35px;

  padding: 32px;
}

/* Left */

.left-column {
  display: flex;
  flex-direction: column;

  gap: 22px;
}

.cake-image-card {
  background: var(--background);

  padding: 20px;

  border-radius: 22px;
}

.cake-image-card img {
  width: 100%;
  border-radius: 18px;

  display: block;
}

.price-card,
.summary-card {
  background: var(--background);

  border-radius: 20px;

  padding: 20px;
}

.price-card span,
.summary-card h4 {
  color: var(--text-light);

  margin: 0;
}

.price-card h3 {
  margin: 10px 0;

  color: var(--secondary);

  font-size: 2rem;
}

.summary-price {
  margin: 12px 0;

  font-size: 2.4rem;

  font-weight: bold;

  color: var(--secondary);
}

.summary-card small,
.price-card small {
  color: var(--text-light);
}

/* Right */

.right-column {
  display: flex;

  flex-direction: column;

  gap: 20px;
}

.form-group label {
  display: block;

  margin-bottom: 8px;

  color: var(--primary);

  font-weight: 600;
}

select,
textarea {
  width: 100%;

  padding: 14px 16px;

  border-radius: 14px;

  border: 1px solid #ddd;

  font-size: 15px;

  background: white;

  transition: 0.25s;

  box-sizing: border-box;
}

textarea {
  resize: none;
}

select:focus,
textarea:focus {
  outline: none;

  border-color: var(--secondary);

  box-shadow: 0 0 0 4px rgba(209, 170, 103, 0.15);
}

/* Quantity */

.quantity-box {
  display: inline-flex;

  align-items: center;

  border: 1px solid #ddd;

  border-radius: 999px;

  overflow: hidden;
}

.qty-btn {
  width: 46px;
  height: 46px;

  border: none;

  background: white;

  color: var(--secondary);

  font-size: 22px;

  cursor: pointer;

  transition: 0.25s;
}

.qty-btn:hover {
  background: var(--secondary);

  color: white;
}

.qty-value {
  width: 70px;

  text-align: center;

  font-size: 18px;

  font-weight: bold;

  color: var(--primary);
}

/* Footer */

.footer {
  display: flex;

  justify-content: flex-end;

  gap: 15px;

  padding: 28px 32px;

  border-top: 1px solid #eee;
}

.cancel-btn,
.save-btn {
  height: 52px;

  padding: 0 30px;

  border-radius: 999px;

  cursor: pointer;

  transition: 0.25s;

  font-size: 0.95rem;

  font-weight: 600;
}

.cancel-btn {
  border: 1px solid var(--secondary);

  background: white;

  color: var(--secondary);
}

.cancel-btn:hover {
  background: var(--secondary);

  color: white;
}

.save-btn {
  border: none;

  background: var(--secondary);

  color: white;
}

.save-btn:hover {
  background: var(--secondary-hover);
}

/* Scrollbar */

.modal::-webkit-scrollbar {
  width: 8px;
}

.modal::-webkit-scrollbar-thumb {
  background: #d5d5d5;

  border-radius: 20px;
}

/* Mobile */

@media (max-width: 768px) {
  .modal {
    width: 95%;
  }

  .body {
    grid-template-columns: 1fr;
  }

  .footer {
    flex-direction: column;
  }

  .cancel-btn,
  .save-btn {
    width: 100%;
  }
}
</style>

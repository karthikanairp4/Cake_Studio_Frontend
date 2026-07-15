<template>
  <div class="cart-item">
    <img :src="`${BASE_URL}${item.cake.imgUrl}`" :alt="item.cake.name" class="cake-image" />

    <div class="details">
      <h3>{{ item.cake.name }}</h3>

      <p class="weight">
        {{ formatWeight(item.weight) }}
        • Qty {{ item.quantity }}
      </p>

      <div v-if="item.sponge || item.filling || item.frosting" class="customization">
        <small>Customization</small>

        <p v-if="item.sponge">
          {{ item.sponge.name }}
        </p>

        <p v-if="item.filling">
          {{ item.filling.name }}
        </p>

        <p v-if="item.frosting">
          {{ item.frosting.name }}
        </p>
      </div>

      <p v-if="item.message" class="message">"{{ item.message }}"</p>

      <div class="bottom">
        <h4>${{ calculatePrice(item).toFixed(2) }}</h4>

        <div class="buttons">
          <button class="edit" @click="showEdit = true">Edit</button>

          <button class="remove" @click="remove">Remove</button>
        </div>
      </div>
    </div>

    <EditCartModal v-if="showEdit" :item="item" @close="showEdit = false" @updated="updated" />
  </div>
</template>

<script>
import { BASE_URL } from '@/config/constants'

import { removeItem } from '@/services/cartService'

import EditCartModal from '@/modal/EditCartModal.vue'

export default {
  components: {
    EditCartModal,
  },

  props: {
    item: Object,
  },

  emits: ['removed', 'updated'],

  data() {
    return {
      BASE_URL,

      showEdit: false,
    }
  },

  methods: {
    calculatePrice(item) {
      let total = item.cake.basePrice * item.weight

      if (item.sponge) total += item.sponge.price

      if (item.filling) total += item.filling.price

      if (item.frosting) total += item.frosting.price

      if (item.cake.category === 'THEMED') total += 10

      return total * item.quantity
    },

    formatWeight(weight) {
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
          return weight + ' Kg'
      }
    },

    async remove() {
      try {
        await removeItem(this.item.id)

        this.$emit('removed')
      } catch (error) {
        console.log(error)
      }
    },

    updated() {
      this.showEdit = false

      this.$emit('updated')
    },
  },
}
</script>

<style scoped>
.cart-item {
  display: flex;

  gap: 18px;

  padding: 20px 0;

  border-bottom: 1px solid #eee;
}

.cake-image {
  width: 90px;

  height: 90px;

  object-fit: cover;

  border-radius: 12px;
}

.details {
  flex: 1;
}

.details h3 {
  margin: 0;

  color: #564743;

  font-size: 20px;
}

.weight {
  margin: 10px 0;

  color: #666;

  font-size: 14px;
}

.customization {
  margin-top: 10px;
}

.customization small {
  color: #5ed3d1;

  font-weight: 600;
}

.customization p {
  margin: 4px 0;

  font-size: 14px;

  color: #666;
}

.message {
  margin-top: 12px;

  color: #888;

  font-style: italic;
}

.bottom {
  margin-top: 18px;

  display: flex;

  justify-content: space-between;

  align-items: center;
}

.bottom h4 {
  margin: 0;

  color: #5ed3d1;

  font-size: 22px;
}

.buttons {
  display: flex;

  gap: 10px;
}

.edit {
  background: #5ed3d1;

  color: white;

  border: none;

  padding: 8px 16px;

  border-radius: 20px;

  cursor: pointer;
}

.remove {
  background: #ff6b6b;

  color: white;

  border: none;

  padding: 8px 16px;

  border-radius: 20px;

  cursor: pointer;
}

.edit:hover {
  background: #49c2bf;
}

.remove:hover {
  background: #ff4f4f;
}
</style>

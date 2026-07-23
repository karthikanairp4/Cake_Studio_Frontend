<template>
  <div class="cart-item">
    <div class="details">
      <div class="top">
        <div>
          <h3>{{ item.cake.name }}</h3>

          <p class="weight">
            {{ formatWeight(item.weight) }}

            • Quantity {{ item.quantity }}
          </p>
        </div>

        <h2 class="price">₹{{ calculatePrice(item).toFixed(2) }}</h2>
      </div>

      <div
        v-if="item.sponge || item.filling || item.frosting || item.toppings?.length || item.message"
        class="customization"
      >
        <span class="badge"> Customizations </span>

        <div class="ingredients">
          <div v-if="item.sponge" class="ingredient">
            <i class="bi bi-check-circle-fill"></i>
            <span>Sponge: {{ item.sponge.name }}</span>
          </div>

          <div v-if="item.filling" class="ingredient">
            <i class="bi bi-check-circle-fill"></i>
            <span>Filling: {{ item.filling.name }}</span>
          </div>
          <div v-if="item.frosting" class="ingredient">
            <i class="bi bi-check-circle-fill"></i>
            <span>Frosting: {{ item.frosting.name }}</span>
          </div>

          <div v-for="topping in item.toppings" :key="topping.id" class="ingredient">
            <i class="bi bi-check-circle-fill"></i>
            <span>Topping: {{ topping.name }}</span>
          </div>

          <div v-if="item.message" class="ingredient">
            <i class="bi bi-chat-left-text-fill"></i>
            <span>{{ item.message }}</span>
          </div>
        </div>
      </div>

      <div v-if="item.message" class="message">
        <i class="bi bi-chat-left-text"></i>

        "{{ item.message }}"
      </div>

      <div class="actions">
        <button class="edit" @click="showEdit = true">
          <i class="bi bi-pencil"></i>

          Edit
        </button>

        <button class="remove" @click="remove">
          <i class="bi bi-trash"></i>

          Remove
        </button>
      </div>
    </div>

    <EditCartModal v-if="showEdit" :item="item" @close="showEdit = false" @updated="updated" />
  </div>
</template>

<script>
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
      showEdit: false,
    }
  },

  methods: {
    calculatePrice(item) {
      let total = item.cake.basePrice * item.weight

      if (item.sponge) total += item.sponge.price

      if (item.filling) total += item.filling.price

      if (item.frosting) total += item.frosting.price

      if (item.cake.category === 'THEMED') total += 200

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
/*==========================
      CART ITEM
===========================*/

.cart-item {
  background: white;
  padding: 24px;
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(23, 20, 20, 0.08);
  margin-bottom: 18px;
}

/*==========================
      DETAILS
===========================*/

.details {
  flex: 1;
}

.top {
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: 20px;
}

.details h3 {
  color: var(--primary);

  font-size: 1.7rem;

  margin-bottom: 8px;
}

.weight {
  color: var(--text-light);
}

.price {
  color: var(--secondary);

  font-size: 2rem;
}

/*==========================
      CUSTOMIZATION
===========================*/

.customization {
  margin-top: 25px;
}

.badge {
  display: inline-block;

  color: var(--secondary);

  font-weight: 700;

  margin-bottom: 12px;
}

.chips {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;
}

.chip {
  background: #faf7f4;

  border: 1px solid rgba(0, 0, 0, 0.08);

  border-radius: 40px;

  padding: 8px 16px;

  color: var(--primary);

  font-size: 0.9rem;
}

/*==========================
      MESSAGE
===========================*/

.message {
  margin-top: 20px;

  display: flex;

  align-items: center;

  gap: 10px;

  background: #faf7f4;

  padding: 14px 18px;

  border-radius: 16px;

  color: var(--text-light);

  font-style: italic;
}

.message i {
  color: var(--secondary);
}

/*==========================
      ACTIONS
===========================*/

.actions {
  margin-top: 25px;

  display: flex;

  gap: 15px;
}

.actions button {
  border: none;

  border-radius: 40px;

  padding: 12px 22px;

  cursor: pointer;

  font-weight: 600;

  display: flex;

  align-items: center;

  gap: 8px;

  transition: 0.3s;
}

.edit {
  background: var(--primary);

  color: white;
}

.edit:hover {
  background: var(--secondary);
}

.remove {
  background: #d9534f;

  color: white;
}

.remove:hover {
  background: #b52d2a;
}

/*==========================
      RESPONSIVE
===========================*/

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
  }

  .cake-image {
    width: 100%;

    height: 260px;
  }

  .top {
    flex-direction: column;
  }

  .price {
    font-size: 1.8rem;
  }

  .actions {
    flex-direction: column;
  }

  .actions button {
    width: 100%;

    justify-content: center;
  }
}
</style>

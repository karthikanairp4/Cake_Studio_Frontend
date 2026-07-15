<template>
  <div>
    <div id="payment-element"></div>

    <button @click="pay" :disabled="loading">
      {{ loading ? 'Processing...' : 'Pay Now' }}
    </button>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
import { createPaymentIntent, createBuyNowPaymentIntent } from '@/services/checkout'
import { STRIPE_PUB_KEY } from '@/config/constants'

const stripePromise = loadStripe(STRIPE_PUB_KEY)

export default {
  emits: ['payment-success'],
  props: {
    buyNowItem: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      stripe: null,
      elements: null,
      loading: false,
    }
  },

  async mounted() {
    this.stripe = await stripePromise
    // const payment = await createPaymentIntent()
    let payment
    if (this.buyNowItem) {
      payment = await createBuyNowPaymentIntent(this.buyNowItem)
    } else {
      payment = await createPaymentIntent()
    }
    this.elements = this.stripe.elements({
      clientSecret: payment.clientSecret,
    })

    const paymentElement = this.elements.create('payment')
    paymentElement.mount('#payment-element')
  },
  methods: {
    async pay() {
      this.loading = true
      try {
        const { error, paymentIntent } = await this.stripe.confirmPayment({
          elements: this.elements,
          redirect: 'if_required',
        })
        if (error) {
          alert(error.message)
          return
        }
        if (paymentIntent?.status === 'succeeded') {
          this.$emit('payment-success')
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

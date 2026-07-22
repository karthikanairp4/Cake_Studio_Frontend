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

// const stripePromise = loadStripe(STRIPE_PUB_KEY)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default {
  emits: ['payment-success'],
  // props: {
  //   buyNowItem: {
  //     type: Object,
  //     default: null,
  //   },
  // },
  data() {
    return {
      stripe: null,
      elements: null,
      loading: false,
    }
  },

  async mounted() {
    console.log('StripePayment mounted')
    const mode = sessionStorage.getItem('checkoutMode')
    console.log('mode:', mode)
    this.stripe = await stripePromise
    // const payment = await createPaymentIntent()
    let payment
    if (mode === 'BUY_NOW') {
      const buyNowItem = JSON.parse(sessionStorage.getItem('buyNow'))
      console.log('Sending to backend:', buyNowItem)
      payment = await createBuyNowPaymentIntent(buyNowItem)
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

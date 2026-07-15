<template>
  <div>Signing you in...</div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

export default {
  mounted() {
    const auth = useAuthStore()

    auth.login({
      token: this.$route.query.token,
      userId: Number(this.$route.query.userId),
      email: this.$route.query.email,
    })

    this.$router.push('/')
  },
}
</script>
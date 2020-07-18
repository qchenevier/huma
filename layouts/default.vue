<template>
  <div>
    <huma-navbar />
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import HumaNavbar from '~/components/huma-navbar.vue'

export default {
  components: {
    HumaNavbar,
  },
}
</script>

<template>
  <div class="columns is-multiline is-gapless">
    <div class="column is-4" v-for="post in posts" :key="post.date">
      <huma-post-card :post="post" />
    </div>
  </div>
</template>

<script>
import HumaPostCard from '~/components/huma-post-card.vue'

export default {
  props: ['posts'],
  components: {
    HumaPostCard,
  },
}
</script>

<style scoped>
.columns {
  margin: 10px;
}
</style>

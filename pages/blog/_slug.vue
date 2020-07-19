<template>
  <div class="columns is-multiline is-centered is-gapless">
    <div class="column is-4">
      <huma-post-card class="post-side" :post="post" />
    </div>
    <div class="column is-8">
      <nuxt-content class="post content is-medium" :document="post" />
    </div>
  </div>
</template>

<script>
import HumaPostCard from '~/components/huma-post-card.vue'

export default {
  components: {
    HumaPostCard,
  },
  async asyncData({ $content, params }) {
    const post = await $content(`blog/${params.slug}`).fetch()
    return { post }
  },
}
</script>

<style scoped>
.columns,
.post-side,
.post,
.comments {
  margin: 10px;
}
</style>

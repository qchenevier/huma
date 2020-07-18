<template>
  <div class="columns is-multiline is-centered is-gapless">
    <div class="column is-4">
      <huma-post-card class="post-side" :post="post" />
    </div>
    <div class="column is-8">
      <vue-markdown class="post content is-medium">
        {{ post.body }}
      </vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import HumaPostCard from '~/components/huma-post-card.vue'

export default {
  components: {
    HumaPostCard,
    VueMarkdown,
  },
  async asyncData({ params }) {
    let post = await import('~/content/posts/' + params.slug + '.json')
    post._path = params.slug
    return {
      post: post,
    }
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

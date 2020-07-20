<template>
  <div class="columns is-multiline is-centered is-gapless">
    <div class="column is-10">
      <huma-post-card class="post-side" :post="post" />
    </div>
    <article class="column is-10">
      <nuxt-content class="content" :document="post" />
    </article>
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

<style>
.nuxt-content {
  margin: 15px;
}
.nuxt-content p,
table {
  margin: 20px;
}
.icon.icon-link {
  background-image: url('~assets/link.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 15px 25px;
  background-repeat: no-repeat;
}
</style>

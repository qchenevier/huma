<template lang='pug'>
  .columns.is-multiline.is-gapless
    .column.is-4(v-for="post in posts" :key="post.date")
      huma-post-card(:post="post")
</template>

<script>
import HumaPostCard from '~/components/huma-post-card.vue'
import _ from 'underscore'

export default {
  props: ['posts'],
  components: {
    HumaPostCard
  }
};
</script>

<style scoped>
.columns {
  margin: 10px;
}
</style>

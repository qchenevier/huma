<template lang='pug'>
  .columns.is-multiline.is-centered.is-gapless
    .column.is-4
      huma-post-card.post-side(:post="post")
    .column.is-8
      vue-markdown.post.content.is-medium {{ post.body }}
    .column.is-10
      vue-disqus.comments(
        :shortname="disqusShortname"
        :identifier="disqusPageId"
        :url="disqusURL"
      )
</template>

<script>
import VueMarkdown from 'vue-markdown'
import HumaPostCard from '~/components/huma-post-card.vue'

export default {
  components: {
    HumaPostCard,
    VueMarkdown
  },
  data () {
    let disqusShortname = 'huma-io'
    return {
      disqusShortname: disqusShortname,
      disqusPageId: `${process.env.NODE_ENV}-${disqusShortname}-${this.$route.params.slug}`,
      disqusURL: `${process.env.baseUrl}${this.$route.fullPath}`
    }
  },
  async asyncData({ params }) {
    let post = await import('~/content/blog/posts/' + params.slug + '.json');
    post._path = params.slug
    return {
      post: post
    }
  }
};

</script>

<style scoped>
.columns, .post-side, .post, .comments {
  margin: 10px;
}
</style>

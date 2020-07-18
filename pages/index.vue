<template lang="pug">
  div
    .hero
      .hero-body
        .container
          h1.title HUMA
          h2.subtitle A blog about Humans & Machines
          b-field
            b-taginput(
              v-model="selected_tags"
              :data="filtered_tags"
              autocomplete
              field="tag"
              attached
              open-on-focus=true
              placeholder="Select topic"
              @typing="get_filtered_tags"
            )
              template(slot-scope="props")
                b-icon(size="is-small", :icon="props.option.icon")
                | &nbsp {{ props.option.tag }}
              template(slot="empty") No suggestion
    huma-post-list(:posts="sort_and_filter_posts(posts, 'date', selected_tags).reverse()")
</template>

<script>
import HumaPostList from '~/components/huma-post-list.vue'
import _ from 'underscore'

export default {
  components: {
    HumaPostList,
  },
  data() {
    // Using webpacks context to gather all files from a folder
    const context = require.context('~/content/blog/posts/', false, /\.json$/)
    // Posts URLs are based on json filenames without extension
    const posts = context.keys().map((key) => ({
      ...context(key),
      _path: `/blog/${key.replace('.json', '').replace('./', '')}`,
    }))

    function get_unique(items) {
      return Array.from(new Set(items))
    }

    const available_tags = get_unique(
      _.flatten(
        posts.filter((post) => post.tags != null).map((post) => post.tags)
      )
    )

    return {
      posts: posts,
      available_tags: available_tags,
      filtered_tags: available_tags,
      selected_tags: [],
    }
  },
  methods: {
    get_filtered_tags(text) {
      this.filtered_tags = this.available_tags.filter((option) => {
        return option.tag.toLowerCase().indexOf(text.toLowerCase()) >= 0
      })
    },
    sort_and_filter_posts(posts, sortKey, selected_tags) {
      if (selected_tags.length > 0) {
        var filtered_posts = posts
          .filter((post) => post.tags != null)
          .filter((post) =>
            selected_tags.every((tag) => post.tags.indexOf(tag) !== -1)
          )
        return _.sortBy(filtered_posts, sortKey)
      } else {
        return _.sortBy(posts, sortKey)
      }
    },
  },
}
</script>

<style scoped></style>

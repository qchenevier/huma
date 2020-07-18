<template lang='pug'>
  nuxt-link.has-text-dark(class="card", tag="div", :to="post._path")
    .card-image
       img(:src="post.thumbnail")
    .card-content
      .content(v-if="post.tags.length > 0")
        b-taglist
          nuxt-link(tag="b-tag", v-for="tag in post.tags", :key="tag.tag", :to="tag_href(tag)", @click.stop="handleArrow")
            a.has-text-dark
              b-icon(size="is-small", :icon="tag.icon")
              | &nbsp {{ tag.tag }}
      .content
        p.title {{ post.title }}
        p.subtitle {{ post.summary }}
    .card-footer
      .card-footer-item {{ reading_time.text }}
      .card-footer-item {{ pretty_date }}
</template>

<script>
import readingTime from 'reading-time'
import moment from 'moment'

export default {
  props: ['post'],
  data () {
    let reading_time = readingTime(this.post.body)
    let pretty_date = moment(this.post.date).format("MMMM YYYY")
    return {
      reading_time: reading_time,
      pretty_date: pretty_date
    }
  },
  methods: {
    tag_href(tag) {
      return "/?tags=" + tag.tag.replace(/\s+/g, '-').toLowerCase()
    }
  }
};
</script>

<style scoped>
.card {
  margin: 10px;
}

.card:hover {
  opacity: 0.8;
}
</style>

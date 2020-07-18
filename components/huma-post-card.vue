<template>
  <nuxt-link class="has-text-dark card" tag="div" :to="post._path">
    <div class="card-image">
      <img :src="post.thumbnail" />
    </div>
    <div class="card-content">
      <div class="content" v-if="post.tags.length > 0">
        <b-taglist>
          <nuxt-link
            tag="b-tag"
            v-for="tag in post.tags"
            :key="tag.tag"
            :to="tag_href(tag)"
            @click.stop="handleArrow"
          >
            <a class="has-text-dark">
              <b-icon size="is-small" :icon="tag.icon" />
              &nbsp {{ tag.tag }}
            </a>
          </nuxt-link>
        </b-taglist>
      </div>
      <div class="content">
        <p class="title">{{ post.title }}</p>
        <p class="subtitle">{{ post.summary }}</p>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-footer-item">{{ reading_time.text }}</div>
      <div class="card-footer-item">{{ pretty_date }}</div>
    </div>
  </nuxt-link>
</template>

<script>
import readingTime from 'reading-time'
import moment from 'moment'

export default {
  props: ['post'],
  data() {
    let reading_time = readingTime(this.post.body)
    let pretty_date = moment(this.post.date).format('MMMM YYYY')
    return {
      reading_time: reading_time,
      pretty_date: pretty_date,
    }
  },
  methods: {
    tag_href(tag) {
      return '/?tags=' + tag.tag.replace(/\s+/g, '-').toLowerCase()
    },
  },
}
</script>

<style scoped>
.card {
  margin: 10px;
}

.card:hover {
  opacity: 0.8;
}
</style>

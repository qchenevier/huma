<template>
  <nuxt-link class="has-text-dark card" tag="div" :to="post.path">
    <div class="card-image">
      <img :src="post.thumbnail" />
    </div>
    <div class="card-content">
      <div class="content" v-if="post.tags.length">
        <b-taglist>
          <nuxt-link
            tag="b-tag"
            v-for="tag in post.tags"
            :key="tag.tag"
            :to="tagHref(tag)"
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
      <div class="card-footer-item">{{ post.readingTime }}</div>
      <div class="card-footer-item">
        {{ require('moment')(post.date).format('MMMM YYYY') }}
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    tagHref(tag) {
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

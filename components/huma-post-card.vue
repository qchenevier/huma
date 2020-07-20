<template>
  <nuxt-link class="has-text-dark card is-horizontal" tag="div" :to="post.path">
    <div class="card-image">
      <img :src="$router.options.base + post.thumbnail" />
    </div>
    <div class="card-content">
      <div class="content">
        <p class="title is-4">{{ post.title }}</p>
        <p>{{ post.summary }}</p>
        <p>
          {{ require('moment')(post.date).format('MMMM YYYY') }}
          –
          {{ post.readingTime }}
        </p>
      </div>
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
.card-content {
  /* padding: 1em; */
  /* padding-bottom: 0px; */
}
.content p {
  margin-bottom: 0.5em;
}

.card {
  margin: 20px;
}

.card:hover {
  opacity: 0.8;
}

.card.is-horizontal {
  flex-direction: row;
  display: flex;
  flex-basis: 50ex;
  flex-grow: 0;
  flex-shrink: 1;
  /* box-shadow: none; */
}

.card.is-horizontal .card-image {
  align-self: center;
  line-height: 0px;
}

.card.is-horizontal .card-image {
  flex: 1;
}
.card.is-horizontal .card-content {
  flex: 2;
}
</style>

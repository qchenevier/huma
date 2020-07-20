<template>
  <nuxt-link class="has-text-dark card is-horizontal" tag="div" :to="post.path">
    <div class="card-image">
      <div class="center-cropped" :style="cssVars" />
    </div>
    <div class="card-content" ref="cardContent" :style="cssVars">
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
  data() {
    return {
      cardHeight: 200,
      contentVsImg: 3,
    }
  },
  computed: {
    cssVars() {
      return {
        '--card-img-height': `${this.cardHeight}px`,
        '--card-img-url': `url(${
          this.$router.options.base + this.post.thumbnail
        })`,
        '--card-content-vs-img-ratio': this.contentVsImg,
      }
    },
  },
  methods: {
    tagHref(tag) {
      return '/?tags=' + tag.tag.replace(/\s+/g, '-').toLowerCase()
    },
    updateCardHeight() {
      this.cardHeight = this.$refs.cardContent.scrollHeight
    },
  },
  mounted() {
    this.updateCardHeight()
  },
}
</script>

<style scoped>
.center-cropped {
  height: var(--card-img-height);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: var(--card-img-url);
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
}

.card.is-horizontal .card-image {
  align-self: center;
  line-height: 0px;
}

.card.is-horizontal .card-image {
  flex: 1;
}
.card.is-horizontal .card-content {
  /* flex: 3; */
  flex: var(--card-content-vs-img-ratio);
}
</style>

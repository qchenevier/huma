<template>
  <div>
    <div class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">HUMA</h1>
          <h2 class="subtitle">A blog about Humans & Machines</h2>
          <b-field>
            <b-taginput
              v-model="selectedTags"
              :data="filteredTags"
              autocomplete
              field="tag"
              attached
              :open-on-focus="true"
              placeholder="Select topic"
              @typing="filterTags"
            >
              <template slot-scope="props">
                <b-icon size="is-small" :icon="props.option.icon" />
                &nbsp {{ props.option.tag }}
              </template>
              <template slot="empty">No suggestion</template>
            </b-taginput>
          </b-field>
        </div>
      </div>
    </div>
    <huma-post-list :posts="posts" />
  </div>
</template>

<script>
import HumaPostList from '~/components/huma-post-list.vue'

export default {
  components: {
    HumaPostList,
  },
  async asyncData({ $content }) {
    const posts = await $content('blog')
      .where({ extension: '.md' })
      .sortBy('date', 'desc')
      .fetch()
    const availableTagsPromise = await $content('blog')
      .where({ extension: '.md' })
      .only(['tags'])
      .fetch()
    const availableTags = [
      ...new Set(
        availableTagsPromise
          .filter((post) => post.tags != null)
          .map((post) => post.tags)
          .flat()
      ),
    ]
    return {
      posts: posts,
      availableTags: availableTags,
      filteredTags: availableTags,
      selectedTags: [],
    }
  },
  methods: {
    filterTags(text) {
      this.filteredTags = this.availableTags.filter((option) => {
        return option.tag.toLowerCase().indexOf(text.toLowerCase()) >= 0
      })
    },
  },
  watch: {
    async selectedTags(selectedTags) {
      this.posts = await this.$content('blog')
        .where({
          extension: '.md',
          'tags.tag': { $contains: selectedTags.map((tag) => tag.tag) },
        })
        .sortBy('date', 'desc')
        .fetch()
    },
  },
}
</script>

<style scoped></style>

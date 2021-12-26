<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-6">
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
              &nbsp; {{ props.option.tag }}
            </template>
            <template slot="empty">No suggestion</template>
          </b-taginput>
        </b-field>
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
  watchQuery: ['tags'],
  async asyncData({ $content, query }) {
    const posts = await $content('blog')
      .where({ extension: '.md' })
      .sortBy('date', 'desc')
      .fetch()
    const availableTagsPromise = await $content('blog')
      .where({ extension: '.md' })
      .only(['tags'])
      .fetch()
    function removeDuplicates(array, prop) {
      return array.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos
      })
    }
    const availableTags = removeDuplicates(
      availableTagsPromise
        .filter((post) => post.tags != null)
        .map((post) => post.tags)
        .flat(),
      'tag'
    )
    const selectedTags = query.tags
      ? availableTags.filter((option) => {
          return query.tags.includes(
            option.tag.replace(/\s+/g, '-').toLowerCase()
          )
        })
      : []
    return {
      posts: posts,
      availableTags: availableTags,
      filteredTags: availableTags,
      selectedTags: selectedTags,
    }
  },
  methods: {
    filterTags(text) {
      this.filteredTags = this.availableTags.filter((option) => {
        return option.tag.toLowerCase().indexOf(text.toLowerCase()) >= 0
      })
    },
    async updatePosts() {
      this.posts = await this.$content('blog')
        .where({
          extension: '.md',
          'tags.tag': { $contains: this.selectedTags.map((tag) => tag.tag) },
        })
        .sortBy('date', 'desc')
        .fetch()
    },
    updateQuery() {
      this.$router.push({
        path: this.$route.path,
        query: {
          tags: this.selectedTags.map((tag) =>
            tag.tag.replace(/\s+/g, '-').toLowerCase()
          ),
        },
      })
    },
  },
  watch: {
    selectedTags: {
      handler() {
        this.updatePosts()
        this.updateQuery()
      },
      immediate: true,
    },
    '$route.query': 'updatePosts',
  },
}
</script>

<style scoped>
.field {
  margin: 30px;
}
</style>

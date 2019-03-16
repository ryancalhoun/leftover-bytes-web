<template>
  <div class="archive">
    <nav-header/>
    <document-pane type="post" orderings="[document.first_publication_date desc]" fetch="post.title, post.description, post.hero" v-slot="doc">
      <h1>
        Archive
      </h1>
      <post-link v-for="post in doc.results" v-bind:key="post.id" v-bind:post="post"/>
    </document-pane>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import DocumentPane from '@/components/DocumentPane.vue'
import PostLink from '@/components/PostLink.vue'

export default {
  name: 'archive',
  components: {
    NavHeader,
    DocumentPane,
    PostLink,
  },
  methods: {
    url(post) {
      if(post.first_publication_date) {
        const date = new Date(post.first_publication_date.replace("+0000", "Z"));
        return "/posts/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + post.uid;
      } else {
        return "/posts/" + post.id + "/" + post.uid;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.archive {
}
</style>

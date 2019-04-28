<template>
  <div class="topics">
    <nav-header/>
    <document-pane type="tag" v-bind:name="$route.params.name" v-slot="tag">
      <document-pane type="post" orderings="[document.first_publication_date]" link="tags.tag" v-bind:to="tag.results[0].id" v-slot="doc">
        <h1> All in #{{ $route.params.name }} </h1>
        <post-link v-for="post in doc.results" v-bind:key="post.id" v-bind:post="post"/>
      </document-pane>
    </document-pane>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import DocumentPane from '@/components/DocumentPane.vue'
import PostLink from '@/components/PostLink.vue'

export default {
  name: 'ByTopic',
  components: {
    NavHeader,
    DocumentPane,
    PostLink,
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .document-pane > .document-pane {
    padding: 0;
  }
}
</style>

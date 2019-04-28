<template>
  <div class="topics">
    <nav-header/>
    <document-pane type="tag" orderings="[my.tag.name]" fetch="tag.name" v-slot="doc">
      <h1>
        Topics
      </h1>
      <router-link
        v-bind:to="url(tag)"
        v-for="tag in doc.results"
        v-bind:key="tag.id"> #{{ tag.data.name }} </router-link>
    </document-pane>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import DocumentPane from '@/components/DocumentPane.vue'

export default {
  name: 'topics',
  components: {
    NavHeader,
    DocumentPane,
  },
  methods: {
    url(tag) {
      return `/topics/${tag.data.name}`;
    }
  }
}
</script>

<style scoped lang="scss">
.document-pane {
  ::v-deep {
    a {
      color: #af4213;
      display: block;
      padding: 8px 4px;
      @media screen and (min-width: 768px) {
        padding: 8px 20px;
      }
      &:hover, &:focus {
        box-shadow: 1px 7px 20px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>

<template>
  <div class="about">
    <document-pane type="info" uid="about" v-bind:fetchLinks="fetchLinks" v-slot="doc">
      <nav-header/>
      <div class="title">
        <text-field v-bind:text="doc.results[0].data.title"/>
      </div>
      <div class="body">
        <text-field v-bind:text="doc.results[0].data.body"/>
  
        <div class="authors">
          <h4> Authors </h4>
  
          <author-credit v-for="author in doc.results[0].data.collection" v-bind:key="author.item.id" v-bind:author="author.item">
          </author-credit>
        </div>
      </div>
    </document-pane>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import DocumentPane from '@/components/DocumentPane.vue'
import AuthorCredit from '@/components/AuthorCredit.vue'
import TextField from '@/components/TextField'

export default {
  name: 'About',
  data() {
    return {
      fetchLinks: ['author.name', 'author.photo']
    }
  },
  components: {
    NavHeader,
    DocumentPane,
    AuthorCredit,
    TextField,
  },
}
</script>


<style scoped lang="scss">
.about {
  max-width: 720px;
  margin: 0 auto;
  padding: 80px 16px;
}
.authors {
  margin-top: 80px;
}
</style>

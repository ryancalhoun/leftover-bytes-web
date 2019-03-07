<template>
  <div class="about">
    <nav-header/>
    <div class="title">
      <text-field v-bind:text="title"/>
    </div>
    <div class="body">
      <text-field v-bind:text="body"/>

      <div class="authors">
        <h4> Authors </h4>

        <author-credit v-for="author in authors" v-bind:key="author.id" v-bind:author="author">
        </author-credit>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import AuthorCredit from '@/components/AuthorCredit.vue'
import contentApi from '@/components/ContentApi'
import TextField from '@/components/TextField'

export default {
  name: 'About',
  data() {
    return {
      title: [],
      body: [],
      authors: [],
    }
  },
  components: {
    NavHeader,
    AuthorCredit,
    TextField,
  },
  mounted() {
    contentApi.info({uid: 'about'}, ['author.name', 'author.photo']).then((response) => {
      const doc = response.results[0];
      this.title = doc.data.title;
      this.body = doc.data.body;
      this.authors = doc.data.collection.map(c => c.item);
    });
  }
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

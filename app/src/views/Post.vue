<template>
  <div class="post">
    <nav-header/>
    <document-pane
      type="post"
      v-bind:id="$route.params.id"
      v-bind:uid="$route.params.uid"
      v-bind:year="$route.params.year"
      v-bind:month="$route.params.month"
      v-bind:fetchLinks="fetchLinks"
      v-on:document-loaded="onLoaded"
      v-slot="doc">
      <div class="title">
        <text-field v-bind:text="doc.results[0].data.title"/>
        <text-field v-bind:text="doc.results[0].data.description"/>
        <author-credit v-bind:author="doc.results[0].data.author">
          <div class="date">
            {{ prettyDate(doc.results[0].first_publication_date) }}
          </div>
        </author-credit>
      </div>
      <div class="hero">
        <img v-bind:src="doc.results[0].data.hero.url"/>
      </div>
      <div class="body">
        <text-field v-bind:text="doc.results[0].data.body"/>
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
  name: 'Post',
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
  methods: {
    prettyDate(date) {
      return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(new Date(date));
    },
    onLoaded(results) {
      const post = results[0];
      if(post.first_publication_date) {
        const date = new Date(post.first_publication_date.replace("+0000", "Z"));
        const url = "/posts/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + post.uid;
        this.$router.replace(url);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.post {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 16px;
}
.hero {
  margin: 40px 0;
  img {
    width: 100%;
  }
}
.body {
  &::v-deep {
    img {
      max-width: 100%;
    }
    pre {
      background: #eee;
      padding: 20px 40px;
      font-size: 14px;
    }
  }
}
</style>


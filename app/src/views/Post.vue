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
            <pretty-date v-bind:date="doc.results[0].first_publication_date"/>
          </div>
        </author-credit>
      </div>
      <div class="hero">
        <img v-bind:src="doc.results[0].data.hero.url" v-bind:alt="doc.results[0].data.hero.alt"/>
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
import PrettyDate from '@/components/PrettyDate.vue'
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
    PrettyDate,
    TextField,
  },
  methods: {
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
      margin: 20px auto;
      display: block;
    }
    pre {
      background: #eee;
      padding: 20px 40px;
      font-size: 14px;
    }
    a {
      color: #af4213;
    }
  }
}
</style>


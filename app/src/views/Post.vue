<template>
  <div class="post">
    <nav-header/>
    <div class="title">
      <text-field v-bind:text="title"/>
	  <text-field v-bind:text="description"/>
      <author-credit v-bind:author="author">
        <div class="date">
          {{ date }}
        </div>
      </author-credit>
    </div>
    <div class="hero">
      <img v-bind:src="hero.url"/>
    </div>
    <div class="body">
      <text-field v-bind:text="body"/>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import AuthorCredit from '@/components/AuthorCredit.vue'
import contentApi from '@/components/ContentApi'
import TextField from '@/components/TextField'

export default {
  name: 'Post',
  data() {
    return {
      title: [],
      hero: {},
      author: {},
      date: '',
      description: [],
      body: []
    }
  },
  components: {
    NavHeader,
    AuthorCredit,
    TextField,
  },
  mounted() {
    this.load(this.$route);
  },
  watch: {
    $route (to, from) {
      this.load(to, from);
    }
  },
  methods: {
    load(to, from) {
      if(from && from.params.id) {
        return;
      }

      contentApi.post(to.params).then((response) => {
        const doc = response.results[0];
        this.title = doc.data.title;
        this.description = doc.data.description;
        this.author = doc.data.author;
        this.date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(new Date(doc.first_publication_date));
        this.hero = doc.data.hero;
        this.body = doc.data.body;
        if(to.params.id) {
          this.replaceId(doc);
        }
      });
    },
    replaceId(doc) {
      const date = new Date(doc.first_publication_date.replace("+0000", "Z"));
      const url = "/posts/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + doc.uid;
      this.$router.replace(url);
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


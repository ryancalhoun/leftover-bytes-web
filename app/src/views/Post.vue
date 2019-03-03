<template>
  <div class="post">
    <nav-header/>
    <div class="title">
      <text-field v-bind:text="title"/>
      <div class="author">
        <div class="photo">
          <router-link v-bind:to="author_url">
            <img v-bind:src="author.photo"/>
          </router-link>
        </div>
        <div class="info">
          <div class="name">
            <router-link v-bind:to="author_url">
              {{ author.name }}
            </router-link>
          </div>
          <div class="date">
            {{ date }}
          </div>
        </div>
      </div>
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
import contentApi from '@/components/ContentApi'
import TextField from '@/components/TextField'

export default {
  name: 'Post',
  data() {
    return {
      title: [],
      hero: {},
      author: {},
      author_url: '',
      date: '',
      description: [],
      body: []
    }
  },
  components: {
    NavHeader,
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
        this.author = {
          name: doc.data.author.data.name,
          photo: doc.data.author.data.photo.url,
        };
        this.author_url = '/authors/' + doc.data.author.uid;
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

  &::v-deep {
    .nav-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
}
.author {
  .info, .photo {
    display: inline-block;
    vertical-align: top;
  }
  .photo {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    border: 1px solid #af4213;
  }
  img {
    width: 100%;
    height: 100%;
    padding: 2px;
    border-radius: 50%;
    position: relative;
  }
  .info {
    padding: 4px 20px;
    .name {
      font-size: 18px;
      margin-bottom: 4px;
    }
    .date {
      font-size: 14px;
    }
  }
  a {
    color: #444;
    text-decoration: underline;
  }
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


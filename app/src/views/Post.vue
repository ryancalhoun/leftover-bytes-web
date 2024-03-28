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
        <div class="text">
          <text-field v-bind:text="doc.results[0].data.body"/>
        </div>
        <div class="more">
          <related v-bind:tags="doc.results[0].data.tags"/>
          <comment-section v-bind:post="doc.results[0].id" v-bind:hash="hash"/>
        </div>
      </div>
    </document-pane>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import DocumentPane from '@/components/DocumentPane.vue'
import AuthorCredit from '@/components/AuthorCredit.vue'
import CommentSection from '@/components/CommentSection.vue'
import PrettyDate from '@/components/PrettyDate.vue'
import Related from '@/components/Related.vue'
import TextField from '@/components/TextField'

import tracking from '@/google/tracking'

export default {
  name: 'Post',
  data() {
    return {
      fetchLinks: ['author.name', 'author.photo', 'tag.name'],
      hash: window.location.hash.substr(1),
    }
  },
  components: {
    NavHeader,
    DocumentPane,
    AuthorCredit,
    CommentSection,
    PrettyDate,
    Related,
    TextField,
  },
  methods: {
    onLoaded(results) {
      const post = results[0];
      if(post.first_publication_date) {
        const date = new Date(post.first_publication_date.replace("+0000", "Z"));
        const url = "/posts/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + post.uid;
        this.$router.replace(url);

        window.location.hash = '';
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
    a {
      color: #af4213;
    }
  }
  .text {
    &::v-deep {
      img {
        max-width: 100%;
        margin: 20px auto;
        display: block;
      }
      pre {
        background: #eee;
        padding: 20px 16px;
        font-size: 14px;
        overflow: auto;
        @media screen and (min-width: 768px) {
          padding: 20px 40px;
        }
      }
      iframe {
        display: block;
        margin: 0 auto;
      }
    }
  }

  .more {
    padding: 20px 16px;
    @media screen and (min-width: 768px) {
      padding: 20px;
    }
  }
}
ins.adsbygoogle {
  display: block;
}
</style>


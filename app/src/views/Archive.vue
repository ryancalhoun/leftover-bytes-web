<template>
  <div class="archive">
    <nav-header/>
    <document-pane type="post" orderings="[document.first_publication_date desc]" fetch="post.title, post.description, post.hero" v-slot="doc">
      <h1>
        Archive
      </h1>
      <div class="post" v-for="post in doc.results" v-bind:key="post.id">
        <router-link :to="url(post)">
          <div class="thumbnail">
            <img v-bind:src="post.data.hero.thumbnail.url" v-bind:alt="post.data.hero.alt"/>
          </div>
          <div class="info">
            <div class="title"> {{ post.data.title[0].text }} </div>
            <div class="date"> <pretty-date v-bind:date="post.first_publication_date"/> </div>
            <div class="description"> {{ post.data.description[0].text }} </div>
          </div>
        </router-link>
      </div>
    </document-pane>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import DocumentPane from '@/components/DocumentPane.vue'
import PrettyDate from '@/components/PrettyDate.vue'

export default {
  name: 'archive',
  components: {
    NavHeader,
    DocumentPane,
    PrettyDate,
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
  .post {
    margin: 12px 0 20px;
    a {
      display: block;
      padding: 8px 4px;
      @media screen and (min-width: 768px) {
        padding: 8px 20px;
      }
      &:hover, &:focus {
        box-shadow: 1px 7px 20px rgba(0, 0, 0, 0.2);
      }
    }

    .thumbnail, .info {
      display: inline-block;
      vertical-align: top;
    }
    .thumbnail {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      width: calc(100% - 60px);
      padding-left: 12px;

      color: #444444;

      .title {
        font-weight: bold;
      }

      .description {
        margin: 4px 0;
      }
      .date {
        font-size: 14px;
      }
    }

  }
}
</style>

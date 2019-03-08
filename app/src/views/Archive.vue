<template>
  <div class="archive">
    <document-pane type="post" orderings="[document.first_publication_date desc]" fetch="post.title, post.description, post.hero" v-slot="doc">
      <nav-header/>
      <h1>
        Archive
      </h1>
      <div class="post" v-for="post in doc.results" v-bind:key="post.id">
        <router-link :to="url(post)">
          <div class="thumbnail">
            <img v-bind:src="post.data.hero.thumbnail.url"/>
          </div>
          <div class="info">
            <div class="title"> {{ post.data.title[0].text }} </div>
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

export default {
  name: 'archive',
  components: {
    NavHeader,
    DocumentPane,
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
    margin: 12px 0;

    .thumbnail, .info {
      display: inline-block;
      vertical-align: top;
    }
    .thumbnail {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      width: calc(100% - 50px);
      padding-left: 12px;

      color: #444444;

      .title {
        font-weight: bold;
      }

      .description {
        margin: 4px 0;
      }
    }

  }
}
</style>

<template>
  <div class="archive">
    <nav-header/>
    <h1>
      Archive
    </h1>
    <div class="post" v-for="post in posts" v-bind:key="post.id">
      <router-link :to="post.url">
        <div class="thumbnail">
          <img v-bind:src="post.thumbnail"/>
        </div>
        <div class="info">
          <div class="title"> {{ post.data.title[0].text }} </div>
          <div class="description"> {{ post.data.description[0].text }} </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import contentApi from '@/components/ContentApi'
import NavHeader from '@/components/NavHeader.vue'

export default {
  name: 'archive',
  components: {
    NavHeader
  },
  data: function() {
    return {
      posts: []
    }
  },
  mounted: function() {
    contentApi.posts().then((response) => {
      response.results.forEach((r) => {
        const date = new Date(r.first_publication_date.replace("+0000", "Z"));
        r.url = "/posts/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + r.uid;
        r.thumbnail = r.data.hero.thumbnail.url;
        this.posts.push(r);
      });
    });
  }
};
</script>

<style scoped lang="scss">
.archive {
  max-width: 720px;
  margin: 0 auto;
  padding: 80px 16px;

  &::v-deep {
    .nav-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }

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

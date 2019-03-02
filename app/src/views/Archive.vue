<template>
  <div class="archive">
    <nav-header/>
    <h1>
      Archive
    </h1>
    <div class="post" v-for="post in posts">
      <router-link :to="post.url">
      {{ post.data.title[0].text }} 
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
</style>

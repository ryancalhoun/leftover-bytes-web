<template>
  <div class="posts">
    Posts
    <div class="post" v-for="post in posts">
      <router-link :to="post.url">
      {{ post.data.title[0].text }} 
      </router-link>
    </div>
  </div>
</template>

<script>
import contentApi from '@/components/ContentApi'

export default {
  name: 'post-list',
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

<style lang="scss">
</style>

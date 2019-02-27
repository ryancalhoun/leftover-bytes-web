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
import content from '../Content'

export default {
  name: 'post-list',
  data: function() {
    return {
      posts: []
    }
  },
  mounted: function() {
    content.posts().then((response) => {
      response.results.forEach((r) => {
        const date = new Date(r.first_publication_date);
        r.url = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + r.uid;
        this.posts.push(r);
      });
    });
  }
};
</script>

<style lang="scss">
</style>

<template>
  <div class="post-link">
    <router-link :to="url()">
      <div class="thumbnail">
        <img v-bind:src="post.data.hero.thumbnail.url" v-bind:alt="post.data.hero.alt"/>
      </div>
      <div class="info">
        <div class="title"> {{ post.data.title[0].text }} </div>
        <div class="date"> <pretty-date v-if="post.first_publication_date" v-bind:date="post.first_publication_date"/> </div>
        <div class="description"> {{ post.data.description[0].text }} </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import PrettyDate from '@/components/PrettyDate.vue'
export default {
  name: 'PostLink',
  props: ['post'],
  components: {
    PrettyDate
  },
  methods: {
    url() {
      if(this.post.first_publication_date) {
        const date = new Date(this.post.first_publication_date.replace("+0000", "Z"));
        return "/posts/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + this.post.uid;
      } else {
        return "/posts/" + this.post.id + "/" + this.post.uid;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.post-link {
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
</style>

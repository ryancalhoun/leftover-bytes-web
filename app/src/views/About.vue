<template>
  <div class="about">
    <nav-header/>
    <div class="title">
      <text-field v-bind:text="title"/>
    </div>
    <div class="body">
      <text-field v-bind:text="body"/>

      <div class="authors">
        <h4> Authors </h4>

        <div class="author" v-for="author in authors" v-bind:key="author.id">
          <div class="photo">
            <router-link v-bind:to="author.url">
              <img v-bind:src="author.data.photo.url"/>
            </router-link>
          </div>
          <div class="info">
            <div class="name">
              <router-link v-bind:to="author.url">
                {{ author.data.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import contentApi from '@/components/ContentApi'
import TextField from '@/components/TextField'

export default {
  name: 'About',
  data() {
    return {
      title: [],
      body: [],
      authors: [],
    }
  },
  components: {
    NavHeader,
    TextField,
  },
  mounted() {
    contentApi.info({uid: 'about'}, ['author.name', 'author.photo']).then((response) => {
      const doc = response.results[0];
      this.title = doc.data.title;
      this.body = doc.data.body;
      this.authors = doc.data.collection.map((c) => {
        let a = c.item;
        a.url = '/authors/' + a.uid;
        return a;
      });
    });
  }
}
</script>


<style scoped lang="scss">
.about {
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
}
.authors {
  margin-top: 80px;
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
</style>

<template>
  <div class="author">
    <nav-header/>
    <div class="author">
      <div class="photo">
        <img v-bind:src="photo.url"/>
      </div>
      <div class="info">
        <h2 class="name">
          {{ name }}
        </h2>
        <div class="bio">
          <text-field v-bind:text="bio"/>
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
  name: 'Author',
  data() {
    return {
      name: '',
      photo: {},
      bio: [],
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

      contentApi.author(to.params).then((response) => {
        const doc = response.results[0];
        this.name = doc.data.name;
        this.photo = doc.data.photo;
        this.bio = doc.data.bio;
      });
    }
  }
}
</script>

<style scoped lang="scss">
.author {
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
  .photo, .info {
    display: inline-block;
    vertical-align: top;
  }
  .photo {
    width: 250px;
    padding: 10px 8px 24px;
    border: 1px solid #ddd;
    box-shadow: 1px 7px 20px rgba(0, 0, 0, 0.2);
    img {
      width: 100%;
    }
  }
  .info {
    .name {
      margin: 0;
    }
    padding: 40px 0;
    @media screen and (min-width: 768px) {
      width: calc(100% - 250px);
      padding: 10px 0 0 32px;
    }
  }
}
</style>

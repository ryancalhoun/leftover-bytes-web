<template>
  <div class="home">
    <div class="hero" ref="hero">
      <div class="centering">
        <div class="title">
          <h1> Leftover Bytes </h1>
        </div>
        <div class="subtitle">
          <p> There are many bytes out there on the web. </p>
          <p> These are the leftovers. </p>
        </div>
      </div>
    </div> 
    <div id="content" class="content" ref="content">
      <nav-header/>

      <div class="container">
        <div class="body">
          <text-field v-bind:text="body"/>
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
  name: 'home',
  data() {
    return {
      body: []
    }
  },
  components: {
    NavHeader,
    TextField,
  },
  mounted() {
    this.$on('menu-home', () => {
      window.scroll(0, this.$refs.content.offsetTop);
    });
    contentApi.home().then((response) => {
      const doc = response.results[0];
      this.body = doc.data.body;
    });
  },
}
</script>

<style scoped lang="scss">
.home {
  position: relative;

  &::v-deep {
    .nav-header {
      position: fixed;
      top: 0;

      @media screen and (min-width: 768px) {
        position: sticky;
      }
    }
  }

  .hero {
    background-color: #4d4d4d;
    color: white;
    text-align: left;
    height: calc(100vh - 40px);
    min-height: calc(320px - 40px);
    padding: 40px 0;
    margin-top: 40px;
    @media screen and (min-width: 768px) {
      margin-top: 0;
    }
    h1 {
      margin: 0;
      font-size: 32px;
    }
    .centering {
      position: relative;
      top: calc(50% - 40px);
      transform: translateY(-50%);
    }
    .title, .subtitle {
      max-width: 420px;
      padding: 0 16px;
    }
    .title {
      margin: 20px auto 20px;
    }
    .subtitle {
      margin: 40px auto 40px;
    }
    p {
      margin: 0;
      font-style: italic;
    }
    @media screen and (min-width: 425px) {
      h1 {
        margin: 0;
        font-size: 48px;
      }
      .title {
        margin-top: 40px;
      }
    }
  }
  .content {
    min-height: calc(100vh - 40px);
    padding: 10px 0;
    @media screen and (min-width: 425px) {
      min-height: calc(100vh);
      padding: 0 0 40px;
    }
  }
  .container {
    max-width: 720px;
    margin: 0 auto;
    padding: 40px 16px;
  }
}
</style>

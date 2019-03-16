<template>
  <div class="home">
    <div class="hero" ref="hero">
      <picture v-if="hero.url">
        <source media="screen and (max-width:767px)" v-bind:srcset="hero.mobile.url"/>
        <source media="screen and (max-width:1999px)" v-bind:srcset="hero.desktop.url"/>
        <img v-bind:src="hero.url" v-bind:alt="hero.alt"/>
      </picture>
      <div class="mask"/>
      <div class="centering">
        <div class="title">
          <text-field v-bind:text="title"/>
        </div>
        <div class="subtitle">
          <text-field v-bind:text="description"/>
        </div>
      </div>
    </div> 
    <div id="content" class="content" ref="content">
      <nav-header/>
      <document-pane type="home" v-on:document-loaded="onDocumentLoaded" v-slot="doc">
        <div class="container">
          <div class="body">
            <text-field v-bind:text="doc.results[0].data.body"/>
          </div>
        </div>
      </document-pane>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import DocumentPane from '@/components/DocumentPane.vue'
import TextField from '@/components/TextField'

export default {
  name: 'home',
  data() {
    return {
      title: [],
      description: [],
      hero: {},
    }
  },
  components: {
    NavHeader,
    DocumentPane,
    TextField,
  },
  mounted() {
    this.$on('menu-home', () => {
      window.scroll(0, this.$refs.content.offsetTop);
    });
  },
  methods: {
    onDocumentLoaded(result) {
      this.title = result[0].data.title;
      this.description = result[0].data.description;
      this.hero = result[0].data.hero;
    }
  }
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
    background: #4d4d4d;
    color: white;
    text-align: left;
    height: 350px;
    padding: 40px 0;
    margin-top: 40px;
    @media screen and (min-width: 768px) {
      margin-top: 0;
    }
    position: relative;
    picture, .mask {
      position: absolute;
      top: 0;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }
    img {
      display: block;
      position: relative;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      @media screen and (min-width: 768px) {
        width: 100%;
      }
    }
    .mask {
      background-color: rgba(0, 0, 0, 0.4);
    }
    &::v-deep {
      h1 {
        margin: 0;
        font-size: 32px;
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
      }
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
    @media screen and (min-width: 425px) {
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
    .document-pane {
      margin-top: -40px;
    }
  }
}
</style>

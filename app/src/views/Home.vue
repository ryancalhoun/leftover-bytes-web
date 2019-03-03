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
        <h1> Main Content Goes Here </h1>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
export default {
  name: 'home',
  components: {
    NavHeader
  },
  mounted: function() {
    this.$on('menu-toggle', (open) => {
      const y = this.$refs.content.getBoundingClientRect().y;
      if(y > 0) {
        window.scroll(0, this.$refs.content.offsetTop);
      }
    });

    window.addEventListener('resize', this.fitWindow);
    window.addEventListener('orientationchange', this.fitWindow);

    this.fitWindow();
  },
  methods: {
    fitWindow() {
      if(!this.$refs.hero) {
        return;
      }
      const hero = this.$refs.hero.clientHeight;

      if(hero + 40 != window.innerHeight) {
        this.$refs.hero.style.height = (window.innerHeight - 40) + 'px';
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  position: relative;

  &::v-deep {
    .nav-header {
      position: sticky;
      top: 0;
    }
  }

  .hero {
    background-color: #4d4d4d;
    color: white;
    text-align: left;
    height: calc(100vh - 40px);
    min-height: calc(320px - 40px);
    padding: 40px 0;
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
    min-height: 100vh;
  }
  .container {
    max-width: 768px;
    margin: 0 auto;
  }
}
</style>

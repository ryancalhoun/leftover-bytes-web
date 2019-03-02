<template>
  <div class="nav-header">
    <div class="title">
      Leftover Bytes
    </div>
    <div class="toggle">
      <a href="#" v-on:click.prevent="toggle()">
        <fa v-bind:icon="menu ? 'times' : 'bars'"/>
      </a>
    </div>
    <div class="menu" v-bind:class="{ open: menu }">
      <ul>
        <li> <router-link to="/">Home</router-link> </li>
        <li> <router-link to="/about/">About</router-link> </li>
        <li> <router-link to="/archive/">Archive</router-link> </li>
        <li> <router-link to="/contact-us/">Contact Us</router-link> </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavHeader',
  data: function() {
    return {
      menu: false
    }
  },
  methods: {
    toggle() {
      this.menu = !this.menu;
      this.$parent.$emit('menu-toggle', this.menu);
    }
  }
}
</script>

<style scoped lang="scss">
$height: 40px;
$background: #af4213;
.nav-header {
  height: $height;
  width: 100%; 
  background: $background;
  color: white;
  padding: 0 16px;
  box-sizing: border-box;
  line-height: 40px;
  position: relative;

  @media screen and (min-width: 768px) {
    padding: 0 40px;
  }

  .toggle {
    position: absolute;
    top: 0;
    right: 16px;
  }

  .menu {
    display: none;
    &.open {
      display: block;
      background: darken($background, 10%);
    };
    position: absolute;
    top: $height;
    left: 0;
    width: 100%;
  }

  ul {
    max-width: 200px;
    list-style-type: none;
    display: block;
  }

  @media screen and (min-width: 768px) {
    .toggle {
      display: none;
    }
    .menu {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: $height;
    }

    li {
      display: inline;
    }
    ul {
      max-width: 300px;
      margin: 0 auto;
    }
  }

  a {
    color: white;
    text-decoration: none;
    margin: 0 8px;
  }
}
</style>

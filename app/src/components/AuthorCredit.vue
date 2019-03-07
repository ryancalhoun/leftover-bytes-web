<template>
  <div class="author" v-if="author.data">
    <div class="photo">
      <router-link v-bind:to="url">
        <img v-bind:src="author.data.photo.url"/>
      </router-link>
    </div>
    <div class="info">
      <div class="name">
        <router-link v-bind:to="url">
          {{ author.data.name }}
        </router-link>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthorCredit',
  props: ['author'],
  data() {
    return {
      url: '/authors/' + this.author.uid
    }
  }
}
</script>

<style scoped lang="scss">
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

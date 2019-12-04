<template>
  <div class="user" v-if="user">
    <img v-bind:src="user.picture"/>
    <span> {{ user.name }} </span>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style scoped lang="scss">
.user {
  padding: 8px 0;
  img, span {
    display: inline-block;
    vertical-align: bottom;
    height: 24px;
  }
  img {
    border-radius: 50%;
    width: 24px;
    margin: 0;
  }
  span {
    padding: 0 8px;
    line-height: 24px;
    color: #999;
  }
}
</style>

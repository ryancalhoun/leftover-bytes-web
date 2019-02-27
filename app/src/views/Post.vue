<template>
  <div class="Post">
    <div class="header">
      <div class="titlte">
        <h1> {{ title }} </h1>
      </div>
    </div>
    <div class="body">
      Post
      {{ $route.params.slug }}
      {{ body }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'post',
}
</script>

<style lang="scss">
</style>

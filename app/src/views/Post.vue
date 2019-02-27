<template>
  <div class="Post">
    <div class="header">
      <div class="title">
        <h1> {{ title }} </h1>
      </div>
      <div class="description">
        <h1> {{ description }} </h1>
      </div>
    </div>
    <div class="body">
      Post
      {{ body }}
    </div>
  </div>
</template>

<script>
import content from '../Content'

export default {
  name: 'post',
  data: function() {
    return {
      title: '',
      body: ''
    }
  },
  mounted: function() {
    content.post(this.$route.params.id).then((doc) => {
      this.title = doc.data.title[0].text;
      this.description = doc.data.description[0].text;
      this.body = doc.data.body[0].text;
    });
  }
}
</script>

<style lang="scss">
</style>

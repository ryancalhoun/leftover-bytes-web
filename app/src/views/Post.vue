<template>
  <div class="Post">
    <div class="header">
      <div class="title">
        <h1> {{ title }} </h1>
      </div>
      <div class="description">
        {{ description }}
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
      description: '',
      body: ''
    }
  },
  mounted: function() {
    content.post(this.$route.params).then((response) => {
      const doc = response.results[0];
      this.title = doc.data.title[0].text;
      this.description = doc.data.description[0].text;
      this.body = doc.data.body[0].text;
    });
  }
}
</script>

<style lang="scss">
</style>

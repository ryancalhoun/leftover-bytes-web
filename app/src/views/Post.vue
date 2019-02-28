<template>
  <div class="Post">
    <div class="header">
      <text-field v-bind:text="title"/>
    </div>
    <text-field v-bind:text="body"/>
  </div>
</template>

<script>
import contentApi from '@/components/ContentApi'
import TextField from '@/components/TextField'

export default {
  name: 'post',
  data: function() {
    return {
      title: [],
      description: [],
      body: []
    }
  },
  components: {
    TextField
  },
  mounted: function() {
    contentApi.post(this.$route.params).then((response) => {
      const doc = response.results[0];
      this.title = doc.data.title;
      this.body = doc.data.body;
    });
  }
}
</script>

<style lang="scss">
</style>

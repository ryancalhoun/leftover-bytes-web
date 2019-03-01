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
    this.load(this.$route);
  },
  watch: {
    $route (to, from) {
      this.load(to, from);
    }
  },
  methods: {
    load(to, from) {
      if(from && from.params.id) {
        return;
      }

      contentApi.post(to.params).then((response) => {
        const doc = response.results[0];
        this.title = doc.data.title;
        this.body = doc.data.body;
        if(to.params.id) {
          this.replaceId(doc);
        }
      });
    },
    replaceId(doc) {
	  const date = new Date(doc.first_publication_date.replace("+0000", "Z"));
      const url = "/posts/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + doc.uid;
      this.$router.replace(url);
    }
  }
}
</script>

<style lang="scss">
</style>

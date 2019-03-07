<template>
  <div class="document-pane">
    <slot v-bind:results="results" v-if="results.length > 0"></slot>
  </div>
</template>

<script>
const Prismic = require('prismic-javascript');

const baseurl = 'https://leftoverbytes.cdn.prismic.io/api/v2';
let api = Prismic.getApi(baseurl);

export default {
  name: 'DocumentPane',
  props: ['type', 'id', 'uid', 'year', 'month', 'fetch', 'fetchLinks'],
  data() {
    return {
      results: [],
    }
  },
  mounted() {
    this.load(this.$route);
  },
  watch: {
    $route(to, from) {
      this.load(to, from);
    }
  },
  methods: {
    load(to, from) {
      const q = [];
      const opts = {};

      if(this.fetch)
        opts.fetch = this.fetch;
      if(this.fetchLinks)
        opts.fetchLinks = this.fetchLinks;
      if(this.id) {
        q.push(Prismic.Predicates.at('document.id', this.id));
      }
      if(this.type) {
        q.push(Prismic.Predicates.at('document.type', this.type));
        if(this.uid)
          q.push(Prismic.Predicates.at('my.' + this.type + '.uid', this.uid));
      }
      if(this.year)
        q.push(Prismic.Predicates.year('document.first_publication_date', parseInt(this.year)));
      if(this.month) 
        q.push(Prismic.Predicates.month('document.first_publication_date', parseInt(this.month)));

      api.then(api =>
        api.query(q, opts).then(response => {
          this.results = response.results;
          this.$emit('document-loaded', this.results);
        })
      );
    }
  }
}
</script>

<style scoped lang="scss">
</style>

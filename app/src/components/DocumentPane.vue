<template>
  <div class="document-pane" v-bind:class="{ loaded: loaded }">
    <slot v-bind:results="results" v-if="results.length > 0"></slot>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript';

const baseurl = 'https://leftoverbytes.cdn.prismic.io/api/v2';
const api = Prismic.getApi(baseurl);

export default {
  name: 'DocumentPane',
  props: [
    'type',
    'id',
    'uid',
    'name',
    'year',
    'month',
    'link',
    'to',
    'orderings',
    'fetch',
    'fetchLinks'
  ],
  data() {
    return {
      results: [],
      loaded: false,
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
    async load(to, from) {
      const q = [];
      const opts = {};

      if(this.fetch)
        opts.fetch = this.fetch;
      if(this.fetchLinks)
        opts.fetchLinks = this.fetchLinks;
      if(this.orderings)
        opts.orderings = this.orderings;
      if(this.id) {
        q.push(Prismic.Predicates.at('document.id', this.id));
      }
      if(this.type) {
        q.push(Prismic.Predicates.at('document.type', this.type));
        if(this.uid)
          q.push(Prismic.Predicates.at('my.' + this.type + '.uid', this.uid));
        if(this.name) {
          q.push(Prismic.Predicates.at('my.' + this.type + '.name', this.name));
        }
      }
      if(this.link && this.to) {
        q.push(Prismic.Predicates.at('my.' + this.type + '.' + this.link, this.to));
      }
      if(this.year)
        q.push(Prismic.Predicates.year('document.first_publication_date', parseInt(this.year)));
      if(this.month) 
        q.push(Prismic.Predicates.month('document.first_publication_date', parseInt(this.month)));

      const response = await (await api).query(q, opts);

      this.results = response.results;
      this.$emit('document-loaded', this.results);
      this.loaded = true;
    }
  }
}
</script>

<style scoped lang="scss">
.document-pane {
  max-width: 720px;
  margin: 0 auto;
  padding: 100px 16px;
  opacity: 0;

  &.loaded {
    transition: opacity 0.3s ease;
    opacity: 1;
  }
}
</style>

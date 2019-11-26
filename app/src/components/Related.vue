<template>
  <div class="related" v-if="tags.length > 0">

    <p> Read more related to... </p>

    <router-link
      v-bind:to="url(related.tag)"
      v-for="related in tags"
      v-bind:key="related.tag.id"> #{{ related.tag.slug }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['tags'],
  methods: {
    url(tag) {
      return `/topics/${tag.slug}`;
    }
  }
}
</script>

<style scoped lang="scss">
.related {
  text-align: right;
  margin: 40px 0;
  p {
    color: #777;
    font-style: italic;
    margin: 0;
  }
  ::v-deep {
    a {
      display: block;
      margin: 8px 0;
    }
  }
}
</style>

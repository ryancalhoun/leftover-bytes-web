<template>
  <span class="pretty-date">
    {{ prettyDate }}
  </span>
</template>

<script>
export default {
  name: 'PrettyDate',
  props: {date: String},
  data() {
    return {
      prettyDate: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(new Date(this.date))
    };
  }
}
</script>

<style scoped lang="scss">
.pretty-date {
  color: #4286f4;
}
</style>

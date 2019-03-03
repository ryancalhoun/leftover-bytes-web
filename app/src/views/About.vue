<template>
  <div class="about">
    <nav-header/>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import contentApi from '@/components/ContentApi'
import TextField from '@/components/TextField'

export default {
  name: 'About',
  components: {
    NavHeader,
    TextField,
  }
}
</script>


<style scoped lang="scss">
.about {
  max-width: 720px;
  margin: 0 auto;
  padding: 80px 16px;

  &::v-deep {
    .nav-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
}
</style>

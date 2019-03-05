<template>
  <div class="contact">
    <nav-header/>
    <h1>This is a contact page</h1>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
//import contentApi from '@/components/ContentApi'
//import TextField from '@/components/TextField'

export default {
  name: 'Contact',
  components: {
    NavHeader,
 //   TextField,
  }
}
</script>


<style scoped lang="scss">
.contact {
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

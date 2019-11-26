<template>
  <div class="info">
    <nav-header/>
    <document-pane type="info" v-bind:uid="uid" v-slot="doc">
      <div class="title">
        <text-field v-bind:text="doc.results[0].data.title"/>
      </div>
      <div class="body">
        <text-field v-bind:text="doc.results[0].data.body"/>
      </div>
    </document-pane>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import DocumentPane from '@/components/DocumentPane.vue'
import TextField from '@/components/TextField'

export default {
  props: ['uid'],
  components: {
    NavHeader,
    DocumentPane,
    TextField,
  },
}
</script>

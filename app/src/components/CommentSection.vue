<template>
  <div class="comment-section" v-if="implemented">
    <comment-box/>
  </div>
</template>

<script>
import CommentBox from '@/components/CommentBox.vue';

export default {
  props: ['post'],
  components: {
    CommentBox,
  },
  data() {
    return {
      implemented: false,
    }
  },
  async created() {
    if(process.env.NODE_ENV === 'production') {
      return;
    }

    const response = await fetch(`/comments/${this.post}`);
    this.implemented = true;
    if(response.ok) {
      //const data = await response.json();
      //console.log(data);
    }
  },
}
</script>

<style scoped lang="scss">
</style>

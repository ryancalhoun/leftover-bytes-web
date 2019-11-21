<template>
  <div class="comment-section">
    {{ post }}

    <textarea
      placeholder="Leave a comment"
      rows="1"
      v-on:focus="focus($event)"
      v-on:blur="blur($event)"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    focus(e) {
      e.target.rows = 2;
    },
    blur(e) {
      e.target.rows = 1;
    },
  }
}
</script>

<style scoped lang="scss">
  textarea {
    padding: 4px 48px 4px 12px;
    border-radius: 4px;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: black;
    }
  }
</style>

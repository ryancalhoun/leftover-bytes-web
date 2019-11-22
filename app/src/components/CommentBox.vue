<template>
  <div class="comment-box">
    <textarea
      placeholder="Leave a comment"
      v-bind:rows="countLines()"
      v-model="message"
      v-on:focus="focus($event)"
      v-on:blur="blur($event)"
      v-on:keyup.enter="submit"
    ></textarea>

    <button v-on:click="submit" v-bind:disabled="!message.trim()">
      <send-icon/>
    </button>
  </div>
</template>

<script>
import SendIcon from 'vue-material-design-icons/Send.vue';
export default {
  data() {
    return {
      message: '',
      focused: false,
    }
  },
  components: {
    SendIcon,
  },
  methods: {
    countLines() {
      return this.message.split('\n').length + (this.focused ? 1 : 0);
    },
    focus(e) {
      this.focused = true;
    },
    blur(e) {
      this.trim();
      this.focused = false;
    },
    submit() {
    },
    trim() {
      this.message = this.message
                         .split("\n")
                         .map(x => x.trim())
                         .filter((x, i, a) => x || a[i] != a[i-1])
                         .join("\n")
                         .trim();
    }
  }
}
</script>

<style scoped lang="scss">
.comment-box {
  position: relative;
  button {
    background: none;
    border: none;
    position: absolute;
    right: 16px;
    bottom: 8px;
    &:not(:disabled) {
      cursor: pointer;
    }
  }
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
}
</style>

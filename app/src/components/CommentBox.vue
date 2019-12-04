<template>
  <div class="comment-box">
    <div class="user" v-if="user">
      <img v-bind:src="user.picture"/>
      <span> {{ user.name }} </span>
    </div>
    <textarea
      placeholder="Leave a comment"
      ref="input"
      v-bind:rows="rows()"
      v-model="message"
      v-on:focusin="focusin($event)"
      v-on:focus="focus($event)"
      v-on:blur="blur($event)"
    ></textarea>

    <button
      class="submit"
      v-on:click="submit($event)"
      v-on:mousedown.prevent
      v-on:touchstart.prevent
      v-bind:disabled="!message.trim()">
      <fa icon="paper-plane"/>
    </button>

    <modal class="small" v-if="login" v-on:close="login = false">
      <h4> Join the Conversation </h4>
      <p> Sign up to comment. </p>

      <button class="google" v-on:click="google()">
        <fa v-bind:icon='["fab", "google"]'/> Connect with Google
      </button>

      <p> <i>
        By signing up, you agree to our
        <router-link to="/privacy/" target="_blank">Privacy Policy</router-link>.
      </i> </p>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import qs from 'querystring';
export default {
  props: ['post', 'user', 'hash'],
  data() {
    return {
      message: '',
      focused: false,
      login: false,
    }
  },
  components: {
    Modal,
  },
  mounted() {
    if(this.hash == 'comment') {
      this.$refs.input.scrollIntoView();
      this.$refs.input.focus();
    }
  },
  methods: {
    rows() {
      let rows = this.message.split('\n').length;
      if(this.focused) {
        ++rows;
      }

      return Math.min(rows, 20);
    },
    focusin(e) {
      if(! this.user) {
        e.target.blur();
        this.login = true;
      }
    },
    focus(e) {
      this.focused = true;
    },
    blur(e) {
      this.trim();
      this.focused = false;
    },
    async submit(e) {
      this.trim();
      const response = await fetch(`/comments/${this.post}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.user.user_id,
          message: this.message,
        })
      });

      this.message = '';
      this.$refs.input.blur();
    },
    trim() {
      this.message = this.message
                         .split("\n")
                         .map(x => x.trim())
                         .filter((x, i, a) => x || a[i] != a[i-1])
                         .join("\n")
                         .trim();
    },
    google() {
      const returnUrl = new URL(window.location.href);
      returnUrl.hash = "comment";
      window.location = `/oauth/google?returnUrl=${encodeURIComponent(returnUrl.toString())}`;
    },
  }
}
</script>

<style scoped lang="scss">
.comment-box {
  position: relative;
  button.submit {
    background: none;
    border: none;
    position: absolute;
    right: 4px;
    font-size: 20px;
    @media screen and (min-width: 768px) {
      right: 16px;
    }
    bottom: 4px;
    &:not(:disabled) {
      cursor: pointer;
      color: green;
    }
  }
  button.google {
    width: 100%;
    text-align: left;
    color: white;
    cursor: pointer;
    background: #4285F4;
    border: none;
    padding: 12px 20px;
    .fa-google {
      width: 20px;
      margin-right: 12px;
    }
  }
  .user {
    padding: 8px 0;
    img, span {
      display: inline-block;
      vertical-align: bottom;
      height: 24px;
    }
    img {
      border-radius: 50%;
      width: 24px;
      margin: 0;
    }
    span {
      padding: 0 8px;
      line-height: 24px;
      color: #999;
    }
  }
  textarea {
    padding: 4px 32px 4px 12px;
    @media screen and (min-width: 768px) {
      padding-right: 48px;
    }
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

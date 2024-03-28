<template>
  <div class="comment-box">
    <div class="auth" v-if="user">
      <user v-bind:user="user"/>
      <button v-on:click="$emit('signout')">
        (sign out)
      </button>
    </div>
    <textarea
      placeholder="Leave a comment"
      ref="input"
      v-bind:rows="rows()"
      v-model="message"
      v-on:focusin="focusin($event)"
      v-on:focus="focus($event)"
      v-on:blur="blur($event)"
      v-bind:disabled="posting"
    ></textarea>

    <button
      class="submit"
      v-on:click="submit($event)"
      v-on:mousedown.prevent
      v-on:touchstart.prevent
      v-bind:disabled="!message.trim() || posting">
      <fa icon="circle-notch" spin v-if="posting"/>
      <fa icon="paper-plane" v-else/>
    </button>

    <modal class="small" v-if="login" v-on:close="login = false">
      <h4> Join the Conversation </h4>
      <p> Sign up to comment. </p>

      <button class="connect google" v-on:click="google()">
        <fa v-bind:icon='["fab", "google"]'/> Connect with Google
      </button>

      <button class="connect facebook" v-on:click="facebook()">
        <fa v-bind:icon='["fab", "facebook"]'/> Connect with Facebook
      </button>

      <button class="connect github" v-on:click="github()">
        <fa v-bind:icon='["fab", "github"]'/> Connect with Github
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
import User from '@/components/User.vue';

export default {
  props: ['post', 'user', 'hash'],
  data() {
    return {
      message: '',
      focused: false,
      login: false,
      posting: false,
      redirecting: false,
    }
  },
  components: {
    Modal,
    User,
  },
  mounted() {
    if(this.hash == 'comment') {
      setTimeout(() => {
        this.$refs.input.scrollIntoView();
        this.$refs.input.focus();
      }, 100);
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
      this.posting = true;
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

      this.$emit('post', await response.json());
      this.posting = false;
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
    github() {
      const returnUrl = new URL(window.location.href);
      returnUrl.hash = "comment";
      window.location = `/oauth/github?returnUrl=${encodeURIComponent(returnUrl.toString())}`;
    },
    facebook() {
      const returnUrl = new URL(window.location.href);
      returnUrl.hash = "comment";
      window.location = `/oauth/facebook?returnUrl=${encodeURIComponent(returnUrl.toString())}`;
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
  .auth {
    display: flex;
    align-items: center;
    button {
      background: none;
      border: 0;
      cursor: pointer;
      color: #748300;
    }
  }
  button.connect {
    width: 100%;
    text-align: left;
    color: white;
    cursor: pointer;
    border: none;
    padding: 12px 20px;
    margin: 1px 0;

    svg.fa-w-16 {
      width: 20px;
      margin-right: 12px;
    }
    &.google {
      background: #4285F4;
    }
    &.github {
      background: #24292e;
    }
    &.facebook {
      background: #4267B2;
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

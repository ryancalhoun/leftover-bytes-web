<template>
  <div class="comment-box">
    <textarea
      placeholder="Leave a comment"
      v-bind:rows="rows()"
      v-model="message"
      v-on:focusin="focusin($event)"
      v-on:focus="focus($event)"
      v-on:blur="blur($event)"
    ></textarea>

    <button class="submit" v-on:click="submit" v-bind:disabled="!message.trim()">
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
  methods: {
    rows() {
      let rows = this.message.split('\n').length;
      if(this.focused) {
        ++rows;
      }

      return Math.min(rows, 20);
    },
    focusin(e) {
      e.target.blur();
      this.login = true;
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
    },
    google() {
      const opts = {
        client_id: '403632071908-7v9k2mk0cdbqpg698hd1rsklt86rd4k8.apps.googleusercontent.com',
        nonce: "" + Math.random(),
        response_type: 'code', //'id_token',
        redirect_uri: `${window.location.origin}/oauth`,
        scope: 'openid profile email',
        state: window.location.pathname,
        prompt: 'select_account',
      };

      window.location = `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify(opts)}`;
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

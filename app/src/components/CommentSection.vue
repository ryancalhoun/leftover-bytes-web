<template>
  <div class="comment-section">
    <h2> Discussion </h2>

    <div class="comment" v-bind:key="index" v-for="(comment, index) in comments">
      <div class="author">
        <user v-bind:user='{ name: comment.name, picture: comment.picture }'/>
        <div class="date">{{ new Date(comment.created).toLocaleDateString() }}</div>
      </div>
      <div class="message">
        <p v-bind:key="index" v-for="(line, index) in linesOf(comment.message)">
          {{ line }}
        </p>
      </div>
    </div>

    <comment-box
      v-bind:post="post"
      v-bind:user="user"
      v-bind:hash="hash"
      v-on:post="update"
      v-on:signout="signout"
    />
  </div>
</template>

<script>
import CommentBox from '@/components/CommentBox.vue';
import User from '@/components/User.vue';

export default {
  props: ['post', 'hash'],
  components: {
    CommentBox,
    User,
  },
  data() {
    return {
      comments: [],
      user: null,
    }
  },
  async mounted() {
    const user_id = this.$cookies.get('user_id');
    if(user_id) {
      const user = await fetch(`/oauth/user/${user_id}`);
      this.user = Object.assign({user_id: user_id}, await user.json());
    }

    const response = await fetch(`/comments/${this.post}`);

    if(response.ok) {
      this.comments = await response.json();
    }
  },
  methods: {
    signout() {
      this.$cookies.remove('user_id');
      this.user = null;
    },
    update(newComment) {
      newComment.name = this.user.name;
      newComment.picture = this.user.picture;
      this.comments.push(newComment);

    },
    linesOf(message) {
      return message.split('\n');
    }
  }
}
</script>

<style scoped lang="scss">
h2 {
  color: #aaa;
}
.comment-section {
  border-top: 1px solid #ddd;
  margin: 40px 0;
  padding: 40px 0;

  .comment {
    margin-bottom: 40px;

    .author {
      display: flex;
      align-items: center;

      .user, .date {
        flex: 1;
      }

      .date {
        text-align: right;
        font-size: 14px;
        color: cornflowerblue;
      }
    }

    .message {
      p:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>

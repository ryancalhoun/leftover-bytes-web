import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Post from './views/Post.vue'
import PostList from './views/PostList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts/:year/:month/:uid',
      name: 'post-by-uid',
      component: Post
    },
    {
      path: '/posts/:id/:uid',
      name: 'post-by-id',
      component: Post
    },
    {
      path: '/posts/',
      name: 'post-list',
      component: PostList
    }
  ]
})

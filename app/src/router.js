import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Post from './views/Post.vue'
import Archive from './views/Archive.vue'
import Author from './views/Author.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
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
      path: '/archive',
      name: 'archive',
      component: Archive
    },
    {
      path: '/posts',
      redirect: { name: 'archive' }
    },
    {
      path: '/authors/:uid',
      name: 'author',
      component: Author
    },
    {
      path: '/*',
      redirect: { name: 'home' }
    },
  ]
})

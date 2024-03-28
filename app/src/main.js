import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import VScrollLock from 'v-scroll-lock'

import {
  faBars,
  faTimes,
  faTimesCircle,
  faPaperPlane,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGoogle,
  faGithub,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'

import { library } from '@fortawesome/fontawesome-svg-core'

library.add(
  faBars,
  faTimes,
  faTimesCircle,
  faPaperPlane,
  faCircleNotch,
  faGoogle,
  faGithub,
  faFacebook
);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App);

app.use(VueCookies);
app.use(VScrollLock);
app.use(router);
app.component('fa', FontAwesomeIcon);

app.mount('#app');

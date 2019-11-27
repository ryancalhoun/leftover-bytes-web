import Vue from 'vue'
import App from './App.vue'
import router from './router'
import tracking from './google/tracking'
import VueCookies from 'vue-cookies'
import VScrollLock from 'v-scroll-lock'

import {
  faBars,
  faTimes,
  faTimesCircle,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import {
  faGoogle,
} from '@fortawesome/free-brands-svg-icons'

import { library } from '@fortawesome/fontawesome-svg-core'

library.add(
  faBars,
  faTimes,
  faTimesCircle,
  faPaperPlane,
  faGoogle
);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './registerServiceWorker'

Vue.use(VueCookies)
Vue.use(VScrollLock)
Vue.component('fa', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  mounted: () => {
    tracking.attach();
    router.afterEach((to, from) => {
      tracking.update(to.path);
    });
  },
}).$mount('#app')

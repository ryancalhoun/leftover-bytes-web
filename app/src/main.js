import Vue from 'vue'
import App from './App.vue'
import router from './router'
import adsense from './google/adsense'
import tracking from './google/tracking'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'

library.add(faBars, faTimes);
Vue.component('fa', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  mounted: () => {
    adsense.attach();
    tracking.attach();
    router.afterEach((to, from) => {
      tracking.update(to.path);
    });
  },
}).$mount('#app')

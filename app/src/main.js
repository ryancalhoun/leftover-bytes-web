import Vue from 'vue'
import App from './App.vue'
import router from './router'
import tracking from './tracking'
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
    tracking.attach();
    router.afterEach((to, from) => {
      tracking.update(to.path);
    });
  }
}).$mount('#app')

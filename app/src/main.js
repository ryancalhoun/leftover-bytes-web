import Vue from 'vue'
import App from './App.vue'
import router from './router'
import tracking from './tracking'
import './registerServiceWorker'

Vue.config.productionTip = false

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

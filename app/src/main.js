import Vue from 'vue'
import App from './App.vue'
import content from './Content'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

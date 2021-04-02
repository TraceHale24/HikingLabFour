import Vue from 'vue'
import App from './App.vue'
import router from './router'

let data = {
  currentHike : null
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')

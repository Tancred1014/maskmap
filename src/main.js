import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
// import router from './router'

Vue.use(VueAxios, axios)
// Vue.use(bootstrap)

Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
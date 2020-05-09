import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from '../router/router'
import Vuetify from 'vuetify/lib';
import { store } from './store/index'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
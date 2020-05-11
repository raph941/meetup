import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from '../router/router'
import Vuetify from 'vuetify/lib';
import { store } from './store/index'
import DateFilter from './filters/date'
import * as firebase from 'firebase'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAIuGRzwH--FL_z8yZS1ZIHGsbSt7jqEr4',
      authDomain: 'meetupapp-b3531.firebaseapp.com',
      databaseURL: 'https://meetupapp-b3531.firebaseio.com',
      projectId: 'meetupapp-b3531',
      storageBucket: 'meetupapp-b3531.appspot.com',
      messagingSenderId: '62369155106',
      appId: '1:62369155106:web:96e0771154ca3ac9ada27b',
      measurementId: 'G-NDD85R695P'
    })
  }

}).$mount('#app')
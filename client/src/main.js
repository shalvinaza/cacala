import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap"
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas, fab)

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const base = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

Vue.prototype.$http = base;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

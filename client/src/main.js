import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'jquery'
import 'popper.js'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './assets/app.scss' 
import './assets/css/main.css'

createApp(App).use(router).mount('#app')

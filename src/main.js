import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import {fb } from "./firebase";


 createApp(App)
.use(router)
.use(fb)
.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import {fb } from "./firebase";
import Toaster from "@meforma/vue-toaster";


 createApp(App)
.use(router)
.use(fb)
.use(Toaster)
.mount('#app')

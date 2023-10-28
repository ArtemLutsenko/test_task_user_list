import ElementPlus from 'element-plus'
import './assets/main.scss'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import store from './store';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).use(store).use(ElementPlus)

app.mount('#app')

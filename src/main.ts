import './assets/main.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp, inject } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import { k8sClient, sampleClient } from './api/index';
const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueAxios, axios)
app.config.globalProperties.$k8sClient = k8sClient
app.config.globalProperties.$sampleClient = sampleClient
app.mount('#app')
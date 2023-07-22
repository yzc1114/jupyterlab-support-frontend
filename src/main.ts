import './assets/main.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp, inject } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import apiClient from './api/index';
const app = createApp(App)

const config = {
    ip: "139.9.165.93",
    port: "30308",
    namespace: 'jupyterlab-management',
};
  
// 提供全局常量信息
app.provide('config', config);

app.use(router)
app.use(ElementPlus)
app.use(VueAxios, axios)
app.config.globalProperties.$api = apiClient
app.config.globalProperties.$config = config;
app.mount('#app')
import './assets/main.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp, inject } from 'vue'
import ElementPlus from 'element-plus'
import zh from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as buffer from "buffer";
 
if (typeof (window as any).global === "undefined"){  
   (window as any).global = window;
}
if (typeof (window as any).Buffer === "undefined") { 
   (window as any).Buffer = buffer.Buffer;
}

import { k8sClient, sampleClient, dataClient } from './api/index';
const app = createApp(App)

app.use(router)
app.use(ElementPlus, {
    locale:zh
})
app.use(VueAxios, axios)
app.config.globalProperties.$k8sClient = k8sClient
app.config.globalProperties.$sampleClient = sampleClient
app.config.globalProperties.$dataClient = dataClient
app.mount('#app')
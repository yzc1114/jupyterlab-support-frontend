import './assets/main.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueAxios, axios)
app.mount('#app')
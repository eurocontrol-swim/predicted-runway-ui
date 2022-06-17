import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"
import mitt from 'mitt';

import AppConfig from './AppConfig.js'
import App from './App.vue'
import router from './router'

const emitter = mitt();

const app = createApp(App)
app.use(router)

app.config.globalProperties.$config = AppConfig;
app.config.globalProperties.$emitter = emitter;

app.mount('#app')

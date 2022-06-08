import { createApp } from 'vue'
import "bootstrap"
import AppConfig from './AppConfig.js'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App)

app.config.globalProperties.$config = AppConfig;

app.use(router)

app.mount('#app')

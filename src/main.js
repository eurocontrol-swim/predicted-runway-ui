import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"
import mitt from 'mitt';

import * as api from './common/api'
import AppConfig from './AppConfig.js'
import {AirportFactory} from "@/models/factory";
import App from './App.vue'
import router from './router'

const emitter = mitt();

const app = createApp(App)

app.config.globalProperties.$config = AppConfig;
app.config.globalProperties.$emitter = emitter;

app.use(router)

// delay app start until server config is retrieved
api.getConfig()
  .then((res) => {
    app.config.globalProperties.$config.destinationAirports = res.data.map(AirportFactory.fromServer);
    app.mount('#app');
  })
  .catch((error) => {
      console.error(`Couldn't load server config: ${error}`)
  });

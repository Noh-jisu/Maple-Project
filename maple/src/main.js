import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './resources/router/index.js'

import './assets/scss/ui.scss';

const app = createApp(App);

axios.defaults.baseURL = 'https://open.api.nexon.com'
app.config.globalProperties.axios = axios;
app.use(router).mount("#app");


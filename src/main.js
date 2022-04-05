import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App).use(store).use(router).use(Toast);

app.mount('#app');
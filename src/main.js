import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router'

const app = createApp(App);

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Cache-Control"] = "no-cache";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

app.use(router);
app.provide('axios', axios);
app.mount('#app');

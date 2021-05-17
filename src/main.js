import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router'

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Cache-Control"] = "no-cache";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

Vue.prototype.$axios = axios;

new Vue({
    el: "#app",

    router,

    template: '<App></App>',

    components: { 
        App 
    }
});
import Vue from 'vue';
import axios from 'axios';
import Router from 'vue-router';
import List from '../components/pages/List.vue';
import Details from '../components/pages/Details.vue';

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Cache-Control"] = "no-cache";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

Vue.prototype.$axios = axios;

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "List",
            component: List
        },
        {
            path: "/details/:id",
            name: "Details",
            component: Details
        }
    ]
});
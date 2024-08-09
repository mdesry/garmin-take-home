import { createMemoryHistory, createRouter } from 'vue-router';
import List from '../components/pages/List.vue';
import Details from '../components/pages/Details.vue';

const routes =  [{
    path: "/",
    name: "List",
    component: List
}, {
    path: "/details/:id",
    name: "Details",
    component: Details
}];

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import List from '../components/pages/List.vue';
import Details from '../components/pages/Details.vue';

const routes =  [
  {
    path: "/list",
    name: "List",
    component: List
  }, {
    path: "/details/:id",
    name: "Details",
    component: Details
  }, {
    path: '/:catchAll(.*)',
    redirect: '/list'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

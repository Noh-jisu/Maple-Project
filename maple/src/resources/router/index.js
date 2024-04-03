import { createWebHistory, createRouter } from "vue-router";
import Main from '../../components/Main.vue';
import Serve from '../../components/Serve.vue';

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/serve",
    component: Serve,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
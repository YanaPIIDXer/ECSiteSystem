import { createRouter, createWebHistory } from 'vue-router';
import Top from '../views/Top';
import LoginAdmin from '../views/LoginAdmin';

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: "/login_admin",
    name: "LoginAdmin",
    component: LoginAdmin
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

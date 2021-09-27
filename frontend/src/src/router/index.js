import { createRouter, createWebHistory } from 'vue-router';
import Top from '../views/Top';
import LoginAdmin from '../views/LoginAdmin';
import AdminTop from '../views/AdminTop';
import UserRegister from '../views/UserRegister';
import LoginUser from '../views/LoginUser';

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: "/register",
    name: "UserRegister",
    component: UserRegister
  },
  {
    path: "/login",
    name: "LoginUser",
    component: LoginUser
  },
  {
    path: "/login_admin",
    name: "LoginAdmin",
    component: LoginAdmin
  },
  {
    path: "/admin",
    name: "AdminTop",
    component: AdminTop
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

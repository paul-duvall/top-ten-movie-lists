import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/AddList.vue'
import Edit from '../views/EditList.vue'
import Signup from '../views/App/Signup.vue'
import Login from '../views/App/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/add',
    name: 'add',
    component: Add
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

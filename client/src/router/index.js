import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Presiden from '../views/Presiden.vue'
import Dpr_ri from '../views/Dpr_ri.vue'
import Dpd_ri from '../views/Dpd_ri.vue'
import Dprd_prov from '../views/Dprd_prov.vue'
import Dprd_kab_kota from '../views/Dprd_kab.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/presiden',
    name: 'Presiden',
    component: Presiden
  },
  {
    path: '/dpr_ri',
    name: 'Dpr_ri',
    component: Dpr_ri
  },
  {
    path: '/dpd_ri',
    name: 'Dpd_ri',
    component: Dpd_ri
  },
  {
    path: '/dprd_prov',
    name: 'Dprd_prov',
    component: Dprd_prov
  },
  {
    path: '/dprd_kab_kota',
    name: 'Dprd_kab_kota',
    component: Dprd_kab_kota
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

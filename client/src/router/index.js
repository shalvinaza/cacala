import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Presiden from '../views/Presiden.vue'
import Dpr_ri from '../views/Dpr_ri.vue'
import Dpd_ri from '../views/Dpd_ri.vue'
import Dprd_prov from '../views/Dprd_prov.vue'
import Dprd_kab_kota from '../views/Dprd_kab.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Login_admin from '../views/Login_admin.vue'
import Profil_user from '../views/Profil_user.vue'

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
    component: Login,
    meta: {guest: true}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login_admin',
    name: 'Login_admin',
    component: Login_admin
  },
  {
    path: '/profil_user',
    name: 'Profil_user',
    component: Profil_user
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.guest)){
    if(localStorage.getItem("token") == null){
      next()
    } else{
      next({ name: "Home" })
    }
  }else{
    next()
  }
})

export default router

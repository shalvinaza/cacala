import Vue from 'vue'
import createRouter from 'vue-router'
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
import Dasbor from '../views/Dasbor.vue'
import Detail_calon from '../views/Detail_calon.vue'
import Detail_pres from '../views/Detail_pres.vue'
import Detail_dummy from '../views/Detail_dummy.vue'
import Detail_admin_calon from '../views/Admin_calon.vue'
import Search from '../views/Search.vue'
import Edit_calon from '../views/Edit_calon.vue'

Vue.use(createRouter)

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
    path: '/dprd_prov/:id_provinsi',
    name: 'Dprd_prov',
    component: Dprd_prov
  },
  {
    path: '/dprd_kab_kota/:id_kota',
    name: 'Dprd_kab_kota',
    component: Dprd_kab_kota
  },
  {
    path: '/dasbor_saya',
    name: 'Dasbor',
    component: Dasbor,
    meta: {requiresAuth: true}
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
  },
  {
    path: '/detail_calon/:id_admin',
    name: 'Detail_calon',
    component: Detail_calon,
    props: true
  },
  {
    path: '/detail_admin_calon',
    name: 'Detail_admin_calon',
    component: Detail_admin_calon,
    meta: {admin: true}
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/detail_presiden',
    name: 'Detail_pres',
    component: Detail_pres
  },
  {
    path: '/detail_dummy',
    name: 'Detail_dummy',
    component: Detail_dummy
  },
  {
    path: '/edit_calon',
    name: 'Edit_calon',
    component: Edit_calon
  }
]

const router = new createRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(localStorage.getItem("token") == null){
      next({
        path: "/"
      }) 
    } else next()
  }
  else if(to.matched.some(record => record.meta.admin)){
    if(localStorage.getItem("token") == null){
      next({
        path: "/"
      }) 
    } else next()
  }
  else if(to.matched.some(record => record.meta.guest)){
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

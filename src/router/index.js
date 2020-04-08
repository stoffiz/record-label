import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Releases from '../views/Releases.vue'
import Release from '../views/Release.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
  },
  {
    path: '/releases',
    name: 'Releases',
    component: Releases
  },
  {
    path: '/release/:id',
    name: 'Release',
    component: Release, props: true
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

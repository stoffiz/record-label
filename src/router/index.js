import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import NewsDetail from '../views/NewsDetail.vue'
import Releases from '../views/Releases.vue'
import Release from '../views/Release.vue'
import Shop from '../views/Shop.vue'
import Contact from '../views/Contact.vue'
import Admin from '../views/Admin/List.vue'
import Add from '../views/Admin/Add.vue'
import Edit from '../views/Admin/Edit.vue'
import NewsAdd from '../views/Admin/NewsAdd.vue'
import NewsEdit from '../views/Admin/NewsEdit.vue'

Vue.use(Router)

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
    path: "/news/:id",
    name: "NewsDetail",
    component: NewsDetail, props: true
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
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/admin/edit/:id',
    name: 'Edit',
    component: Edit, props: true
  },
  {
    path: '/admin/news/add',
    name: 'NewsAdd',
    component: NewsAdd
  },
  {
    path: '/admin/news/edit/:id',
    name: 'NewsEdit',
    component: NewsEdit, props: true
  }

]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // if (authRequired && !loggedIn) {
  //   return next('/login');
  // }

  next();
})

export default router

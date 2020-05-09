import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import NewsDetail from '../views/NewsDetail.vue'
import Releases from '../views/Releases.vue'
import Release from '../views/Release.vue'
import Shop from '../views/Shop.vue'
import Checkout from '../views/Checkout.vue'
import Contact from '../views/Contact.vue'
import Admin from '../views/Admin/List.vue'
import ReleaseAdd from '../views/Admin/ReleaseAdd.vue'
import ReleaseEdit from '../views/Admin/ReleaseEdit.vue'
import NewsAdd from '../views/Admin/NewsAdd.vue'
import NewsEdit from '../views/Admin/NewsEdit.vue'
import MessageEdit from '../views/Admin/MessageEdit.vue'

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
    path: "/shop/checkout",
    name: "Checkout",
    component: Checkout
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
    path: '/admin/release/add',
    name: 'ReleaseAdd',
    component: ReleaseAdd
  },
  {
    path: '/admin/release/edit/:id',
    name: 'ReleaseEdit',
    component: ReleaseEdit, props: true
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
  },
  {
    path: '/admin/message/detail/:id',
    name: 'MessageEdit',
    component: MessageEdit, props: true
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

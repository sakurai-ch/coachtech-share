import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Profile from '../views/Profile.vue';
import Detail from '../views/Detail.vue';
import store from '../store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
    meta: {
      requestAuth: true,
    },
    props: true,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requestAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, frome, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth &&
      !store.state.auth)
  ){
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
})

export default router

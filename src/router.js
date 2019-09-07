import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/axios-2',
      name: 'axios-2',
      component: () => import(/* webpackChunkName: "axios-2" */ './views/2-2.vue')
    },
    {
      path: '/axios-3',
      name: 'axios-3',
      component: () => import(/* webpackChunkName: "axios-3" */ './views/2-3.vue')
    },
  ]
})

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
    {
      path: '/axios3-1',
      name: 'axios3-1',
      component: () => import(/* webpackChunkName: "axios3-1" */ './views/3-1.vue')
    },
    {
      path: '/axios3-2',
      name: 'axios3-2',
      component: () => import(/* webpackChunkName: "axios3-2" */ './views/3-2.vue')
    },
    {
      path: '/axios3-3',
      name: 'axios3-3',
      component: () => import(/* webpackChunkName: "axios3-3" */ './views/3-3.vue')
    },
    {
      path: '/axios3-4',
      name: 'axios3-4',
      component: () => import(/* webpackChunkName: "axios3-4" */ './views/3-4.vue')
    },
    {
      path: '/axios3-5',
      name: 'axios3-5',
      component: () => import(/* webpackChunkName: "axios3-5" */ './views/3-5.vue')
    },
    {
      path: '/contactList',
      name: 'contactList',
      component: () => import(/* webpackChunkName: "contactList" */ './views/ContactList.vue')
    },
    {
      path: '/contactList2',
      name: 'contactList2',
      component: () => import(/* webpackChunkName: "contactList2" */ './views/ContactList2.vue')
    },
  ]
})

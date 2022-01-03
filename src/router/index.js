import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/products/',
    component: () => import('../views/Products.vue'),
  },
  {
    path: '/products/:type1',
    component: () => import('../views/Products.vue'),
  },
  {
    path: '/products/:type1/:type2',
    component: () => import('../views/Products.vue'),
  },
  {
    path: '/details',
    component: () => import('../views/Details.vue'),
  },
  {
    path: '/order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/forgetPwd',
    component: () => import('../views/forgetPwd.vue')
  },
]

// 建立 VueRouter 實體物件
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // scrollBehavior (savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})


export default router
import { createRouter, createWebHashHistory  } from 'vue-router';
import Header from '../components/Header.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

const routes = [
  {
    path: '/',
    components: {
      default: () => import('../views/Home.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/products',
    components: {
      default: () => import('../views/Products.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/products/:type1',
    components: {
      default: () => import('../views/Products.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/products/:type1/:type2',
    components: {
      default: () => import('../views/Products.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/details',
    components: {
      default: () => import('../views/Details.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/order',
    components: {
      default: () => import('../views/Order.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/contact',
    components: {
      default: () => import('../views/Contact.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/login',
    components: {
      default: () => import('../views/Login.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/user',
    components: {
      default: () => import('../views/User.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/cart',
    components: {
      default: () => import('../views/Cart.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/checkout',
    components: {
      default: () => import('../views/Checkout.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/forgetPwd',
    components: {
      default: () => import('../views/ForgetPwd.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/admin',
    component: () => import('../views/admin/admin.vue'),
    children: [
      {
        path: 'product',
        component: () => import('../views/admin/product.vue')
      },
      {
        path: 'user',
        component: () => import('../views/admin/user.vue')
      },
      {
        path: 'order',
        component: () => import('../views/admin/order.vue')
      },
      {
        path: 'product/addProduct',
        component: () => import('../views/admin/addProduct.vue')
      },
    ]
  },
]

// 建立 VueRouter 實體物件
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// })

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})


export default router
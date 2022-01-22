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
    },
    meta: {title: '首頁'}
  },
  {
    path: '/products',
    components: {
      default: () => import('../views/Products.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
    meta: {title: '全部商品'}
  },
  {
    path: '/products/:type1',
    components: {
      default: () => import('../views/Products.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
    meta: {title: '商品分類'}
  },
  {
    path: '/products/:type1/:type2',
    components: {
      default: () => import('../views/Products.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
    meta: {title: '商品分類'}
  },
  {
    path: '/details',
    components: {
      default: () => import('../views/Details.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
  },
  {
    path: '/order',
    components: {
      default: () => import('../views/Order.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
    meta: {title: '我的訂單'}
  },
  {
    path: '/contact',
    components: {
      default: () => import('../views/Contact.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
    meta: {title: '聯絡我們'}
  },
  {
    path: '/login',
    components: {
      default: () => import('../views/Login.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
    meta: {title: '會員登入'}
  },
  {
    path: '/user',
    components: {
      default: () => import('../views/User.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
    meta: {title: '個人資料'}
  },
  {
    path: '/cart',
    components: {
      default: () => import('../views/Cart.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
    meta: {title: '購物車'}
  },
  {
    path: '/checkout',
    components: {
      default: () => import('../views/Checkout.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
    meta: {title: '結帳'}
  },
  {
    path: '/forgetPwd',
    components: {
      default: () => import('../views/ForgetPwd.vue'),
      header: Header,
      navbar: Navbar,
      footer: Footer,
    },
    meta: {title: '忘記密碼'}
  },
  {
    path: '/admin',
    component: () => import('../views/admin/admin.vue'),
    children: [
      {
        path: 'product',
        component: () => import('../views/admin/product.vue'),
        meta: {title: '商品列表'}
      },
      {
        path: 'user',
        component: () => import('../views/admin/user.vue'),
        meta: {title: '會員列表'},
      },
      {
        path: 'order',
        component: () => import('../views/admin/order.vue'),
        meta: {title: '訂單列表'},
      },
      {
        path: 'product/addProduct',
        component: () => import('../views/admin/addProduct.vue'),
        meta: {title: '新增產品'},
      },
    ]
  },
]

// Mode: history
// 建立 VueRouter 實體物件
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// })

// Mode: hash
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.meta.title !== undefined) {    
    window.document.title = to.meta.title + ' | 八乘八文具鋪';
    next();
  }else {
    next();
  }
})


export default router
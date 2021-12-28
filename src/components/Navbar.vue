<template>
  <div class="nav-container">
    <div class="nav-top">
      <img
        class="logo"
        @click="$router.push('/')"
        src="../assets/image/logo.svg"
        alt=""
      />
    </div>
    <div class="nav-bottom">
      <div class="nav-bar" ref="navBar">
        <ul>
          <li>
            <router-link to="/" :class="$route.path === '/' ? 'active' : ''"
              >前往首頁</router-link
            >
          </li>
          <li>
            <router-link
              to="/products"
              :class="$route.path === '/products' ? 'active' : ''"
              >全部商品</router-link
            >
          </li>
          <li>
            <router-link
              to="/order"
              :class="$route.path === '/order' ? 'active' : ''"
              >我的訂單</router-link
            >
          </li>
          <li>
            <router-link
              to="/contact"
              :class="$route.path === '/contact' ? 'active' : ''"
              >聯絡我們</router-link
            >
          </li>
        </ul>
      </div>

      <div class="action-menu">
        <div class="search-btn">
          <!-- <input type="text" placeholder="搜索全部商品"> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(100, 100, 100, 1); transform: ; msfilter: "
          >
            <path
              d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"
            ></path>
          </svg>
        </div>
        <div class="login-btn" @click="handleLogin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            style="fill: rgba(100, 100, 100, 1); transform: ; msfilter: "
          >
            <path
              d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
            ></path>
          </svg>
        </div>
        <div class="cart-btn" @click="$router.push('/cart')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(100, 100, 100, 1); transform: ; msfilter: "
          >
            <path
              d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"
            ></path>
            <circle cx="10.5" cy="19.5" r="1.5"></circle>
            <circle cx="17.5" cy="19.5" r="1.5"></circle>
          </svg>
          <span>{{ $store.state.itemInCart }}</span>
        </div>
      </div>
    </div>
    <div class="fixed-container" ref="fixedContainer">
      <div class="logo-container">
        <img
          class="fixed-logo"
          @click="$router.push('/')"
          src="../assets/image/logo.svg"
          alt=""
        />
      </div>
      <div class="nav-bar">
        <ul>
          <li>
            <router-link to="/" :class="$route.path === '/' ? 'active' : ''"
              >前往首頁</router-link
            >
          </li>
          <li>
            <router-link
              to="/products"
              :class="$route.path === '//Products' ? 'active' : ''"
              >全部商品</router-link
            >
          </li>
          <li>
            <router-link
              to="/order"
              :class="$route.path === '/Order' ? 'active' : ''"
              >我的訂單</router-link
            >
          </li>
          <li>
            <router-link
              to="/contact"
              :class="$route.path === '/Contact' ? 'active' : ''"
              >聯絡我們</router-link
            >
          </li>
        </ul>
      </div>
      <div class="action-menu">
        <div class="search-btn">
          <!-- <input type="text" placeholder="搜索全部商品"> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(100, 100, 100, 1); transform: ; msfilter: "
          >
            <path
              d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"
            ></path>
          </svg>
        </div>
        <div class="login-btn" @click="handleLogin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            @click="openLoginModal"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            style="fill: rgba(100, 100, 100, 1); transform: ; msfilter: "
          >
            <path
              d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
            ></path>
          </svg>
        </div>
        <div class="cart-btn" @click="$router.push('/cart')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(100, 100, 100, 1); transform: ; msfilter: "
          >
            <path
              d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"
            ></path>
            <circle cx="10.5" cy="19.5" r="1.5"></circle>
            <circle cx="17.5" cy="19.5" r="1.5"></circle>
          </svg>
          <span>{{ $store.state.itemInCart }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/config/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export default {
  name: "Navbar",
  data() {
    return {
      navBarOT: 0,
    };
  },

  created() {
    // MDN: EventTarget.addEventListener() 方法将指定的监听器注册到 EventTarget 上
    // 所以這行寫在 created項目
    window.addEventListener("scroll", this.handleScroll);

    onAuthStateChanged(auth, (user) => {
        // 設定vue store 購物車物件數量
        // 有登入
        if (user) {
          const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          getDocs(q).then((val) => {
            val.forEach((doc) => {
              const cartRef = collection(db, "users", doc.id, "cart");
              getDocs(cartRef).then((val) => {
                this.$store.commit("setCart", val.size);
              });
            });
          });
        }
        // 無登入
        else {
          if (localStorage.getItem("products_in_cart") !== null) {
            let items = JSON.parse(localStorage.getItem("products_in_cart"));
            this.$store.commit("setCart", items.length);
          }
        }
        
    })
  },

  mounted() {
  },

  methods: {
    handleScroll() {
      // 滾動頁面時，偏移量大於小於nav-bar元素原始的 offsetTop，給予元素不同透明度
      this.$refs.fixedContainer.style.opacity = window.scrollY > 178 ? "100" : "0";
    },

    handleLogin() {
      const user = auth.currentUser;
      // 以登入情況下
      if (user) {
        this.$router.push("/user");
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="less" scoped>
a {
  color: rgb(41, 41, 41);
  text-decoration: none;
}
.nav-container {
  .fixed-container {
    display: flex;
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    background: #ffffff;
    box-shadow: 2px 2px 2px 1px rgba(168, 168, 168, 0.2);
    transition: opacity 0.5s ease-out;
    opacity: 0%;
    .logo-container {
      position: absolute;
      left: 20px;
      .fixed-logo {
        width: 150px;
        height: 50px;
      }
    }
    .nav-bar {
        
    }
  }
  .nav-top {
    display: flex;
    .logo {
      width: 250px;
      margin: 10px auto;
      cursor: pointer;
    }
  }
  .nav-bottom {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: #b1b1b1 1px solid;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  }
}

.nav-bar {
  display: flex;
  align-items: center;
  margin: auto;
  font-weight: 300;
  transition: 2s ease-out;
  ul {
    display: flex;
    justify-content: space-around;
    margin: 16px 0;
    padding: 0;
    li {
      width: 100px;
      height: 20px;
      text-align: center;
    }
  }
}
.action-menu {
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 15px;
  right: 60px;
  div {
    margin-right: 10px;
  }
  .search-btn {
    cursor: pointer;
  }
  .login-btn {
    cursor: pointer;
  }
  .cart-btn {
    display: flex;
    cursor: pointer;
  }
}

// 導航列被選取時
.active {
  color: var(--color-lighten-orange);
}
</style>
    
<template>
  <div>
    <div class="logo-container">
      <img
        class="logo"
        @click="$router.push('/')"
        src="../assets/image/logo.svg"
        alt=""
      />
    </div>


    <div class="nav-container">
      <div class="empty"></div>
      <ul class="nav-bar" ref="navBar">
        <li>
          <router-link to="/" :class="$route.path === '/' ? 'active' : ''" 
            >首頁</router-link
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
      <div class="action-menu">
        <div class="search-btn">
          <label class="search" for="inpt_search">
            <input id="inpt_search"
              ref="search"
              @focus="handleFocus($event)"
              @blur="handleBlur($event)"
              @keyup.enter="handleSearch($event)"
              v-model="search"
              type="text" 
              placeholder="搜尋商品"
              />
          </label>
        </div>
        <div class="login-btn" @click="handleLogin">
          <box-icon name='user' color='#646464'></box-icon>
        </div>
        <div class="cart-btn" @click="$router.push('/cart')">
          <box-icon name='cart' color='#646464' animation='tada-hover'></box-icon>
          <span>{{ $store.state.itemInCart }}</span>
        </div>
      </div>
      <div class="menu-toggle" id="mobile-menu" @click="memuToggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>

    <!-- fixed-container -->
    <div class="fixed-container" ref="fixedContainer">
      <div class="nav-logo-container">
        <img
          class="nav-logo"
          @click="$router.push('/')"
          src="../assets/image/logo.svg"
          alt=""
        />
      </div>
      <ul class="nav-bar">
        <li>
          <router-link to="/" :class="$route.path === '/' ? 'active' : ''"
            >首頁</router-link
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
      <div class="action-menu">
        <div class="search-btn">
          <label class="search" for="inpt_search">
            <input id="inpt_search" 
              ref="search"
              @focus="handleFocus($event)"
              @blur="handleBlur($event)"
              @keyup.enter="handleSearch"
              v-model="search"
              type="text" 
              placeholder="搜尋商品"
            />
          </label>
        </div>
        <div class="login-btn" @click="handleLogin">
          <box-icon name='user' color='#646464'></box-icon>
        </div>
        <div class="cart-btn" @click="$router.push('/cart')">
          <box-icon name='cart' color='#646464' animation='tada-hover'></box-icon>
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
import 'boxicons';

export default {
  name: "Navbar",
  data() {
    return {
      navBarOT: 0,
      search: '',
      fixedNav:false
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
    handleSearch(event) {
      if(event.currentTarget.parentElement.classList.contains('active')) {
        this.$router.push(`/products?query=${this.search}`);
      }
    },
    handleFocus(event) {
      event.currentTarget.parentElement.classList.add('active');
    },
    handleBlur(event) {
      if(this.search.length == 0) {
        event.currentTarget.parentElement.classList.remove('active');
      }
    },
    memuToggle() {
      console.log(123);
      this.$refs.navBar.classList.toggle('mobile-nav');
      document.getElementById('moblie-memu').classList.toggle('is-active');
    }
  },
};
</script>

<style lang="less" scoped>
a {
  color: rgb(41, 41, 41);
  text-decoration: none;
}

.logo-container {
  display: flex;
  align-items: center;
  .logo {
    width: 250px;
    margin: 10px auto;
    cursor: pointer;
  }
}


// DEFAULT NAV
.nav-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  width: 100%;
  border-bottom: #b1b1b1 1px solid;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  margin: auto;
}


// FIXED NAV
.fixed-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  background: #ffffff;
  box-shadow: 2px 2px 2px 1px rgba(168, 168, 168, 0.2);
  transition: opacity 0.5s ease-out;
  opacity: 0%;
}



// DEFAULT NAV + FIXED NAV 都有使用的元素類別
.nav-logo-container {
  display: flex;
  align-items: center;
  margin: 5px 0;
  .nav-logo {
    width: 150px;
    height: 50px;
  }
}

.nav-bar {
  display: flex;
  align-items: center;
  margin: 0 auto;
  font-weight: 400;
  li {
    width: 100px;
    height: 55px;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0 auto;
    text-align: center;
  }
}

.action-menu {
  display: flex;
  margin-left: auto;
  &::after {
    content: '';
    width: 50px;
  }
  div {
    margin: auto 5px;
  }
  .search-btn {
    display: flex;
    align-items: center; 
  }
  .login-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .cart-btn {
    display: flex;
    cursor: pointer;
  }
}

// nav hover 效果
.nav-bar li a{
  position: relative;
  z-index: 1;
  &:hover {
    color: #fff;
  }
  &::after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 1px;
    content: '.';
    color: transparent;
    background: var(--color-dark-yellow);
    visibility: none;
    opacity: 0;
    z-index: -1;
    transition: height .5s;
  }
  &:hover:after {
    opacity: 1;
    visibility: visible;
    height: 100%;
  }
}


// 導航列被選取時
.active {
  color: var(--color-lighten-orange);
}

// 搜尋 icon製作
.search {
  display: inline-block;
  position: relative;
  height: 18px;
  width: 18px;
  box-sizing: border-box;
  border: 2.5px solid #646464;
  border-radius: 999em;
  transition: all 200ms ease;
  margin-right: 12px;
  cursor: text;
  
  &:after {
    content: "";
    position: absolute;
    width: 2px;
    height: 8px;
    right: -3px;
    top: 12px;
    background: #646464;
    border-radius: 3px;
    transform: rotate(-45deg);
    transition: all 200ms ease;
  }
  
  &.active, &:hover {
    width: 200px;
    height: 30px;
    margin-right: 0px;
    border: 1px solid #646464;
    &:after {
      height: 0px;  
    }
  }
  
  input {
    width: 100%;
    border: none;
    box-sizing: border-box;
    font-family: Helvetica;
    font-size: 15px;
    color: inherit;
    background: transparent;
    outline-width: 0px;
    text-indent: 15px;
  }
}

/* MOBILE MENU & ANIMATION */
.menu-toggle .bar{
  width: 25px;
  height: 3px;
  background-color: #3f3f3f;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.menu-toggle {
  justify-self: end;
  margin-right: 25px;
  display: none;
}

.menu-toggle:hover{
  cursor: pointer;
}

#mobile-menu.is-active .bar:nth-child(2){
  opacity: 0;
}

#mobile-menu.is-active .bar:nth-child(1){
  -webkit-transform: translateY(8px) rotate(45deg);
  -ms-transform: translateY(8px) rotate(45deg);
  -o-transform: translateY(8px) rotate(45deg);
  transform: translateY(8px) rotate(45deg);
}

#mobile-menu.is-active .bar:nth-child(3){
  -webkit-transform: translateY(-8px) rotate(-45deg);
  -ms-transform: translateY(-8px) rotate(-45deg);
  -o-transform: translateY(-8px) rotate(-45deg);
  transform: translateY(-8px) rotate(-45deg);
}


@media only screen and (max-width: 720px) {
  .logo-container {
    display: none;
  }

  .nav-bar{
    position: fixed;
    top: 70px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    height: calc(100vh - 55px);
    background-color: #fff;
    transform: translate(-101%);
    text-align: center;
  }

  .menu-toggle, .bar {
    display: block;
    cursor: pointer;
  }

  .mobile-nav {
    transform: translate(0%)!important;
  }
}

</style>
    
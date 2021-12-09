<template>
    <div class="nav-container">
        <div class="nav-top">
            <img class="logo" @click="$router.push('/')" src="../assets/image/logo.svg" alt="">
        </div>
        <div class="nav-bottom">
            <div class="nav-bar" ref="navBar">
                <ul>
                    <li><router-link to="/" :class="$route.path === '/'?'active':''">前往首頁</router-link></li>
                    <li><router-link to="/products" :class="$route.path === '/products'?'active':''">全部商品</router-link></li>
                    <li><router-link to="/free" :class="$route.path === '/free'?'active':''">抗漲專區</router-link></li>
                    <li><router-link to="/order" :class="$route.path === '/order'?'active':''">我的訂單</router-link></li>
                    <li><router-link to="/contact" :class="$route.path === '/contact'?'active':''">聯絡我們</router-link></li>
                </ul>
            </div>
            <div class="action-menu">
                <div class="search-btn">
                    <!-- <input type="text" placeholder="搜索全部商品"> -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(100, 100, 100, 1);transform: ;msFilter:;">
                        <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
                    </svg>  
                </div>
                <router-link to="/login">
                   <div class="login-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: rgba(100, 100, 100, 1);transform: ;msFilter:;">
                            <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                        </svg>
                  </div>
                </router-link>
                <div class="cart-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(100, 100, 100, 1);transform: ;msFilter:;">
                        <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle>
                    </svg>
                </div>
            </div>
        </div>
        <div class="fixed-nav-bar" ref="navFixedBar">
            <div class="logo-container">
                <img class="fixed-logo" @click="$router.push('/')" src="../assets/image/logo.svg" alt="">
            </div>
            <div class="nav-bar">
                <ul>
                    <li><router-link to="/"  :class="$route.path === '/'?'active':''">前往首頁</router-link></li>
                    <li><router-link to="/products" :class="$route.path === '//Products'?'active':''">全部商品</router-link></li>
                    <li><router-link to="/free" :class="$route.path === '/Free'?'active':''">抗漲專區</router-link></li>
                    <li><router-link to="/order" :class="$route.path === '/Order'?'active':''">我的訂單</router-link></li>
                    <li><router-link to="/contact" :class="$route.path === '/Contact'?'active':''">聯絡我們</router-link></li>
                </ul>
            </div>
            <div class="action-menu">
                <div class="search-btn">
                    <!-- <input type="text" placeholder="搜索全部商品"> -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(100, 100, 100, 1);transform: ;msFilter:;">
                        <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
                    </svg>  
                </div>
                <div class="login-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" @click="openLoginModal" viewBox="0 0 24 24" width="24" height="24" style="fill: rgba(100, 100, 100, 1);transform: ;msFilter:;">
                        <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                    </svg>
                </div>
                <div class="cart-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(100, 100, 100, 1);transform: ;msFilter:;">
                        <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            'navBarOT': 0,
        }
    },
    created() {
        // MDN: EventTarget.addEventListener() 方法将指定的监听器注册到 EventTarget 上
        // 所以這行寫在 created項目
        window.addEventListener('scroll', this.handleScroll);
    },
    mounted() {
        // this.navBarOT = this.$refs.navBar.getBoundingClientRect().top;
        // console.log('剛掛載: ' + this.navBarOT);
    },
    methods: {
        'handleScroll': function() {
            // 滾動頁面時，偏移量大於小於nav-bar元素原始的 offsetTop，給予元素不同透明度
            this.$refs.navFixedBar.style.opacity = window.scrollY > 178 ? '100' : '0';            
        }
    },
}

</script>

<style lang="less" scoped>
    a {
        color: rgb(41, 41, 41);
        text-decoration: none;
    }
    .nav-container {
        .fixed-nav-bar {
            display: flex;
            justify-content: space-between;
            position: fixed;
            top: 0;
            background: #ffffff;
            width: 100%;
            box-shadow: 2px 2px 2px 1px rgba(168, 168, 168, 0.2);
            opacity: 0%;
            transition: opacity 0.5s ease-out;
            z-index: 10;
            .logo-container {
                width: 250px;
                height: 50px;
                margin-left: 35px;
                .fixed-logo {
                    width: 150px;
                    height: 100%;
                }
            } 
            .nav-bar {
                margin-left: 0;
                margin-right: 600px;
            }
        }
        .nav-top {
            display: flex;
            .logo {
                width: 250px;
                cursor: pointer;
                margin: 10px auto;
            }   
        }
        .nav-bottom {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
            border-bottom: #b1b1b1 1px solid;
        }
        
    }


    .nav-bar {
        display: flex;
        align-items: center;
        font-weight: 400;
        transition: 2s ease-out;
        margin-left: 530px;
        ul {
            display: flex;
            justify-content: space-around;
            padding: 0;
            margin: 16px 0;
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
        margin-right: 50px;
        margin-top: 4px;
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
            cursor: pointer;
            display: flex;
        }
    }


    // 導航列被選取時
    .active {
        color: #f0f001;
    }

</style>
    
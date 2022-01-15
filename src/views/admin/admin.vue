<template>
    <div class="admin">
        <div class="header">
            <div class="logo">
                <img src="@/assets/image/logo.svg"/>
            </div>
            <div class="title">後臺管理系統</div>
            <div class="logout" @click="$router.push('/')">離開</div>
        </div>
        <div class="sidebar">
            <nav>
                <ul class="menu">
                    <li @click="$router.push('/admin/product')">商品管理</li>
                    <li @click="$router.push('/admin/user')">會員管理</li>
                    <li @click="$router.push('/admin/order')">訂單管理</li>
                </ul>
            </nav>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    .admin {
        display: grid;
        width: 100%;
        height: 100vh;
        grid-template-areas: 
        "header header"
        "sidebar main";
        grid-template-rows: 70px 1fr;
        grid-template-columns: 250px 1fr;
    }
    .header {
        display: flex;
        grid-area: header;
        background-color: #ffffff;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        .logo {
            display: flex;
            width: 250px;
            height: 100%;
            img {
                width: 150px;
                margin: 0 auto;
            }
        }
        .title {
            display: flex;
            align-items: center;
            font-size: 25px;
            margin-right: 5px;
        }
        .logout {
            display: flex;
            align-items: center;
            color: cornflowerblue;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .sidebar {
        grid-area: sidebar;
        background-color: #313541;
    }

    .main {
        grid-area: main;
        background-color: #E8EDF0;
    }

    .menu {
        li {
            padding: 1rem 2rem;
            color: #76808f;
            cursor: pointer;
        }
    }
</style>
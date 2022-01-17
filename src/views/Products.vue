<template>
    <div class="container">
        <div class="sidebar">
            <side-bar></side-bar>
        </div>
        <div class="pd-list">
            <div class="top">
                <div class="breadcrumb-wrap">
                    <bread-crumb></bread-crumb>
                </div>
                <select v-model="sort" >
                    <option value="default">默認排序</option>
                    <option value="lowToHigh">價錢:低到高</option>
                    <option value="HighToLow">價錢:高到低</option>
                </select>
            </div>
            <div class="list">
                <product-list :sort="sort"></product-list>
            </div>
        </div>
    </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import SideBar from "@/components/SideBar.vue";
import ProductList from "@/components/Product-list.vue";

export default {
    name: 'Products',
    components: {
        'bread-crumb': Breadcrumb,
        'side-bar': SideBar,
        'product-list': ProductList,
    },
    data() {
        return {
            sort: 'default',
        }
    },
    
}
</script>

<style lang="less" scoped>
    .container {
        display: flex;
        justify-content: center;
        max-width: 1600px;
        min-width: 1200px;
        margin: 50px auto;
    }
    .sidebar {
        margin-top: 100px;
        margin-right: 30px;
    }
    .pd-list {
        width: 80%;
        .top {
            display: flex;
            justify-content: space-between;
            margin-left: 10px;
            width: 90%;
            select {
                width: 170px;
                height: 40px;
                font-size: 16px;
                text-indent: 5px;
            }
            .breadcrumb-wrap {
                display: flex;
                align-items: center;
            }
        }
        .list {
            width: 100%;
        }
    }
</style>
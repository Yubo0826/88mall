<template>
    <div class="products-container">
        <div class="sidebar-wrap">
            <side-bar></side-bar>
        </div>
        <div>
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
            <div class="list-wrap">
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
    .products-container {
        display: flex;
        max-width: 1200px;
        margin: 50px auto;
    }
    .sidebar-wrap {
        margin-top: 100px;
        margin-right: 30px;
    }
    .top {
        display: flex;
        justify-content: space-between;
        margin-left: 10px;
        select {
            width: 170px;
            height: 40px;
            margin-right: 150px;
            font-size: 16px;
            text-indent: 5px;
        }
        .breadcrumb-wrap {
            display: flex;
            align-items: center;
        }
    }
</style>
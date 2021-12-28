<template>
    <div>
        <nav>
          <ul class="breadcrumb-list">
            <li class="breadcrumb-item">
                <router-link to="/products">全部商品</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/products">{{typeName}}</router-link>
            </li>
            <li class="breadcrumb-item" v-if="productName">{{productName}}</li>
          </ul>
        </nav>
    </div>
</template>

<script>
import { getProdDetail } from "@/request/api.js";

export default {
    data() {
        return {
            typeUrl: null,
            typeName: null,
            productName: null,
        }
    },
    created() {
        if(this.$route.params.type) {
            switch(this.$route.params.type) {
                case 'stationery':
                    this.typeName = '文具';
                    this.typeUrl = '/products/stationery';
                    break
                case 'dailyuse':
                    this.typeName = '生活用品';
                    this.typeUrl = '/products/dailyuse';
                    break
                default:
                    this.typeName = '衣料';
                    this.typeUrl = '/products/clothing';
                    break
            }
        }else {
            getProdDetail(this.$route.query.id).then((res) => {
                switch(res.class[0]) {
                case 'stationery':
                    this.typeName = '文具';
                    this.typeUrl = '/products/stationery';
                    break
                case 'dailyuse':
                    this.typeName = '生活用品';
                    this.typeUrl = '/products/dailyuse';
                    break
                default:
                    this.typeName = '衣料';
                    this.typeUrl = '/products/clothing';
                    break
                }
            });
        }
    },
}
</script>

<style lang="less" scoped>
    * {
        color: rgb(121, 121, 121);
    }
    a{
        text-decoration: none;
        &:hover {
            color: var(--color-dark-yellow);
            text-decoration:underline;
            cursor: pointer;
        }
    }
    .breadcrumb-list {
        display: flex;
        li {
            font-size: 0.85rem;
            letter-spacing: 0.125rem;
            text-transform: uppercase;
        }
    }
    .breadcrumb-item {
        &:first-of-type ~ .breadcrumb-item {
            &::before {
                content: '/';
                display: inline-block;
                padding: 0 0.5rem;
            
            }
        }
    }
</style>
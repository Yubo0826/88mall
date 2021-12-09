<template>
    <div class="product-list-area">
        <div class="product-list-title"><span>精選商品</span></div>
        <ul class="product-list">
            <li v-for="item in arr" :key="item.id" @click="goDetailsFn(item.id)">
                <img v-ProdImg="item.imgRef" alt="">
                <div class="product-name">{{ item.name }}</div>
                <div class="product-price">NT${{ item.price }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { getProdImgUrl } from "@/request/api.js";

export default {
    data() {
        return {
            
        }
    },
    props: ['arr'],
    methods: {
        goDetailsFn: function(id) {
            this.$router.push(`/details?id=${id}`);
        },
    },
    directives: {
        'ProdImg': function(el, binding) {
            let imgRef = binding.value;
            getProdImgUrl(imgRef).then((url) => {
                console.log(url);
                el.src = url;
            })
        }
    },
}
</script>

<style lang="less">
.product-list-area {
    width: 80%; 
    margin: 0 auto;
    .product-list-title {
        font-size: 40px;
        font-weight: 600;
        margin: 70px 0 40px 0;
        text-align: center;
        span {
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
        }
    }
    .product-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center; 
        padding: 0;
        li {
            width: 25%;
            padding: 0 10px;
            box-sizing: border-box;
            margin-bottom: 50px;
            cursor: pointer;
            position: relative;
            img {
                width: 100%;
                height: 283px;
            }
            img:hover  {
                -webkit-filter: opacity(.2);
            }
        }
    }
    
}
</style>
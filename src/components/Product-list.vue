<template>
    <div class="list-container">
        <ul class="product-list">
            <li class="product-item" v-for="item in sortList" :key="item.id" @click="goDetailsFn(item.id)">
                <img v-ProdImg="item.imgRef" alt="">
                <div class="product-name word">{{ item.name }}</div>
                <div class="product-price word">NT$ <span>{{ item.price }}</span></div>
            </li>
        </ul>
    </div>
</template>

<script>
import { db } from "@/config/firebaseConfig.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getProdImgUrl } from "@/request/api.js";

export default {
    data() {
        return {
            productsList: [],
            test: []
        }
    },
    props: ['sort'],
    beforeMount() {
        if(typeof this.$route.params.type !== "undefined") {
            var q = query(collection(db, "products"), where('class', 'array-contains', this.$route.params.type));
            getDocs(q).then((val) => {
                val.forEach((doc) => {
                    this.productsList.push(doc.data());
                })
            })
        } else {
            getDocs(collection(db, "products")).then((val) => {
                val.forEach((doc) => {
                    this.productsList.push(doc.data());
                })
            })
        }
    },
    computed: {
        sortList() {
            // props 父傳值給子，依造不同排序對應商品排列方式
            switch(this.sort) {
                case 'lowToHigh':
                    return this.selectionSort(this.productsList);
                case 'HighToLow':
                    return this.selectionSort(this.productsList).reverse();
                default:
                    return this.productsList;
            }
        },
    },
    methods: {
        goDetailsFn: function(id) {
            this.$router.push(`/details?id=${id}`);
        },
        selectionSort(arr) {
            const length = arr.length;

            // 有幾個元素，就要找幾輪的最小值
            // 這邊的 i 代表 i 以前的元素都排序好了
            for (let i = 0; i < length; i++) {

                // 先預設第一個是最小的
                let min = arr[i];
                let minIndex = i;

                // 從還沒排好的元素開始找最小值
                for (let j = i; j < length; j++) {
                    if (arr[j].price < min.price) {
                        min = arr[j];
                        minIndex = j;
                    }
                }

                // ES6 的用法，交換兩個數值
                [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
            }
            return arr;
        }
    },
    directives: {
        'ProdImg': function(el, binding) {
            let imgRef = binding.value;
            getProdImgUrl(imgRef).then((url) => {
                el.src = url;
            })
        }
    },
}
</script>

<style lang="less" scoped>
.list-container {
    width: 1200px;
    margin: 20px auto;
    .product-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center; 
        padding: 0;
        .product-item {
            width: 33%;
            padding: 0 10px;
            box-sizing: border-box;
            margin-bottom: 50px;
            cursor: pointer;
            position: relative;
            img {
                width: 100%;
                margin-bottom: 10px;
                &:hover {
                    -webkit-filter: opacity(.2);
                }
            }
            .product-name {
                margin-bottom: 5px;
                font-weight: 300;
            }
            .product-price {
                color: brown;
                span {
                    font-size: 18px;
                    font-weight: 600;
                }
            }   
        }
    }
}
.word {
    text-align: center;
}
</style>
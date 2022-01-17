<template>
    <div class="list-container">
        <ul class="product-list" v-if="sortList.length !== 0">
            <li class="product-item" v-for="(item, index) in sortList" :key="item.id">
                <div class="top" 
                    @mouseover="hover[index] = true"
                    @mouseleave="hover[index] = false"
                >
                    <img v-ProdImg="item.imgRef"  :class="{'dark': hover[index]}" @click="goDetailsFn(item.id)">
                    <div class="track-btn" v-show="hover[index]">
                        <AddToTrackBtn
                            :productInfo="{
                                id: item.id,
                                imgRef: item.imgRef,
                                name: item.name,
                                price: item.price
                            }"
                        ></AddToTrackBtn>
                    </div>
                </div>
                <div @click="goDetailsFn(item.id)">
                    <div class="product-name word">{{ item.name }}</div>
                    <div class="product-price word">NT$ <span>{{ item.price }}</span></div>
                </div>
            </li>
        </ul>
        <div v-show="this.$route.query.query" v-else class="alert">
            <h1>尚未搜尋到你所查詢的「{{ $route.query.query }}」相關商品</h1>
            <span>請更改關鍵字或重新嘗試</span>
        </div>
    </div>
</template>

<script>
import AddToTrackBtn from "@/components/button/AddToTrackBtn.vue";
import { db } from "@/config/firebaseConfig.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getProdImgUrl } from "@/request/api.js";

export default {
    data() {
        return {
            productsList: [],
            hover: [],
        }
    },
    components: { AddToTrackBtn },
    props: ['sort'],
    created() {
        // 當 route為 '/products/:type'時 (使用者點選商品分類其中一類)
        if(typeof this.$route.params.type1 !== "undefined") {
            var queryType;
            if(typeof this.$route.params.type2 !== "undefined"){queryType = this.$route.params.type2;}
            else {queryType = this.$route.params.type1;}

            var q = query(collection(db, "products"), where('class', 'array-contains', queryType));
            getDocs(q).then((val) => {
                val.forEach((doc) => {
                    this.productsList.push(doc.data());
                })
            })
        } 
        else {
            getDocs(collection(db, "products")).then((val) => {
                val.forEach((doc) => {
                    // 當 route為 '/products?query='時 (使用者搜尋商品)
                    if(this.$route.query.query) {
                        if(doc.data().name.includes(this.$route.query.query)) {
                            this.productsList.push(doc.data());
                            this.hover.push(false);
                        }
                    }else {
                        this.productsList.push(doc.data());
                        this.hover.push(false);
                    }
                })
            })
        }
    },
    computed: {
        sortList() {
            // props 父傳值給子，依造不同排序對應商品排列方式
            if(this.productsList !== null){
                switch(this.sort) {
                    case 'lowToHigh':
                        return this.selectionSort(this.productsList);
                    case 'HighToLow':
                        return this.selectionSort(this.productsList).reverse();
                    default:
                        return this.productsList;
                }
            }
            else{return null}
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
            for (let i = 0; i < length-1; i++) {

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

                let list = [];
                for(let x=0;x<arr.length;x++ ){
                    list.push(arr[x].price)
                }
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
    width: 100%;
    margin: 20px auto;
    .product-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center; 
        padding: 0;
        .product-item {
            position: relative;
            width: 33%;
            margin-bottom: 50px;
            padding: 0 10px;
            box-sizing: border-box;
            cursor: pointer;
            .top {
                position: relative;
                .track-btn {
                    position: absolute;
                    top: 75%;
                    left: 50%;
                    transform: translate(-50%,0);
                    width: 80%;
                    padding: 5px;
                    background-color: rgba(255, 255, 255, 1);
                    border-radius: 2.5px;
                }
                img {
                    width: 100%;
                    margin-bottom: 10px;
                }
                .dark {
                    -webkit-filter: brightness(.7);
                }
            }
            .product-name {
                margin-bottom: 5px;
                font-weight: 400;
            }
            .product-price {
                color: brown;
                font-weight: 800;
                span {
                    font-size: 18px;
                }
            }   
        }
    }
}
.word {
    text-align: center;
}

.alert {
    text-align: center;
    span {
        font-size: 18px;
    }
}
</style>
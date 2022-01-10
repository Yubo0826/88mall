<template>
    <div>
        <button class="addToCart" @click="handleClick" ref="addToCart">
            <span class="btn-content">加入購物車</span>
            <box-icon name='loader-circle' animation='spin' class="btn-loading" color="#646464"></box-icon>
            <span class="btn-success">成功加入購物車</span>
        </button>
    </div>
</template>

<script>
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "@/config/firebaseConfig.js";

export default {
    name: 'addToCartBtn',
    props: ['product'],
    methods: {
        handleClick() {
            this.$refs.addToCart.disabled = true;
            // 處理按鈕點擊後動畫部分
            const el = this.$refs.addToCart;
            el.classList.add('state-change');
            el.classList.add('loading-state');
            setTimeout(() => {
                el.classList.remove('loading-state');
            }, 1500);
            setTimeout(() => {
                el.classList.add('success-state');
                setTimeout(() => {
                    el.classList.remove('success-state');
                    setTimeout(() => {
                        el.classList.remove('state-change');
                    }, 600);
                }, 2000);
            }, 2300);

            setTimeout(() => {
                this.$refs.addToCart.disabled = false;
            }, 6000)

            // 處理資料傳送部分
            const user = auth.currentUser;
            // 已登入情況下
            // 資料會存放在 firestore
            if (user) {
                // 從 firestore取得使用者的文件 ID
                const q = query(
                collection(db, "users"),
                where("email", "==", user.email)
                );
                getDocs(q).then((val) => {
                val.forEach((d) => {
                    // 取得會員 firestore 購物車路徑(集合)
                    const cartRef = collection(db, "users", d.id, "cart");
                    addDoc(cartRef, this.product);
                    this.$store.commit("incrementCart");
                });
                });
            }
            // 非登入情況下
            // 資料會存放在 localstorage
            else {
                let products = [];
                if (localStorage.getItem("products_in_cart") !== null) {
                products = JSON.parse(localStorage.getItem("products_in_cart"));
                products.push(this.product);
                this.$store.commit("incrementCart");
                localStorage.setItem("products_in_cart", JSON.stringify(products));
                } else {
                products.push(this.product);
                this.$store.commit("incrementCart");
                localStorage.setItem("products_in_cart", JSON.stringify(products));
                }
            }
            },


    },
}
</script>

<style lang="less" scoped>
    .addToCart {
        position: relative;
        width: 150px;
        height: 46px;
        border: 1px var( --color-lighten-orange) solid;
        color: var( --color-lighten-orange);
        font-weight: 600;
        background-color: white;
        padding: 0;
        overflow: hidden;
        cursor: pointer;
        transition: opacity .8s ease-in-out, box-shadow .4s ease-in-out, background-color .5s ease-in-out;

        span {
            display: block;   
        }

        
        &:hover {
            box-shadow: inset 150px 0 0 0 var( --color-lighten-orange);
            color: white;
        }

        &.state-change {
            &:hover {
                box-shadow: none;
            }
            .btn-content {
                opacity: 0;
            }
        }

        &.loading-state {
            .btn-loading {
                opacity: 1;
            }
        }

        &.success-state {
            background-color:limegreen;
            border: none;
            .btn-success {
                opacity: 1;
                top: 50%;
                transform: translate(0, -50%);
            }
        }

        .btn-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity .25s ease-in-out;
        }

        .btn-success {
            position: absolute;
            color: rgb(255, 255, 255);
            top: -45%;
            left: 20%;
            opacity: 1;
            transition: opacity .5s ease-in-out, top .6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
    }
</style>
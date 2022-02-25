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
import {  doc, collection, query, where, getDocs, addDoc, updateDoc} from "firebase/firestore";
import { db, auth } from "@/config/firebaseConfig.js";

export default {
    name: 'addToCartBtn',
    props: ['product'],
    methods: {
        handleClick() {
            this.$refs.addToCart.disabled = true;
            const user = auth.currentUser;

            // 處理按鈕點擊後動畫部分
            this.handleAnimation();
            // 已登入時: 資料會上傳到 firestore
            if (user) {
                this.setProductToFirestore(user);
            } 
            // 非登入時: 資料會存放在 localstorage
            else {
                this.setProductToLocalStorage();
            }
        },
        handleAnimation() {
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
        },
        async setProductToFirestore(user) {
            // 從 firestore取得使用者的文件 ID
            const userId_query = query(
                collection(db, "users"),
                where("email", "==", user.email)
            );
            console.log(userId_query);
            let docsSnap = await getDocs(userId_query);
            docsSnap.forEach((d) => {
                // 取得會員 firestore 購物車路徑(集合)
                const cartRef = collection(db, "users", d.id, "cart");
                const productId_query = query(cartRef, where("id", "==", this.product.id), where("spec", "==", this.product.spec), where("size", "==", this.product.size));
                console.log(productId_query);
                getDocs(productId_query)
                .then(
                    (val) => {
                        // 如果新增的商品種類是否已在資料庫購物車中，那就update資料庫的qty value，然後isExists <- true
                        // 如果商品不存在於資料庫，isExists == false，就add該商品到資料庫購物車
                        let isExists = false;
                        
                        val.forEach((el) => {
                            isExists = true;
                            let cartProductRef = doc(db, "users", d.id, "cart", el.id);
                            let qty = el.data().qty;
                            qty++;
                            updateDoc(cartProductRef, {
                                qty: qty
                            })
                        });
                        
                        if(!isExists){
                            addDoc(cartRef, this.product)
                        }
                    }
                )
                this.$store.commit("incrementCart");
            });

        },
        setProductToLocalStorage() {
            let products = [];
            if (localStorage.getItem("products_in_cart") !== null) {
                products = JSON.parse(localStorage.getItem("products_in_cart"));
                products.push(this.product);
                this.$store.commit("incrementCart");
                localStorage.setItem("products_in_cart", JSON.stringify(products));
            }
            else {
                products.push(this.product);
                this.$store.commit("incrementCart");
                localStorage.setItem("products_in_cart", JSON.stringify(products));
            }
        }


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
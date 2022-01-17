<template>
    <div class="container">
        <ul id="order-table">
            <li class="header">
                <div class="col col-1">訂單編號</div>
                <div class="col col-2">訂單時間</div>
                <div class="col col-3">收貨人姓名</div>
                <div class="col col-4">總金額</div>
                <div class="col col-5">狀態</div>
                <div class="col col-6">訂單內容</div>
            </li>
            <h2 v-show="!isLogin">尚未登入！</h2>
            <li class="item" v-for="item, index in orderList" :key="index">
                <input type="checkbox" checked>
                <div class="message">
                    <div class="col col-1">{{ orderIDList[index] }}</div>
                    <div class="col col-2">{{ item.time }}</div>
                    <div class="col col-3">{{ item.name }}</div>
                    <div class="col col-4">{{ item.total }}</div>
                    <div class="col col-5">等待收貨</div>
                    <div class="col col-6 "></div>
                    <i class="arrow"></i>
                </div>
                <ul>
                    <li v-for="detailItem, subIndex in item.details" :key="subIndex" class="details">
                        <div class="col-3">
                            <img v-ProdImg="detailItem.imgRef">
                        </div>
                        <div class="col-1">
                            <span>{{ detailItem.name }}</span>
                        </div>
                        <div class="col-3">
                        <span>單價 $ {{ detailItem.price }}</span>
                        </div>
                        <div class="col-3">
                            <span>數量 {{ detailItem.qty }}</span>
                        </div>
                        <div class="col-3">
                            <span>總計 $ {{ detailItem.price * detailItem.qty }}</span>
                        </div>
                    </li>
                </ul>
                <div class="line"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import { db, auth } from "@/config/firebaseConfig.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getProdImgUrl } from "@/request/api.js";

export default {
    data() {
        return {
            isLogin: true,
            orderList: [],
            orderIDList: [],
        }
    },
    created() {
        // 到資料庫抓訂單
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const q = query(collection(db, 'orders'), where('email', '==', user.email));
                getDocs(q).then((val) => {
                val.forEach((doc) => {
                    const ref = collection(db, 'orders', doc.id, 'order');
                    this.orderIDList.push(doc.id);
                    let data = doc.data();
                    getDocs(ref).then((docs) => {
                        let details = []; 
                        docs.forEach((doc) => {
                            details.push(doc.data());
                        });
                        data.details = details;
                        this.orderList.push(data);
                        console.log(data);
                        console.log(this.orderList);
                    })
                });
                });
            }
            else {
                this.isLogin = false;
            }
        })

        window.scrollTo({
            top: 0,
            left: 0,
        });

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
    .container {
        display: flex;
        flex-direction: column;
    }
    h2 {
        text-align: center;
    }
    #order-table {
        width: 1200px;
        margin: 50px auto;
        margin-bottom: 300px;
    }
    #order-table .header, .message, .details {
        display: flex;
        justify-content: space-between;
    }
    .header {
        background-color: #95A5A6;
    }
    .item {
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
    }
    .message {
        &:hover {
            background-color: rgb(243, 243, 243);
        }
        position: relative;
        padding: 20px;
    }
    .details {
        width: 800px;
        padding: 15px;
        margin: auto;
    }
    #order-table ul li ul {
        overflow: auto;
        max-height: 800px;
        opacity: 1;
        transform: translate(0, 0);
        z-index: 2;
        transition: opacity .25s ease-in;
    }
    #order-table input[type=checkbox] {
        position: absolute;
        cursor: pointer;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;
    }
    #order-table input[type=checkbox]:checked ~ ul {
        margin-top: 0;
        max-height: 0;
        opacity: 0;
        transform: translate(0, 50%);
    }
    .col {
        padding: 5px;
        text-align: center;
    }
    .col-1, .col-2 {
        flex-basis: 20%;
    }
    .col-3, .col-4, .col-5, .col-6  {
        flex-basis: 10%;
    }
    .line {
        height:1px;
        width:100%;
        background:#ddd;
    }
    img {
        width: 50px;
        height: 50px;
    }

    // 箭頭操作
    .arrow {
        position: absolute;
        top: 45%;
        right: 65px;
    }
    .arrow::before, .arrow::after {
        content: "";
        position: absolute;
        background-color: rgb(179, 86, 86);
        width: 3px;
        height: 9px;
    }
    .arrow::before {
        transform: translate(-2px, 0) rotate(45deg);
    }
    .arrow::after {
        transform: translate(2px, 0) rotate(-45deg);
    }
    #order-table input[type=checkbox]:checked ~ .message>.arrow::before {
        transform: translate(-2px, 0) rotate(-45deg);
    }
    #order-table input[type=checkbox]:checked ~ .message>.arrow::after {
        transform: translate(2px, 0) rotate(45deg);
    }

</style>
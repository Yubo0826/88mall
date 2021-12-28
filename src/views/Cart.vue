<template>
    <div class="cart-wrap">
        <div class="cart-container">
            <h2><span>購物車</span></h2>
            <div class="sm-cart-count">
                <span>{{ itemTotal }} 件產品，$ </span>
                <strong>{{ pirceTotal }}</strong>
            </div>
            <BuyFlow></BuyFlow>
            <ul class="cart-table">
                <li class="table-header">
                    <div class="col col-1">商品名稱</div>
                    <div class="col col-2">規格</div>
                    <div class="col col-3">單價</div>
                    <div class="col col-4">數量</div>
                    <div class="col col-5">小計</div>
                    <div class="col col-6">移除</div>
                </li>
                <li class="no-item" v-if="itemTotal === 0"><span>無商品!</span></li>
                <li class="item-row" v-for="(item, index) in items" :key="index" :id="index">
                    <div class="col col-1">
                        <img v-ProdImg="item.imgRef" @click="productRouter(item.id)">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="col col-2">{{ item.spec }} {{ item.size }}</div>
                    <div class="col col-3">$ {{ item.price }}</div>
                    <div class="col col-4">
                        <div>
                            <button @click="addQty(index)">+</button>
                            <input type="text" v-model="item.qty">
                            <button @click="reduceQty(index)">-</button>
                        </div>
                    </div>
                    <div class="col col-5">$ {{ item.price * item.qty }}</div>
                    <div class="col col-6">
                        <a @click="deleteItem(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: rgba(135, 135, 135, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                        </a>
                    </div>
                </li>
            </ul>
            <div class="cart-count">
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>小計</th>
                            <td>$ {{ pirceTotal }}</td>
                        </tr>
                        <tr class="shipping">
                            <th>運費</th>
                            <td>free</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>總計</th>
                            <td>$ {{ pirceTotal }}</td>
                        </tr>
                    </tfoot>
                </table>
                <button>結帳</button>
            </div>
        </div>
    </div>
</template>
<script>
import { db, auth } from "@/config/firebaseConfig.js";
import { doc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getProdImgUrl } from "@/request/api.js";
import BuyFlow from "@/components/BuyFlow.vue";

export default {
    name: 'Cart',
    components: { BuyFlow },
    data() {
        return {
            userID: null,
            items: [],
            itemsID: [],
        }
    },
    computed: {
        pirceTotal() {
            let total = 0;
            for(let i = 0; i < this.items.length; i++) {
                if(this.items[i] !== "") {
                    total = total + this.items[i].price * this.items[i].qty;
                }
            }
            return total;
        },
        itemTotal() {
            let total = 0;
            for(let i = 0; i < this.items.length; i++) {
                if(this.items[i] !== "") {
                    total++;
                }
            }
            return total;
        }
    },
    created() {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const q = query(collection(db, 'users'), where('email', '==', user.email));
                getDocs(q).then((val) => {
                val.forEach((doc) => {
                    this.userID = doc.id;
                    const cartRef = collection(db, 'users', doc.id, 'cart');
                    getDocs(cartRef).then((docs) => {
                        docs.forEach((doc) => {
                            this.itemsID.push(doc.id);
                            this.items.push(doc.data());
                        })
                    })
                });
                });
            }
            else {
                if(localStorage.getItem('products_in_cart') !== null) {
                    this.items = JSON.parse(localStorage.getItem("products_in_cart"));
                }
            }
        })
    },
    methods: {
         deleteItem(index) {
            let el = document.getElementById(index);
            el.remove();
            this.$store.commit('reduceCart');
            deleteDoc(doc(db, 'users', this.userID, 'cart', this.itemsID[index])).then(() => {
                this.items[index] = "";
                console.log(this.items);
            });
        },
        productRouter(id) {
            this.$router.push(`/details?id=${id}`);
        },
        addQty(index) {
            this.items[index].qty++;
        },
        reduceQty(index) {
            let x = this.items[index].qty;
            if(x > 1) {
                this.items[index].qty--;
            }
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

.cart-wrap {
    display: flex;
    .cart-container {
        border-collapse: collapse; 
        width: 1200px;
        margin: 30px auto;
        h2{
            margin-top: 20px;;
            margin-bottom: 10px;
            font-size: 26px;
            text-align: center;
            span {
                position: relative;
            }
        }
        h2 span::before {
            content: "";
            position: absolute;
            z-index: -1;
            top: 0.8em;
            width: 100%;
            height: 0.5em;
            background: var(--color-dark-yellow);
        }
        .sm-cart-count {
            text-align: center;
            margin-bottom: 20px;
            span {
                font-weight: 300;
            }
        }
        .no-item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150px;
            box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
        }
    }
}

.cart-count {
    float: right;
    width: 300px;
    margin-top: 30px;
    padding: 10px;
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
    button {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: rgb(92,184,92);
        color: white;
        font-size: 20px;
        font-weight: 600;
        &:hover {
            background-color: brown;
        }
    }
    table {
        width: 100%;
        margin-bottom: 50px;
        tr {
            height: 40px;
            margin-bottom: 5px;
        }
        th {
            width: 30%;
            font-weight: 300;
        }
        td {
            width: 70%;
            text-align: right;
        }
        tfoot {
            height: 100px;
            tr {
                position: relative;
                margin-top: 15px;
                border-top: 1px solid #000;
                vertical-align:bottom;
            }
            td:before {
                content: "";
                position: absolute;
                top: 4rem;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: rgb(194, 194, 194);
            }
            th:before {
                content: "";
                position: absolute;
                top: 4rem;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: rgb(194, 194, 194);
            }
            
        }
        .shipping {
            td {
                font-style: italic;
            }
        }
    }
}

.cart-table {
    li {
        border-radius: 3px;
        padding: 25px 30px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
    }
    .table-header {
        background-color: #95A5A6;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }
    .item-row {
        display: flex;
        background-color: #ffffff;
        box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
        .col {
            margin: auto;
        }
        .col-1 {
            display: flex;
            padding: 10px;
            img {
                width: 100px;
                height: 100px;
                cursor: pointer;
            }
            span {
                margin: auto 15px;
            }
        }
        .col-4 {
            button {
                width: 40px;
                height: 40px;
                border: 1px solid #ccc;
                background-color: white;
            }
            input {
                width: 40px;
                height: 40px;
                border: 1px solid #ccc;
                box-sizing: border-box;
                text-align: center; 
            }
        }
        .col-6 {
            svg {
                cursor: pointer;
            }
        }
    }
    .col-1 {
        flex-basis: 40%;
    }
    .col-2 {
        flex-basis: 10%;
    }
    .col-3 {
        flex-basis: 10%;
    }
    .col-4 {
        display: flex;
        flex-basis: 20%;
    }
    .col-5 {
        flex-basis: 10%;
    }
    .col-6 {
        flex-basis: 10%;
    }
}
    
</style>
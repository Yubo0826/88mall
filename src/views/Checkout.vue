<template>
    <div class="wrapper">
        <div class="container">
            <h2><span>結帳</span></h2>
            <BuyFlow :isCartStep="false"></BuyFlow>
            <div class="checkout-area">
                <div class="left">
                    <div>訂單</div>
                    <div class="line"></div>
                    <div class="pd-list" id="style-1">
                        <table>
                            <tbody>
                                <tr class="pd-item" v-for="item, index in items" :key="index">
                                    <td class="pd-img"><img v-ProdImg="item.imgRef" @click="productRouter(item.id)"></td>
                                    <td class="pd-detils">
                                        <div>{{ item.name }}</div>
                                        <div>
                                            <span>款式: {{ item.spec }}，尺寸: {{ item.size }}</span>
                                        </div>
                                    </td>
                                    <td class="pd-total">
                                        <div>X {{ item.qty }}</div>
                                        <div>$ {{ item.price * item.qty }}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="line"></div>
                    <div class="pd-count">
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <th>小計</th>
                                    <td>$ {{ pirceTotal }}</td>
                                </tr>
                                <tr class="shipping">
                                    <th>運費</th>
                                    <td>$ 0</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>總計</th>
                                    <td>$ {{ pirceTotal }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div class="right">
                    <div class="receiver-info">
                        <div>收貨信息</div>
                        <div class="line"></div>
                        <div class="form-field">
                            <label for="info-name">收貨人姓名:</label>
                            <input type="text" id="info-name" v-model="user.name" required>
                        </div>
                        <div class="form-field">
                            <label for="info-address">收貨人地址:</label>
                            <input type="text" id="info-address" v-model="user.address" required>
                        </div>
                        <div class="form-field">
                            <label for="info-phone">收貨人電話:</label>
                            <input type="text" id="info-phone" v-model="user.phone" required>
                        </div>
                    </div>

                    <div class="pay">
                        <div>付款(不用填:D)</div>
                        <div class="line"></div>
                        <div id="right">
                            <div class="form">
                                <div id="form-card" class="form-field">
                                    <label for="cc-number">Card number:</label>
                                    <input id="cc-number" maxlength="19" placeholder="1111 2222 3333 4444">
                                </div>

                                <div id="form-date" class="form-field">
                                    <label for="expiry-month">Expiry date:</label>
                                    <div id="date-val">
                                        <select id="expiry-month">
                                                <option id="trans-label_month" value="" default="default" selected="selected">Month</option>
                                                <option value="1">01</option>
                                                <option value="2">02</option>
                                                <option value="3">03</option>
                                                <option value="4">04</option>
                                                <option value="5">05</option>
                                                <option value="6">06</option>
                                                <option value="7">07</option>
                                                <option value="8">08</option>
                                                <option value="9">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                        </select>
                                        <select id="expiry-year">
                                        <option id="trans-label_year" value="" default="" selected="selected">Year</option>
                                        <option value="2018">18</option><option value="2019">19</option><option value="2020">20</option><option value="2021">21</option><option value="2022">22</option><option value="2023">23</option><option value="2024">24</option><option value="2025">25</option><option value="2026">26</option><option value="2027">27</option><option value="2028">28</option><option value="2029">29</option><option value="2030">30</option><option value="2031">31</option><option value="2032">32</option><option value="2033">33</option><option value="2034">34</option><option value="2035">35</option><option value="2036">36</option><option value="2037">37</option><option value="2038">38</option><option value="2039">39</option><option value="2040">40</option><option value="2041">41</option><option value="2042">42</option><option value="2043">43</option><option value="2044">44</option><option value="2045">45</option><option value="2046">46</option><option value="2047">47</option></select>
                                    </div>
                                </div>
                                
                                <div id="form-sec-code" class="form-field">
                                    <label for="sec-code">Security code:</label>
                                    <input type="password" maxlength="3" placeholder="123">
                                </div>
                                
                                <button type="submit" @click="order">送出訂單</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { db, auth } from "@/config/firebaseConfig.js";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getProdImgUrl } from "@/request/api.js";
import BuyFlow from "@/components/BuyFlow.vue";

export default {
    name: 'Checkout',
    data() {
        return {
            items: [],
            email: null,
            user: {
                name: null,
                email: null, 
                address: null,
                phone: null,
            },
        }
    },
    components: { BuyFlow },
    created() {
        // 到資料庫抓購物車
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const q = query(collection(db, 'users'), where('email', '==', user.email));
                getDocs(q).then((val) => {
                val.forEach((doc) => {
                    let data = doc.data();
                    this.user.name = data.name;
                    this.user.address = data.address;
                    this.user.phone = data.phone;
                    this.user.email = data.email;
                    const cartRef = collection(db, 'users', doc.id, 'cart');
                    getDocs(cartRef).then((docs) => {
                        docs.forEach((doc) => {
                            this.items.push(doc.data());
                        })
                    })
                });
                });
            }
            else {
                console.log('尚未登入');
            }
        })

        window.scrollTo({
            top: 0,
            left: 0,
        });
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
    },
    methods: {
        async order() {
            let time = new Date();
            let timeStr = time.toLocaleString();
            const docRef = await addDoc(collection(db, 'orders'), {
                name: this.user.name,
                address: this.user.address,
                email: this.user.email,
                phone: this.user.phone,
                time: timeStr,
                total: this.pirceTotal,
            });
            for(let item of this.items) {
                addDoc(collection(db, 'orders', docRef.id, 'order'), item);
            }
            alert('下訂單成功發送！');
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
    .wrapper {
        display: flex;
    }
    .container {
        width: 1200px;
        margin: 50px auto;
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
    }

    .checkout-area {
        display: flex;
        width: 100%;
        height: 700px;
        color: black;
        .left {
            width: 50%;
            margin-right: 20px;
            padding: 20px;
            color: black;
            box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
            .pd-list {
                height: 400px;
                overflow: auto;
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            align-content: space-between;
            width: 50%;
            margin-left: 20px;
            padding: 0px;
            .receiver-info {
                height: 50%;
                margin-bottom: 20px;
                padding: 20px;
                color: black;
                box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
            }
            .pay {
                height: 50%;
                margin-top: 40px;
                padding: 20px;
                color: black;
                box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
            }
        }
    }

    .pd-item {
        display: flex;
        align-items: center;
        td:first-of-type {
            margin: 10px;
            flex-basis: 20%;
        }
        td:nth-of-type(2) {
            margin-top: 10px;
            margin-bottom: 10px;
            margin-right: 10px;
            flex-basis: 50%;
        }
        td:nth-of-type(3) {
            flex-basis: 30%;
        }
    }

    .pd-count {
        width: 300px;
        margin-top: 10px;
        padding: 10px;
        float: right;
        table {
            width: 100%;
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


    img {
        height: 60px;
        width: 60px;
    }

    .line {
        height:1px;
        width:100%;
        margin-top:10px;
        margin-bottom:10px;
        background:#ddd;
    }

    //捲軸底色
    #style-1::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #f8e662;
    }
    //捲軸寬度
    #style-1::-webkit-scrollbar {
        width: 6px;
        background-color: black;
    }
    //捲軸本體顏色
    #style-1::-webkit-scrollbar-thumb {
        background-color: #8b8238;
    }

    .receiver-info input{
        appearance: none;
        border: none;
        border-bottom: 1.5px solid #ccc;
        padding: 5px;
        margin-top: 2.5px;
        position: relative;
    }


    // 信用卡付款區域
    #right .form input,
    #right .form select {
    -moz-appearance: none;
    /* Firefox */
    -webkit-appearance: none;
    /* Safari and Chrome */
    appearance: none;
    border: none;
    border-bottom: 1.5px solid #ccc;
    padding: 5px;
    margin-top: 2.5px;
    position: relative;
    }

    .form-field {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin-bottom: 12.5px;
    }

    #right .form #date-val {
    display: flex;
    justify-content: space-between;
    }

    #right .form #date-val select {
    width: 45%;
    }

    #right .form button[type=submit] {
    background: linear-gradient(135deg, #4183d7 0%, #66cc99 100%);
    padding: 5px;
    border: none;
    border-radius: 50px;
    color: white;
    font-weight: 400;
    font-size: 12pt;
    margin-top: 10px;
    }

    #right .form button[type=submit]:hover {
    background: transparent;
    box-shadow: 0 0 0 3px #4183d7;
    color: #4183d7;
    }

</style>
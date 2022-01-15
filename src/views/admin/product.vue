<template>
    <div class="container">
        <div class="title">
            <span>商品列表</span>
            <a @click="$router.push('/admin/product/addProduct')">新增商品</a>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="col-1" align="left">商品編號</th>
                    <th class="col-2" align="left">商品圖片</th>
                    <th class="col-3" align="left">商品名稱</th>
                    <th class="col-4" align="left">商品售價</th>
                    <th class="col-5" align="left">剩餘數量</th>
                    <th class="col-6" align="left">刪除商品</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in currentList" :key="index">
                    <td class="col-1">{{ item.id }}</td>
                    <td class="col-2">
                        <img v-ProdImg="item.imgRef">
                    </td>
                    <td class="col-3">{{ item.name }}</td>
                    <td class="col-4">{{ item.price }}</td>
                    <td class="col-5">{{ item.left }}</td>
                    <td class="col-6">
                        <box-icon name='trash' color="#646464"></box-icon>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pagination">
            <button class="page-btn" @click="previousPage">←</button>
            <button 
                class="page-btn" 
                v-for="n in numOfPage" :key="n"
                @click="currentPage = n"
                :class="n==currentPage ?'active' :''"
                >{{ n }}
                </button>
            <button class="page-btn" @click="nextPage">→</button>
            <span>每頁顯示項目</span>
            <input type="number" v-model="numPerPage">
        </div>
    </div>
</template>
<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig.js";
import { getProdImgUrl } from "@/request/api.js";

export default {
    data() {
        return {
            productList: [],
            numOfPage: null,
            numPerPage: 6,
            currentPage: 1,
        }
    },
    created() {
        getDocs(collection(db, "products")).then(
            (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.productList.push(doc.data());
                });
                this.numOfPage = Math.ceil(this.productList.length / this.numPerPage);
            }
        );
    },
    computed: {
        currentList() {
            const trimStart = (this.currentPage - 1) * this.numPerPage;
            const trimEnd = trimStart + this.numPerPage;
            return this.productList.slice(trimStart, trimEnd);
        },
    },
    methods: {
        previousPage() {
            if(this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if(this.currentPage < this.numOfPage) {
                this.currentPage++;
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
    .container {
        margin: 50px 0;
    }
    .title {
        text-align: center;
        span {
            font-size: 28px;
            font-weight: bold;
            margin-right: 10px;
        }
        a {
            color: blue;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
        word-wrap: break-word;
        table-layout : fixed;
        td, th {
            padding-left: 8px;
        }
        td {
            padding: 8px;
        }
        thead tr {
            height: 60px;
            background-color: #c9c9c9;
            font-size: 16px;
        }
        tbody tr {
            height: 48px;
            background-color: #fff;
            border-bottom: 1px solid #E8EDF0;
        }
    }
    .pagination {
        background-color: #c9c9c9;
        padding: 10px;
        text-align: center;
        span {
            vertical-align: middle;
            margin-left: 20px;
            margin-right: 8px;
        }
        input {
            width: 50px;
            height: 20px;
            text-indent: 5px;
        }
    }
    button {
        margin: 0 5px;
    }
    img {
        width: 50px;
        height: 50px;
    }
    .page-btn {
        width: 30px;
        height: 30px;
        background-color: #fff;
        border: 1px solid #646464;
        border-radius: 2.5px;
        &.active {
            color: ghostwhite;
            background-color: #a8a8a8;
        }
    }
    .col-1 {
        width: 10%;
    }
    .col-2 {
        width: 10%;
    }
    .col-3 {
        width: 50%;
    }
    .col-4 {
        widths: 10%;
    }
    .col-5 {
        width: 10%;
    }
    .col-6 {
        width: 10%;
    }

</style>
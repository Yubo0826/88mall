<template>
    <div class="container">
        <div class="title">
            <span>訂單管理</span>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="col-1" align="left">訂單編號</th>
                    <th class="col-2" align="left">訂單日期</th>
                    <th class="col-5" align="left">收貨人定址</th>
                    <th class="col-3" align="left">收貨人姓名</th>
                    <th class="col-4" align="left">收貨人電話</th>
                    <th class="col-6" align="left">刪除訂單</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in orderList" :key="index">
                    <td class="col-1">{{ orderIdlist[index] }}</td>
                    <td class="col-2">{{ item.time }}</td>
                    <td class="col-5">{{ item.address }}</td>
                    <td class="col-3">{{ item.name }}</td>
                    <td class="col-4">{{ item.phone }}</td>
                    <td class="col-6">
                        <i class='bx bx-trash' @click="deleteOrder(orderIdlist[index])"></i>
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
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig.js";

export default {
    data() {
        return {
            orderList: [],
            orderIdlist: [],
            numOfPage: null,
            numPerPage: 6,
            currentPage: 1,
        }
    },
    created() {
        getDocs(collection(db, "orders")).then(
            (val) => {                
                val.forEach((doc) => {
                    this.orderIdlist.push(doc.id);
                    this.orderList.push(doc.data());
                });
                this.numOfPage = Math.ceil(this.orderList.length / this.numPerPage);
                console.log(this.orderList);
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
        },
        deleteOrder(id) {
            deleteDoc(doc(db, 'orders', id)).then(
                () => {
                    alert('此訂單已刪除！');
                    this.$router.go(0);
                }
            );
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
    i {
        cursor: pointer;
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
        width: 20%;
    }
    .col-2 {
        width: 20%;
    }
    .col-3 {
        width: 20%;
    }
    .col-4 {
        width: 10%;
    }
    .col-5 {
        width: 20%;
    }
    .col-6 {
        width: 10%;
    }


</style>
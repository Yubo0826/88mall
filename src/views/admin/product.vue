<template>
    <div>
        <div>
            <div><button @click="$router.push('/admin/product/addProduct')">新增商品</button></div>
            <div>
                <button @click="previousPage">←</button>
                <button 
                    class="page-btn" 
                    v-for="n in numOfPage" :key="n"
                    @click="currentPage = n"
                    :class="n==currentPage ?'active' :''"
                    >{{ n }}
                    </button>
                <button @click="nextPage">→</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>商品編號</th>
                        <th>商品圖片</th>
                        <th>商品名稱</th>
                        <th>商品售價</th>
                        <th>剩餘數量</th>
                        <th>刪除商品</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in currentList" :key="index">
                        <td>{{ item.id }}</td>
                        <td><img src="" alt=""></td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.left }}</td>
                        <td>
                            <box-icon name='trash' color="#646464"></box-icon>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig.js";

export default {
    data() {
        return {
            productList: [],
            numOfPage: null,
            currentPage: 1,
        }
    },
    created() {
        getDocs(collection(db, "products")).then(
            (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.productList.push(doc.data());
                });
                this.numOfPage = Math.ceil(this.productList.length / 5);
            }
        );
    },
    computed: {
        currentList() {
            const trimStart = (this.currentPage - 1) * 5;
            const trimEnd = trimStart + 5;
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
}
</script>
<style lang="less" scoped>
    button {
        margin: 0 5px;
    }
    .page-btn {
        width: 25px;
        height: 25px;
        background-color: #fff;
        border: 1px solid #646464;
        border-radius: 2.5px;
        &.active {
            color: ghostwhite;
            background-color: #646464;
        }
    }
</style>
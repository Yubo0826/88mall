<template>
    <div class="container">
        <div class="title">
            <span>會員列表</span>
        </div>
        <table>
            <thead>
                <tr align="left">
                    <th>會員編號</th>
                    <th>會員姓名</th>
                    <th>會員信箱</th>
                    <th>會員電話</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item, index in userList" :key="index">
                    <td>{{ userIdList[index] }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.phone }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig.js";

export default {
    data() {
        return {
            userList: [],
            userIdList: [],
        }
    },
    created() {
        getDocs(collection(db, 'users')).then(
            (q) => {
                q.forEach((doc) => {
                    this.userList.push(doc.data());
                    this.userIdList.push(doc.id);
                })
            }
        )
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

</style>
<template>
    <div class="track-container">
        <ul class="track-table">
            <li class="table-header">
                <div class="col col-1">商品連結</div>
                <div class="col col-2">商品名稱</div>
                <div class="col col-3">單價</div>
                <div class="col col-4">移除</div>
            </li>
            <div class="item-container">
                <li class="item-row" v-for="(item, index) in items" :key="index" :id="index">
                    <div class="col col-1">
                        <img v-ProdImg="item.imgRef" @click="productRouter(item.id)">
                    </div>
                    <div class="col col-2">{{ item.name }}</div>
                    <div class="col col-3">$ {{ item.price }}</div>
                    <div class="col col-4">
                        <a @click="deleteItem(index)">
                            <box-icon name='trash' color='#464646' ></box-icon>
                        </a>
                    </div>
                </li>
            </div>
        </ul>
    </div>
</template>

<script>
import { db, auth } from "@/config/firebaseConfig.js";
import { doc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getProdImgUrl } from "@/request/api.js";
import 'boxicons';

export default {
    data() {
        return {
            userID: null,
            itemsID: [],
            items: []
        }
    },
    created() {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const q = query(collection(db, 'users'), where('email', '==', user.email));
                getDocs(q).then((val) => {
                val.forEach((doc) => {
                    this.userID = doc.id;
                    const trackRef = collection(db, 'users', doc.id, 'track');
                    getDocs(trackRef).then((docs) => {
                        docs.forEach((doc) => {
                            this.itemsID.push(doc.id);
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
    },
    methods: {
        deleteItem(index) {
            let el = document.getElementById(index);
            el.remove();
            deleteDoc(doc(db, 'users', this.userID, 'track', this.itemsID[index])).then(() => {
                this.items[index] = "";
            });
        },

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
.track-container {
    padding: 15px;
}
.track-table {
    li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
    }
    .table-header {
        padding: 15px;
        background-color: rgb(238, 219, 52);
    }
    .item-container {
        height: 375px;
        overflow: auto;
    }
    .item-row {
        font-weight: 300;
        &:hover {
            background-color: rgb(250, 250, 250);
        }
        img {
            width: 80px;
            height: 80px;
            cursor: pointer;
        }
    }
    .col {
        display: flex;
        align-items: center;
    }
    .col-1 {
        flex-basis: 15%;
    }
    .col-2 {
        flex-basis: 65%;
    }
    .col-3 {
        flex-basis: 10%;
    }
    .col-4 {
        flex-basis: 10%;
    }
    box-icon {
        cursor: pointer;
    }
}
</style>
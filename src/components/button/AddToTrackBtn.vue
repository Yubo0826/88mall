<template>
    <div class="pd-track">
        <div v-if="isTrack" @click="handleTrack" class="btn">
            <i class='bx bxs-heart bx-md' style='color:#D43636'></i>
        </div>
        <div v-else @click="handleTrack" class="btn"> 
            <i class='bx bx-heart bx-md' size></i>
        </div>
        <span>追蹤商品</span>
    </div>
</template>
<script>
import { onAuthStateChanged } from "firebase/auth";
import { doc, collection, query, where, getDocs, addDoc, deleteDoc, } from "firebase/firestore";
import { db, auth } from "@/config/firebaseConfig.js";
import 'boxicons/css/boxicons.min.css'

export default {
    name: 'AddToTrackBtn',
    props: {
        'productInfo': {
            type: Object,
        }
    },
    data() {
        return {
            isTrack: false,
            userDocID: null,
        }
    },
    created() {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
            );
            getDocs(q).then((val) => {
            val.forEach((d) => {
                // 從 firestore取得使用者的文件 ID，存入元件 Data中
                this.userDocID = d.id;
                const trackRef = collection(db, "users", d.id, "track");
                const u = query(trackRef, where('id', '==', this.productInfo.id));
                getDocs(u).then((val) => {
                val.forEach((d) => {
                    if(d.exists()) {
                    this.isTrack = true;
                    }else {
                    this.isTrack = false;
                    }
                })
                })
            })
            });
        }
        })
    },
    methods: {
    handleTrack() {
      const user = auth.currentUser;
      if (user) {
        const trackRef = collection(db, "users", this.userDocID, "track");
        // 有追蹤情況，移除商品doc
        if(this.isTrack) {
          const q = query(trackRef, where('id', '==', this.productInfo.id));
          getDocs(q).then((val) => {
            val.forEach((d) => {
              deleteDoc(doc(db, "users", this.userDocID, "track", d.id)).then(() => {
                this.isTrack = false;
              });
            })
          })
        }
        //無追蹤情況，加入doc
        else {
          addDoc(trackRef, this.productInfo).then(() => {
            this.isTrack = true;
          });
        }
      }
      
    
      else {
        alert('尚未登入!');
      }
    },


    },
}
</script>
<style lang="less" scoped>
    .pd-track {
        display: flex;
        align-items: center;
        text-align: center;
        .btn {
            cursor: pointer;
        }
        span {
            margin-left: 5px;
        }
    }
</style>
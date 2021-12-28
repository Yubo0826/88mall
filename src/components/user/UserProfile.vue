<template>
    <div class="profile-wrap">
        <h2><span class="profile-title">編輯個人資料</span></h2>
        <div class="profile-contianer">
            <div>
                <label for="user-name">用戶姓名</label>
                <input type="text" id="user-name" v-model="user.name">
            </div>
            <div>
                <label>電子郵件</label>
                <span>{{ user.email }}</span>
            </div>
            <div>
                <label for="user-phone">連絡電話</label>
                <input type="text" id="user-phone" v-model="user.phone">
            </div>
            <div>
                <label for="user-address">儲存的地址</label>
                <input type="text" id="user-address" v-model="user.address" placeholder="新增送貨地址">
            </div>
            <div class="reset-pwd-content">
                <label>更改密碼</label>    
                <span @click="sendPasswordResetEmail">發送密碼重置郵件</span>
            </div>
            <div class="btn-box">
                <button id="profile-save-btn" @click="saveProfile">儲存</button> 
                <button id="user-signout" @click="signout">登出</button>
            </div>
        </div>
    </div>
</template>

<script>
import { signOut, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/config/firebaseConfig.js";

export default {
    name: 'UserProfile',
    data() {
        return {
            user: {
                id: null,
                name: null,
                email: null, 
                address: null,
                phone: null,
            },
        }
    },
    created() {
        // 獲取當前登錄的用戶方面
        // firebase 推薦 onAuthStateChanged() 而非 currentUser()
        // currentUser() 網頁f5 登入狀態就會消失
        const user = auth.currentUser;
        if(user) {
            const email = user.email;
            this.user.email = email;
            // 從 firestore搜尋 email相符的資料
            const q = query(collection(db, 'users'), where('email', '==', email))
            getDocs(q).then((val) => {
                val.forEach((doc) => {
                    let data = doc.data();
                    // 此 id為 firestore文件 ID
                    this.user.id = doc.id;
                    this.user.name = data.name;
                    this.user.address = data.address;
                    this.user.phone = data.phone;
                })
            })
        }else {
            console.log('無人登入!');
        }

    },
    methods: {
        saveProfile() {
            let docRef = doc(db, 'users', this.user.id);
            let saveData = {
                name: this.user.name,
                address: this.user.address,
                phone: this. user.phone
            };
            setDoc(docRef, saveData, { merge: true }).then(() => {
                // setDoc 第三個參數設定合併，防止資料遭到覆蓋
                alert('會員資料成功改寫!')
            });
        },

        signout() {
            signOut(auth).then(() => {
                alert('會員已登出');
                this.$store.commit('setCart', 0);
                this.$router.push('/login');
            }).catch((err) => {
                console.log(err);    
            })
        },

        sendPasswordResetEmail() {
            sendPasswordResetEmail(auth, this.user.email).then(() => {
                alert('已傳送至' + this.user.email + '信箱中');
            })
        },
    },

}
</script>

<style lang="less" scoped>
    .profile-wrap {
        margin: 15px 100px;
        .profile-title {
            position: relative;
        }
        .profile-title:before {
            content: "";
            z-index: -1;
            position: absolute;
            height: 0.5em;
            top: 0.8em;
            background: var(--color-dark-yellow);
            width: 100%;
        }
        .profile-contianer {
            margin-top: 40px;
            div {
                margin: 30px;
                label {
                    margin-right: 30px;
                }
            }
            .reset-pwd-content {
                span {
                    cursor: pointer;
                    color: rgb(64, 120, 224);
                }
            }
        }
    }
    input {
        font-size: 14px;
        border: var(--color-gray) 1px solid;
        padding: .4rem;
        border-radius: 5px;
    }
    .btn-box {
        button {
            width: 80px;
            height: 50px;
            font-weight: 600;
            border: var(--color-gray) 0px solid;
            background: rgb(235, 235, 235);
            margin-right: 15px;  
            margin-top: 20px;
            cursor: pointer;   
            &:hover {
                background: yellow;
            }
        }
    }
</style>
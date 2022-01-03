<template>
    <div class="wrapper">
        <div class="container">
            <h2>忘記密碼</h2>
            <h4>輸入您的e-mail</h4>
            <input type="text" v-model="email">
            <button @click="sendPasswordResetEmail">送出</button>
        </div>
    </div>
</template>
<script>
import { sendPasswordResetEmail} from "firebase/auth";
import { auth } from "@/config/firebaseConfig.js";

export default {
    name: 'forgetPwd',
    data() {
        return {
            email: null,
        }
    },
    methods: {
        sendPasswordResetEmail() {
            sendPasswordResetEmail(auth, this.email).then(() => {
                alert('已傳送至' + this.email + '信箱中');
            }).catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            })
        },
    },
}
</script>
<style lang="less" scoped>
    .wrapper{
        display: flex;
        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 50px auto;
        }
    }

    h2{
        position: relative;
        padding-bottom: 10px;
        text-align: center;
        color: rgb(85, 85, 85);
        &::before {
            content: "";
            z-index: -1;
            position: absolute;
            height: 0.5em;
            top: 0.8em;
            background: var(--color-lighten-orange);
            width: 45%;
        }
        border-bottom: 1px solid #bebebe;
    }

    h4 {
        color: #646464;
        text-align: center;
    }

    input {
        font-size: 14px;
        padding: 10px 20px;
        color: rgb(85, 85, 85);
        border: 1px solid rgb(221 221 221);
    }

    button {
        width: 50%;
        height: 40px;
        border: var(--color-gray) 1px solid;
        background: var(--color-lighten-orange);
        color: whitesmoke;
        font-weight: 600;
        margin: 20px auto;
        cursor: pointer;
        border-radius: 5px;
    }
</style>
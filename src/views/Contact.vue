<template>
    <div class="contact-container">
        <div class="left">
            <img src="../assets/image/undraw-contact.svg" alt="">
        </div>
        <div class="right">
            <form ref="form" @submit.prevent="sendEmail">
                <input type="text" name="user_name" placeholder="名稱">
                <input type="email" name="user_email" placeholder="Email">
                <textarea name="message" placeholder="寫下聯絡我們的訊息"></textarea>
                <input type="submit" value="Send" class="send">
            </form>
        </div>
    </div>
</template>

<script>
import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';
init("user_1yb2xI54SzlDs6JqS2Uug");

export default {
    methods: {
        sendEmail() {
            emailjs.sendForm('service_o5ak541', 'template_1fx2hwa', this.$refs.form, 'user_1yb2xI54SzlDs6JqS2Uug')
                .then((result) => {
                    alert('已成功寄出！', result.text);
                }, (error) => {
                    alert('FAILED...', error.text);
                });
        }
    }
}
</script>

<style lang="less" scoped>
    .contact-container{
        display: flex;
        width: 80%;
        margin: 100px auto;
        div {
            width: 50%;
            padding: 10px;
        }
    }

    .left {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 80%;
        }
    }

    .right {
        form {
            display: flex;
            flex-direction: column;
            margin: auto;
            width: 80%;
        }
    }

    textarea, input {
        background-color: rgb(243 243 243);
        margin: 10px;
        padding: 10px 20px;
        border: none;
        border-radius: 2.5px;
        color: #646464;
        font-size: 1rem;
        line-height: 1.5rem;
    }
    input {
        height: 30px;
    }
    textarea {
        height: 200px;
        margin-top: 30px;
    }
    .send {
        width: 150px;
        height: 50px;
        background-color: var(--color-lighten-orange);
        color: white;
    }

</style>
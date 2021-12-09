<template>
  <div class="login-container">
    <div class="login-content">
      <ul class="tab">
        <li @click="action='register'" :class="action==='register' ? 'active' : 'inactive' ">用戶註冊</li>
        <li @click="action='login'" :class="action==='login' ? 'active' : 'inactive' ">用戶登入</li>
      </ul>
      <div class="form-container">
        <div class="login-form" v-if="action==='login'">
          <span class="title">登入</span>
          <p v-show="emailWrong">*電子郵件無效!</p>
          <input type="text" v-model="login.email"  @keyup.enter="userLogin" placeholder="電子郵件">
          <p v-show="pdWrong">*密碼錯誤!</p>
          <input type="text" v-model="login.password"  @keyup.enter="userLogin" placeholder="密碼">
          <button class="loginBtn" @click="userLogin">登入</button>
          <span class="forgetPwd">忘記密碼?</span>
        </div>
        <div class="register-form" v-else>
          <span class="title">註冊</span>
          <input type="text" v-model="register.name" placeholder="名字" >
          <p v-show="emailInvalid">*電子郵件必須含有@或.</p>
          <p v-show="emailRegisted">電子郵件已被註冊過!</p>
          <input type="email" v-model="register.email" placeholder="電子郵件">
          <input type="password" v-model="register.password" placeholder="密碼">
          <input type="text" v-model="register.phone" placeholder="手機號碼">
          <button class="registerBtn" @click="userRegistration">歡迎加入</button>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig.js";

export default {
  data() {
      return {
          action: 'login',
          login: {
            email: 'ujhy669917@gmail.com',
            password: 'qaz6699wsx'
          },
          register: {
            name: '連小逼',
            email:'ujhy669917@gmail.com',
            password: 'qaz6699wsx',
            phone: '0971007970'
          },
          pdWrong: false,
          emailWrong: false,
          emailInvalid: false,
          emailRegisted: false,
          
      }
  },
  methods: {
    userLogin() {
        signInWithEmailAndPassword(auth, this.login.email, this.login.password)
        .then(()=> {
          this.$router.push('/user');  
          alert('Successfully login!.');
        })
        .catch((error)=> {
           const errorCode = error.code;
           this.emailWrong = errorCode == 'auth/user-not-found' ? true : false;
           this.pdWrong = errorCode == 'auth/wrong-password' ? true : false;        
        })
    },
    userRegistration() {
        createUserWithEmailAndPassword(auth, this.register.email, this.register.password).then(() => {
            alert('註冊成功!'); 
            // 添加文檔至forestore
            let userData = {
              name: this.register.name,
              email: this.register.email,
              password: this.register.password,
              phone: this.register.phone,
            };
            addDoc(collection(db, 'users'), userData).then((val)=>{
              console.log('以添加文檔至forestore' + val.id);
            });
          }).catch((error) => {
              const errorCode = error.code;
              this.emailInvalid = errorCode == 'auth/invalid-email' ? true : false;
              this.emailRegisted = errorCode == 'auth/email-already-in-use' ? true : false;        
          })
    },
  },
  
}
</script>

<style lang="less" scoped>
    .login-container {
      margin-bottom: 10rem;
        .login-content {
          width: 600px;
          margin: 50px auto;
          padding-bottom: 20px;
          border: 1px solid var(--color-gray);
        }
        .tab {
          display: flex;
          justify-content: center;
          font-weight: 500;
          padding: 0;
          margin: 0;
          color: #777777;
          li {
            width: 50%;
            cursor: pointer;
            text-align: center;
            padding: 20px 0;
            &:first-child {
              border-right: 1px solid var(--color-gray);
            }
          }
        }
        .form-container {
          width: 75%;
          margin: 30px auto;
          .title {
            margin-bottom: 20px;
            text-align: center;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            span:last-child {
              margin-top: 10px;
            }
            .forgetPwd {
              text-align: center;
              cursor: pointer;
              color: var(--color-gray);
              font-size: 14px;
            }
          }
          .register-form {
            display: flex;
            flex-direction: column;
          }
          input {
            height: 30px;
            font-size: 14px;
            text-indent: 0.5rem;
            border: var(--color-gray) 1px solid;
            margin-bottom: 35px;
            padding: .2rem .6rem;
            border-radius: 5px;
          }
          button {
            width: 50%;
            height: 60px;
            border: var(--color-gray) 1px solid;
            background: rgb(50, 175, 19);
            color: whitesmoke;
            font-weight: 600;
            margin: auto;
            cursor: pointer;
            border-radius: 5px;
          }
          select {
            height: 30px;
            text-indent: 0.5rem;
            margin: 10px;
          }
        }
    }
    
    p {
      margin: 0;
      font-size: 12px;
      color: red;
      margin-left: 5px;
      margin-bottom: 5px;
    }

    .title {
      color: #777777;
    }

    .active {
      color: var(--color-dark-yellow); 
    }
    .inactive {
      border-bottom: 1px solid var(--color-gray); 
      background-color: #fcfcfc;
    }

    /* webkit scrollbar 自訂樣式 */
    ::-webkit-scrollbar {
    width: 5px;
    }
    /* track 軌道的樣式 */
    ::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    margin-left: 5px;
    background-color: #3838387c;
    }
    /* thumb bar的樣式 */
    ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background:   rgba(211, 211, 211, 0.5);
    }
</style>

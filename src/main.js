import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store' ;

// 建立實體 Vue 物件 . 使物件都能存取this.$router 與 this.$route . 掛載 Vue.js 實體至 DOM
createApp(App).use(router).use(store).mount('#app');

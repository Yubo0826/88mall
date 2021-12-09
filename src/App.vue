<template>
  <div class="app">
    <Header />
    <Navbar />
    <!-- 渲染 route 的位置 -->
    <router-view/>
    <Footer />
  </div> 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Navbar,
    Footer,
  }
}
</script>

<style lang="less">
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);

:root {
    --color-lighten-white: #dddddd;
    --color-dark-yellow: #f8e662;
    --color-gray: #a3a5a6;
}

#app {
  font-family: 'Noto Sans TC', sans-serif;
}
body {
  padding: 0;
  margin: 0;
}
input {
  outline: none;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

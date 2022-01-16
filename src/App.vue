<template>
  <div class="app">
    <router-view name="header"></router-view>
    <router-view name="navbar"></router-view>
    <router-view :key="$route.fullPath"/>
    <router-view name="footer"></router-view>
    <div class="arrow-box" @click="scrollToTop">
      <button type="button" ref="backTop" class="toTop-arrow"></button>
    </div>
  </div> 
</template>

<script>
// @ is an alias to /src
// import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {

  },
  created() {
    window.addEventListener("scroll", this.handleArrowBtn);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0, left: 0, behavior: 'smooth'
      })
    },
    handleArrowBtn() {
      this.$refs.backTop.style.opacity = window.scrollY > 178 ? "100" : "0";
    }
  },
  
}
</script>

<style lang="less">
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);

:root {
    --color-lighten-white: #dddddd;
    --color-lighten-orange: #ee9b41;
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
.arrow-box {
  position: relative;
  .toTop-arrow {
      width: 3rem;
      height: 3rem;
      padding: 0;
      margin: 0;
      border: 0;
      border-radius: 33%;
      opacity: 0.6;
      background: rgb(116, 116, 116);
      cursor: pointer;
      position:fixed;
      right: 3rem;
      bottom: 3rem;
      opacity: 0;
      transition: opacity .3s ease-in-out;
  }
  .toTop-arrow::before, .toTop-arrow::after {
      width: 25px;
      height: 6px;
      border-radius: 3px;
      background: #f8e662;
      position: absolute;
      content: "";
  }
  .toTop-arrow::before {
      transform: rotate(-45deg) translate(0, -50%);
      left: 0.42rem;
  }
  .toTop-arrow::after {
      transform: rotate(45deg) translate(0, -50%);
      right: 0.42rem;
  }
  .toTop-arrow:focus {outline: none;}
  
}
</style>

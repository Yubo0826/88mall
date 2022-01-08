<template>
  <div class="footer-container">
    <div class="left">
      <h2>ABOUT WEBSITE</h2>
      <span>此網站為我的 Side Project，這是一個 SPA電商網站，使用 Vue CLI框架製作。</span>
    </div>
    <div class="right">
      <h2>ABOUT ME</h2>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="less">
.footer-container {
  display: flex;
  width: 100%;
  height: 300px;
  background: slategray;
}

.left, .right {
  width: 50%;
  padding: 50px;
  color: rgb(233, 233, 233);
}

</style>

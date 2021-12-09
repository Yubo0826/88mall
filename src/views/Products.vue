<template>
    <div>
        <Header></Header>
        <Navbar></Navbar>
        全部商品
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'Products',
    components: {
        Header,
        Navbar,
    }
}
</script>

<style lang="less" scoped>

</style>
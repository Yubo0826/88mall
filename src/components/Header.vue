<template>
    <div class="header">
        <div class="header-container">
            <span>如同空氣包覆般的輕盈保暖，MUJI無印良品羽絨服飾系列上市</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        openLoginModal() {
            this.$store.commit('showModal')
        }
    },
}
</script>

<style lang="less">
    .header {
        width: 100%;
        background: #ffff7c;
        .header-container {           
            text-align: center;
        }
    }
    

</style>
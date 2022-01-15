<template>
    <div>
        <div class="header-container">
            <box-icon name='bell' animation='tada'></box-icon>
            <span>如同空氣包覆般的輕盈保暖，MUJI無印良品羽絨服飾系列上市</span>
        </div>
        <div class="logo-container">
        <img
            class="logo"
            @click="$router.push('/')"
            src="../assets/image/logo.svg"
            alt=""
        />
        </div>
    </div>
</template>

<script>
import 'boxicons';

export default {
    name: 'Header',
    methods: {
        openLoginModal() {
            this.$store.commit('showModal');
        }
    },
}
</script>

<style lang="less">
    .header-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background: var(--color-dark-yellow);
    }
    .logo-container {
        display: flex;
        align-items: center;
        .logo {
            width: 250px;
            margin: 10px auto;
            cursor: pointer;
        }
    }
    .box-icon {
        margin-right: 5px;
    }


    @media only screen and (max-width: 720px) {
        .header-container {
            display: none;
        }
    }
    

</style>
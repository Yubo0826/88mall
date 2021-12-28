<template>
    <div>
        <button class="addToCart" @click="handleClick" ref="addToCart">
            <span class="btn-content">加入購物車</span>
            <span class="btn-loading">loading</span>
            <span class="btn-success">成功加入購物車</span>
        </button>
    </div>
</template>

<script>

export default {
    name: 'addToCartBtn',
    methods: {
        handleClick() {
            const el = this.$refs.addToCart;
            el.classList.add('state-change');
            el.classList.add('loading-state');
            setTimeout(() => {
                el.classList.remove('loading-state');
            }, 1500);
            setTimeout(() => {
                el.classList.add('success-state');
                setTimeout(() => {
                    el.classList.remove('success-state');
                    setTimeout(() => {
                        el.classList.remove('state-change');
                    }, 600);
                }, 2000);
            }, 2300);
        },


    },
}
</script>

<style lang="less" scoped>
    .addToCart {
        position: relative;
        width: 150px;
        height: 46px;
        border: 1px var( --color-lighten-orange) solid;
        color: var( --color-lighten-orange);
        background-color: white;
        padding: 0;
        overflow: hidden;
        cursor: pointer;
        transition: opacity .8s ease-in-out, box-shadow .4s ease-in-out, background-color .5s ease-in-out;

        span {
            display: block;   
        }

        
        &:hover {
            box-shadow: inset 150px 0 0 0 var( --color-lighten-orange);
            color: white;
        }

        &.state-change {
            &:hover {
                box-shadow: none;
            }
            .btn-content {
                opacity: 0;
            }
        }

        &.loading-state {
            .btn-loading {
                opacity: 1;
            }
        }

        &.success-state {
            background-color:limegreen;
            border: none;
            .btn-success {
                opacity: 1;
                top: 35%;
            }
        }

        .btn-loading {
            position: absolute;
            top: 35%;
            left: 35%;
            opacity: 0;
            transition: opacity .25s ease-in-out;
        }

        .btn-success {
            position: absolute;
            color: rgb(255, 255, 255);
            top: -45%;
            left: 20%;
            opacity: 1;
            transition: opacity .5s ease-in-out, top .6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
    }
</style>
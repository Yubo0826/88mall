<template>
    <div class="sidebar-container">
        <ul>
            <li class="tab">
                <router-link to="/products/">全部商品</router-link>
            </li>
            <li class="tab" @click="toggle(0)">
                <router-link to="/products/stationery">文具</router-link>
                <i class="arrow" :class="{'down':!active[0], 'up':active[0]}" ref="arrow"></i>
                <slide-up-down v-model="active[0]" :duration="800">
                    <ul class="inner-list">
                        <li>鉛筆</li>
                        <li>原子筆</li>
                    </ul>
                </slide-up-down>
            </li>
            <li class="tab">
                <router-link to="/products/dailyuse">生活用品</router-link>
            </li>
            <li class="tab" @click="toggle(1)">
                <router-link to="/products/clothing">衣料</router-link>
                <i class="arrow" :class="{'down':!active[1], 'up':active[1]}" ref="arrow"></i>
                <slide-up-down v-model="active[1]" :duration="800">
                    <ul class="inner-list">
                        <li>MEN</li>
                        <li>WOMAN</li>
                    </ul>
                </slide-up-down>
            </li>
        </ul>
    </div>
</template>
<script>
import SlideUpDown from 'vue3-slide-up-down'

export default {
    name: 'SideBar',
    data() {
        return {
            active: [false, false],
        }
    },
    components: {
        'slide-up-down': SlideUpDown
    },
    methods: {
        toggle(index) {
            this.active[index] = !this.active[index];
        }
    },

}
</script>
<style lang="less" scoped>
    .sidebar-container {
        width: 190px;
        letter-spacing: .75rem;
        ul {
            .tab {
                margin-bottom: 15px;
                padding: 10px 0;
                border-bottom: 1px solid rgba(0, 0, 0, 5%);
                &:hover {
                    background-color: var(--color-dark-yellow);
                }
                a {
                    font-weight: 500;
                    color: rgb(121, 121, 121);
                    text-decoration: none;
                    &:hover {
                        color: rgb(255, 255, 255);
                    }
                }
                .arrow {
                    display: inline-block;
                    margin-left: 120px;
                    padding: 3px;
                    border: solid black;
                    border-width: 0 3px 3px 0;
                    transition: transform .5s;
                }
                .up {
                    transform: rotate(-135deg);
                }
                .down {
                    transform: rotate(45deg);
                }
                
            }
        }
    }
    .inner-list {
        margin-left: 1rem;
        margin-top: 15px;
        li {
            margin-bottom: 10px;
        }
    }
</style>
<template>
    <div class="user-wrapper">
        <div class="user-container">
            <div class="tab">
                <ul>
                    <li @click="action = 'profile'" :class="action === 'profile' ? 'active' : 'inactive'"><span>用戶資料</span></li>
                    <li @click="action = 'track'" :class="action === 'track' ? 'active' : 'inactive'"><span>追蹤商品</span></li>
                </ul>
            </div>
            <div class="tab-content">
                <!-- profile 區塊 -->
                <UserProfile v-if="action === 'profile'"></UserProfile>
                <!-- order 區塊 -->
                <UserOrder v-else-if="action === 'order'"></UserOrder>
                    
                <!-- message 區塊 -->
                <UserMessage v-else-if="action === 'message'"></UserMessage>   
                    
                <!-- like 區塊 -->
                <UserTrack v-else></UserTrack>
                    
            </div>
        </div>
    </div>
</template>

<script>
import UserProfile from '@/components/user/UserProfile.vue';
import UserOrder from '@/components/user/UserOrder.vue';
import UserMessage from '@/components/user/UserMessage.vue';
import UserTrack from '@/components/user/UserTrack.vue';

export default {
    data() {
        return {
            action: 'profile',
            userName: null,
            userEmail: null,
            userAddress: null,
            userPhone: null,
        }
    },
    components: { UserProfile, UserOrder, UserMessage, UserTrack },
}
</script>

<style lang="less" scoped>
    .user-wrapper {
        min-width: 1200px;
        margin-top: 50px;
        margin-bottom: 100px;
        .user-container {
            width: 80%;
            height: 500px;
            display: flex;
            margin: 0 auto;
            .tab {
                width: 150px;
                height: 100%;
                ul{
                    height: 100%;
                    li {
                        display: flex;
                        height: 25%;
                        box-sizing: border-box;
                        cursor: pointer;
                        border-bottom: 1px solid #aaa;
                        border-left: 1px solid #aaa;
                        span {
                            margin: auto;
                        }
                        &:nth-of-type(1) {
                            border-top: 1px solid #aaa;
                        }
                    }
                }
            }

            // tab-content
            .tab-content {
                width: 100%; 
                border: 1px solid #aaa;
            }
        }
    }

    .active {
        background-color: #fff;
        &::before {
            content: '';
            width: 7px;
            height: 100%;
            background-color: #ffe100;
            position: relative;
            left: -5px;
        }
        &::after {
            content: '';
            position: relative;
            z-index: 2;
            right: -5px;
            width: 7px;
            height: 100%;
            background-color: #ffffff;
        }
    }
    .inactive {
        color: var(--color-gray);
        background-color: rgb(252, 252, 252);
    }
</style>
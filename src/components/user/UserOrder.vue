<template>
    <div class="order-wrap">
        <table>
            <thead>
                <tr>
                    <th class="title">訂單編號</th>
                    <th class="title">商品名稱</th>
                    <th class="title">數量</th>
                    <th class="title">下定日期</th>
                    <th class="title">進度</th>
                    <th class="title">付款方式</th>
                    <th class="title">總價</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>51239845</td>
                    <td>色鉛筆</td>
                    <td>5</td>
                    <td>2021/12/10</td>
                    <td>已到達物流中心</td>
                    <td>信用卡已支付</td>
                    <td>250</td>
                </tr>
                <tr>
                    <td>51239845</td>
                    <td>色鉛筆</td>
                    <td>5</td>
                    <td>2021/12/10</td>
                    <td>已到達物流中心</td>
                    <td>信用卡已支付</td>
                    <td>250</td>
                </tr>
                                <tr>
                    <td>51239845</td>
                    <td>色鉛筆</td>
                    <td>5</td>
                    <td>2021/12/10</td>
                    <td>已到達物流中心</td>
                    <td>信用卡已支付</td>
                    <td>250</td>
                </tr>
                                <tr>
                    <td>51239845</td>
                    <td>色鉛筆</td>
                    <td>5</td>
                    <td>2021/12/10</td>
                    <td>已到達物流中心</td>
                    <td>信用卡已支付</td>
                    <td>250</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    .order-wrap {
        margin: 15px 0;
        table {
            width: 90%;
            border-collapse: collapse;
            margin: 0 auto;
            thead {
                tr {
                    border: var(--color-gray) 1px solid;
                    background: rgb(235, 235, 235);
                    margin-bottom: 100px;
                }
            }
            tbody {
                tr {
                    border: var(--color-gray) 1px solid;
                }
            }
        }
    }

    th, td {
        padding: 16px;
    }
</style>
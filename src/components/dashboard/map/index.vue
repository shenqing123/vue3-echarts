<template>
    <div class="bottom">
        <div class="map">
            <Suspense>
                <MapScatter></MapScatter>
                <template #fallback>
                    加载中。。。
                </template>
            </Suspense>
            
        </div>
        <div class="right">
            <el-card>
                <template #header>
                    <h2>订单同比增长</h2>
                </template>
                <LiquidFill></LiquidFill>
            </el-card>
            <el-card>
                <template #header>
                    <h2>热门搜索</h2>
                </template>
                <WordCloud></WordCloud>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import MapScatter from './mapScatter.vue';
import LiquidFill from './LiquidFill.vue';
import WordCloud from './WordCloud.vue';
</script>

<style lang="scss" scoped>
.bottom{
    display: flex;
    margin-top: 20px;
    gap: 20px;
    justify-content: space-between;
    .map{
        flex: 0 0 78%;
        height: 600px;
        position: relative;
    }
    .right{
        flex: 0 0 20%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        :deep .el-card{
            height: 280px;
            .el-card__body {
                height: 227px;
            }
        }
        h2{
            font-weight: 600;
        }
    }
}

</style>
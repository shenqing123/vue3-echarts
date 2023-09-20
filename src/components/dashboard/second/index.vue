<template>
    <div class="mt20">
        <el-card>
        <template #header>
            <div class="header">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                >
                    <el-menu-item index="1">销售额</el-menu-item>
                    <el-menu-item index="2">访问量</el-menu-item>
                </el-menu>
                <div class="header-right">
                    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px" size="large">
                        <el-radio-button label="今日" />
                        <el-radio-button label="本周" />
                        <el-radio-button label="本月" />
                        <el-radio-button label="本年" />
                    </el-radio-group>
                    <el-date-picker
                        v-model="selectDate"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :shortcuts="shortcuts"
                        size="large"
                    />
                </div>
                
            </div>
        </template>
        <el-row>
            <el-col :span="16">
                <div class="chart">
                    <v-chart :option="barOptions"></v-chart>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="right-list">
                    <div class="list-title">排行榜</div>
                    <div v-for="item,index in top10List" :key="item" class="list-item">
                        <span :class="index<3? 'top-3':''">{{ item.no }}</span>
                        <span>{{ item.title }}</span>
                        <span>{{ item.sales }}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-card>
    </div>
    
</template>

<script setup>
import {getSalesData} from '../../../api/dashboard'
const tabPosition = ref('今日')
const activeIndex = ref('1')
const selectDate = ref('')
const shortcuts = ref([
{
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    }
  },
])
const barOptions = ref({})
const salesData = ref({})
const top10List = ref([])
getSalesData().then(res => {
    salesData.value = res
    search()
})
function search() {
    if(activeIndex.value === '1') {
        top10List.value = salesData.value.saleRank
        renderBarOptions('年度销售额', salesData.value.saleFulleYearAxis, salesData.value.saleFulleYear)
    } else {
        top10List.value = salesData.value.visitRank
        renderBarOptions('年度访问量', salesData.value.visitFullYeadAxis, salesData.value.visitFullYear)
    }
}

function renderBarOptions (title, xAixs, data) {
    console.log('99', salesData, title, xAixs, data);
    barOptions.value = {
        title:{
            text: title,
            textStyle: {
                fontSize: 14,
                fontWeight: 'bolder'
            }
        },
        xAxis:{
            type: 'category',
            data: xAixs,
            axisTick:{
                alignWithLabel: 'center'
            }
        },
        yAxis: {
            type: 'value',
            splitLine:{
                lineStyle:{
                    type: 'dotted'
                }
            }
        },
        grid:{
            left: 40
        },
        series: {
            type: 'bar',
            itemStyle:{
                color: '#87ceeb'
            },
            barWidth: 20,
            data: data
        }
    }
}
function handleSelect (index) {
    activeIndex.value  = index
    search()
}
</script>

<style lang="scss" scoped>
.header{
    position: relative;
    .header-right{
        position: absolute;
        right: 2%;
        top: 10px;
        display: flex;
        gap: 20px;
    }
}
:deep .el-card__header{
    padding: 0;
    border-bottom: none;
}
:deep .el-menu{
    padding-left: 50px;
}
.chart{
    height: 434px;
}
.right-list {
    flex: 1;
    .list-title {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600
    }
    .list-item{
        margin: 20px 0;
        display: flex;
        gap: 20px;
        .top-3{
            background-color: #09b3f7;
            color: #fff
        }
        span{
            color:#464545;
            font-size: 14px;
            &:first-child {
                width: 20px;
                height: 20px;
                border-radius: 10px;
                text-align: center;
                line-height: 20px
            }  
            &:nth-child(2) {
                flex: 1
            }
        }                     
    }
}

</style>
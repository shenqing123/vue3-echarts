<template>
    <div class="home">
    <el-row :gutter="20">
      <el-col :span="6"><Card :title="'累计销售额'" :number="reportData.salesToday">
        <template #content>
            <div class="info">
                <div class="footer">
                    日同比<span class="increase">{{reportData.salesGrowLastDay}}%</span>
                </div>
                <div class="footer">
                    月同比<span class="increase">{{reportData.saleSGrowLastMonth}}%</span>
                </div>
            </div>
        </template>
        <template #footer>
          <div class="footer">昨日销售额 <span>￥{{reportData.salesLastDay}}</span> </div>
        </template>
      </Card></el-col>
      <el-col :span="6"><Card :title="'累计订单额'" :number="reportData.orderToday">
        <template #content>
          <v-chart :option="optionOfOrder"></v-chart>
        </template>
        <template #footer>
          <div class="footer">昨日销售额 <span>￥{{reportData.orderLastDay}}</span> </div>
        </template>
      </Card></el-col>
      <el-col :span="6"><Card :title="'今日用户交易数'" :number="reportData.userToday">
        <template #content>
          <v-chart :option="optionOfUser"></v-chart>
        </template>
        <template #footer>
          <div class="footer">退货率 <span>{{reportData.returnRate}}% </span></div>
        </template>
      </Card></el-col>
      <el-col :span="6"><Card :title="'累计用户数'" :number="reportData.totalUser">
        <template #content>
          <v-chart :option="optionOfTotalUser"></v-chart>
        </template>
        <template #footer>
          <div class="footer user-footer">
            <div>同日比 <span class="increase">{{reportData.userGrowLastDay}}%</span></div>
            <div>月同比 <span class="increase">{{reportData.userGrowLastMonth}}%</span> </div>
          </div>
        </template>
      </Card></el-col>
    </el-row>
  </div>
</template>

<script setup>
import Card from './card.vue'
import {getReportData} from '../../../api/dashboard'
const reportData = ref({})
const optionOfOrder = ref({})
const optionOfUser = ref({})
const optionOfTotalUser = ref({})
getReportData().then(res=>{
    reportData.value = res
})
watch(reportData, (val)=>{
    renderOrderChart(val.orderTrend)
    renderUserChart(val.orderUserTrend)
    renderTotalUserChart(val.userLastMonth, val.userToday)
})
function renderOrderChart (data) {
    optionOfOrder.value = {
        xAxis: {
          show: false,
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        series: 
          {
            type: 'line',
            symbol: 'none',
            smooth: true,
            lineStyle: {
              width: 0
            },
            areaStyle: {
              color: 'purple'
            },
            data: data
          }
        
      }
}

function renderUserChart (data) {
    optionOfUser.value = {
        xAxis: {
          show: false,
          type: 'category',
          scale: true,
          data: ['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00']
        },
        yAxis: {
          type: 'value',
          show: false
        },
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        tooltip: {
          show: true,
          confine: true
        },
        series: 
          {
            name: '实时交易量',
            type: 'bar',
            symbol: 'none',
            areaStyle: {
              color: 'rgb(167, 77, 167)'
            },
            data: data
          }
        
      }
} 
function renderTotalUserChart (userLastMonth, userToday) {
    optionOfTotalUser.value = {
        xAxis:{
            show: false,
            type: 'value'
        },
        yAxis: {
            show: false,
            type: 'category'
        },
        grid:{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        series: [{
            name: '上月平台用户量',
            stack: 'total',
            type: 'bar',
            itemStyle:{
                color: 'green'
            },
            barWidth: 10,
            data: [userLastMonth]
        },{
            name: '本月平台用户量',
            stack: 'total',
            type: 'bar',
            itemStyle:{
                color: '#ddd'
            },
            barWidth: 10,
            data: [userToday]
        },{
            type: 'custom',
            renderItem: (params, api) =>{
                // 利用svg绘制三角形
                // 确定三角形的位置
                const endPoint = api.coord([api.value(0), 0])
                // 绘制
                return {
                    type: 'group',
                    children: [{
                        type: 'path',
                        shape: {
                            d: 'M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z',
                            x: endPoint[0] - 5,
                            y: 35,
                            width: 10,
                            height: 10,
                            layout: 'cover'
                        },
                        style: {
                            fill: 'green'
                        }
                    },{
                        type: 'path',
                        shape: {
                            d: 'M889.696 320.8H158.848l365.504 365.536 365.344-365.536z',
                            x: endPoint[0] - 5,
                            y: 5,
                            width: 10,
                            height: 10,
                            layout: 'cover'
                        },
                        style: {
                            fill: 'green'
                        }
                    }]

                }
            },
            data: [130]
        }]
      }
    }
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
    background-color: #eee;
}

.footer{
    font-size: 14px!important;
    color: #464545;
    span{
      margin-left: 8px;
      font-weight: 550;
    }
}
.accumulatedSales{
  height: 50px;
}
.content{
  position: relative;
}
.info{
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
}
canvas{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
#progressCanvas{
  pointer-events: none;
}
.decrease{
    display: inline-block;
    height: 0;
    border-width: 4px;
    border-style: solid;
    border-color: green transparent transparent transparent;
    transform: translateY(-50%);
}
.increase::after{
    margin-left: 4px;
    content: '';
    display: inline-block;
    height: 0;
    border-width: 4px;
    border-style: solid;
    border-color: transparent transparent green transparent;
    transform: translateY(-50%);
}
.user-footer{
    display: flex;
    gap: 10px;
}
</style>
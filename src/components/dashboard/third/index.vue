<template>
    <div class="third">
            <div class="left"><el-card>
                <template #header>
                    <div class="css-2">关键词搜索</div>
                </template>
                <div class="p20">
                    <div class="chart-bar">
                        <div>
                            <div>搜索用户量</div>
                            <div class="number mt10">{{ totalUserCount }}</div>
                            <div class="chart">
                                <v-chart :option="userOption"></v-chart>
                            </div>
                        </div>
                        <div>
                            <div>搜索量</div>
                            <div class="number mt10">{{ totalSearchCount }}</div>
                            <div class="chart">
                                <v-chart :option="searchOption"></v-chart>
                            </div>
                        </div>
                    </div>
                    <div class="keyword-table">
                        <el-table :data="keyWordList" style="width: 100%">
                            <el-table-column  prop="rank" label="排名" width="60" />
                            <el-table-column align="center" prop="keyWord" label="关键词"/>
                            <el-table-column align="center" prop="totalSearch" label="总搜索量" />
                            <el-table-column align="center" prop="totalUser" label="搜索用户数" />
                        </el-table>
                        <div class="keyword-pagination">
                            <el-pagination background layout="prev, pager, next"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="6"
                            :total="keywordData.length" />
                        </div>
                        
                    </div>
                </div>
                
            </el-card></div>
            <div class="right"><el-card>
                <template #header>
                    <div class="header">
                        <div class="css-2">分类销售排行</div>
                        <div class="tabBtns">
                            <el-radio-group v-model="tabPosition" @change="render" size="large">
                                <el-radio-button label="品类" />
                                <el-radio-button label="商品" />
                            </el-radio-group>
                        </div>
                    </div>
                </template>
                <div class="cate-chart">
                    <v-chart :option="cateOption"></v-chart>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import {getKeywordData,getCategoryData} from '../../../api/dashboard.js'
const keywordData = ref([])
const categoryData = ref([])
const totalUserCount = ref(0)
const totalSearchCount = ref(0)
getKeywordData().then(res=>{
    keywordData.value = res
    const userData = [] 
    const totalData = []
    res.map(item => {
        totalUserCount.value += item.totalUser
        totalSearchCount.value += item.totalSearch
        userData.unshift(item.totalUser)
        totalData.unshift(item.totalSearch)
    })
    renderOption(userOption, userData.slice(10,20))
    renderOption(searchOption, totalData.slice(10,20))
    loadData()
})

// const totalUserCount = computed(()=>{

//     return keywordData.value.length > 0 && keywordData.value.reduce((a,b)=>{
//         console.log('987',a,b);
//         return a + b.totalUser
//     }, 0)
// })
// const totalSearchCount = computed(()=>{
//     return keywordData.value.length > 0 && keywordData.value.reduce((a,b)=>{
//         console.log('987',a,b);
//         return a + b.totalSearch
//     }, 0)
// })
const userOption = ref({})
const searchOption = ref({})
function renderOption(option, data) {
    option.value = {
        xAxis:{
            type: 'category',
            show: false,
            boundaryGap: false
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
        series:{
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
                color: 'skyblue'
            },
            data: data
        }
    }
}
const currentPage = ref(1)
const pageSize = 6
const keyWordList = ref([])
function loadData() {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    keyWordList.value = keywordData.value.slice(startIndex, endIndex)
}
function handleCurrentChange (val) {
    currentPage.value = val
    loadData()
}
// 品类
const tabPosition = ref('品类')
const cateOption = ref({})

function render () {
    if(tabPosition.value === '品类') {
        renderCateOption(categoryData.value.data1)
    } else {
        renderCateOption(categoryData.value.data2)
    }
}
getCategoryData().then(res =>{
    categoryData.value = res
    render()
})
function renderCateOption (data) {
    let number = 0
    data = data.map(item => {
        item.name = item.title + '|' + item.value
        number+=item.value
        return item
    })
    cateOption.value = {
        title: [{
            text: '品类分布',
            left: 5,
            top:5
        },{
            text: '累计订单量',
            subtext: number,
            top: '45%',
            left: '40%',
            textAlign: 'center',
            textStyle:{
                fontSize:14,
                color: '#666'
            },
            subtextStyle:{
                fontSize: 20,
                color: '#333'
            }
        }],
        
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                const {seriesName,  marker} = params
                const {title, value} = params.data
                return seriesName + '</br>' + marker + title +  '</br>'+marker + '销售额'+value 
            }
        },
        grid:{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        legend: {
            top: 0,
            right: 0,
            orient: 'vertical'
        },
        series: {
            name: '品类分布',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderColor: '#fff',
                borderCap: 'butt',
                borderWidth: 10
            },
            label:{
                show: true,
                position: 'outside',
                formatter: function (params) {
                    return params.data.title
                }
            },
            data: data
  
            }
    }
}
</script>

<style lang="scss" scoped>
.third{
    display: flex;
    margin-top: 20px;
    gap: 20px;
    .left{
        flex: 1;

    }
    .right{
        flex: 1;
        :deep .el-card{
            height: 100%;
            .el-card__body{
                height: 490px;
            }
        }
    }
}
.chart-bar{
    display: flex;
    gap: 20px;
    div{
        flex: 1;
    }
}
.chart{
    width: 100%;
    height: 50px;
}
 .keyword-pagination{
        margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    }
.cate-chart{
    height: 100%
}
:deep .el-card__header{
    position: relative;
    .tabBtns{
        position: absolute;
        top: 10%;
        right: 2%;
    }

}
</style>
<template>
    <v-chart :option="option"></v-chart>
</template>

<script setup>
import 'echarts/extension/bmap/bmap.js'
import {loadBMap} from './map.js'
import {getMapData} from '../../../api/dashboard'
const option = ref({})
const mapData = ref({})
function renderChart(data){
    option.value = {
        bmap:{
            key: 'YWmzHIcdogR4w71BhFLq5y6k00KubKi0',
            center: [108.954355, 34.346721], //经纬度
            zoom: 5,
            roam: true, //滚轮是否可以缩放
            // mapStyle:    [{
            //     featureType: 'water',
            //     elementType: 'all',
            //     stylers: {
            //       color: '#d1d1d1'
            //     }
            //   },
            //   {
            //     featureType: 'land',
            //     elementType: 'all',
            //     stylers: {
            //       color: '#f3f3f3'
            //     }
            //   },
            //   {
            //     featureType: 'railway',
            //     elementType: 'all',
            //     stylers: {
            //       visibility: 'off'
            //     }
            //   },
            //   {
            //     featureType: 'highway',
            //     elementType: 'all',
            //     stylers: {
            //       color: '#fdfdfd'
            //     }
            //   },
            //   {
            //     featureType: 'highway',
            //     elementType: 'labels',
            //     stylers: {
            //       visibility: 'off'
            //     }
            //   },
            //   {
            //     featureType: 'arterial',
            //     elementType: 'geometry',
            //     stylers: {
            //       color: '#fefefe'
            //     }
            //   },
            //   {
            //     featureType: 'arterial',
            //     elementType: 'geometry.fill',
            //     stylers: {
            //       color: '#fefefe'
            //     }
            //   },
            //   {
            //     featureType: 'poi',
            //     elementType: 'all',
            //     stylers: {
            //       visibility: 'off'
            //     }
            //   },
            //   {
            //     featureType: 'green',
            //     elementType: 'all',
            //     stylers: {
            //       visibility: 'off'
            //     }
            //   },
            //   {
            //     featureType: 'subway',
            //     elementType: 'all',
            //     stylers: {
            //       visibility: 'off'
            //     }
            //   },
            //   {
            //     featureType: 'manmade',
            //     elementType: 'all',
            //     stylers: {
            //       color: '#d1d1d1'
            //     }
            //   },
            //   {
            //     featureType: 'local',
            //     elementType: 'all',
            //     stylers: {
            //       color: '#d1d1d1'
            //     }
            //   },
            //   {
            //     featureType: 'arterial',
            //     elementType: 'labels',
            //     stylers: {
            //       visibility: 'off'
            //     }
            //   },
            //   {
            //     featureType: 'boundary',
            //     elementType: 'all',
            //     stylers: {
            //       color: '#fefefe'
            //     }
            //   },
            //   {
            //     featureType: 'building',
            //     elementType: 'all',
            //     stylers: {
            //       color: '#d1d1d1'
            //     }
            //   },
            //   {
            //     featureType: 'label',
            //     elementType: 'labels.text.fill',
            //     stylers: {
            //       color: '#999999'
            //     }
            //   }
            // ]
        },
        title: {
            text: '新中地网点地图',
            left: 'center'
        },
        tooltip:{
            trigger: 'item'
        },
        series: [{
            name: '新中地外卖',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: data,
            encode: {
                value: 2
            },
            symbolSize(value){
                return value[2]/10
            }
        },{
            name: '22',
            type: 'effectScatter',
            rippleEffect: {
                brushType: 'stroke',
                color: 'purplue'
            },
            coordinateSystem: 'bmap',
            data: data.reverse().slice(0,10),
            tooltip: {
                textStyle: {
                    color: 'green'
                },
                formatter: function (params) {
                    return params.data.name + '销售额' + params.data.value[2]
             }
            },
            symbolSize(value){
                return value[2]/10
            }
        }]
    }
}
function convertData (city, geoData) {
    // city: {name: '海门', value: 10}
    // geoData: {'海门'： [100,200]}
    // -> {name: '滑门'， value:【100，200，10】}
    const data = city.map(cityItem => {
        const geo = geoData[cityItem.name]
        if (geo) {
            cityItem.value = geo.concat(cityItem.value)
        }
        
        return cityItem
    })
    return data
}
await loadBMap('YWmzHIcdogR4w71BhFLq5y6k00KubKi0')
onMounted (async ()=>{
    const res = await getMapData()
    renderChart(convertData(res.city, res.geodata))
})

</script>

<style lang="scss" scoped>

</style>
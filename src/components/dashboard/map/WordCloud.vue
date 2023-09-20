<template>
    <v-chart :option="option"></v-chart>
</template>

<script setup>
import 'echarts-wordcloud'

const option = ref({})
function render(){
    option.value = {
        tooltip: {
            show: true
        },
        series:{
            type: 'wordCloud',
            shape: 'cardiord',
            width: '100%',
            height: '100%',
            textStyle: {
                // Color can be a callback function or a color string
                color: function () {
                    // Random color
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                focus: 'self',
                textStyle: {
                    textShadowBlur: 6,
                    textShadowColor: '#333'
                }
            },
            data: [
        {
            "rank": "1",
            "name": "小龙虾",
            "value": 876,
            "totalUser": 87
        },
        {
            "rank": "2",
            "name": "煎饼果子",
            "value": 871,
            "totalUser": 81
        },
        {
            "rank": "3",
            "name": "炸鸡腿",
            "value": 712,
            "totalUser": 81
        },
        {
            "rank": "4",
            "name": "麻辣烫",
            "value": 701,
            "totalUser": 71
        },
        {
            "rank": "5",
            "name": "汉堡",
            "value": 678,
            "totalUser": 67
        }]
        }
        
    }
}
render()
</script>

<style lang="scss" scoped>

</style>
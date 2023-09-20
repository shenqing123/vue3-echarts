<template>
    <v-chart :option="option"></v-chart>
</template>

<script setup>
import 'echarts-liquidFill'
const option = ref({})
function render(data) {
    option.value = {
        series: {
            type: 'liquidFill',
            data,
            radius: '80%',
            color: ['red'],
            amplitude: '4%',
            outline: {
                borderDistance: 2,
                itemStyle:{
                    borderWidth: 2
                }
            }
        }
    }
}
render([0.02])
</script>

<style lang="scss" scoped>

</style>
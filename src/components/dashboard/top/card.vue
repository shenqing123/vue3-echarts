<template>
    <el-card shadow="hover">
        <div class="title">{{ props.title }}</div>
        <div class="number">{{ props.number }}</div>
        <div class="content">
            <slot name="content"></slot>
        </div>
        <el-divider />
        <slot name="footer"></slot>

    </el-card>
</template>

<script setup>
const props = defineProps(['title', 'number'])
</script>

<style lang="scss" scoped>
.title{
    font-size: 12px;
    color: #777;
    letter-spacing: 1px;
}
.number{
    font-size: 24px;
    font-weight: 600;
    margin-top: 10px;
}
:deep .el-divider--horizontal{
    margin: 18px 0 10px 0;
}
.content{
    margin-top: 10px;
    height: 50px;
    overflow: hidden;
}

</style>

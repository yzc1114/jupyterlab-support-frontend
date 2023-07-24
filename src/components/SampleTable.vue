<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="column in columns" :key="column.prop" :label="column.label" :prop="column.prop">
                <!-- Custom slot for the last column to add a button -->
                <template v-if="column.prop === 'storageLocation'" v-slot="scope">
                    <el-button @click="copyStorageLocation(scope.row.storageLocation)">复制地址</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="pagination.total > 10" @current-change="handlePageChange"
            :current-page="pagination.currentPage" :page-size="pagination.pageSize" layout="prev, pager, next"
            :total="pagination.total"></el-pagination>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件
import { copyToClipboard } from '@/utils/clipboard'

export default defineComponent({
    name: 'SampleTable',
    props: {
        tableData: {
            type: Array<any>,
            default: () => [],
        },
        columns: {
            type: Array<any>,
            default: () => [],
        },
        pagination: {
            type: Object,
            default: () => ({
                total: 0,
                currentPage: 1,
                pageSize: 10,
            }),
        },
    },
    methods: {
        copyStorageLocation(storageLocation: string) {
            copyToClipboard(storageLocation)
            ElMessage.success('地址已复制到剪贴板！');
        },
        handlePageChange(page: number) {
            this.$emit('page-change', page);
        },
    },
});
</script>
  
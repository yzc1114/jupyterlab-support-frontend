<template>
    <div class="table-container">
        <el-table :data="tableData" class="el-table" element-loading-text="正在加载">
            <el-table-column v-for="column in columns" :key="column.prop" :label="column.label" :prop="column.prop">
                <!-- Custom slot for the last column to add a button -->
                <template v-if="column.prop === 'storageLocation'" v-slot="scope">
                    <el-button @click="copyStorageLocation(scope.row.storageLocation)">复制地址</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">

        </div>
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

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}

.el-table {
    /* position: absolute; */
    width: 100%;
    height: 100%;
}

.table-container {
    width: 100%;
    height: 100%;
    flex: auto;
    overflow: hidden;
    position: relative;
}

/* // 计算方式，高度，滚动可以保证高度不受限制，页面内容会完全显示
::v-deep .el-table__fixed {
    height: 100% !important;
    z-index: 50;
  }
  ::v-deep .el-table__body-wrapper {
    overflow: scroll !important;
  }
  ::v-deep .el-table__fixed:before {
    width: 0;
    height: 0;
  } */

:deep(.el-table__fixed) {
    height: 100% !important;
    width: 100% !important;
}

:deep(.el-table__fixed-right),
:deep(.el-table__fixed-body-wrapper) {
    height: 100% !important;
    width: 100% !important;
}

</style>
  
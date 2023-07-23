<template>
    <el-button type="primary" @click="sampleDataSearchVisible = true">数据样本检索</el-button>

    <el-dialog v-model="sampleDataSearchVisible" title="数据样本检索" @close="resetSearchForm">
        <el-tabs v-model="activeTab" @tab-click="resetSearchForm">
            <el-tab-pane label="用户样本检索" name="userSample">
                <el-form :model="userSampleSearchModel" ref="userSampleForm" label-width="100px">
                    <el-form-item label="样本集名称">
                        <el-checkbox class="specify-check-box" v-model="userSampleCheckboxes.sampleSetName" label="指定" size="large" />
                        <el-input :disabled="!userSampleCheckboxes.sampleSetName" v-model="userSampleSearchModel.sampleSetName"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="userSampleSearchModel.type" :placeholder="1">
                            <el-option label="未指定" value=""></el-option>
                            <el-option label="场景识别" value="1"></el-option>
                            <el-option label="分割分类" value="2"></el-option>
                            <el-option label="目标检测" value="3"></el-option>
                            <el-option label="变化检测" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="来源">
                        <el-select v-model="userSampleSearchModel.source" placeholder="1">
                            <el-option label="未指定" value=""></el-option>
                            <el-option label="本地上传" value="1"></el-option>
                            <el-option label="平台制作" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="波段数">
                        <el-checkbox class="specify-check-box" v-model="userSampleCheckboxes.bands" label="指定" size="large" />
                        <el-input-number :min="1" :disabled="!userSampleCheckboxes.bands"
                            v-model="userSampleSearchModel.bands" :step="1" :precision="0"
                            controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item label="样本格式" v-model="userSampleSearchModel.format">
                        <el-select v-model="userSampleSearchModel.format" placeholder="请选择">
                            <el-option label="未指定" value=""></el-option>
                            <el-option label="tif" value="1"></el-option>
                            <el-option label="png" value="2"></el-option>
                            <el-option label="jpg" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="searchUserSample">搜索</el-button>

                <div v-if="userSampleSearchResult">
                    <sample-table :table-data="userSampleSearchResult.data.list" :columns="tableColumns"
                        :pagination="userSamplePagination" @page-change="handleUserSamplePageChange"></sample-table>
                </div>

            </el-tab-pane>

            <el-tab-pane label="平台样本检索" name="platformSample">
                <el-form :model="platformSampleSearchModel" ref="platformSampleForm" label-width="100px">
                    <el-form-item label="样本集名称">
                        <el-checkbox class="specify-check-box" v-model="platformSampleCheckboxes.sampleSetName" label="指定" size="large" />
                        <el-input :disabled="!platformSampleCheckboxes.sampleSetName" v-model="platformSampleSearchModel.sampleSetName"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="platformSampleSearchModel.type" placeholder="请选择">
                            <el-option label="未指定" value="未指定"></el-option>
                            <el-option label="场景识别" value="1"></el-option>
                            <el-option label="分割分类" value="2"></el-option>
                            <el-option label="目标检测" value="3"></el-option>
                            <el-option label="变化检测" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="波段数">
                        <el-checkbox class="specify-check-box" v-model="platformSampleCheckboxes.bands" label="指定" size="large" />
                        <el-input-number :min="1" :disabled="!platformSampleCheckboxes.bands"
                            v-model="platformSampleSearchModel.bands" :step="1" :precision="0"
                            controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item label="分辨率" v-model="platformSampleSearchModel.resolution">
                        <el-checkbox class="specify-check-box" v-model="platformSampleCheckboxes.resolution" label="指定" size="large" />
                        <el-input-number :min="1" :disabled="!platformSampleCheckboxes.resolution"
                            v-model="platformSampleSearchModel.resolution" :step="1" :precision="0"
                            controls-position="right"></el-input-number>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="searchPlatformSample">搜索</el-button>
                <div v-if="platformSampleSearchResult">
                    <sample-table :table-data="platformSampleSearchResult.data.list" :columns="tableColumns"
                        :pagination="platformSamplePagination" @page-change="handlePlatformSamplePageChange"></sample-table>
                </div>

            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型
import { type UserSampleSet, type UserSampleApiResponse, type UserSampleSetQueryParams, type PlatformSampleSet, type PlatformSampleApiResponse, type PlatformSampleSetQueryParams, getUserSampleList, getPlatformSampleList } from '@/api/samples'
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件
import SampleTable from '@/components/SampleTable.vue'

var defaultUserSampleSearchParams = {
    pageSize: 10,
    pageNum: 1,
    sampleSetName: '测试用户上传样本集',
    type: 1,
    source: 1,
    bands: 1,
    format: "tif",
    size: "1000*1000",
    userId: '',
} as UserSampleSetQueryParams

var defaultUserSampleSearchModel = {
    pageSize: 10,
    pageNum: 1,
    sampleSetName: '测试用户上传样本集',
    type: "未指定",
    bands: 1,
    source: "未指定",
    format: "未指定",
}

var defaultPlatformSapleSearchParams = {
    pageSize: 10,
    pageNum: 1,
    sampleSetName: '测试用户上传样本集',
    type: 1,
    bands: 1,
    resolution: 10,
    userId: '',
} as PlatformSampleSetQueryParams

var defaultPlatformSampleSearchModel = {
    pageSize: 10,
    pageNum: 1,
    sampleSetName: '测试用户上传样本集',
    type: "未指定",
    bands: 1,
    resolution: 10,
}

export default defineComponent({
    name: 'SampleSearch',
    components: {
        SampleTable,
    },
    data() {
        return {
            instanceServiceUrl: "",
            sampleDataSearchVisible: false,
            codeSnippetVisible: false,
            activeTab: 'userSample', // Active tab (userSample or platformSample)
            userSampleSearchModel: defaultUserSampleSearchModel,
            userSampleSearchResult: null as UserSampleApiResponse | null, // Holds the user sample search result

            platformSampleSearchModel: defaultPlatformSampleSearchModel,
            platformSampleSearchResult: null as PlatformSampleApiResponse | null, // Holds the platform sample search result
            tableColumns: [
                { label: '名称', prop: 'name' },
                { label: '创建时间', prop: 'gmtCreate' },
                { label: '数量', prop: 'number' },
                { label: '类型', prop: 'typeStr' },
                { label: '格式', prop: 'format' },
                { label: '波段数', prop: 'bands' },
                { label: '分辨率', prop: 'resolution' },
                { label: '类别数', prop: 'classNumber' },
                { label: '操作', prop: 'storageLocation' },
            ],
            userSampleCheckboxes: {
                sampleSetName: false,
                bands: false,
            },
            platformSampleCheckboxes: {
                sampleSetName: false,
                bands: false,
                resolution: false
            },
            userSamplePagination: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
            },
            platformSamplePagination: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
            },
        };
    },
    props: {
        userId: {
            type: String,
            required: true,
        },
    },
    created() {
        for (let ob of [defaultPlatformSapleSearchParams, defaultUserSampleSearchParams]) {
            ob.userId = this.userId
        }
    },
    mounted() {

    },
    methods: {
        async searchUserSample() {
            let userSampleSearchModel = this.userSampleSearchModel
            let userSampleSearchParams = Object.assign({}, defaultUserSampleSearchParams)
            userSampleSearchParams.bands = this.userSampleCheckboxes.bands ? userSampleSearchModel.bands : null
            userSampleSearchParams.sampleSetName = this.userSampleCheckboxes.sampleSetName ? userSampleSearchModel.sampleSetName : null
            userSampleSearchParams.format = userSampleSearchModel.format === "未指定" ? null : userSampleSearchModel.format
            userSampleSearchParams.source = userSampleSearchModel.source === "未指定" ? null : Number(userSampleSearchModel.source)
            userSampleSearchParams.type = userSampleSearchModel.type === "未指定" ? null : Number(userSampleSearchModel.type)
            console.log("searchUserSample request", userSampleSearchParams)
            const response = await getUserSampleList(userSampleSearchParams)
            console.log("searchUserSample response", response)
            if (response.code !== 200) {
                let msg: string = `搜索失败，原因：${response.message}`
                ElMessage.error(msg)
                return
            }
            this.userSampleSearchResult = response
            this.userSamplePagination.total = response.data.total
        },
        async searchPlatformSample() {
            let platformSampleSearchModel = this.platformSampleSearchModel
            let platformSampleSearchParams = Object.assign({}, defaultPlatformSapleSearchParams)
            platformSampleSearchParams.bands = this.platformSampleCheckboxes.bands ? platformSampleSearchModel.bands : null
            platformSampleSearchParams.resolution = this.platformSampleCheckboxes.resolution ? platformSampleSearchModel.resolution : null
            platformSampleSearchParams.sampleSetName = this.platformSampleCheckboxes.sampleSetName ? platformSampleSearchModel.sampleSetName : null
            platformSampleSearchParams.type = platformSampleSearchModel.type === "未指定" ? null : Number(platformSampleSearchModel.type)
            console.log("searchPlatformSample request", platformSampleSearchParams)
            const response = await getPlatformSampleList(platformSampleSearchParams)
            console.log("searchPlatformSample response", response)
            if (response.code !== 200) {
                let msg: string = `搜索失败，原因：${response.message}`
                ElMessage.error(msg)
                return
            }
            this.platformSampleSearchResult = response
            this.platformSamplePagination.total = response.data.total
        },
        handleUserSamplePageChange(page: number) {
            this.userSamplePagination.currentPage = page;
            // Perform user sample search with updated pagination
            this.searchUserSample();
        },

        handlePlatformSamplePageChange(page: number) {
            this.platformSamplePagination.currentPage = page;
            // Perform platform sample search with updated pagination
            this.searchPlatformSample();
        },
        resetSearchForm() {
            // Reset search parameters and result when switching tabs or closing the dialog
            this.userSampleSearchModel = defaultUserSampleSearchModel;
            this.userSampleSearchResult = null;
            this.platformSampleSearchModel = defaultPlatformSampleSearchModel;
            this.platformSampleSearchResult = null;
        },
    },
});
</script>


<style scoped>
.specify-check-box {
    margin-right: 10px;
}
</style>

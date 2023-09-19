<template>
    <div class="container">
        <el-form :model="dataSearchModel" ref="dataSearchForm" label-width="100px">

            <el-row class="form-item-row">
                <el-col :span="4" class="form-item-label">
                    时间范围
                </el-col>
                <el-col :span="20">
                    <el-date-picker v-model="dataSearchModel.dateRange" type="daterange" range-separator="To"
                        start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
                        :default-value="[new Date(), new Date()]" />
                </el-col>
            </el-row>

            <el-row class="form-item-row">
                <el-col :span="4" class="form-item-label">
                    云量范围
                </el-col>
                <el-col :span="20">
                    <el-input-number v-model="dataSearchModel.minCloudPercent" @input="onCloudPercentInputChange('left')"
                        type="number" placeholder="最小云量" :min="0" :max="100" style="width: 100px;"></el-input-number>
                    <span style="margin: 0 10px;">-</span>
                    <el-input-number v-model="dataSearchModel.maxCloudPercent" @input="onCloudPercentInputChange('right')"
                        type="number" placeholder="最大云量" :min="0" :max="100" style="width: 100px;"></el-input-number>
                </el-col>
            </el-row>

            <el-row class="form-item-row">
                <el-col :span="4" class="form-item-label">
                    GSD范围
                </el-col>
                <el-col :span="20">
                    <el-input-number v-model="dataSearchModel.minImageGSD" @input="onGsdInputChange('left')" type="number"
                        placeholder="最小Gsd" :min="0" :max="100" style="width: 100px;"></el-input-number>
                    <span style="margin: 0 10px;">-</span>
                    <el-input-number v-model="dataSearchModel.maxImageGSD" @input="onGsdInputChange('right')" type="number"
                        placeholder="最大Gsd" :min="0" :max="100" style="width: 100px;"></el-input-number>
                </el-col>
            </el-row>

            <el-row class="form-item-row">
                <el-col :span="24" v-for="(satelliteSensors, satelliteName, index) in dataSearchModel.satellites"
                    class="satellite-form">
                    <el-col :span="4" class="form-item-label">
                        {{ index == 0 ? "卫星传感器" : "" }}
                    </el-col>
                    <el-col :span="20">
                        <div :key="satelliteName" class="button-group-wrapper">
                            <div class="button-group-label">{{ satelliteName }}</div>
                            <el-button-group class="button-group">
                                <el-button v-for="(sensorEnabled, sensorName, index) in satelliteSensors" :key="sensorName" class="button-group-item"
                                    :type="sensorEnabled ? 'primary' : ''"
                                    @click="dataSearchModel.satellites[satelliteName][sensorName] = !(sensorEnabled as boolean)">
                                    {{ sensorName }}
                                </el-button>
                            </el-button-group>
                        </div>
                    </el-col>

                </el-col>
            </el-row>

            <el-row class="form-item-row">
                <el-col :span="4" class="form-item-label">
                    区域
                </el-col>
                <el-col :span="20">
                    <el-cascader style="width: 300px;" :options="regionData" :props="regionDataCascaderProps"
                        v-model="dataSearchModel.regionSelected" @change="console.log(dataSearchModel.regionSelected)">
                    </el-cascader>
                </el-col>
            </el-row>

        </el-form>
        <div class="primary-button-container">
            <el-button type="primary" @click="searchData" size="large" class="primary-button">搜索</el-button>
        </div>
        <div class="table-container">
            <el-table v-if="dataSearchResult !== null" :data="dataSearchResult.data.datas" class="el-table"
                :cell-style="{ textAlign: 'center' }" :header-cell-style="{ 'text-align': 'center' }">
                <el-table-column label="选择" min-width="40">
                    <template #default="{ row }">
                        <el-checkbox v-model="dataSearchResultSelectedImages[row.thumbUrl]"></el-checkbox>
                    </template>
                </el-table-column>

                <el-table-column prop="name" label="名称" />
                <el-table-column prop="satelliteId" label="卫星" min-width="80" />
                <el-table-column prop="sensorId" label="传感器" min-width="80" />
                <el-table-column prop="receiveTime" label="接收时间" min-width="150" />
                <el-table-column prop="cloudPercent" label="云量" min-width="80" />
                <el-table-column prop="sources" label="来源" min-width="200" />
                <el-table-column label="缩略图">
                    <template #default="{ row }">
                        <img :src="row.thumbUrl" alt="" style="width: 100px; height: 100px;">
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pagination" v-if="dataSearchResult">
            <el-pagination v-if="pagination.total > 10" @current-change="handlePageChange"
                :current-page="pagination.currentPage" :page-size="pagination.pageSize" layout="prev, pager, next"
                :total="pagination.total"></el-pagination>
        </div>

        <div v-if="dataSearchResult" class="primary-button-container">
            <el-button @click="copyDataLinks" type="primary" size="large" class="primary-button">
                复制选中链接
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型
import { type DataRequestParams, type DataResponse, type SatelliteImage, type Satellite, getDataList } from '@/api/data'
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件
import SampleTable from '@/components/SampleTable.vue'
import { copyToClipboard } from '@/utils/clipboard'
import {
    provinceAndCityData,
    pcTextArr,
    regionData,
    pcaTextArr,
    codeToText,
} from "element-china-area-data";


var defaultDataSearchParams = {
    satelliteSensorImageModeList: [],
    exhibite: 0,
    maxImageGsd: 0,
    minCloudPercent: 0,
    minImageGsd: 0,
    offset: 1,
    limit: 10,
    satelliteList: [],
    startTime: "",
    topology: 1,
    endTime: "",
    maxCloudPercent: 0,
    cityId: 0,
    countyId: 0,
    provinceId: 110000000000,
    regionLevel: 1,
    regionName: "北京市",
    filterSatelliteList: [],
    ifThumbUrl: false,
} as DataRequestParams

var defaultDataSearchModel = {
    dateRange: ['2022-07-22', '2023-07-22'],
    minCloudPercent: 0,
    maxCloudPercent: 20,
    minImageGSD: 0,
    maxImageGSD: 25,
    regionSelected: [],
    satellites: {
        "GF1": {
            "PMS1": true, "PMS2": true, "WFV1": true, "WFV2": true, "WFV3": true, "WFV4": true
        },
        "GF2": {
            "PMS1": true, "PMS2": true
        },
        "GF6": {
            "WFV": true, "PMS": true
        },
        "GF7": {
            "BWD": true, "DLC": true, "FWD": true, "SLA": true
        }
    } as { [key: string]: { [key: string]: boolean } },
}



export default defineComponent({
    name: 'SampleSearch',
    components: {
        SampleTable,
    },
    data() {
        return {
            regionData,
            regionDataCascaderProps: {
                checkStrictly: true,
            },
            instanceServiceUrl: "",
            dataSearchVisible: false,

            dataSearchModel: defaultDataSearchModel,
            dataSearchResult: null as DataResponse | null,
            dataSearchResultSelectedImages: {} as { [key: string]: boolean },
            pagination: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
            }
        };
    },
    props: {
        userId: {
            type: String,
            required: true,
        },
    },
    created() {
    },
    mounted() {
        // setInterval(() => {
        //     console.log("dataSearchModel", this.dataSearchModel)
        //     console.log("region data", this.regionData)
        // }, 5000);
    },
    methods: {
        async searchData() {
            // copy defaultDataSearchParams
            console.log("searchData", this.dataSearchModel)
            let params = Object.assign({}, defaultDataSearchParams)
            let dataSearchModel = this.dataSearchModel
            params.startTime = dataSearchModel.dateRange[0]
            params.endTime = dataSearchModel.dateRange[1]
            params.minCloudPercent = dataSearchModel.minCloudPercent
            params.maxCloudPercent = dataSearchModel.maxCloudPercent
            params.minImageGsd = dataSearchModel.minImageGSD
            params.maxImageGsd = dataSearchModel.maxImageGSD
            params.satelliteList = []
            for (let satelliteName in dataSearchModel.satellites) {
                let satellite = dataSearchModel.satellites[satelliteName]
                let sensors = []
                for (let sensorName in satellite) {
                    if (satellite[sensorName]) {
                        sensors.push(sensorName)
                    }
                }
                if (sensors.length > 0) {
                    params.satelliteList.push(
                        {
                            satelliteId: satelliteName,
                            sensorIds: sensors
                        } as Satellite
                    )
                }
            }
            // params.offset = (this.pagination.currentPage - 1) * this.pagination.pageSize + 1 ?????????
            params.offset = this.pagination.currentPage
            params.limit = this.pagination.pageSize
            console.log("getDataList params", params)
            let response = await getDataList(params)
            console.log("getDataList response", response)
            if (response.code !== 200) {
                ElMessage.error(`搜索失败，原因：${response.message}`)
                return
            }
            for (let data of response.data.datas) {
                this.dataSearchResultSelectedImages[data.thumbUrl] = false
            }
            this.dataSearchResult = response
            this.pagination.total = response.data.total
        },
        handlePageChange(page: number) {
            this.pagination.currentPage = page;
            // Perform user sample search with updated pagination
            this.searchData();
        },
        resetSearchForm() {
            // Reset search parameters and result when switching tabs or closing the dialog
            this.dataSearchModel = defaultDataSearchModel;
            this.dataSearchResult = null;
            this.dataSearchResultSelectedImages = {};
        },
        onCloudPercentInputChange(updateItem: 'left' | 'right') {
            // 将输入值转换为数字
            const leftNum = this.dataSearchModel.minCloudPercent
            const rightNum = this.dataSearchModel.maxCloudPercent

            // 判断左侧数字是否大于右侧数字，如果是，则交换两个数字
            if (leftNum > rightNum) {
                if (updateItem == 'left') {
                    this.dataSearchModel.maxCloudPercent = this.dataSearchModel.minCloudPercent;
                } else {
                    this.dataSearchModel.minCloudPercent = this.dataSearchModel.maxCloudPercent;
                }
            }
        },
        onGsdInputChange(updateItem: 'left' | 'right') {
            // 将输入值转换为数字
            const leftNum = this.dataSearchModel.minImageGSD
            const rightNum = this.dataSearchModel.maxImageGSD

            // 判断左侧数字是否大于右侧数字，如果是，则交换两个数字
            if (leftNum > rightNum) {
                if (updateItem == 'left') {
                    this.dataSearchModel.maxImageGSD = this.dataSearchModel.minImageGSD;
                } else {
                    this.dataSearchModel.minImageGSD = this.dataSearchModel.maxImageGSD;
                }
            }
        },
        copyDataLinks() {
            // iterate this.dataSearchResultSelectedImages and copy the selected images
            let selectedImages = []
            for (let thumbUrl in this.dataSearchResultSelectedImages) {
                if (this.dataSearchResultSelectedImages[thumbUrl]) {
                    thumbUrl = `\"${thumbUrl}\"`
                    selectedImages.push(thumbUrl)
                }
            }
            if (selectedImages.length === 0) {
                ElMessage.info('请先选择要复制的数据！')
                return
            }
            // convert selectedImages to string
            let selectedImagesString = `[${selectedImages.join(", ")}]`
            copyToClipboard(selectedImagesString)
            ElMessage.success('链接已复制到剪贴板！');
        }
    },
});
</script>


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    align-items: flex-start;
}

.auto-height {
    flex: 0 0 auto;
}

.el-table {
    /* position: absolute; */
    width: 100%;
    height: 100%;
}


.table-container {
    flex: auto;
    overflow: auto;
    position: relative;
    width: 100%;
}

/* .el-table {
    height: 100% !important;
    width: 100%;
} */

.specify-check-box {
    margin-right: 10px;
}


.block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.block:last-child {
    border-right: none;
}

.block .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}

.button-group-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    margin-top: 5px;
}

.button-group-label {
    margin-right: 10px;
}

/* .custom-form-item.el-form-item__content {
  display: block;
} */

.el-form-item {
    :deep() .el-form-item__content {
        * {
            display: block;
        }
    }
}

.form-item-label {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(100vw * 13 / 1920);
}

.form-item-row {
    padding-bottom: 10px;
}

.satellite-form {
    display: flex;
    /* align-items: center;
    justify-content: center; */
}

.pagination {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.table {
    width: 100%;
    height: 100%;
    overflow: auto;
}


:deep(.el-form-item__label) {
    text-align: left;
    font-size: calc(100vw * 13 / 1920);
    /* font-weight: bold; */
}


.primary-button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.primary-button {
    font-size: calc(100vw * 15 / 1920);
    width: fit-content;
}

.button-group-item {
    width: fit-content;
}
</style>

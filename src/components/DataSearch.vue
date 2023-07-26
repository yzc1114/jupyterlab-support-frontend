<template>
    <el-button type="primary" @click="dataSearchVisible = true">数据检索</el-button>

    <el-dialog v-model="dataSearchVisible" title="数据检索" @close="resetSearchForm">
        <el-form :model="dataSearchModel" ref="dataSearchForm" label-width="100px">

            <el-row class="form-item-row">
                <el-col :span="2" class="form-item-label">
                    时间范围
                </el-col>
                <el-col :span="12">
                    <el-date-picker v-model="dataSearchModel.dateRange" type="daterange" range-separator="To"
                        start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
                        :default-value="[new Date(2020, 1, 1), new Date(2023, 1, 1)]" />
                </el-col>
            </el-row>

            <el-row class="form-item-row">
                <el-col :span="2" class="form-item-label">
                    云量范围
                </el-col>
                <el-col :span="12">
                    <el-input-number v-model="dataSearchModel.minCloudPercent" @input="onCloudPercentInputChange('left')"
                        type="number" placeholder="最小云量" :min="0" :max="100" style="width: 100px;"></el-input-number>
                    <span style="margin: 0 10px;">-</span>
                    <el-input-number v-model="dataSearchModel.maxCloudPercent" @input="onCloudPercentInputChange('right')"
                        type="number" placeholder="最大云量" :min="0" :max="100" style="width: 100px;"></el-input-number>
                </el-col>
            </el-row>

            <el-row class="form-item-row">
                <el-col :span="2" class="form-item-label">
                    GSD范围
                </el-col>
                <el-col :span="12">
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
                    <el-col :span="2" class="form-item-label">
                        {{ index == 0 ? "卫星传感器" : "" }}
                    </el-col>
                    <el-col :span="12">
                        <div :key="satelliteName" class="button-group-wrapper">
                            <div class="button-group-label">{{ satelliteName }}</div>
                            <el-button-group class="button-group">
                                <el-button v-for="(sensorEnabled, sensorName, index) in satelliteSensors" :key="sensorName"
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
                <el-col :span="2" class="form-item-label">
                    区域
                </el-col>
                <el-col :span="12">
                    <el-cascader style="width: 300px;" :options="regionData" :props="regionDataCascaderProps"
                        v-model="dataSearchModel.regionSelected" @change="console.log(dataSearchModel.regionSelected)">
                    </el-cascader>
                </el-col>
            </el-row>

        </el-form>
        <el-button type="primary" @click="searchData">搜索</el-button>

        <div v-if="dataSearchResult">
            <el-table :data="dataSearchResult.data.datas" style="width: 100%">
                <el-table-column label="选择" width="120">
                    <template #default="{row}">
                    <el-checkbox v-model="dataSearchResultSelectedImages[row.thumbUrl]"></el-checkbox>
                </template>
                </el-table-column>
                
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="satelliteId" label="卫星" />
                <el-table-column prop="sensorId" label="传感器" />
                <el-table-column prop="receiveTime" label="接收时间" />
                <el-table-column prop="cloudPercent" label="云量" />
                <el-table-column prop="sources" label="来源" />
                <el-table-column label="缩略图" >
                    <template #default="{row}">
                        <img :src="row.thumbUrl" alt="" style="width: 100px; height: 100px;">
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="pagination.total > 10" @current-change="handlePageChange"
                :current-page="pagination.currentPage" :page-size="pagination.pageSize" layout="prev, pager, next"
                :total="pagination.total"></el-pagination>
            <el-button @click="copyDataLinks" type="primary">
                复制选中链接
            </el-button>
        </div>

    </el-dialog>
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
    offset: 0,
    limit: 0,
    satelliteList: [],
    startTime: "",
    topology: 0,
    endTime: "",
    maxCloudPercent: 0,
    cityId: 0,
    countyId: 0,
    provinceId: 0,
    regionLevel: 0,
    regionName: "",
    filterSatelliteList: [],
    ifThumbUrl: false,
} as DataRequestParams

var defaultDataSearchModel = {
    dateRange: Array<string>(),
    minCloudPercent: 0,
    maxCloudPercent: 20,
    minImageGSD: 0,
    maxImageGSD: 20,
    regionSelected: [],
    satellites: {
        "GF1": {
            "PMS1": false, "PMS2": false, "WFV1": false, "WFV2": false, "WFV3": false, "WFV4": false
        },
        "GF2": {
            "PMS1": false, "PMS2": false
        },
        "GF6": {
            "WFV": false, "PMS": false
        },
        "GF7": {
            "BWD": false, "DLC": false, "FWD": false, "SLA": false
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
            params.offset = (this.pagination.currentPage - 1) * this.pagination.pageSize
            params.limit = this.pagination.pageSize
            let response = await getDataList(params)
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
                    selectedImages.push(thumbUrl)
                }
            }

        }
    },
});
</script>


<style scoped>
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
}

.form-item-row {
    padding-bottom: 10px;
}

.satellite-form {
    display: flex;
    /* align-items: center;
    justify-content: center; */
}
</style>

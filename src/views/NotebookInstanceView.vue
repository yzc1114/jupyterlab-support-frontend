<script setup lang="ts">
</script>

<template>
  <div class="container">
    <!-- 使用Flex布局排列按钮 -->
    <div class="buttons">
      <el-button @click="returnManagement" size="large">返回</el-button>

      <div class="sideTabButtons">
        <el-button v-if="showSideTab !== null" @click="sideTabDeactivate()" link>
          收起
        </el-button>
        <el-button :type="showingTabButton('SampleSearch')" @click="sideTabActivate('SampleSearch')" size="large">样本检索</el-button>
        <el-button :type="showingTabButton('DataSearch')" @click="sideTabActivate('DataSearch')" size="large">数据检索</el-button>
        <!-- <el-button type="primary" @click="sideTabActivate('CodeSnippet')">代码片段</el-button> -->
        <el-button :type="showingTabButton('CodeRepo')" @click="sideTabActivate('CodeRepo')" size="large">代码仓库</el-button>
      </div>
    </div>

    <div class="horizontal-divider"></div>
    <!-- iframe位于按钮下方，使用Flex布局左对齐 -->
    <!-- <div class="iframe-body-sty" v-if="instanceServiceUrl !== ''"> -->
    <div class="iframe-body-sty">
      <!-- <iframe :class="iframeCSS.jupyterlab" :src="instanceServiceUrl"></iframe> -->
      <iframe :class="iframeCSS.jupyterlab" src="https://www.cpeos.org.cn/lab"></iframe>
      <div :class="iframeCSS.sideTab" v-if="showSideTab !== null" style="padding-top: 10px;">
        <div class="sideTabContainer" v-show="showSideTab == 'SampleSearch'">
          <SampleSearch :userId="Array.isArray($route.params.userId) ? $route.params.userId[0] : $route.params.userId">
          </SampleSearch>
        </div>
        <div class="sideTabContainer" v-show="showSideTab == 'DataSearch'">
          <DataSearch :userId="Array.isArray($route.params.userId) ? $route.params.userId[0] : $route.params.userId">
          </DataSearch>
        </div>
        <!-- <div class="sideTabContainer" v-show="showSideTab == 'CodeSnippet'">
          <CodeSnippet v-show="showSideTab == 'CodeSnippet'" :=""></CodeSnippet>
        </div> -->
        <div class="sideTabContainer" v-show="showSideTab == 'CodeRepo'">
          <CodeRepo v-show="showSideTab == 'CodeRepo'" :userId="Array.isArray($route.params.userId) ? $route.params.userId[0] : $route.params.userId"></CodeRepo>
        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SampleSearch from '@/components/SampleSearch.vue'
import DataSearch from '@/components/DataSearch.vue'
import CodeSnippet from '@/components/CodeSnippet.vue'
import CodeRepo from '@/components/CodeRepo.vue'
import { getService } from '@/api/cluster'
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件

export default defineComponent({
  name: 'NotebookManagement',
  components: {
    SampleSearch,
    DataSearch,
    CodeSnippet,
    CodeRepo
  },
  data() {
    return {
      instanceServiceUrl: "",
      // activeTab: '', // Active tab (userSample or platformSample)
      // userSampleSearchParams: {
      //   pageSize: 10,
      //   pageNum: 1,
      //   sampleSetName: '',
      //   type: '',
      //   // Add other parameters as needed
      // },
      // userSampleSearchResult: null, // Holds the user sample search result
      // platformSampleSearchParams: {
      //   pageSize: 10,
      //   pageNum: 1,
      //   sampleSetName: '',
      //   type: '',
      //   // Add other parameters as needed
      // },
      // platformSampleSearchResult: null, // Holds the platform sample search result
      iframeCSS: {
        jupyterlab: 'jupyterlab-without-sidetab',
        sideTab: 'side-tab',
      },
      showSideTab: null as null|'CodeSnippet'|'SampleSearch'|'DataSearch'|'CodeRepo',
    };
  },
  async mounted() {
    await this.loadService()
  },
  methods: {
    showingTabButton(tabName: string) {
      console.log("showingTabButton", this.showSideTab, tabName, this.showSideTab == tabName)
      return this.showSideTab == tabName ? 'primary' : 'normal'
    },
    async loadService() {
      let instanceName: string | string[] = this.$route.params.instanceName
      // assert instanceName is a single string
      if (Array.isArray(instanceName)) {
        instanceName = instanceName[0]
      }
      console.log("loadService, instanceName: ", instanceName)
      let serviceResponse = await getService(`${instanceName}-svc`, import.meta.env.VITE_NAMESPACE, {})
      if (serviceResponse.code !== 20000) {
        ElMessage.error(serviceResponse.message);
        return
      }
      console.log("service", serviceResponse)
      let service = serviceResponse.data
      this.instanceServiceUrl = `http://${import.meta.env.VITE_K8S_IP}:${service.spec.ports[0].nodePort}`
      console.log("service url", this.instanceServiceUrl)
    },
    returnManagement() {
      this.$router.push(`/${this.$route.params.userId}/`);
    },
    sideTabActivate(sideTab: 'SampleSearch'|'DataSearch'|'CodeSnippet'|'CodeRepo') {
      this.showSideTab = sideTab
      this.iframeCSS.jupyterlab = 'jupyterlab-with-sidetab'
    },
    sideTabDeactivate() {
      this.showSideTab = null
      this.iframeCSS.jupyterlab = 'jupyterlab-without-sidetab'
    }
  }
});
</script>

<style scoped>

.horizontal-divider {
  width: 100%;
  height: 2px;
  background-color: gray; /* 分界线的颜色 */
}
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.buttons {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
  /* 可以调整按钮与iframe之间的间距 */
}

.buttons button {
  font-size: calc(100vw * 18 / 1920);
}

.sideTabButtons {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.sideTabButtons>*:not(:last-child) {
  margin-right: 10px;
  /* 调整按钮之间的横向间距 */
}


.iframe-body-sty {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 97%;
}

.jupyterlab-without-sidetab {
  width: 100%;
  height: 100%;
}

.jupyterlab-with-sidetab {
  width: 74%;
  height: 100%;
}


.side-tab {
  width: 24%;
  height: 95%;
  overflow: auto;
}

.sideTabContainer {
  height: 100%;
}
</style>
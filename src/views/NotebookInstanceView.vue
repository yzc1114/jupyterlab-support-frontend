<script setup lang="ts">
</script>

<template>
  <div class="container">
      <!-- 使用Flex布局排列按钮 -->
      <div class="buttons">
        <el-button @click="returnManagement">返回</el-button>
        <div>
          <SampleSearch :userId="Array.isArray($route.params.userId) ? $route.params.userId[0] : $route.params.userId">
          </SampleSearch>
        </div>
        <div>
          <CodeSnippet :=""></CodeSnippet>
        </div>
      </div>

      <!-- iframe位于按钮下方，使用Flex布局左对齐 -->
      <div class="iframe-body-sty" v-if="instanceServiceUrl !== ''">
        <iframe id="iframe-shrink" :src="instanceServiceUrl"></iframe>
      </div>


    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SampleSearch from '@/components/SampleSearch.vue'
import CodeSnippet from '../components/CodeSnippet.vue'
import { getService } from '@/api/cluster'
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件


export default defineComponent({
  name: 'NotebookManagement',
  components: {
    SampleSearch,
    CodeSnippet
  },
  data() {
    return {
      instanceServiceUrl: "",
      sampleDataSearchVisible: false,
      codeSnippetVisible: false,
      activeTab: 'userSample', // Active tab (userSample or platformSample)
      userSampleSearchParams: {
        pageSize: 10,
        pageNum: 1,
        sampleSetName: '',
        type: '',
        // Add other parameters as needed
      },
      userSampleSearchResult: null, // Holds the user sample search result
      platformSampleSearchParams: {
        pageSize: 10,
        pageNum: 1,
        sampleSetName: '',
        type: '',
        // Add other parameters as needed
      },
      platformSampleSearchResult: null, // Holds the platform sample search result
    };
  },
  async mounted() {
    await this.loadService()
  },
  methods: {
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
    }
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.buttons {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  /* 可以调整按钮与iframe之间的间距 */
}

.buttons>*:not(:last-child) {
  margin-right: 10px;
  /* 调整按钮之间的横向间距 */
}

.iframe-body-sty {
  width: 100%;
  height: 100%;
}

.iframe-body-sty > #iframe-shrink {
  width: 100%;
  height: 100%;
}
</style>
<script setup lang="ts">
</script>

<template>
  <div v-if="instanceServiceUrl !== ''">
    <iframe :src="instanceServiceUrl" style="width: 1920px; height: 1080px;"></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NodeStatus from '@/components/NodeStatus.vue'
import { listAllNodes, listAllPods, getService } from '@/api/cluster'
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型


export default defineComponent({
  name: 'NotebookManagement',
  components: {
    NodeStatus,
  },
  data() {
    return {
      instanceServiceUrl: ""
    };
  },
  async mounted() {
    this.loadService()
  },
  methods: {
    async loadService() {
      let instanceName: string | string[] = this.$route.params.instanceName
      // assert instanceName is a single string
      if (Array.isArray(instanceName)) {
        instanceName = instanceName[0]
      }
      let serviceRespose = await getService(`${instanceName}-svc`, import.meta.env.VITE_NAMESPACE, {})
      if (serviceRespose.code !== 20000) {
        ElMessage.error(serviceRespose.message);
        return
      }
      console.log("service", serviceRespose)
      let service = serviceRespose.data
      this.instanceServiceUrl = `http://${import.meta.env.VITE_SERVER_IP}:${service.spec.ports[0].nodePort}`
      console.log("service url", this.instanceServiceUrl)
    },
  }
});
</script>
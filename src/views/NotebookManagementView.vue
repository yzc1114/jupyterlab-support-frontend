<template>
  <div>
    <h1>实例管理</h1>
    <NodeStatus :node="node" />
    <NodeStatus :node="node" />
    <NodeStatus :node="node" />
    <!-- list nodes -->
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NodeStatus from '@/components/NodeStatus.vue';
import { testAxios } from '@/api/notebook';

export default defineComponent({
  name: 'NotebookManagement',
  components: {
    NodeStatus,
  },
  data() {
    return {
      node: {
        name: 'Node 1',
        available: true,
        cpuUsed: 50,
        cpuTotal: 100,
        memoryUsed: 512,
        memoryTotal: 1024,
        gpuUsed: 2,
        gpuTotal: 4,
        instances: [
          {
            createTime: "2016-3-21",
            name: 'Instance 1',
            status: '运行中',
            image: 'Image 1',
            cpuUsage: 20,
            memoryUsage: 256,
            gpuUsage: 1,
            id: '1',
          },
          {
            createTime: "2016-3-21",
            name: 'Instance 2',
            status: '创建中',
            image: 'Image 2',
            cpuUsage: 30,
            memoryUsage: 512,
            gpuUsage: 0,
            id: '2',
          },
        ],
      },
      nodes: [this.node, this.node, this.node]
    };
  },
  mounted() {
    testAxios()
  },
});
</script>


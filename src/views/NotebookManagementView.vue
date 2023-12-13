<template>
  <div class="container">
    <div class="title-container">
      <h1 class="title">实例管理</h1>
    </div>
    <!-- list nodes -->
    <!-- <NodeStatus :node="node" /> -->
    <!-- <template v-for="node in nodes" :key="node.name"> -->
    <!-- 使用 v-for 循环堆叠多个 NodeStatus 组件 -->
    <!-- <NodeStatus :node="node" />
    </template> -->
    <div class="node-status-container">
      <NodeStatus v-for="n in nodes" :node="n" :user-id="userId" :key="n.name" @delete="handleInstanceDelete" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NodeStatus from '@/components/NodeStatus.vue'
import { listAllNodes, listAllPods, listAllServices, deleteResource } from '@/api/cluster'
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型
import { convertToGB } from '@/utils/unit';
import { parseNode, parseInstance } from '@/utils/parser';

export default defineComponent({
  name: 'NotebookManagement',
  components: {
    NodeStatus,
  },
  data() {
    return {
      nodes: [] as Node[],
      timerId: 0,
      userId: ""
    };
  },
  async beforeUnmount() {
    // 组件销毁前清除定时器
    clearInterval(this.timerId);
  },
  async mounted() {
    let userId: string | string[] = this.$route.params.userId
    if (Array.isArray(userId)) {
      userId = userId[0]
    }
    this.userId = userId
    console.log("userId", this.userId)
    await this.refresh()
    this.timerId = setInterval(this.refresh, 5000)
  },
  methods: {
    async refresh() {
      // load all information we need
      let nodesResponse = await listAllNodes()
      console.log("nodeResponse", nodesResponse)
      if (nodesResponse.code != 20000) {
        ElMessage.error(nodesResponse.message);
        return
      }
      let nodes = nodesResponse.data.items
      let namespace = import.meta.env.VITE_NAMESPACE
      console.log("namespace", namespace)
      let podLabels = { "app": "jupyterlab-instance", "user": this.$route.params.userId }
      let podsResponse = await listAllPods(namespace, podLabels)
      console.log("podsResponse", podsResponse)
      if (podsResponse.code != 20000) {
        ElMessage.error(podsResponse.message);
        return
      }
      let pods = podsResponse.data.items
      // update nodes
      let resultNodes: Array<Node> = []
      for (let node of nodes) {
        let nodeInfo: Node = parseNode(node)
        for (let pod of pods) {
          if (pod.spec.nodeName != node.metadata.name) {
            continue
          }
          let instance: Instance = parseInstance(pod)
          nodeInfo.instances.push(instance)
        }
        resultNodes.push(nodeInfo)
      }
      resultNodes.sort(function(a, b) { return a.name.localeCompare(b.name); })
      console.log("resultNodes", resultNodes)
      this.nodes = resultNodes
    },
    async handleInstanceDelete(instanceName: string) {
      let namespace = import.meta.env.VITE_NAMESPACE
      let svcName = `${instanceName}-svc`
      let ingressName = `${instanceName}-ingress`
      let deletePodResponse = await deleteResource("Pod", instanceName, namespace)
      let deleteSvcResponse = await deleteResource("Service", svcName, namespace)
      let deleteIngressResponse = await deleteResource("Ingress", ingressName, namespace)
      for (let node of this.nodes) {
        for (let instance of node.instances) {
          if (instance.name == instanceName) {
            instance.status = "Terminating"
            break
          }
        }
      }
      if (deletePodResponse.code != 20000) {
        ElMessage.error(`删除实例失败，原因：${deletePodResponse.message}`);
        return
      }
      if (deleteSvcResponse.code != 20000) {
        ElMessage.error(`删除实例服务失败，原因：${deleteSvcResponse.message}`);
        return
      }
      if (deleteIngressResponse.code != 20000) {
        ElMessage.error(`删除实例Ingress失败，原因：${deleteSvcResponse.message}`);
        return
      }
      await this.refresh()
    }
  }
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
}

.node-status-container {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: calc(100vw * 50 / 1920);
  margin-bottom: 10px;
  font-weight: bold;
}
</style>

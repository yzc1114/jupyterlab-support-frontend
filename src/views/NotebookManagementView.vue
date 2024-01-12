<template>
  <div class="container">
    <div class="title-container">
      <h1 class="title">实例管理</h1>
    </div>
    <div v-if="userId == 'admin'">
      <div class="title-container">
      <h3 class="title2">集群状态</h3>
    </div>
    </div>
    <div v-if="userId == 'admin'" class="node-status-container">
      <div class="cluster-status-container">
        <div class="chart" ref="cpuChart"></div>
        <div class="chart" ref="memChart"></div>
        <div class="chart" ref="gpuChart"></div>
      </div>
      <NodeStatus v-for="n in nodes" :node="n" :user-id="userId" :key="n.name" @delete="handleInstanceDelete" />
    </div>
    <div v-else class="user-instances-container">
      <UserInstances :nodes="nodes" :user-id="userId" :key="refreshed" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NodeStatus from '@/components/NodeStatus.vue'
import UserInstances from '@/components/UserInstances.vue'
import { listAllNodes, listAllPods, listAllServices, deleteResource, loadNodesWithInsances } from '@/api/cluster'
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型
import { convertToGB } from '@/utils/unit';
import { parseNode, parseInstance } from '@/utils/parser';
import { ca } from 'element-plus/es/locale/index.mjs';
import * as echarts from 'echarts';

function createChartOption(): any {
  let option = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: 'inherit',
          distance: 15,
          fontSize: 16
        },
        detail: {
          valueAnimation: true,
          formatter: '',
          color: 'inherit',
          fontSize: 16,
          offsetCenter: [0, '80%'],
        },
        data: [
          {
            value: 0
          }
        ]
      }
    ]
  };
  return option
}

export default defineComponent({
  name: 'NotebookManagement',
  components: {
    NodeStatus,
    UserInstances
  },
  data() {
    return {
      nodes: [] as Node[],
      timerId: 0,
      userId: "",
      refreshed: 0
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
    await this.refresh(true)
    this.timerId = setInterval(() => { this.refresh(false) }, 5000)
  },
  methods: {
    async refresh(isInit: boolean) {
      let userId: string = this.$route.params.userId as string
      try {
        let nodes = await loadNodesWithInsances(userId)
        this.nodes = nodes
        this.updateCharts(isInit)
      } catch (error: any) {
        console.log("error", error)
        ElMessage.error(error);
      }
      this.refreshed += 1
    },
    updateCharts(isInit: boolean) {
      let cpuTotal = 0
      let cpuUsed = 0
      let memTotal = 0
      let memUsed = 0
      let gpuTotal = 0
      let gpuUsed = 0
      for (let node of this.nodes) {
        cpuTotal += node.cpuTotal
        cpuUsed += node.cpuUsed
        memTotal += node.memoryTotal
        memUsed += node.memoryUsed
        gpuTotal += node.gpuTotal
        gpuUsed += node.gpuUsed
      }
      let cpuChart: any
      let memChart: any
      let gpuChart: any
      if (isInit) {
        cpuChart = echarts.init(this.$refs.cpuChart as HTMLDivElement)
        memChart = echarts.init(this.$refs.memChart as HTMLDivElement)
        gpuChart = echarts.init(this.$refs.gpuChart as HTMLDivElement)
        setTimeout(function () {
          window.onresize = function () {
            cpuChart.resize();
            memChart.resize();
            gpuChart.resize();
          }
        }, 200)
      } else {
        cpuChart = echarts.getInstanceByDom(this.$refs.cpuChart as HTMLDivElement)
        memChart = echarts.getInstanceByDom(this.$refs.memChart as HTMLDivElement)
        gpuChart = echarts.getInstanceByDom(this.$refs.gpuChart as HTMLDivElement)
      }
      let cpuOption = createChartOption()
      let memOption = createChartOption()
      let gpuOption = createChartOption()
      cpuOption.series[0].data[0].value = cpuUsed
      cpuOption.series[0].detail.formatter = `${cpuUsed}/${cpuTotal} 核`
      memOption.series[0].data[0].value = memUsed
      memOption.series[0].detail.formatter = `${memUsed.toFixed(2)}/${memTotal.toFixed(2)} GB`
      gpuOption.series[0].data[0].value = gpuUsed
      gpuOption.series[0].detail.formatter = `${gpuUsed}/${gpuTotal} 块`
      cpuChart.setOption(cpuOption)
      memChart.setOption(memOption)
      gpuChart.setOption(gpuOption)
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
      await this.refresh(false)
    }
  },
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

.user-instances-container {
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

.title2 {
  font-size: calc(100vw * 35 / 1920);
  margin-bottom: 10px;
  font-weight: bold;
}

.cluster-status-container {
  width: 100%;
  height: calc(100vh * 450 / 1080);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
}

.chart {
  width: 33%;
  height: 100%;
}
</style>

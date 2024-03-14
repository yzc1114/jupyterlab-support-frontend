<template>
  <div class="container">
    <div class="title-container">
      <h1 class="title">实例管理</h1>
    </div>
    <div v-if="userId == 'admin'" class="title-container">
      <h3 class="title2">集群状态</h3>
    </div>
    <div v-if="userId == 'admin'" class="node-status-container">
      <div class="cluster-status-container">
        <div class="chart" ref="cpuChart"></div>
        <div class="chart" ref="memChart"></div>
        <div class="chart" ref="gpuChart"></div>
      </div>
      <NodeStatus v-for="n in nodes" :node="n" :user-id="userId" :key="n.name" @create="handleInstanceCreate"
        @edit="handleInstanceEdit" @delete="handleInstanceDelete" @export="handleInstanceExport" />
    </div>
    <div v-else class="user-instances-container">
      <UserInstances :nodes="nodes" :user-id="userId" :key="refreshed" @create="handleInstanceCreate"
        @edit="handleInstanceEdit" @delete="handleInstanceDelete" @export="handleInstanceExport" />
    </div>

    <el-drawer v-model="drawer.open" direction="rtl">
      <template #header>
        <h1 class="creation-title">{{ drawer.title }}</h1>
      </template>
      <template #default>
        <div v-if="drawer.node != undefined">
          <div class="node-info">
            <p>节点名称：{{ drawer.node.name }}</p>
            <p>CPU: {{ drawer.node.cpuTotal }}</p>
            <p>内存: {{ drawer.node.memoryTotal.toFixed(2) }} GB</p>
            <p>GPU: {{ `${drawer.node.gpuUsed/100}/${drawer.node.gpuTotal/100}` }}</p>
          </div>
        </div>

        <form class="form-container">
          <el-form ref="form" :model="drawer.form" :rules="rules" label-width="120px" size="default" label-position="top">
            <!-- 添加 label-position="top" -->
            <el-form-item label="实例名称" prop="name">
              <el-input v-model="drawer.form.name" placeholder="请输入实例名称" :disabled="drawer.form.imageDisabled"></el-input>
            </el-form-item>

            <el-form-item label="镜像" prop="image">
              <el-select v-model="drawer.form.image" placeholder="请选择镜像" :disabled="drawer.form.imageDisabled">
                <el-option v-for="image in imageOptions" :key="image" :value="image" :label="image"></el-option>
              </el-select>
            </el-form-item>

            <el-row class="row-buttons">
              <el-col :span="12">
                <el-form-item label="CPU" prop="cpu">
                  <el-input-number :min="0.1" v-model="drawer.form.cpu" :step="0.1" :precision="1"
                    controls-position="right" data-unit="核" class="my-el-input-number">
                  </el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <div class="row-container">
                  <el-form-item label="内存" prop="memory">
                    <el-input-number :min="0.1" v-model="drawer.form.memory" :step="0.1" :precision="1"
                      controls-position="right" data-unit="GB" class="my-el-input-number"></el-input-number>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row class="row-buttons">
              <el-col :span="12">
                <el-form-item label="GPU" prop="gpu">
                  <el-input-number :min="0.0" v-model="drawer.form.gpu" :step="0.1" :precision="1" :max="6"
                    controls-position="right" data-unit="块" class="my-el-input-number">
                  </el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <div class="row-container">
                  <el-form-item label="显存" prop="gpuMem">
                    <el-input-number :min="0" v-model="drawer.form.gpuMem" :step="1" :precision="0"
                      controls-position="right" data-unit="GB" class="my-el-input-number"></el-input-number>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <!-- <el-form-item label="GPU" prop="gpu">
              <el-input-number v-model="drawer.form.gpu" :precision="1" :step="drawer.form.gpu >= 1 ? 1:0.1" :min="0" :max="6" ></el-input-number>
            </el-form-item> -->
          </el-form>
        </form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelDrawerClick">取消</el-button>
          <el-button type="primary" @click="confirmDrawerClick">确认</el-button>
        </div>
      </template>
    </el-drawer>

    <el-dialog
    v-model="dialog.open"
    :title="dialog.title"
    width="400"
  >
  <div class="export-dialog">
    <span>{{ dialog.content }}</span>
    <el-button type="primary" @click="enterWaitingExport">{{ dialog.confirmText }}</el-button>
  </div>
  </el-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NodeStatus from '@/components/NodeStatus.vue'
import UserInstances from '@/components/UserInstances.vue'
import { createResource, updateResource, deleteResource, loadNodesWithInsances } from '@/api/cluster'
import { checkExport, exportImage } from '@/api/helper'
import { createDeployYaml, createServiceYaml, createIngressYaml } from '@/utils/yaml'
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型
import { convertCPUToCore } from '@/utils/unit';
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
      rules: {
        name: [
          { required: true, message: '请输入实例名称', trigger: 'change', },
          // k8s pod name pattern
          { pattern: /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/, message: '实例名称只能包含小写字母、数字、中划线，且不能以中划线开头或结尾', trigger: 'change' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'change' }
        ],
        image: [
          { required: true, message: '请选择镜像', trigger: 'change' }
        ],
        cpu: [
          { required: true, message: '请输入CPU核数', trigger: 'change' }
        ],
        memory: [
          { required: true, message: '请输入内存大小', trigger: 'change' }
        ],
        gpu: [
          { required: true, message: '请输入GPU核数', trigger: 'change' }
        ],
        gpuMem: [
          { required: true, message: '请输入GPU显存大小', trigger: 'change' }
        ],
      },
      timerId: 0,
      userId: "",
      refreshed: 0,
      nodeLoaded: false,
      drawer: {
        node: undefined as Node | undefined,
        open: false,
        mode: '',
        title: '',
        form: {
          name: '',
          nameDisabled: false,
          image: '',
          imageDisabled: false,
          cpu: 0,
          memory: 0,
          gpu: 0,
          gpuMem: 0,
        },
        instance: undefined as Instance | undefined,
      },
      dialog: {
        open: false,
        instanceName: '',
        title: '',
        content: '',
        showConfirm: true,
        confirmText: '',
      },
      imageOptions: [
        'jupyter/minimal-notebook:lab-4.0.2',
        'cschranz/gpu-jupyter:v1.5_cuda-11.6_ubuntu-20.04_slim',
        'cschranz/gpu-jupyter:v1.5_cuda-11.6_ubuntu-20.04_python-only',
        'cschranz/gpu-jupyter:v1.5_cuda-11.6_ubuntu-20.04'
      ], // 替换为实际的镜像选项
    };
  },
  async beforeUnmount() {
    // 组件销毁前清除定时器
    clearInterval(this.timerId);
  },
  async mounted() {
    console.log(`${convertCPUToCore("64")}`)
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
      if (this.userId != "admin") {
        return
      }
      let cpuTotal = 0
      let cpuUsed = 0
      let memTotal = 0
      let memUsed = 0
      let gpuTotal = 0
      let gpuUsed = 0
      for (let node of this.nodes) {
        cpuTotal += Number(node.cpuTotal)
        cpuUsed += Number(node.cpuUsed)
        memTotal += Number(node.memoryTotal)
        memUsed += Number(node.memoryUsed)
        gpuTotal += Number(node.gpuTotal)
        gpuUsed += Number(node.gpuUsed)
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
      cpuOption.series[0].data[0].value = cpuUsed / cpuTotal * 100
      cpuOption.series[0].detail.formatter = `${cpuUsed}/${cpuTotal} 核`
      memOption.series[0].data[0].value = memUsed / memTotal * 100
      memOption.series[0].detail.formatter = `${memUsed.toFixed(2)}/${memTotal.toFixed(2)} GB`
      gpuOption.series[0].data[0].value = gpuUsed / gpuTotal * 100
      gpuOption.series[0].detail.formatter = `${gpuUsed / 100}/${gpuTotal / 100} 块`
      cpuChart.setOption(cpuOption)
      memChart.setOption(memOption)
      gpuChart.setOption(gpuOption)
    },
    async handleInstanceDelete(instanceName: string) {
      let namespace = import.meta.env.VITE_NAMESPACE
      let svcName = `${instanceName}-svc`
      let ingressName = `${instanceName}-ingress`
      // let deletePodResponse = await deleteResource("Pod", instanceName, namespace)
      let deleteDeployResponse = await deleteResource("apps.Deployment", instanceName, namespace)
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
      if (deleteDeployResponse.code != 20000) {
        ElMessage.error(`删除实例失败，原因：${deleteDeployResponse.message}`);
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
    },
    handleInstanceCreate(nodeName: string | null) {
      this.enterInstanceCreation(nodeName)
    },
    handleInstanceEdit(instanceName: string) {
      this.enterInstanceEdit(instanceName)
    },
    handleInstanceExport(instanceName: string) {
      console.log("handleInstanceExport", instanceName)
      this.enterInstanceExport(instanceName)
    },
    checkDuplicateInstance(instanceName: string): boolean {
      for (let node of this.nodes) {
        if (node.instances.find(i => i.name == instanceName) != undefined) {
          return true
        }
      }
      return false
    },
    async validateForm(): Promise<boolean> {
      let form: any = this.$refs.form
      const isValid = async (_form: any) => {
        let valid = await _form.validate().catch((err: Error) => {
          return false
        })
        return valid
      }
      let valid = await isValid(form)
      if (!valid) {
        ElMessage.error("请检查输入是否正确");
        return false
      }
      return true
    },
    async doCreateInstance(): Promise<boolean> {
      let instanceName = this.drawer.form.name
      let userId = this.$route.params.userId
      // validate form
      let valid = await this.validateForm()
      if (!valid) {
        return false
      }
      instanceName = `${instanceName}-${userId}`
      try {
        let duplicated = await this.checkDuplicateInstance(instanceName)
        console.log("doCreateInstance, checking duplicated: ", duplicated)
        if (duplicated) {
          ElMessage.error(`实例名称 ${instanceName} 已存在，请重新输入`);
          return false
        }
      } catch (e) {
        console.log("doCreateInstance, checking duplicated, error: ", e)
        ElMessage.error(`检查实例名称 ${instanceName} 是否重复失败，请稍后重试`);
        return false
      }
      let cpu = Number(this.drawer.form.cpu.toFixed(1)) * 1000
      let mem = Number(this.drawer.form.memory.toFixed(1)) * 1024
      let gpu = Number(this.drawer.form.gpu.toFixed(1)) * 100
      let gpuMem = Number(this.drawer.form.gpuMem.toFixed(0)) * 4
      console.log("doCreateInstance, cpu: ", cpu, "mem: ", mem, "gpu (vcuda-core): ", gpu, "gpuMem (vcuda-mem): ", gpuMem)
      let targetNode: Node | null = null;
      if (this.drawer.node != undefined) {
        targetNode = this.drawer.node
      } else {
        // 复制this.nodes
        let nodes = this.nodes.slice()
        // 随机排序nodes
        nodes.sort(() => Math.random() - 0.5)
        for (let node of nodes) {
          // 检查是否存在资源足够的节点
          if (node.cpuTotal < cpu / 1000) {
            continue
          }
          if (node.memoryTotal - node.memoryUsed < mem / 1024) {
            continue
          }
          if (node.gpuTotal - node.gpuUsed < gpu) {
            continue
          }
          if (node.gpuMemTotal - node.gpuMemUsed < gpuMem) {
            continue
          }
          targetNode = node
        }
      }
      if (targetNode == null) {
        ElMessage.error("没有足够的资源创建实例，请联系管理员");
        return false
      }
      let image = this.drawer.form.image
      let labBaseUrl = `${import.meta.env.VITE_BASE_URL}/lab/${userId}/${instanceName}`

      console.log("createInstance", instanceName, cpu, mem, image, targetNode.name, userId, labBaseUrl)
      let deployYaml: any = createDeployYaml(instanceName, userId as string, image, cpu, mem, gpu, gpuMem, targetNode.name, labBaseUrl)
      console.log("createResource deployYaml", deployYaml)
      let createDeployResponse = await createResource(deployYaml)
      console.log("createResource createDeployResponse", createDeployResponse)
      if (createDeployResponse.code != 20000) {
        ElMessage.error(`创建实例失败，原因：${createDeployResponse.message}`);
        return false
      }

      let serviceYaml = createServiceYaml(instanceName, userId as string)
      console.log("createResource serviceYaml", serviceYaml)
      let createServiceResponse = await createResource(serviceYaml)
      console.log("createResource createServiceResponse", createServiceResponse)
      if (createServiceResponse.code != 20000) {
        ElMessage.error(`创建实例服务失败，原因：${createServiceResponse.message}`);
        return false
      }

      let ingressYaml = createIngressYaml(instanceName, userId as string, labBaseUrl)
      console.log("createResource ingressYaml", ingressYaml)
      let createIngressResponse = await createResource(ingressYaml)
      console.log("createResource createIngressResponse", createIngressResponse)
      if (createIngressResponse.code != 20000) {
        ElMessage.error(`创建实例Ingress失败，原因：${createIngressResponse.message}`);
        return false
      }
      ElMessage.info("创建实例成功，请稍等片刻");
      return true
    },
    async doEditInstance(instance: Instance): Promise<boolean> {
      let instanceName = instance.name
      let userId = instance.user
      let valid = await this.validateForm()
      if (!valid) {
        return false
      }
      let cpu = Number(this.drawer.form.cpu.toFixed(1)) * 1000
      let mem = Number(this.drawer.form.memory.toFixed(1)) * 1024
      let gpu = Number(this.drawer.form.gpu.toFixed(0)) * 100
      let gpuMem = Number(this.drawer.form.gpuMem.toFixed(0)) * 4
      console.log("doEditInstance, instanceName: ", instanceName, "userId: ", userId, ", cpu: ", cpu, "mem: ", mem, "gpu: ", gpu, "gpuMem: ", gpuMem)
      let node: Node | undefined = this.nodes.find(n => n.name == instance.nodeName)
      if (node == undefined) {
        ElMessage.error(`获取节点 ${instance.nodeName} 信息失败`);
        return false
      }
      // 检查是否存在资源足够的节点
      if (node.cpuTotal < cpu / 1000) {
        ElMessage.error(`CPU资源不足，当前节点CPU总量为 ${node.cpuTotal} 核`);
        return false
      }
      if (node.memoryTotal - node.memoryUsed < mem / 1024) {
        ElMessage.error(`内存资源不足，当前节点内存总量为 ${node.memoryTotal.toFixed(2)} GB`);
        return false
      }
      if (node.gpuTotal - node.gpuUsed < gpu) {
        ElMessage.error(`GPU资源不足，当前节点GPU总量为 ${node.gpuTotal / 100} 块`);
        return false
      }
      if (node.gpuMemTotal - node.gpuMemUsed < gpuMem) {
        ElMessage.error(`GPU显存资源不足，当前节点GPU显存总量为 ${node.gpuMemTotal} GB`);
        return false
      }
      let image = this.drawer.form.image
      let nodeName = node.name
      let labBaseUrl = `${import.meta.env.VITE_BASE_URL}/lab/${userId}/${instanceName}`

      console.log("updateResource", instanceName, cpu, mem, image, nodeName, userId, labBaseUrl)
      let deployYaml: any = createDeployYaml(instanceName, userId as string, image, cpu, mem, gpu, gpuMem, nodeName, labBaseUrl)
      console.log("updateResource deployYaml", deployYaml)
      let updateDeployResponse = await updateResource(deployYaml)
      console.log("updateDeployResponse updateResourceResponse", updateDeployResponse)
      if (updateDeployResponse.code != 20000) {
        ElMessage.error(`更新实例失败，原因：${updateDeployResponse.message}`);
        return false
      }
      ElMessage.success("更新实例成功");
      return true
    },
    cancelDrawerClick() {
      this.drawer.open = false;
    },
    async confirmDrawerClick() {
      let succeeded = false
      if (this.drawer.mode == 'edit') {
        succeeded = await this.doEditInstance(this.drawer.instance as Instance)
      } else {
        succeeded = await this.doCreateInstance()
      }
      if (succeeded) {
        await this.refresh(false)
        this.drawer.open = false;
      }
    },
    enterInstanceCreation(nodeName: string | null = null) {
      this.drawer.title = '创建实例';
      this.drawer.mode = 'create'
      this.drawer.open = true;
      this.drawer.form.name = ''
      this.drawer.form.nameDisabled = false
      this.drawer.form.image = ''
      this.drawer.form.imageDisabled = false
      if (nodeName != null) {
        let node = this.nodes.find(n => n.name == nodeName)
        this.drawer.node = node
        if (node == undefined) {
          ElMessage.error(`获取节点 ${nodeName} 信息失败`);
          return
        }
      }
      this.drawer.form.cpu = 4
      this.drawer.form.memory = 10
      this.drawer.form.gpu = 0
      this.drawer.form.gpuMem = 0
      this.drawer.open = true
    },
    enterInstanceEdit(instanceName: string) {
      this.drawer.title = '编辑实例';
      this.drawer.mode = 'edit'
      let instance = undefined as Instance | undefined
      for (let node of this.nodes) {
        instance = node.instances.find(i => i.name == instanceName)
        if (instance != undefined) {
          break
        }
      }
      if (instance == undefined) {
        ElMessage.error(`获取实例 ${instanceName} 信息失败`);
        this.drawer.open = false;
        return
      }
      this.drawer.open = true;
      this.drawer.form.name = instance.name
      this.drawer.form.nameDisabled = true
      this.drawer.form.image = instance.image
      this.drawer.form.imageDisabled = true
      this.drawer.form.cpu = instance.cpuUsage
      this.drawer.form.memory = instance.memoryUsage
      this.drawer.form.gpu = instance.gpuUsage
      this.drawer.form.gpuMem = instance.gpuMemUsage
      this.drawer.instance = instance
    },
    findInstanceByName(instanceName: string) {
      for (let node of this.nodes) {
        let instance = node.instances.find(i => i.name == instanceName)
        if (instance != undefined) {
          return instance
        }
      }
      return undefined
    },
    enterInstanceExport(instanceName: string) {
      this.dialog.open = true
      this.dialog.instanceName = instanceName
      this.dialog.title = "导出镜像"
      this.dialog.content = "确认是否导出镜像？（将导出至共享盘）"
      this.dialog.showConfirm = true
      this.dialog.confirmText = "导出"
    },
    enterWaitingExport() {
      this.dialog.open = true
      this.dialog.title = "导出镜像"
      this.dialog.content = "导出中，请稍等片刻..."
      this.dialog.showConfirm = true
      this.dialog.confirmText = "重新导出"
      var _this = this
      let checkTimer = setInterval(async () => {
        let res = await this.doCheckExportStatus()
        console.log("check timer res", res)
        if (!res) {
          return
        }
        if (res.status == "success") {
          clearInterval(checkTimer)
          _this.dialog.open = false
          ElMessage.success(`导出镜像成功。镜像已导出至目录: ${res.filepath}`);
        } else if (res.status == "failed") {
          clearInterval(checkTimer)
          _this.dialog.content = "导出镜像失败，请稍后重试..."
          _this.dialog.confirmText = "重新导出"
          ElMessage.error("导出镜像失败");
        } else if (res.status == "non-exist") {
          clearInterval(checkTimer)
          _this.dialog.content = "导出镜像失败，请稍后重试..."
          _this.dialog.confirmText = "重新导出"
          ElMessage.error("导出镜像失败，实例不存在");
        } else if (res.status == "exporting") {
          _this.dialog.content = "导出中，请稍等片刻..."
          _this.dialog.confirmText = "重新导出"
          console.log("check timer exporting...")
        }
      }, 3000)
    },
    async doCheckExportStatus() {
      let instanceName = this.dialog.instanceName
      let instance = this.findInstanceByName(instanceName)
      if (!instance) {
        ElMessage.error(`获取实例 ${instanceName} 信息失败`);
        return
      }
      let res = await checkExport({
        nodeIP: instance.nodeName,
        podName: instance.name,
        containerID: instance.containerID
      })
      return res.result
    },
    async exportInstance(instanceName: string) {
      console.log("exportInstance", instanceName)
      let instance = this.findInstanceByName(instanceName)
      if (!instance) {
        ElMessage.error(`获取实例 ${instanceName} 信息失败`);
        return
      }
      await exportImage({
        nodeIP: instance.nodeName,
        podName: instance.name,
        containerID: instance.containerID
      })
    },
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

::v-deep .el-form-item__label {
  text-align: left;
  font-size: calc(100vw * 15 / 1920);
  /* font-weight: bold; */
}

.row-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.my-el-input-number[data-unit] {
  --el-input-number-unit-offset-x: 35px;
  position: relative;
}

.my-el-input-number[data-unit]::after {
  content: attr(data-unit);
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: var(--el-input-number-unit-offset-x);
  color: #999999;
}

.my-el-input-number[data-unit] .el-input__inner {
  padding-left: 30px;
  padding-right: calc(var(--el-input-number-unit-offset-x) + 12px);
}

.notebook-creation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* font-size: 100px; */
}

.button-container {
  margin-top: 20px;
  text-align: left;
}

.button-container>button {
  font-size: calc(100vw * 20 / 1920);
}

h2 {
  margin-top: 0;
  text-align: left;
}

.node-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  font-size: calc(100vw * 25 / 1920);
}

/* .form-style > .label {
   font-size: 200px;   
} */

.node-info>* {
  padding-right: 5px;
}

.row-buttons>* {
  padding-right: 5px;
}

.creation-title {
  font-size: calc(100vw * 40 / 1920);
  margin-bottom: 10px;
  font-weight: bold;
  color: black;
}

.export-dialog {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>

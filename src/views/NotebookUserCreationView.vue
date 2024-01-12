<template>
  <div class="notebook-creation" style="">
    <h1 class="creation-title">Jupyter Lab实例创建</h1>
    <!-- <div v-if="nodesLoaded">
      <div class="node-info">
        <p>集群容量</p>
        <p>CPU: {{ node.cpuTotal }}</p>
        <p>内存: {{ node.memoryTotal.toFixed(2) }} GB</p>
        <p>GPU: {{ `${node.gpuUsed}/${node.gpuTotal}` }}</p>
      </div>
    </div>
    <div v-else>
      <div class="node-info">
        <p>集群容量加载中</p>
      </div>
    </div> -->

    <form class="form-container">
      <el-form ref="form" :model="form" label-width="120px" size="big" label-position="top">
        <!-- 添加 label-position="top" -->
        <el-form-item label="实例名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入实例名称"></el-input>
        </el-form-item>

        <el-form-item label="镜像" prop="image">
          <el-select v-model="form.image" placeholder="请选择镜像">
            <el-option v-for="image in imageOptions" :key="image" :value="image" :label="image"></el-option>
          </el-select>
        </el-form-item>

        <el-row class="row-buttons">
          <el-col :span="12">
              <el-form-item label="CPU" prop="cpu">
                <el-input-number :min="0.1" v-model="form.cpu" :step="0.1" :precision="1"
                  controls-position="right" data-unit="核" class="my-el-input-number" >
                </el-input-number>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="row-container">
              <el-form-item label="内存" prop="memory">
                <el-input-number :min="0.1" v-model="form.memory" :step="0.1" :precision="1"
                  controls-position="right" data-unit="GB" class="my-el-input-number"></el-input-number>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-form-item label="GPU" prop="gpu">
          <el-input-number v-model="form.gpu" :step="1" :min="0" :max="8"></el-input-number>
        </el-form-item>
      </el-form>
    </form>

    <div class="button-container">
      <el-button type="primary" @click="createInstance" size="large">创建实例</el-button>
      <el-button @click="cancel" size="large">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NodeStatus from '@/components/NodeStatus.vue'
import { listAllNodes, listAllPods, getService, getNode, getPod, createResource, loadNodesWithInsances } from '@/api/cluster'
import { parseNode, parseInstance } from '@/utils/parser'
import { createPodYaml, createServiceYaml, createIngressYaml } from '@/utils/yaml'
import { type UserSampleSet, type UserSampleApiResponse, type UserSampleSetQueryParams, type PlatformSampleSet, type PlatformSampleApiResponse, type PlatformSampleSetQueryParams, getUserSampleList, getPlatformSampleList } from '@/api/samples'
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型

export default {
  name: 'NotebookCreation',
  data() {
    return {
      nodes: [] as Node[],
      nodesLoaded: false,
      form: {
        name: '',
        image: '',
        cpu: 0,
        memory: 0,
        gpu: 0,
      },
      imageOptions: [
        'jupyter/minimal-notebook:lab-4.0.2',
        'cschranz/gpu-jupyter:v1.5_cuda-11.6_ubuntu-20.04_slim',
        'cschranz/gpu-jupyter:v1.5_cuda-11.6_ubuntu-20.04_python-only',
        'cschranz/gpu-jupyter:v1.5_cuda-11.6_ubuntu-20.04'
      ], // 替换为实际的镜像选项
    };
  },
  async mounted() {
    await this.loadNodes()
  },
  methods: {
    async createInstance(): Promise<void> {
      // 处理创建实例的逻辑
      // 跳转回实例管理页面，使用 Vue Router 的方式

      // 等待this.nodesLoaded为true
      while (!this.nodesLoaded) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      let succeeded = await this.doCreateInstance()
      if (succeeded) {
        this.$router.push(`/instances/${this.$route.params.userId}/`);
      }
    },
    cancel() {
      // 取消创建实例，直接跳转回实例管理页面
      // this.$router.push('/');
      this.$router.push(`/instances/${this.$route.params.userId}/`);
    },
    async loadNodes() {
      let userId: string = this.$route.params.userId as string
      try {
        let nodes = await loadNodesWithInsances(userId)
        this.nodes = nodes
        this.nodesLoaded = true
      } catch (error: any) {
        console.log("error", error)
        ElMessage.error(error);
      }
    },
    async loadPod(instanceName: string) {
      console.log("loadPod, instanceName: ", instanceName)
      let labels = { "app": "jupyterlab-instance", "name": instanceName }
      let response = await getPod(instanceName, import.meta.env.VITE_NAMESPACE, labels)
      console.log("loadPod, response: ", response)
      if (response == null) {
        let e = "调用获取Pod接口失败！"
        ElMessage.error(e)
        throw new Error(e)
      }
      if (response.code != 20000) {
        return null
      }
      return response.data
    },
    async checkDuplicateInstance(instanceName: string): Promise<boolean> {
      try {
        let pod = await this.loadPod(instanceName)
        console.log("checkDuplicateInstance, pod: ", pod)
        if (pod == null) {
          return false
        }
        return true
      } catch (e) {
        console.log("checkDuplicateInstance, error: ", e)
        throw e
      }
    },
    async doCreateInstance(): Promise<boolean> {
      let instanceName = this.form.name
      let userId = this.$route.params.userId
      if (instanceName == "") {
        ElMessage.error("请输入实例名称");
        return false
      }
      if (instanceName.length > 20) {
        ElMessage.error("实例名称长度不能超过20个字符");
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
      }catch (e) {
        console.log("doCreateInstance, checking duplicated, error: ", e)
        ElMessage.error(`检查实例名称 ${instanceName} 是否重复失败，请稍后重试`);
        return false
      }
      let cpu = Number(this.form.cpu.toFixed(1)) * 1000
      let mem = Number(this.form.memory.toFixed(1)) * 1000
      let gpu = Number(this.form.gpu.toFixed(0))
      console.log("doCreateInstance, cpu: ", cpu, "mem: ", mem, "gpu: ", gpu)
      let targetNode: Node|null = null;
      for (let node of this.nodes) {
        // 检查是否存在资源足够的节点
        if (node.cpuTotal < cpu/1000) {
          continue
        }
        if (node.memoryTotal - node.memoryUsed < mem/1000) {
          continue
        }
        if (node.gpuTotal - node.gpuUsed < gpu) {
          continue
        }
        targetNode = node
      }
      if (targetNode == null) {
        ElMessage.error("没有足够的资源创建实例，请联系管理员");
        return false
      }
      let image = this.form.image
      let nodeName = targetNode.name
      let labBaseUrl = `${import.meta.env.VITE_BASE_URL}/lab/${userId}/${instanceName}`
      console.log("createInstance", instanceName, cpu, mem, image, nodeName, userId, labBaseUrl)
      let podYaml: any = createPodYaml(instanceName, userId as string, image, cpu, mem, gpu, nodeName, labBaseUrl)
      console.log("createResource podYaml", podYaml)
      let createPodResponse = await createResource(podYaml)
      console.log("createResource createPodResponse", createPodResponse)
      if (createPodResponse.code != 20000) {
        ElMessage.error(`创建实例失败，原因：${createPodResponse.message}`);
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
      ElMessage.success("创建实例成功");
      return true

      ElMessage.success("创建实例成功");
      return true
    }
  },
};
</script>

<style scoped>
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
  font-size: calc(100vw * 50 / 1920);
  margin-bottom: 10px;
  font-weight: bold;
}
</style>


<style scoped>
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

</style>
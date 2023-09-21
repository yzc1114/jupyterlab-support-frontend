<template>
  <div class="notebook-creation" style="">
    <h1 class="creation-title">Jupyter Lab实例创建</h1>
    <div v-if="nodeLoaded">
      <div class="node-info">
        <p>节点名称：{{ node.name }}</p>
        <p>CPU: {{ node.cpuTotal }}</p>
        <p>内存: {{ node.memoryTotal.toFixed(2) }} GB</p>
        <p>GPU: {{ node.gpuTotal }}</p>
      </div>
    </div>
    <div v-else>
      <div class="node-info">
        <p>节点信息加载中</p>
      </div>
    </div>

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
              <el-input-number :min="0.1" v-model="form.cpu" :step="0.1" :precision="1" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="内存" prop="memory">
              <el-input-number :min="0.1" v-model="form.memory" :step="0.1" :precision="1" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="GPU" prop="gpu">
          <el-input-number v-model="form.gpu" :step="1" :min="0"></el-input-number>
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
import { listAllNodes, listAllPods, getService, getNode, createResource } from '@/api/cluster'
import { parseNode } from '@/utils/parser'
import { type UserSampleSet, type UserSampleApiResponse, type UserSampleSetQueryParams, type PlatformSampleSet, type PlatformSampleApiResponse, type PlatformSampleSetQueryParams, getUserSampleList, getPlatformSampleList } from '@/api/samples'
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型

export default {
  name: 'NotebookCreation',
  data() {
    return {
      node: {
        name: '',
        available: false,
        cpuUsed: 50,
        cpuTotal: 100,
        memoryUsed: 512,
        memoryTotal: 1024,
        gpuUsed: 2,
        gpuTotal: 4,
        instances: [] as Instance[],
      },
      nodeLoaded: false,
      form: {
        name: '',
        image: '',
        cpu: 0,
        memory: 0,
        gpu: 0,
      },
      imageOptions: ['jupyter/minimal-notebook:lab-4.0.2'], // 替换为实际的镜像选项
    };
  },
  async mounted() {
    await this.loadNode()
  },
  methods: {
    async createInstance(): Promise<void> {
      // 处理创建实例的逻辑
      // 跳转回实例管理页面，使用 Vue Router 的方式
      let succeeded = await this.doCreateInstance()
      if (succeeded) {
        this.$router.push(`/${this.$route.params.userId}/`);
      }
    },
    cancel() {
      // 取消创建实例，直接跳转回实例管理页面
      // this.$router.push('/');
      this.$router.push(`/${this.$route.params.userId}/`);
    },
    async loadNode() {
      // 加载节点信息
      let nodeId: string | string[] = this.$route.params.nodeId
      // assert nodeId is a single string
      if (Array.isArray(nodeId)) {
        nodeId = nodeId[0]
      }
      let nodeResponse = await getNode(nodeId)
      if (nodeResponse.code !== 20000) {
        ElMessage.error(nodeResponse.message);
        return
      }
      let node = nodeResponse.data
      let nodeInfo: Node = parseNode(node)
      this.node = nodeInfo
      setTimeout(() => {
        this.nodeLoaded = true
      }, 1000)
      // this.nodeLoaded = true
    },
    async doCreateInstance(): Promise<boolean> {
      let instanceName = this.form.name
      let cpu = Number(this.form.cpu.toFixed(1)) * 1000
      let mem = Number(this.form.memory.toFixed(1)) * 1000
      // let gpu = Number(this.form.gpu.toFixed(0))
      let image = this.form.image
      let nodeName = this.$route.params.nodeId
      let userId = this.$route.params.userId
      let podYaml = {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "namespace": "jupyterlab-management",
          "name": instanceName,
          "labels": {
            "app": "jupyterlab-instance",
            "name": instanceName,
            "user": userId,
          }
        },
        "spec": {
          "securityContext": {
            "runAsUser": 0,
            "fsGroup": 0
          },
          "containers": [
            {
              "name": instanceName,
              "image": image,
              "imagePullPolicy": "IfNotPresent",
              "ports": [
                {
                  "containerPort": 8888
                }
              ],
              "command": [
                "/bin/bash",
                "-c",
                "jupyter lab --generate-config &&\ncat > ~/.jupyter/jupyter_lab_config.py << EOF\nc.ServerApp.tornado_settings = {\n'headers': {\n'Content-Security-Policy': \"frame-ancestors 'self' *;\",\n}\n}\nc.ServerApp.token = ''\nc.ServerApp.base_url = '/aiDesigner/yhhuser/lab/'\nc.ServerApp.password = ''\nc.ServerApp.disable_check_xsrf = True\nEOF\nstart.sh jupyter lab --ip='0.0.0.0' --ServerApp.allow_root=True --port 8888 --no-browser"
              ],
              "resources": {
                "requests": {
                  "memory": `${mem}Mi`,
                  "cpu": `${cpu}m`
                }
              }
            }
          ],
          "nodeName": nodeName,
          "restartPolicy": "Always"
        }
      }
      console.log("createResource podYaml", podYaml)
      let createPodResponse = await createResource(podYaml)
      if (createPodResponse.code != 20000) {
        ElMessage.error(`创建实例失败，原因：${createPodResponse.message}`);
        return false
      }
      let serviceYaml = {
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {
          "name": `${instanceName}-svc`,
          "namespace": "jupyterlab-management",
          "labels": {
            "app": "jupyterlab-instance",
            "name": `${instanceName}-svc`
          }
        },
        "spec": {
          "type": "NodePort",
          "ports": [
            {
              "port": 8888,
              "targetPort": 8888,
              "protocol": "TCP",
              "name": "http"
            }
          ],
          "selector": {
            "name": instanceName,
          }
        }
      }
      let createServiceResponse = await createResource(serviceYaml)
      if (createServiceResponse.code != 20000) {
        ElMessage.error(`创建实例服务失败，原因：${createServiceResponse.message}`);
        return false
      }

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

.button-container > button {
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

.row-buttons >*{
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
</style>
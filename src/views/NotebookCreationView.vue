<template>
  <div class="notebook-creation" style="">
    <h1>Jupyter Lab实例创建</h1>
    <div class="node-info">
      <p>节点名称：{{ node.name }}</p>
      <p>CPU: {{ node.cpuUsed }} / {{ node.cpuTotal }}</p>
      <p>内存: {{ node.memoryUsed }} / {{ node.memoryTotal }}</p>
      <p>GPU: {{ node.gpuUsed }} / {{ node.gpuTotal }}</p>
    </div>

    <form class="form-container">
      <el-form ref="form" :model="form" label-width="120px" size="big" label-position="top"> <!-- 添加 label-position="top" -->
        <el-form-item label="实例名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入实例名称"></el-input>
        </el-form-item>

        <el-form-item label="镜像" prop="image">
          <el-select v-model="form.image" placeholder="请选择镜像">
            <el-option v-for="image in imageOptions" :key="image" :value="image" :label="image"></el-option>
          </el-select>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="CPU" prop="cpu">
              <el-input-number v-model="form.cpu" :step="0.1" :precision="1" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="内存" prop="memory">
              <el-input-number v-model="form.memory" :step="0.1" :precision="1" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="GPU" prop="gpu">
          <el-input-number v-model="form.gpu" :step="1" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
    </form>

    <div class="button-container">
      <el-button type="primary" @click="createInstance">创建实例</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotebookCreation',
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
      form: {
        name: '',
        image: '',
        cpu: 0,
        memory: 0,
        gpu: 0,
      },
      imageOptions: ['image1', 'image2', 'image3'], // 替换为实际的镜像选项
    };
  },
  methods: {
    createInstance() {
      // 处理创建实例的逻辑
      // 跳转回实例管理页面，使用 Vue Router 的方式
      // this.$router.push('/');
    },
    cancel() {
      // 取消创建实例，直接跳转回实例管理页面
      // this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.notebook-creation {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 修改为 flex-start */
  margin-bottom: 20px;
}

.form-container {
  width: 100%;
  display: flex; /* 添加 display: flex */
  flex-direction: column; /* 添加 flex-direction: column */
  align-items: flex-start; /* 添加 align-items: flex-start */
}

.button-container {
  margin-top: 20px;
  text-align: left; /* 修改为 text-align: left */
}

h2 {
  margin-top: 0;
  text-align: left; /* 修改为 text-align: left */
}

.el-form-item__label {
  text-align: left; /* 添加文本左对齐样式 */
}

.node-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}


.node-info > * {
  padding: 5px;
}

</style>

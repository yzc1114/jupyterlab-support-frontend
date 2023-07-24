<script lang="ts">
import { defineComponent } from 'vue';
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型

export default defineComponent({
  name: 'NodeStatus',
  props: {
    node: {
      type: Object as () => Node,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log("NodeStatus userId", this.userId)
  },
  methods: {
    createInstance() {
      console.log("createInstance clicked, userId: ", this.userId)
      // 处理创建实例的逻辑，可以使用 Vue Router 跳转到创建实例页面
      this.$router.push(`/${this.userId}/${this.node.name}/create`);
    },
    enterInstance(instance: Instance) {
      // 处理进入实例的逻辑，可以使用 Vue Router 跳转到实例使用页面
      console.log("enterInstance clicked, userId: ", this.userId, "instance: ", instance.name)
      this.$router.push(`/${this.userId}/instance/${instance.name}`);
    },
    destroyInstance(instance: Instance) {
      // 处理摧毁实例的逻辑
      this.$emit('delete', instance.name);
    },
  },
});
</script>


<template>
  <div class="node-status" style="width: 1000px;">
    <div class="node-info">
      <div class="node-info-left">
        <h2>{{ node.name }}</h2>
        <p v-if="node.available">节点可用</p>
        <p v-else>节点不可用</p>
      </div>
      <div class="node-info-right">
        <!-- <p>CPU: {{ node.cpuUsed }} / {{ node.cpuTotal }}</p>
        <p>内存: {{ node.memoryUsed }} / {{ node.memoryTotal }}</p>
        <p>GPU: {{ node.gpuUsed }} / {{ node.gpuTotal }}</p> -->
        <p>CPU: {{ node.cpuTotal }}</p>
        <p>内存: {{ node.memoryTotal.toFixed(2) }} GB</p>
        <p>GPU: {{ node.gpuTotal }}</p>
        <el-button @click="createInstance" type="primary">创建实例</el-button>
      </div>
    </div>

    <div class="instance-table">
      <h3>节点上的实例</h3>
      <el-table :data="node.instances" border>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="name" label="实例名称"></el-table-column>
        <el-table-column prop="status" label="实例状态"></el-table-column>
        <el-table-column prop="image" label="镜像名称"></el-table-column>
        <el-table-column prop="cpuUsage" label="CPU占用量"></el-table-column>
        <el-table-column prop="memoryUsage" label="内存占用量"></el-table-column>
        <el-table-column prop="gpuUsage" label="GPU占用量"></el-table-column>
        <el-table-column label="操作" min-width="150px">
          <template #default="scope">
            <div class="instance-buttons">
              <el-button @click="enterInstance(scope.row)" type="primary" :disabled="scope.row.status !== 'Running'">进入实例</el-button>
              <el-button @click="destroyInstance(scope.row)" type="danger" :disabled="scope.row.status === 'Terminating'">摧毁实例</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<style scoped>
.node-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.instance-buttons {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

.node-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.node-info-left {
  flex-grow: 1;
}

.node-info-right {
  display: flex;
  align-items: center;
}

.node-info-right > * {
  padding: 5px;
}

.instance-table {
  width: 100%;
}


h2 {
  margin-top: 0;
}

p {
  margin: 5px 0;
}

</style>

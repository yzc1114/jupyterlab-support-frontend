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
  <div class="node-status" style="width: 100%;">
    <div class="node-info">
      <div class="node-info-left">
        <div>
          <h2>{{ node.name }}</h2>
        </div>
        <div>
          <p v-if="node.available">节点可用</p>
          <p v-else>节点不可用</p>
        </div>
      </div>
      <div class="node-info-right">
        <!-- <p>CPU: {{ node.cpuUsed }} / {{ node.cpuTotal }}</p>
        <p>内存: {{ node.memoryUsed }} / {{ node.memoryTotal }}</p>
        <p>GPU: {{ node.gpuUsed }} / {{ node.gpuTotal }}</p> -->
        <p>CPU: {{ node.cpuTotal }}</p>
        <p>内存: {{ node.memoryTotal.toFixed(2) }} GB</p>
        <p>GPU: {{ node.gpuTotal }}</p>
        <el-button class="node-info-button" @click="createInstance" size="large" type="primary">创建实例</el-button>
      </div>
    </div>

    <div class="instance-table">
      <h3 class="instance-table-title">节点上的实例</h3>
      <el-table :data="node.instances" border :cell-style="{textAlign: 'center', color: 'black', padding: '20px', 'font-size': 'calc(100vw * 18 / 1920)'}" align="center" :header-cell-style="{background:'#fafafa', color:'black', 'text-align': 'center', 'font-size': 'calc(100vw * 18 / 1920)', padding: '20px'}">
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
              <el-button @click="enterInstance(scope.row)" type="primary" :disabled="scope.row.status !== 'Running'" size="large">进入实例</el-button>
              <el-button @click="destroyInstance(scope.row)" type="danger" :disabled="scope.row.status === 'Terminating'" size="large">摧毁实例</el-button>
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
  /* font-size: calc(100vw * 25 / 1920); */
}

.instance-buttons > button {
  font-size: calc(100vw * 15 / 1920);
  width: fit-content;
}

.node-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  font-size: calc(100vw * 20 / 1920);
}

.node-info-left {
  width: 15%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}

.node-info-right {
  width: 28%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.node-info-button {
  margin-left: 20px;
  font-size: calc(100vw * 20 / 1920);
  width: fit-content;
}

.node-info-right > * {
  padding: 5px;
}

.instance-table {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.instance-table-title {
  font-size: calc(100vw * 25 / 1920);
  font-weight: bold;
  margin-bottom: 5px;
}


h2 {
  margin-top: 0;
}

p {
  margin: 5px 0;
}

/* ::v-deep {
  .el-form-item
  width: 90%;
} */

</style>

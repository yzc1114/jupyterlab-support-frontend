<script lang="ts">
import { defineComponent } from 'vue';
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型

export default defineComponent({
  name: 'UserInstances',
  props: {
    nodes: {
      type: Object as () => Node[],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      instances: [] as Instance[],
    };
  },
  mounted() {
    console.log("UserInstances userId", this.userId)
    this.initInstances()
  },
  methods: {
    initInstances() {
      this.instances = []
      for (let node of this.nodes) {
        for (let instance of node.instances) {
          if (instance.user == this.userId) {
            this.instances.push(instance)
          }
        }
      }
      console.log("UserInstances initInstances", this.instances)
    },
    createInstance() {
      console.log("createInstance clicked, userId: ", this.userId)
      // 处理创建实例的逻辑，可以使用 Vue Router 跳转到创建实例页面
      // this.$router.push(`/create/${this.userId}`);
      this.$emit('create', null);
    },
    enterInstance(instance: Instance) {
      // 处理进入实例的逻辑，可以使用 Vue Router 跳转到实例使用页面
      console.log("enterInstance clicked, userId: ", this.userId, "instance: ", instance.name)
      // this.$router.push(`/instance/${instance.user}/${instance.name}`);
      this.$router.push({
        path:`/instance/${instance.user}/${instance.name}`,
        query: {
          userType: "user"
        }
      })
    },
    editInstance(instance: Instance) {
      console.log("editInstance clicked, userId: ", this.userId, "instance: ", instance.name)
      this.$emit('edit', instance.name);
    },
    destroyInstance(instance: Instance) {
      // 处理摧毁实例的逻辑
      this.$emit('delete', instance.name);
    },
    exportInstance(instance: Instance) {
      // 处理导出实例的逻辑
      this.$emit('export', instance.name);
    },
  },
});
</script>


<template>
  <div class="node-status" style="width: 100%;">
    <div class="instance-table">
      <h3 class="instance-table-title">我的实例</h3>
      <div class="create-instance-right">
        <el-button class="node-info-button" @click="createInstance" size="large" type="primary">创建实例</el-button>
    </div>
      <el-table :data="instances" border
        :cell-style="{ textAlign: 'center', color: 'black', padding: '20px', 'font-size': 'calc(100vw * 18 / 1920)' }"
        :header-cell-style="{ background: '#fafafa', color: 'black', 'text-align': 'center', 'font-size': 'calc(100vw * 18 / 1920)', padding: '20px' }">
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="name" label="实例名称"></el-table-column>
        <el-table-column prop="status" label="实例状态"></el-table-column>
        <el-table-column prop="image" label="镜像名称"></el-table-column>
        <el-table-column prop="cpuUsage" label="CPU占用量(核)"></el-table-column>
        <el-table-column prop="memoryUsage" label="内存占用量(GB)"></el-table-column>
        <el-table-column label="GPU占用量(块)">
          <template #default="scope">
            {{ scope.row.gpuUsage / 100 }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150px">
          <template #default="scope">
            <div class="instance-buttons">
              <el-button @click="enterInstance(scope.row)" type="primary" :disabled="scope.row.status !== 'Running'"
                size="default">进入实例</el-button>
                <el-button @click="editInstance(scope.row)" type="default" :disabled="scope.row.status !== 'Running'" size="default">编辑实例</el-button>
            </div>
            <div class="instance-buttons" style="padding-top: 5px;">
              <el-button @click="destroyInstance(scope.row)" type="danger" :disabled="scope.row.status === 'Terminating'"
                size="default">摧毁实例</el-button>
                <el-button @click="exportInstance(scope.row)" type="default" :disabled="scope.row.status === 'Terminating'"
                size="default">导出镜像</el-button>
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

.instance-buttons>button {
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

.create-instance-right {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 5px;
  margin-bottom: 5px;
}

.node-info-button {
  margin-left: 20px;
  font-size: calc(100vw * 20 / 1920);
  width: fit-content;
}

.node-info-right>* {
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

:deep(.cell) {
  overflow: visible;
}

/* ::v-deep {
  .el-form-item
  width: 90%;
} */
</style>



import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型
import { convertToGB } from './unit';


const region = "test"
const maxLimit = 100
const mock = true


export function parseNode(node: any): Node{
    let nodeAvaliable = false
    for (let cond of node.status.conditions) {
      if (cond.type === "Ready") {
        nodeAvaliable = cond.status == "True"
      }
    }
    let gpu_key = "nvidia.com/gpu";
    let gpu_used = 0;
    let gpu_total = 0;
    if (gpu_key in node.status.allocatable) {
      gpu_total = node.status.capacity[gpu_key];
      gpu_used = gpu_total - node.status.allocatable[gpu_key];
      console.log("find gpus in node", node.metadata.name, gpu_used, gpu_total)
    }
    let nodeInfo: Node = {
      name: node.metadata.name,
      available: nodeAvaliable,
      cpuUsed: 0,
      cpuTotal: node.status.allocatable.cpu,
      memoryUsed: 0,
      memoryTotal: convertToGB(node.status.allocatable.memory),
      gpuUsed: gpu_used,
      gpuTotal: gpu_total,
      instances: [],
    }
    return nodeInfo
}

export function parseInstance(pod: any): Instance {
    let instance: Instance = {
        createTime: pod.metadata.creationTimestamp,
        name: pod.metadata.name,
        status: pod.status.phase,
        image: pod.spec.containers[0].image,
        cpuUsage: pod.spec.containers[0].resources.requests.cpu,
        memoryUsage: pod.spec.containers[0].resources.requests.memory,
        gpuUsage: 0,
        id: pod.metadata.uid,
    }
    return instance
}
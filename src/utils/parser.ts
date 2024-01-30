

import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型
import { convertToGB, convertCPUToCore } from './unit';


export function parseNode(node: any): Node {
  let nodeAvaliable = false
  for (let cond of node.status.conditions) {
    if (cond.type === "Ready") {
      nodeAvaliable = cond.status == "True"
    }
  }
  // let gpu_key = "nvidia.com/gpu";
  // let gpu_used = 0;
  // let gpu_total = 0;
  // if (gpu_key in node.status.allocatable) {
  //   gpu_total = node.status.capacity[gpu_key];
  //   // gpu_used = gpu_total - node.status.allocatable[gpu_key];
  //   console.log("find gpus in node", node.metadata.name, gpu_used, gpu_total)
  // }

  let gpu_key = "doslab.io/vcuda-core";
  let gpu_mem_key = "doslab.io/vcuda-memory";
  let gpu_used = 0;
  let gpu_total = 0;
  let gpu_mem_used = 0;
  let gpu_mem_total = 0;
  if (gpu_key in node.status.allocatable) {
    gpu_total = node.status.allocatable[gpu_key];
    console.log("find gpu core in node", node.metadata.name, gpu_used, gpu_total)
  }
  if (gpu_mem_key in node.status.allocatable) {
    gpu_mem_total = node.status.allocatable[gpu_mem_key];
    console.log("find gpu memory in node", node.metadata.name, gpu_mem_used, gpu_mem_total)
  }

  let nodeInfo: Node = {
    name: node.metadata.name,
    available: nodeAvaliable,
    cpuUsed: 0,
    cpuTotal: Number(node.status.allocatable.cpu),
    memoryUsed: 0,
    memoryTotal: convertToGB(node.status.allocatable.memory),
    gpuUsed: gpu_used,
    gpuTotal: gpu_total,
    gpuMemUsed: gpu_mem_used,
    gpuMemTotal: gpu_mem_total,
    instances: [],
  }
  return nodeInfo
}

export function parseInstance(pod: any): Instance {
  let gpuUsage = 0;
  let gpuMemUsage = 0;
  if ("doslab.io/vcuda-core" in pod.spec.containers[0].resources.requests) {
    gpuUsage = Number(pod.spec.containers[0].resources.requests["doslab.io/vcuda-core"]);
  }
  if ("doslab.io/vcuda-memory" in pod.spec.containers[0].resources.requests) {
    gpuMemUsage = Number(pod.spec.containers[0].resources.requests["doslab.io/vcuda-memory"]);
  }

  let instance: Instance = {
    user: pod.metadata.labels.user,
    nodeName: pod.spec.nodeName,
    createTime: pod.metadata.creationTimestamp,
    name: pod.metadata.labels.name,
    status: pod.status.phase,
    image: pod.spec.containers[0].image,
    cpuUsage: convertCPUToCore(pod.spec.containers[0].resources.requests.cpu),
    memoryUsage: convertToGB(pod.spec.containers[0].resources.requests.memory),
    gpuUsage: gpuUsage,
    gpuMemUsage: gpuMemUsage,
    id: pod.metadata.uid,
  }
  return instance
}
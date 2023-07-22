

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
    let nodeInfo: Node = {
      name: node.metadata.name,
      available: nodeAvaliable,
      cpuUsed: 0,
      cpuTotal: node.status.allocatable.cpu,
      memoryUsed: 0,
      memoryTotal: convertToGB(node.status.allocatable.memory),
      gpuUsed: 0,
      gpuTotal: 0,
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
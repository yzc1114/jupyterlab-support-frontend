export interface Node {
    name: string;
    available: boolean;
    cpuUsed: number;
    cpuTotal: number;
    memoryUsed: number;
    memoryTotal: number;
    gpuUsed: number;
    gpuTotal: number;
    instances: Instance[];
}

export interface Instance {
    id: string;
    nodeName: string;
    user: string;
    name: string;
    status: string;
    image: string;
    cpuUsage: string;
    memoryUsage: string;
    gpuUsage: number;
    createTime: string;
}
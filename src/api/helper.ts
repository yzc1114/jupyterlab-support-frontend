import { helperClient } from './index'

const mock = false;

export interface JSONRPCWrapper<T> {
    id: string;
    jsonrpc: string;
    result: T;
}

export interface CheckExportParams {
    nodeIP: string;
    podName: string;
    containerID: string;
}

export interface CheckExportResult {
    filepath: string;
    message: string;
    status: string;
}

export interface ExportParams {
    nodeIP: string;
    podName: string;
    containerID: string;
}

export interface ExportResult {
    message: string;
}

export const checkExport = async (params: CheckExportParams): Promise<JSONRPCWrapper<CheckExportResult>> => {
    if (mock) {
        return {
            "id": "371872469asyf93hqur",
            "jsonrpc": "2.0",
            "result": {
                "filepath": "/data/share/pod-name-container-id.tar",
                "message": "导出成功",
                "status": "success"
            }
        }
    }
    const response = await helperClient.get(`/check_export/${params.nodeIP}/${params.podName}/${params.containerID}`)
    return response.data;
};

export const exportImage = async (params: ExportParams): Promise<JSONRPCWrapper<ExportResult>> => {
    if (mock) {
        return {
            "id": "371872469asyf93hqur",
            "jsonrpc": "2.0",
            "result": {
                "message": "Exporting container..."
            }
        }
    }
    const response = await helperClient.get(`/export/${params.nodeIP}/${params.podName}/${params.containerID}`)
    return response.data;
};

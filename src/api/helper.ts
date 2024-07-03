import { helperClient } from './index'

const mock = false;

export interface JSONRPCWrapper<T> {
    id: string;
    jsonrpc: string;
    result: T;
}

export interface CheckExportParams {
    nodeIP: string;
    containerID: string;
    imageName: string;
    imageVersion: string;
}

export interface CheckExportResult {
    image_full_name: string;
    image_size: string|undefined;
    message: string;
    status: string;
}

export interface ExportParams {
    nodeIP: string;
    containerID: string;
    imageName: string;
    imageVersion: string;
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
                "image_size": "129912415",
                "image_full_name": "10.1.75.33:30003/library/admin/image_name:version",
                "message": "导出成功",
                "status": "success"
            }
        }
    }
    const response = await helperClient.get(`/check_export/${params.nodeIP}/${params.containerID}/${params.imageName}/${params.imageVersion}`)
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
    const response = await helperClient.get(`/export/${params.nodeIP}/${params.containerID}/${params.imageName}/${params.imageVersion}`)
    return response.data;
};

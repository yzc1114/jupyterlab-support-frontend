import { aiPlatformClient } from './index'

const mock = false

// dataSize	数据大小	body	false	string
// description	描述	body	false	string
// env	算法环境	body	false	string
// name	镜像名称	body	false	string
// type	算法类型，1-场景识别，2-分割分类，3-目标检测，4-变化检测	body	false	integer(int32)
// useType	算法用途:Train-模型训练,Interpret-目标解译	body	false	string
// version	镜像版本	body	false	string
export interface UploadOnlineModelParams {
    dataSize: string;
    description: string;
    env: string;
    name: string;
    type: "1" | "2" | "3" | "4";
    useType: "Train" | "Interpret";
    version: string;
}

export interface UploadOnlineModelResponse {
    code: number;
    message: string;
    data: {};
}

export const uploadOnlineModel = async (params: UploadOnlineModelParams): Promise<UploadOnlineModelResponse> => {
    // 
    if (mock) {
        return {
            code: 200,
            message: 'success',
            data: {}
        }
    }
    let packedParams = {
        imagesDTO: params
    };
    const response = await aiPlatformClient.post<UploadOnlineModelResponse>('/ai-platform/algorithm/package/onlineModel', packedParams);
    return response.data;
}
import { sampleClient } from './index'

const mock = false;

export interface UserSampleSet {
    id: number;
    userId: string;
    sampleSetType: number;
    sampleSetCode: string;
    name: string;
    source: number;
    sourceStr: string | null;
    describe: string;
    type: number;
    typeStr: string;
    number: number;
    size: string;
    format: string;
    bands: number;
    resolution: string;
    classNumber: number;
    classInfo: string;
    copyright: string;
    isOpen: number;
    storageLocation: string;
    isDelete: number;
    gmtCreate: string;
}

export interface UserSampleApiResponse {
    code: number;
    message: string | null;
    data: {
        total: number;
        list: UserSampleSet[];
        pageNum: number;
        pageSize: number;
        size: number;
        startRow: number;
        endRow: number;
        pages: number;
        prePage: number;
        nextPage: number;
        isFirstPage: boolean;
        isLastPage: boolean;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        navigatePages: number;
        navigatepageNums: number[];
        navigateFirstPage: number;
        navigateLastPage: number;
    };
    dataList: null;
    map: null;
    success: boolean;
};

export interface UserSampleSetQueryParams {
    pageSize: number;
    pageNum: number;
    sampleSetName: string|null;
    type: number|null;
    source: number|null;
    bands: number|null;
    format: string|null;
    size: string|null;
    userId: string;
}



export const getUserSampleList = async (params: UserSampleSetQueryParams): Promise<UserSampleApiResponse> => {
    if (mock) {
        return {
            "code": 200,
            "message": null,
            "data": {
                "total": 25,
                "list": [
                    {
                        "id": 32,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230720143652_1419",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": "本地上传",
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 0,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-20 14:36:52"
                    },
                    {
                        "id": 30,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230719194154_2451",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": "本地上传",
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 0,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-19 19:41:57"
                    },
                    {
                        "id": 29,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230719173600_673",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": null,
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 1,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-19 17:36:03"
                    },
                    {
                        "id": 30,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230719173600_673",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": null,
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 1,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-19 17:36:03"
                    },
                    {
                        "id": 31,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230719173600_673",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": null,
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 1,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-19 17:36:03"
                    },
                    {
                        "id": 32,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230719173600_673",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": null,
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 1,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-19 17:36:03"
                    },
                    {
                        "id": 33,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230719173600_673",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": null,
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 1,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-19 17:36:03"
                    },
                    {
                        "id": 34,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230719173600_673",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": null,
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 1,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-19 17:36:03"
                    },
                    {
                        "id": 35,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230719173600_673",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": null,
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 1,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-19 17:36:03"
                    },
                    {
                        "id": 36,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230719173600_673",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": null,
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 1,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-19 17:36:03"
                    }
                ],
                "pageNum": 1,
                "pageSize": 10,
                "size": 10,
                "startRow": 1,
                "endRow": 10,
                "pages": 1,
                "prePage": 0,
                "nextPage": 1,
                "isFirstPage": true,
                "isLastPage": false,
                "hasPreviousPage": false,
                "hasNextPage": true,
                "navigatePages": 8,
                "navigatepageNums": [
                    1, 2, 3
                ],
                "navigateFirstPage": 1,
                "navigateLastPage": 3
            },
            "dataList": null,
            "map": null,
            "success": true
        }
    }
    const response = await sampleClient.get('/aiwork/sampleset/user/has/list', {
        params,
    })
    return response.data;
};


export interface PlatformSampleSet {
    id: number;
    userId: string;
    sampleSetType: number;
    sampleSetCode: string;
    name: string;
    source: number;
    sourceStr: string | null;
    describe: string;
    type: number;
    typeStr: string;
    number: number;
    size: string;
    format: string | null;
    bands: number;
    resolution: string;
    classNumber: number;
    classInfo: string;
    copyright: string | null;
    isOpen: number;
    storageLocation: string;
    isDelete: number;
    gmtCreate: string;
}

export interface PlatformSampleApiResponse {
    code: number;
    message: string | null;
    data: {
        total: number;
        list: PlatformSampleSet[];
        pageNum: number;
        pageSize: number;
        size: number;
        startRow: number;
        endRow: number;
        pages: number;
        prePage: number;
        nextPage: number;
        isFirstPage: boolean;
        isLastPage: boolean;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        navigatePages: number;
        navigatepageNums: number[];
        navigateFirstPage: number;
        navigateLastPage: number;
    };
    dataList: null;
    map: null;
    success: boolean;
}


export interface PlatformSampleSetQueryParams {
    pageSize: number;
    pageNum: number;
    sampleSetName: string|null;
    type: number|null;
    bands: number|null;
    userId: string;
    resolution: number|null;
    format: number|null;
    source: number|null;
}


export const getPlatformSampleList = async (params: PlatformSampleSetQueryParams): Promise<PlatformSampleApiResponse> => {
    if (mock) {
        return {
            "code": 200,
            "message": null,
            "data": {
                "total": 2,
                "list": [
                    {
                        "id": 29,
                        "userId": "yhhuser",
                        "sampleSetType": 1,
                        "sampleSetCode": "UD_20230719173600_673",
                        "name": "测试用户上传样本集",
                        "source": 1,
                        "sourceStr": null,
                        "describe": "测试",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": "tif",
                        "bands": 3,
                        "resolution": "10m",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": "版权说明",
                        "isOpen": 1,
                        "storageLocation": "http://192.168.100.175:18070/ai/file/\\yhhuser\\20230719测试样本集.zip",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-19 17:36:03"
                    },
                    {
                        "id": 12,
                        "userId": "yhhuser",
                        "sampleSetType": 3,
                        "sampleSetCode": "AS_20230719194154_2451",
                        "name": "悬浮物浓度样本集",
                        "source": 3,
                        "sourceStr": null,
                        "describe": "这是第一次上传悬浮物浓度样本集",
                        "type": 1,
                        "typeStr": "场景识别",
                        "number": 10,
                        "size": "1000*1000",
                        "format": null,
                        "bands": 58,
                        "resolution": "10",
                        "classNumber": 2,
                        "classInfo": "{\"ClassificationSystem\": [{\"EName\": \"water\",\"CName\": \"水域\",\"Code\": \"001\",\"Color\": \"100,200,240\"}, {\"EName\": \"tree\",\"CName\": \"灌木\",\"Code\": \"2\",\"Color\": \"20,20,40\"}]}",
                        "copyright": null,
                        "isOpen": 1,
                        "storageLocation": "/mnt/*",
                        "isDelete": 0,
                        "gmtCreate": "2023-07-17 16:41:19"
                    }
                ],
                "pageNum": 1,
                "pageSize": 10,
                "size": 2,
                "startRow": 1,
                "endRow": 2,
                "pages": 1,
                "prePage": 0,
                "nextPage": 0,
                "isFirstPage": true,
                "isLastPage": true,
                "hasPreviousPage": false,
                "hasNextPage": false,
                "navigatePages": 8,
                "navigatepageNums": [
                    1
                ],
                "navigateFirstPage": 1,
                "navigateLastPage": 1
            },
            "dataList": null,
            "map": null,
            "success": true
        }
    }
    const response = await sampleClient.get('/aiwork/sampleset/platformSampleSet/list', {
        params,
    })
    return response.data;
}
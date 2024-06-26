import { dataClient } from './index'

const mock = false;

export interface Satellite {
    satelliteId: string;
    sensorIds: string[];
}

export interface SatelliteImage {
    name: string;
    fileUrl: string;
    satelliteId: string;
    sensorId: string;
    receiveTime: string;
    sceneId: string;
    orbitId: string;
    thxpaceCode: string;
    imageGsd: string;
    cloudPercent: number;
    geom: string;
    thumbUrl: string;
    thumbUrlbeta: string | null;
    sourceBit: string;
    sources: string[];
    changGuangData: any; // Adjust this type if you know the actual structure
    gxyhServerPath: string;
    id: number;
}

export interface DataRequestParams {
    satelliteSensorImageModeList: [];
    exhibite: number;
    maxImageGsd: number;
    minCloudPercent: number;
    minImageGsd: number;
    offset: number;
    limit: number;
    satelliteList: Satellite[];
    startTime: string;
    topology: number;
    endTime: string;
    maxCloudPercent: number;
    regionLevel: number;
    regionName: string;
    filterSatelliteList: Satellite[];
    ifThumbUrl: boolean;
    ifExistFileUrl: boolean|undefined;
}

export interface DataResponse {
    code: number;
    message: string;
    data: {
        moduleName: string;
        total: number;
        pageNum: number;
        pageSize: number;
        datas: SatelliteImage[];
        totalPage: number | null;
        userConditions: any; // Adjust this type if you know the actual structure
    };
    success: boolean;
}

export interface RegionItem {
    name: string,
    adminCode: string
}

export const getProvinces = async (): Promise<RegionItem[]> => {
    const response = await dataClient.get('/yjcImage/administrative/province');
    console.log("get provinces response", response);
    if (response.data.code === 200) {
        return response.data.data;
    }
    return [];
}

export const getCities = async (provinceCode: string): Promise<RegionItem[]> => {
    // https://www.cpeos.org.cn/yjcImage/administrative/city?provinceCode=110000
    const response = await dataClient.get(`/yjcImage/administrative/city?provinceCode=${provinceCode}`);
    console.log("get cities response", response);
    if (response.data.code === 200) {
        return response.data.data;
    }
    return [];
}

export const getCounties = async (cityCode: string): Promise<RegionItem[]> => {
    // https://www.cpeos.org.cn/yjcImage/administrative/county?cityCode=110100
    const response = await dataClient.get(`/yjcImage/administrative/county?cityCode=${cityCode}`);
    console.log("get counties response", response);
    if (response.data.code === 200) {
        return response.data.data;
    }
    return [];
}


export const getDataList = async (params: DataRequestParams): Promise<DataResponse> => {
    if (mock) {
        return {
            "code": 200,
            "message": "执行成功",
            "data": {
                "moduleName": "STANDARD_PRODUCT",
                "total": 476,
                "pageNum": 1,
                "pageSize": 10,
                "datas": [
                    {
                        "name": "GF7_DLC_E116.2_N40.0_20230602_L1A0001163669.tar.gz",
                        "satelliteId": "GF7",
                        "fileUrl": "/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.tif",
                        "sensorId": "DLC",
                        "receiveTime": "2023-06-02 08:00:00",
                        "sceneId": "1103856",
                        "orbitId": "20249",
                        "thxpaceCode": "GF7_DLC_1163669_LEVEL1A",
                        "imageGsd": "0.8",
                        "cloudPercent": 1.0,
                        "geom": "POLYGON((116.016907 39.890446,116.293285 39.84257,116.358383 40.084423,116.081021 40.132367,116.016907 39.890446))",
                        "thumbUrl": "https://gfastdfs.cpeos.org.cn/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.jpg",
                        "thumbUrlbeta": null,
                        "sourceBit": "010000000000",
                        "sources": [
                            "高分辨率对地观测系统网格平台"
                        ],
                        "changGuangData": null,
                        "gxyhServerPath": "/mnt/usdata/bzyxsj/GF7_Data/GF7_DLC_E116.2_N40.0_20230602_L1A0001163669-BWDPAN_ortho_fusion/GF7_DLC_E116.2_N40.0_20230602_L1A0001163669-BWDPAN_ortho_fusion.tif.usrmp",
                        "id": 32372629
                    },
                    {
                        "name": "GF1_PMS2_E115.3_N39.9_20230523_L1A0007296153.tar.gz",
                        "fileUrl": "/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.tif",
                        "satelliteId": "GF1",
                        "sensorId": "PMS2",
                        "receiveTime": "2023-05-23 10:59:02",
                        "sceneId": "11303734",
                        "orbitId": "54297",
                        "thxpaceCode": "GF1_PMS2_7296153_LEVEL1A",
                        "imageGsd": "2/8",
                        "cloudPercent": 0.0,
                        "geom": "POLYGON((115.044 39.7686,115.449 39.6933,115.553 40.022,115.146 40.0975,115.044 39.7686))",
                        "thumbUrl": "https://gfastdfs.cpeos.org.cn/group1/M00/B7/CA/ChBQC2RvDJuAb-C8AABlWjuh_SE125.jpg",
                        "thumbUrlbeta": null,
                        "sourceBit": "010000000000",
                        "sources": [
                            "高分辨率对地观测系统网格平台"
                        ],
                        "changGuangData": null,
                        "gxyhServerPath": "/mnt/usdata/bzyxsj/GF1_Data/GF1_Data/GF1_PMS2_E115.3_N39.9_20230523_L1A0007296153-PAN2_ortho_fusion/GF1_PMS2_E115.3_N39.9_20230523_L1A0007296153-PAN2_ortho_fusion.tif.usrmp",
                        "id": 32348797
                    },
                    {
                        "name": "GF1_PMS2_E115.4_N40.2_20230523_L1A0007296155.tar.gz",
                        "fileUrl": "/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.tif",
                        "satelliteId": "GF1",
                        "sensorId": "PMS2",
                        "receiveTime": "2023-05-23 10:58:58",
                        "sceneId": "11303733",
                        "orbitId": "54297",
                        "thxpaceCode": "GF1_PMS2_7296155_LEVEL1A",
                        "imageGsd": "2/8",
                        "cloudPercent": 0.0,
                        "geom": "POLYGON((115.129 40.0454,115.536 39.97,115.641 40.2988,115.232 40.3745,115.129 40.0454))",
                        "thumbUrl": "https://gfastdfs.cpeos.org.cn/group1/M00/B7/CB/ChBQC2RvEeWACsgxAABpPxRQYVs109.jpg",
                        "thumbUrlbeta": null,
                        "sourceBit": "010000000000",
                        "sources": [
                            "高分辨率对地观测系统网格平台"
                        ],
                        "changGuangData": null,
                        "gxyhServerPath": "/mnt/usdata/bzyxsj/GF1_Data/GF1_Data/GF1_PMS2_E115.4_N40.2_20230523_L1A0007296155-PAN2_ortho_fusion/GF1_PMS2_E115.4_N40.2_20230523_L1A0007296155-PAN2_ortho_fusion.tif.usrmp",
                        "id": 32348798
                    },
                    {
                        "name": "GF2_PMS1_E116.4_N39.9_20230522_L1A0007293703.tar.gz",
                        "fileUrl": "/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.tif",
                        "satelliteId": "GF2",
                        "sensorId": "PMS1",
                        "receiveTime": "2023-05-22 10:14:51",
                        "sceneId": "11300106",
                        "orbitId": "47405",
                        "thxpaceCode": "GF2_PMS1_7293703_LEVEL1A",
                        "imageGsd": "0.81/3.24",
                        "cloudPercent": 1.0,
                        "geom": "POLYGON((116.188268 39.827809,116.457831 39.781834,116.515148 39.979565,116.244805 40.025605,116.188268 39.827809))",
                        "thumbUrl": "https://gfastdfs.cpeos.org.cn/group1/M00/B7/A3/ChBQC2RtcVyAa_4EAACJwpgalIM202.jpg",
                        "thumbUrlbeta": null,
                        "sourceBit": "010000000000",
                        "sources": [
                            "高分辨率对地观测系统网格平台"
                        ],
                        "changGuangData": null,
                        "gxyhServerPath": "/mnt/usdata/bzyxsj/GF2_Data/GF2_PMS1_E116.4_N39.9_20230522_L1A0007293703-PAN1_ORTHO_PSH/GF2_PMS1_E116.4_N39.9_20230522_L1A0007293703-PAN1_ORTHO_PSH.tif.usrmp",
                        "id": 32345044
                    },
                    {
                        "name": "GF2_PMS1_E116.4_N40.1_20230522_L1A0007293608.tar.gz",
                        "fileUrl": "/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.tif",
                        "satelliteId": "GF2",
                        "sensorId": "PMS1",
                        "receiveTime": "2023-05-22 10:14:48",
                        "sceneId": "11299998",
                        "orbitId": "47405",
                        "thxpaceCode": "GF2_PMS1_7293608_LEVEL1A",
                        "imageGsd": "0.81/3.24",
                        "cloudPercent": 1.0,
                        "geom": "POLYGON((116.239026 40.005119,116.509258 39.959091,116.566752 40.15668,116.295735 40.202774,116.239026 40.005119))",
                        "thumbUrl": "https://gfastdfs.cpeos.org.cn/group1/M00/B7/A5/ChBQC2RtdvmALPaAAACUMclEmHk594.jpg",
                        "thumbUrlbeta": null,
                        "sourceBit": "010000000000",
                        "sources": [
                            "高分辨率对地观测系统网格平台"
                        ],
                        "changGuangData": null,
                        "gxyhServerPath": "/mnt/usdata/bzyxsj/GF2_Data/GF2_PMS1_E116.4_N40.1_20230522_L1A0007293608-PAN1_ORTHO_PSH/GF2_PMS1_E116.4_N40.1_20230522_L1A0007293608-PAN1_ORTHO_PSH.tif.usrmp",
                        "id": 32345045
                    },
                    {
                        "name": "GF6_PMS_E116.9_N39.3_20230426_L1A1420311841.tar.gz",
                        "fileUrl": "/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.tif",
                        "satelliteId": "GF6",
                        "sensorId": "PMS",
                        "receiveTime": "2023-04-26 11:24:04",
                        "sceneId": "938975",
                        "orbitId": "26402",
                        "thxpaceCode": "GF6_PMS_1420311841_LEVEL1A",
                        "imageGsd": "2/8",
                        "cloudPercent": 1.0,
                        "geom": "POLYGON((116.237935 38.980447,117.320635 38.784305,117.543459 39.507517,116.449548 39.704791,116.237935 38.980447))",
                        "thumbUrl": "https://gfastdfs.cpeos.org.cn/group1/M00/B3/D3/ChBQC2RKEhGAb8DkAABVElH9dLI243.jpg",
                        "thumbUrlbeta": null,
                        "sourceBit": "010000000000",
                        "sources": [
                            "高分辨率对地观测系统网格平台"
                        ],
                        "changGuangData": null,
                        "gxyhServerPath": "/mnt/usdata/bzyxsj/GF6_Data/GF6_Data/GF6_PMS_E116.9_N39.3_20230426_L1A1420311841-PAN_ortho_fusion/GF6_PMS_E116.9_N39.3_20230426_L1A1420311841-PAN_ortho_fusion.tif.usrmp",
                        "id": 32274610
                    },
                    {
                        "name": "GF6_PMS_E117.0_N39.7_20230426_L1A1420312360.tar.gz",
                        "fileUrl": "/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.tif",
                        "satelliteId": "GF6",
                        "sensorId": "PMS",
                        "receiveTime": "2023-04-26 11:23:58",
                        "sceneId": "939519",
                        "orbitId": "926401",
                        "thxpaceCode": "GF6_PMS_1420312360_LEVEL1A",
                        "imageGsd": "2/8",
                        "cloudPercent": 6.0,
                        "geom": "POLYGON((116.360244 39.400461,117.449391 39.203671,117.689495 39.975049,116.588134 40.173083,116.360244 39.400461))",
                        "thumbUrl": "https://gfastdfs.cpeos.org.cn/group1/M00/C5/50/ChBQDGRMsk-ASIYgAABMy_IbauM612.jpg",
                        "thumbUrlbeta": null,
                        "sourceBit": "010000000000",
                        "sources": [
                            "高分辨率对地观测系统网格平台"
                        ],
                        "changGuangData": null,
                        "gxyhServerPath": "/mnt/usdata/bzyxsj/GF6_Data/GF6_Data/GF6_PMS_E117.0_N39.7_20230426_L1A1420312360-PAN_ortho_fusion/GF6_PMS_E117.0_N39.7_20230426_L1A1420312360-PAN_ortho_fusion.tif.usrmp",
                        "id": 32280706
                    },
                    {
                        "name": "GF6_PMS_E117.2_N40.2_20230426_L1A1420312363.tar.gz",
                        "fileUrl": "/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.tif",
                        "satelliteId": "GF6",
                        "sensorId": "PMS",
                        "receiveTime": "2023-04-26 11:23:48",
                        "sceneId": "939518",
                        "orbitId": "926401",
                        "thxpaceCode": "GF6_PMS_1420312363_LEVEL1A",
                        "imageGsd": "2/8",
                        "cloudPercent": 5.0,
                        "geom": "POLYGON((116.520404 39.944878,117.618115 39.747215,117.868723 40.541637,116.758089 40.740622,116.520404 39.944878))",
                        "thumbUrl": "https://gfastdfs.cpeos.org.cn/group1/M00/C5/50/ChBQDGRMskWATomWAABPu-FOydA517.jpg",
                        "thumbUrlbeta": null,
                        "sourceBit": "010000000000",
                        "sources": [
                            "高分辨率对地观测系统网格平台"
                        ],
                        "changGuangData": null,
                        "gxyhServerPath": "/mnt/usdata/bzyxsj/GF6_Data/GF6_Data/GF6_PMS_E117.2_N40.2_20230426_L1A1420312363-PAN_ortho_fusion/GF6_PMS_E117.2_N40.2_20230426_L1A1420312363-PAN_ortho_fusion.tif.usrmp",
                        "id": 32280707
                    },
                    {
                        "name": "GF6_PMS_E117.4_N41.0_20230426_L1A1420312367.tar.gz",
                        "fileUrl": "/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.tif",
                        "satelliteId": "GF6",
                        "sensorId": "PMS",
                        "receiveTime": "2023-04-26 11:23:36",
                        "sceneId": "939517",
                        "orbitId": "926401",
                        "thxpaceCode": "GF6_PMS_1420312367_LEVEL1A",
                        "imageGsd": "2/8",
                        "cloudPercent": 0.0,
                        "geom": "POLYGON((116.741019 40.683881,117.850636 40.485006,118.10569 41.279024,116.982688 41.479279,116.741019 40.683881))",
                        "thumbUrl": "https://gfastdfs.cpeos.org.cn/group1/M00/C5/50/ChBQDGRMsG6AdF3tAABxanqVmtM598.jpg",
                        "thumbUrlbeta": null,
                        "sourceBit": "010000000000",
                        "sources": [
                            "高分辨率对地观测系统网格平台"
                        ],
                        "changGuangData": null,
                        "gxyhServerPath": "/mnt/usdata/bzyxsj/GF6_Data/GF6_Data/GF6_PMS_E117.4_N41.0_20230426_L1A1420312367-PAN_ortho_fusion/GF6_PMS_E117.4_N41.0_20230426_L1A1420312367-PAN_ortho_fusion.tif.usrmp",
                        "id": 32280708
                    },
                    {
                        "name": "GF6_WFV_E117.8_N42.5_20230426_L1A1420311771.tar.gz",
                        "fileUrl": "/group1/M00/C8/4A/ChBQDGR6TqiAPvGjAACe_IyxNks587.tif",
                        "satelliteId": "GF6",
                        "sensorId": "WFV",
                        "receiveTime": "2023-04-26 11:23:13",
                        "sceneId": "938920",
                        "orbitId": "26399",
                        "thxpaceCode": "GF6_WFV_1420311771_LEVEL1A",
                        "imageGsd": "16",
                        "cloudPercent": 15.0,
                        "geom": "POLYGON((112.309553 41.746579,122.376654 39.94553,123.358942 42.38358,112.895198 44.225697,112.309553 41.746579))",
                        "thumbUrl": "https://gfastdfs.cpeos.org.cn/group1/M00/B3/D2/ChBQC2RKEVSAYr3xAAAZ9F0yEqA268.jpg",
                        "thumbUrlbeta": null,
                        "sourceBit": "010000000000",
                        "sources": [
                            "高分辨率对地观测系统网格平台"
                        ],
                        "changGuangData": null,
                        "gxyhServerPath": "/mnt/usdata/bzyxsj/GF6_Data/GF6_Data/GF6_WFV_E117.8_N42.5_20230426_L1A1420311771-1_ortho/GF6_WFV_E117.8_N42.5_20230426_L1A1420311771-1_ortho.tif.usrmp",
                        "id": 32277480
                    }
                ],
                "totalPage": null,
                "userConditions": null
            },
            "success": true
        }
    }
    const response = await dataClient.post('/yjcImage/search/high/data/normal', params)
    return response.data;
};

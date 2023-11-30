import { k8sClient } from './index'


const region = "local"
const maxLimit = 100
const mock = false

export const listAllNodes = async () => {
    if (mock) {
        return {
            "code": 20000,
            "message": null,
            "exId": 0,
            "data": {
                "apiVersion": "v1",
                "kind": "NodeList",
                "metadata": {
                    "name": "get-nodes",
                    "totalCount": 1,
                    "currentPage": 1,
                    "totalPage": 1,
                    "itemsPerPage": 10,
                    "conditions": "{}"
                },
                "items": [
                    {
                        "kind": "Node",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "ecs-2503",
                            "uid": "d8d2c935-8cd5-4003-bb75-8962410879cf",
                            "resourceVersion": "6483101",
                            "creationTimestamp": "2023-06-01T04:25:47Z",
                            "labels": {
                                "beta.kubernetes.io/arch": "amd64",
                                "beta.kubernetes.io/os": "linux",
                                "kube-ovn/role": "master",
                                "kubernetes.io/arch": "amd64",
                                "kubernetes.io/hostname": "ecs-2503",
                                "kubernetes.io/os": "linux",
                                "node-role.kubernetes.io/control-plane": "",
                                "node.kubernetes.io/exclude-from-external-load-balancers": ""
                            },
                            "annotations": {
                                "kubeadm.alpha.kubernetes.io/cri-socket": "unix:///run/containerd/containerd.sock",
                                "node.alpha.kubernetes.io/ttl": "0",
                                "ovn.kubernetes.io/allocated": "true",
                                "ovn.kubernetes.io/chassis": "4ad38fef-5676-43bc-a557-a258d28e19b6",
                                "ovn.kubernetes.io/cidr": "100.64.0.0/16",
                                "ovn.kubernetes.io/gateway": "100.64.0.1",
                                "ovn.kubernetes.io/ip_address": "100.64.0.2",
                                "ovn.kubernetes.io/logical_switch": "join",
                                "ovn.kubernetes.io/mac_address": "00:00:00:61:57:01",
                                "ovn.kubernetes.io/port_name": "node-ecs-2503",
                                "volumes.kubernetes.io/controller-managed-attach-detach": "true"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubelet",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:25:47Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:volumes.kubernetes.io/controller-managed-attach-detach": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:beta.kubernetes.io/arch": {},
                                                "f:beta.kubernetes.io/os": {},
                                                "f:kubernetes.io/arch": {},
                                                "f:kubernetes.io/hostname": {},
                                                "f:kubernetes.io/os": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kubeadm",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:25:50Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:kubeadm.alpha.kubernetes.io/cri-socket": {}
                                            },
                                            "f:labels": {
                                                "f:node-role.kubernetes.io/control-plane": {},
                                                "f:node.kubernetes.io/exclude-from-external-load-balancers": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-controller-manager",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:05Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:node.alpha.kubernetes.io/ttl": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:podCIDR": {},
                                            "f:podCIDRs": {
                                                ".": {},
                                                "v:\"10.244.0.0/24\"": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kubectl-label",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:06Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:labels": {
                                                "f:kube-ovn/role": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-daemon",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:12Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/chassis": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:15Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/allocated": {},
                                                "f:ovn.kubernetes.io/cidr": {},
                                                "f:ovn.kubernetes.io/gateway": {},
                                                "f:ovn.kubernetes.io/ip_address": {},
                                                "f:ovn.kubernetes.io/logical_switch": {},
                                                "f:ovn.kubernetes.io/mac_address": {},
                                                "f:ovn.kubernetes.io/port_name": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kubelet",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-22T05:06:34Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:status": {
                                            "f:conditions": {
                                                "k:{\"type\":\"DiskPressure\"}": {
                                                    "f:lastHeartbeatTime": {}
                                                },
                                                "k:{\"type\":\"MemoryPressure\"}": {
                                                    "f:lastHeartbeatTime": {}
                                                },
                                                "k:{\"type\":\"PIDPressure\"}": {
                                                    "f:lastHeartbeatTime": {}
                                                },
                                                "k:{\"type\":\"Ready\"}": {
                                                    "f:lastHeartbeatTime": {},
                                                    "f:lastTransitionTime": {},
                                                    "f:message": {},
                                                    "f:reason": {},
                                                    "f:status": {}
                                                }
                                            },
                                            "f:images": {},
                                            "f:nodeInfo": {
                                                "f:bootID": {}
                                            }
                                        }
                                    },
                                    "subresource": "status"
                                }
                            ]
                        },
                        "spec": {
                            "podCIDR": "10.244.0.0/24",
                            "podCIDRs": [
                                "10.244.0.0/24"
                            ]
                        },
                        "status": {
                            "capacity": {
                                "cpu": "16",
                                "ephemeral-storage": "103079844Ki",
                                "hugepages-1Gi": "0",
                                "hugepages-2Mi": "0",
                                "memory": "65806172Ki",
                                "pods": "110"
                            },
                            "allocatable": {
                                "cpu": "16",
                                "ephemeral-storage": "94998384074",
                                "hugepages-1Gi": "0",
                                "hugepages-2Mi": "0",
                                "memory": "65703772Ki",
                                "pods": "110"
                            },
                            "conditions": [
                                {
                                    "type": "MemoryPressure",
                                    "status": "False",
                                    "lastHeartbeatTime": "2023-07-22T05:06:34Z",
                                    "lastTransitionTime": "2023-06-01T04:25:45Z",
                                    "reason": "KubeletHasSufficientMemory",
                                    "message": "kubelet has sufficient memory available"
                                },
                                {
                                    "type": "DiskPressure",
                                    "status": "False",
                                    "lastHeartbeatTime": "2023-07-22T05:06:34Z",
                                    "lastTransitionTime": "2023-06-01T04:25:45Z",
                                    "reason": "KubeletHasNoDiskPressure",
                                    "message": "kubelet has no disk pressure"
                                },
                                {
                                    "type": "PIDPressure",
                                    "status": "False",
                                    "lastHeartbeatTime": "2023-07-22T05:06:34Z",
                                    "lastTransitionTime": "2023-06-01T04:25:45Z",
                                    "reason": "KubeletHasSufficientPID",
                                    "message": "kubelet has sufficient PID available"
                                },
                                {
                                    "type": "Ready",
                                    "status": "True",
                                    "lastHeartbeatTime": "2023-07-22T05:06:34Z",
                                    "lastTransitionTime": "2023-06-01T04:25:48Z",
                                    "reason": "KubeletReady",
                                    "message": "kubelet is posting ready status"
                                }
                            ],
                            "addresses": [
                                {
                                    "type": "InternalIP",
                                    "address": "192.168.0.189"
                                },
                                {
                                    "type": "Hostname",
                                    "address": "ecs-2503"
                                }
                            ],
                            "daemonEndpoints": {
                                "kubeletEndpoint": {
                                    "Port": 10250
                                }
                            },
                            "nodeInfo": {
                                "machineID": "c1c59108d90d4a4bbe62642972537ffc",
                                "systemUUID": "6D8A5F86-C748-4442-AEBE-B487A7192616",
                                "bootID": "84761cb3-4386-40de-bc2e-0c73d224ca79",
                                "kernelVersion": "3.10.0-1062.1.1.el7.x86_64",
                                "osImage": "CentOS Linux 7 (Core)",
                                "containerRuntimeVersion": "containerd://1.6.21",
                                "kubeletVersion": "v1.26.4",
                                "kubeProxyVersion": "v1.26.4",
                                "operatingSystem": "linux",
                                "architecture": "amd64"
                            },
                            "images": [
                                {
                                    "names": [
                                        "harbor.iecas.cn/test/libreoffice-api@sha256:8991790e205a9c9c2686f1a025508f090cb600b6f241075dd344f31dc2c0c625",
                                        "harbor.iecas.cn/test/libreoffice-api:11-20230220-142949"
                                    ],
                                    "sizeBytes": 970772854
                                },
                                {
                                    "names": [
                                        "harbor.iecas.cn/test/question-to-picture@sha256:5e2d06721b2629f010ada4343c2d1c71b5727cbfa769062a8f054d8258215184",
                                        "harbor.iecas.cn/test/question-to-picture:4-20230302-152415"
                                    ],
                                    "sizeBytes": 755261452
                                },
                                {
                                    "names": [
                                        "docker.io/jupyter/minimal-notebook@sha256:7a4c9c06ef3f70692fe945cded77ec7f827012d4cff714f45c9b3468d01b849f",
                                        "docker.io/jupyter/minimal-notebook:lab-4.0.2"
                                    ],
                                    "sizeBytes": 482757483
                                },
                                {
                                    "names": [
                                        "docker.io/bitnami/keycloak@sha256:2e2f300ac90338912cde13684da15da58c8d51ec011860a361bc267b53aead67",
                                        "docker.io/bitnami/keycloak:21.1.1"
                                    ],
                                    "sizeBytes": 438153815
                                },
                                {
                                    "names": [
                                        "harbor.iecas.cn/satools/neo4j@sha256:a9229cc31018c53d3fe7bb6d61723c2df50d7a81176722405adb54ea62781c65",
                                        "harbor.iecas.cn/satools/neo4j:5.5.0-community"
                                    ],
                                    "sizeBytes": 339065185
                                },
                                {
                                    "names": [
                                        "docker.io/ktxcx/nexus3@sha256:35a7431375765273e993d2e4c47b5f6b85c7ef1d602abbdc88c368c29fb93615",
                                        "docker.io/ktxcx/nexus3:3.37.3"
                                    ],
                                    "sizeBytes": 326687048
                                },
                                {
                                    "names": [
                                        "docker.io/sonatype/nexus3@sha256:88044c8cdbbf1fea42b65b6c785bb88e4e2b2e96b3becd2bfce22f481216a951",
                                        "docker.io/sonatype/nexus3:3.56.0"
                                    ],
                                    "sizeBytes": 325153485
                                },
                                {
                                    "names": [
                                        "registry.cn-beijing.aliyuncs.com/dosproj/backend@sha256:0ba74cbaf9b284e9c1f8936973da4352fa6fe722abf75e54ade0a29e848e010c",
                                        "registry.cn-beijing.aliyuncs.com/dosproj/backend:v1.2.1"
                                    ],
                                    "sizeBytes": 285389850
                                },
                                {
                                    "names": [
                                        "registry.cn-beijing.aliyuncs.com/dosproj/backend@sha256:954c497538c05aae975e4da913a9a7f73ce193ebbe6f95b10900eea49e0f85d2",
                                        "registry.cn-beijing.aliyuncs.com/dosproj/backend:v1.2.0"
                                    ],
                                    "sizeBytes": 285387400
                                },
                                {
                                    "names": [
                                        "registry.cn-beijing.aliyuncs.com/dosproj/mirror@sha256:0f79192ddd2f01e880c0606458f80be02296ba968e6d445f890818715c64a393",
                                        "registry.cn-beijing.aliyuncs.com/dosproj/mirror:v0.1.1"
                                    ],
                                    "sizeBytes": 256251359
                                },
                                {
                                    "names": [
                                        "quay.io/keycloak/keycloak@sha256:8ebb3930c41e8a066c4246eaf351ac09cdc984e11b1f607d6ff4ce10d69dc808",
                                        "quay.io/keycloak/keycloak:21.1"
                                    ],
                                    "sizeBytes": 255469174
                                },
                                {
                                    "names": [
                                        "swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v3"
                                    ],
                                    "sizeBytes": 200828694
                                },
                                {
                                    "names": [
                                        "harbor.iecas.cn/test/education-api@sha256:37fcdb95156e95c4ad7cf4be14db5b76ca6515813358d636073db79d24922a5d",
                                        "harbor.iecas.cn/test/education-api:797-20230601-145314"
                                    ],
                                    "sizeBytes": 193771072
                                },
                                {
                                    "names": [
                                        "harbor.iecas.cn/test/authing-api@sha256:9dd0a8d82a5d0b13cc21997ddd7d273ce8f1f06945c8d2e7416caaa9a2a36101",
                                        "harbor.iecas.cn/test/authing-api:175-20230516-171639"
                                    ],
                                    "sizeBytes": 150947868
                                },
                                {
                                    "names": [
                                        "docker.io/kubeovn/kube-ovn@sha256:8b4b26d6d53c70b7b8d8703d8a30eceb410a0571deeaf3a5c6201094867f0b8a",
                                        "docker.io/kubeovn/kube-ovn:v1.11.5"
                                    ],
                                    "sizeBytes": 140450819
                                },
                                {
                                    "names": [
                                        "harbor.iecas.cn/pub/postgres@sha256:8f10c40e5e687b2cbf2f28acb5192049cdb89ef1a8db44d2f21e6bdd1a36e4be",
                                        "harbor.iecas.cn/pub/postgres:12.6"
                                    ],
                                    "sizeBytes": 114475586
                                },
                                {
                                    "names": [
                                        "docker.io/bitnami/rabbitmq@sha256:2e0ac5e3f348c949d6cd604068ce361ad5b3db11bb1fa3b82e8763e83fdbe168",
                                        "docker.io/bitnami/rabbitmq:3.10.24"
                                    ],
                                    "sizeBytes": 103744673
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/etcd@sha256:dd75ec974b0a2a6f6bb47001ba09207976e625db898d1b16735528c009cb171c",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.5.6-0"
                                    ],
                                    "sizeBytes": 102542580
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/etcd@sha256:51eae8381dcb1078289fa7b4f3df2630cdc18d09fb56f8e56b41c40e191d6c83",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.5.7-0"
                                    ],
                                    "sizeBytes": 101639218
                                },
                                {
                                    "names": [
                                        "harbor.iecas.cn/pub/minio/minio@sha256:751b93282faeaf814de8083519637fc358b60d81985964282a6715e11fc7a581",
                                        "harbor.iecas.cn/pub/minio/minio:RELEASE.2023-04-20T17-56-55Z"
                                    ],
                                    "sizeBytes": 101163512
                                },
                                {
                                    "names": [
                                        "docker.io/library/adminer@sha256:ea38d6384f8f6f0dc29705d6497ca7d77af3e664288d655e574f433d592030df",
                                        "docker.io/library/adminer:4.8.1-standalone"
                                    ],
                                    "sizeBytes": 95935529
                                },
                                {
                                    "names": [
                                        "docker.io/library/postgres@sha256:ac09c433f64f2d310a83e5cc24dadc13561f645199d4ec8e503824de22e14668",
                                        "docker.io/library/postgres:14.5-alpine"
                                    ],
                                    "sizeBytes": 84700894
                                },
                                {
                                    "names": [
                                        "harbor.iecas.cn/test/education-web@sha256:ee6672f64fbcd7fd474465b66eeafffcc6fe6794d099b308d684d7a4b9346023",
                                        "harbor.iecas.cn/test/education-web:551-20230424-180552"
                                    ],
                                    "sizeBytes": 61741854
                                },
                                {
                                    "names": [
                                        "docker.io/library/nginx:1.7.9"
                                    ],
                                    "sizeBytes": 39947836
                                },
                                {
                                    "names": [
                                        "harbor.iecas.cn/pub/redis@sha256:c6b7e6bd9e234221509e0ebc90ad89ff491e61a604a4eb2649570e9703fafc65",
                                        "harbor.iecas.cn/pub/redis:5.0.6"
                                    ],
                                    "sizeBytes": 35817240
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver@sha256:7e88c7043a88a2ebdb40d4ad11557115f1de2c53305f0f56f0b4c5b0dc06923d",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.26.4"
                                    ],
                                    "sizeBytes": 35520364
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver@sha256:a6daed8429c54f0008910fc4ecc17aefa1dfcd7cc2ff0089570854d4f95213ed",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.27.1"
                                    ],
                                    "sizeBytes": 33381303
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager@sha256:e85ef304b84013413e452a1bd6ca4dac7ac83162134cb7b78d18ffcf2363f185",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.26.4"
                                    ],
                                    "sizeBytes": 32366755
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager@sha256:ed43c8f8a78f7bcda715b8427da17a62b22befe236acdc90b24db411e106f481",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.27.1"
                                    ],
                                    "sizeBytes": 30974014
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy@sha256:958ddb03a4d4d7a567d3563c759a05f3e95aa42ca8af2964aa76867aafc43610",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.27.1"
                                    ],
                                    "sizeBytes": 23906399
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy@sha256:2f16397743223843e43035b7043333b221f39bb1435bbd33017822e54779d470",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.26.4"
                                    ],
                                    "sizeBytes": 21544886
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler@sha256:0b942e32d0d30ca47e2e133e421c7d3bb9cdb01ee972e56d3098e6aced3cdd8a",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.27.1"
                                    ],
                                    "sizeBytes": 18234520
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler@sha256:fede1e90a07876257f9af9eb2b364f36a780fb9c05946485f5c534e8295a6506",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.26.4"
                                    ],
                                    "sizeBytes": 17674232
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/coredns@sha256:a0ead06651cf580044aeb0a0feba63591858fb2e43ade8c9dea45a6a89ae7e5e",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:v1.10.1"
                                    ],
                                    "sizeBytes": 16190758
                                },
                                {
                                    "names": [
                                        "docker.io/rancher/local-path-provisioner@sha256:5bb33992a4ec3034c28b5e0b3c4c2ac35d3613b25b79455eb4b1a95adc82cdc0",
                                        "docker.io/rancher/local-path-provisioner:v0.0.24"
                                    ],
                                    "sizeBytes": 14887612
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/coredns@sha256:8e352a029d304ca7431c6507b56800636c321cb52289686a581ab70aaa8a2e2a",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:v1.9.3"
                                    ],
                                    "sizeBytes": 14837849
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/goodrain/helm-env-checker@sha256:a38e100f8c5fbed66f0243ed04688be4ebe874773e87b3dcbcf18003e0ea4df7",
                                        "registry.cn-hangzhou.aliyuncs.com/goodrain/helm-env-checker:latest"
                                    ],
                                    "sizeBytes": 3638258
                                },
                                {
                                    "names": [
                                        "docker.io/library/busybox@sha256:560af6915bfc8d7630e50e212e08242d37b63bd5c1ccf9bd4acccf116e262d5b"
                                    ],
                                    "sizeBytes": 2595855
                                },
                                {
                                    "names": [
                                        "docker.io/library/busybox@sha256:2376a0c12759aa1214ba83e771ff252c7b1663216b192fbe5e0fb364e952f85c"
                                    ],
                                    "sizeBytes": 2224294
                                },
                                {
                                    "names": [
                                        "docker.io/library/busybox@sha256:3fbc632167424a6d997e74f52b878d7cc478225cffac6bc977eedfe51c7f4e79",
                                        "docker.io/library/busybox@sha256:653b23f3092ab4861f1a32e699b648d43291378fe6d9d64ca0bf735312587237",
                                        "docker.io/library/busybox:latest"
                                    ],
                                    "sizeBytes": 2224229
                                },
                                {
                                    "names": [
                                        "harbor.iecas.cn/pub/busybox@sha256:62ffc2ed7554e4c6d360bce40bbcf196573dd27c4ce080641a2c59867e732dee",
                                        "harbor.iecas.cn/pub/busybox:latest"
                                    ],
                                    "sizeBytes": 774771
                                },
                                {
                                    "names": [
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/pause@sha256:7031c1b283388d2c2e09b57badb803c05ebed362dc88d84b480cc47f72a21097",
                                        "registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.9"
                                    ],
                                    "sizeBytes": 321520
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
    let labels = {}
    return listResources("Node", 1, maxLimit, null, labels)
}

export const listAllPods = async (namespace: string, labels: object) => {
    if (mock) {
        return {
            "code": 20000,
            "message": null,
            "exId": 0,
            "data": {
                "apiVersion": "v1",
                "kind": "PodList",
                "metadata": {
                    "name": "get-pods",
                    "totalCount": 1,
                    "currentPage": 1,
                    "totalPage": 1,
                    "itemsPerPage": 10,
                    "conditions": "{\"metadata##namespace\":\"jupyterlab-management\",\"metadata##labels##app\":\"jupyterlab-instance\"}"
                },
                "items": [
                    {
                        "kind": "Pod",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "jupyterlab-instance-1",
                            "namespace": "jupyterlab-management",
                            "uid": "2f5478db-3a3c-466e-aac4-5abbe0418d86",
                            "resourceVersion": "6487515",
                            "creationTimestamp": "2023-07-22T05:56:32Z",
                            "labels": {
                                "app": "jupyterlab-instance",
                                "name": "jupyterlab-instance-1",
                                "user": "someuser"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Pod\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"jupyterlab-instance\",\"name\":\"jupyterlab-instance-1\",\"user\":\"someuser\"},\"name\":\"jupyterlab-instance-1\",\"namespace\":\"jupyterlab-management\"},\"spec\":{\"containers\":[{\"command\":[\"/bin/bash\",\"-c\",\"jupyter lab --generate-config \&\& \\\\\\ncat \> ~/.jupyter/jupyter_lab_config.py \<\< EOF\\nc.ServerApp.tornado_settings = {\\n'headers': {\\n'Content-Security-Policy': \\\"frame-ancestors 'self' *;\\\",\\n}\\n}\\nc.ServerApp.token = ''\\nc.ServerApp.password = ''\\nc.ServerApp.disable_check_xsrf = True\\nEOF\\nstart.sh jupyter lab --ip='0.0.0.0' --ServerApp.allow_root=True --port 8888 --no-browser\"],\"image\":\"jupyter/minimal-notebook:lab-4.0.2\",\"imagePullPolicy\":\"IfNotPresent\",\"name\":\"jupyterlab-instance-1\",\"ports\":[{\"containerPort\":8888}],\"resources\":{\"requests\":{\"cpu\":\"250m\",\"memory\":\"500Mi\"}}}],\"restartPolicy\":\"Always\",\"securityContext\":{\"fsGroup\":0,\"runAsUser\":0}}}\n",
                                "ovn.kubernetes.io/allocated": "true",
                                "ovn.kubernetes.io/cidr": "10.16.0.0/16",
                                "ovn.kubernetes.io/gateway": "10.16.0.1",
                                "ovn.kubernetes.io/ip_address": "10.16.0.29",
                                "ovn.kubernetes.io/logical_router": "ovn-cluster",
                                "ovn.kubernetes.io/logical_switch": "ovn-default",
                                "ovn.kubernetes.io/mac_address": "00:00:00:2F:F8:CA",
                                "ovn.kubernetes.io/pod_nic_type": "veth-pair",
                                "ovn.kubernetes.io/routed": "true"
                            },
                            "managedFields": [
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-22T05:56:32Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/allocated": {},
                                                "f:ovn.kubernetes.io/cidr": {},
                                                "f:ovn.kubernetes.io/gateway": {},
                                                "f:ovn.kubernetes.io/ip_address": {},
                                                "f:ovn.kubernetes.io/logical_router": {},
                                                "f:ovn.kubernetes.io/logical_switch": {},
                                                "f:ovn.kubernetes.io/mac_address": {},
                                                "f:ovn.kubernetes.io/pod_nic_type": {},
                                                "f:ovn.kubernetes.io/routed": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-22T05:56:32Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:app": {},
                                                "f:name": {},
                                                "f:user": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:containers": {
                                                "k:{\"name\":\"jupyterlab-instance-1\"}": {
                                                    ".": {},
                                                    "f:command": {},
                                                    "f:image": {},
                                                    "f:imagePullPolicy": {},
                                                    "f:name": {},
                                                    "f:ports": {
                                                        ".": {},
                                                        "k:{\"containerPort\":8888,\"protocol\":\"TCP\"}": {
                                                            ".": {},
                                                            "f:containerPort": {},
                                                            "f:protocol": {}
                                                        }
                                                    },
                                                    "f:resources": {
                                                        ".": {},
                                                        "f:requests": {
                                                            ".": {},
                                                            "f:cpu": {},
                                                            "f:memory": {}
                                                        }
                                                    },
                                                    "f:terminationMessagePath": {},
                                                    "f:terminationMessagePolicy": {}
                                                }
                                            },
                                            "f:dnsPolicy": {},
                                            "f:enableServiceLinks": {},
                                            "f:restartPolicy": {},
                                            "f:schedulerName": {},
                                            "f:securityContext": {
                                                ".": {},
                                                "f:fsGroup": {},
                                                "f:runAsUser": {}
                                            },
                                            "f:terminationGracePeriodSeconds": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kubelet",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-22T05:56:33Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:status": {
                                            "f:conditions": {
                                                "k:{\"type\":\"ContainersReady\"}": {
                                                    ".": {},
                                                    "f:lastProbeTime": {},
                                                    "f:lastTransitionTime": {},
                                                    "f:status": {},
                                                    "f:type": {}
                                                },
                                                "k:{\"type\":\"Initialized\"}": {
                                                    ".": {},
                                                    "f:lastProbeTime": {},
                                                    "f:lastTransitionTime": {},
                                                    "f:status": {},
                                                    "f:type": {}
                                                },
                                                "k:{\"type\":\"Ready\"}": {
                                                    ".": {},
                                                    "f:lastProbeTime": {},
                                                    "f:lastTransitionTime": {},
                                                    "f:status": {},
                                                    "f:type": {}
                                                }
                                            },
                                            "f:containerStatuses": {},
                                            "f:hostIP": {},
                                            "f:phase": {},
                                            "f:podIP": {},
                                            "f:podIPs": {
                                                ".": {},
                                                "k:{\"ip\":\"10.16.0.29\"}": {
                                                    ".": {},
                                                    "f:ip": {}
                                                }
                                            },
                                            "f:startTime": {}
                                        }
                                    },
                                    "subresource": "status"
                                }
                            ]
                        },
                        "spec": {
                            "volumes": [
                                {
                                    "name": "kube-api-access-l5zb7",
                                    "projected": {
                                        "sources": [
                                            {
                                                "serviceAccountToken": {
                                                    "expirationSeconds": 3607,
                                                    "path": "token"
                                                }
                                            },
                                            {
                                                "configMap": {
                                                    "name": "kube-root-ca.crt",
                                                    "items": [
                                                        {
                                                            "key": "ca.crt",
                                                            "path": "ca.crt"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "downwardAPI": {
                                                    "items": [
                                                        {
                                                            "path": "namespace",
                                                            "fieldRef": {
                                                                "apiVersion": "v1",
                                                                "fieldPath": "metadata.namespace"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ],
                                        "defaultMode": 420
                                    }
                                }
                            ],
                            "containers": [
                                {
                                    "name": "jupyterlab-instance-1",
                                    "image": "jupyter/minimal-notebook:lab-4.0.2",
                                    "command": [
                                        "/bin/bash",
                                        "-c",
                                        "jupyter lab --generate-config && \\\ncat > ~/.jupyter/jupyter_lab_config.py << EOF\nc.ServerApp.tornado_settings = {\n'headers': {\n'Content-Security-Policy': \"frame-ancestors 'self' *;\",\n}\n}\nc.ServerApp.token = ''\nc.ServerApp.password = ''\nc.ServerApp.disable_check_xsrf = True\nEOF\nstart.sh jupyter lab --ip='0.0.0.0' --ServerApp.allow_root=True --port 8888 --no-browser"
                                    ],
                                    "ports": [
                                        {
                                            "containerPort": 8888,
                                            "protocol": "TCP"
                                        }
                                    ],
                                    "resources": {
                                        "requests": {
                                            "cpu": "250m",
                                            "memory": "500Mi"
                                        }
                                    },
                                    "volumeMounts": [
                                        {
                                            "name": "kube-api-access-l5zb7",
                                            "readOnly": true,
                                            "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
                                        }
                                    ],
                                    "terminationMessagePath": "/dev/termination-log",
                                    "terminationMessagePolicy": "File",
                                    "imagePullPolicy": "IfNotPresent"
                                }
                            ],
                            "restartPolicy": "Always",
                            "terminationGracePeriodSeconds": 30,
                            "dnsPolicy": "ClusterFirst",
                            "serviceAccountName": "default",
                            "serviceAccount": "default",
                            "nodeName": "ecs-2503",
                            "securityContext": {
                                "runAsUser": 0,
                                "fsGroup": 0
                            },
                            "schedulerName": "default-scheduler",
                            "tolerations": [
                                {
                                    "key": "node.kubernetes.io/not-ready",
                                    "operator": "Exists",
                                    "effect": "NoExecute",
                                    "tolerationSeconds": 300
                                },
                                {
                                    "key": "node.kubernetes.io/unreachable",
                                    "operator": "Exists",
                                    "effect": "NoExecute",
                                    "tolerationSeconds": 300
                                }
                            ],
                            "priority": 0,
                            "enableServiceLinks": true,
                            "preemptionPolicy": "PreemptLowerPriority"
                        },
                        "status": {
                            "phase": "Running",
                            "conditions": [
                                {
                                    "type": "Initialized",
                                    "status": "True",
                                    "lastProbeTime": null,
                                    "lastTransitionTime": "2023-07-22T05:56:32Z"
                                },
                                {
                                    "type": "Ready",
                                    "status": "True",
                                    "lastProbeTime": null,
                                    "lastTransitionTime": "2023-07-22T05:56:33Z"
                                },
                                {
                                    "type": "ContainersReady",
                                    "status": "True",
                                    "lastProbeTime": null,
                                    "lastTransitionTime": "2023-07-22T05:56:33Z"
                                },
                                {
                                    "type": "PodScheduled",
                                    "status": "True",
                                    "lastProbeTime": null,
                                    "lastTransitionTime": "2023-07-22T05:56:32Z"
                                }
                            ],
                            "hostIP": "192.168.0.189",
                            "podIP": "10.16.0.29",
                            "podIPs": [
                                {
                                    "ip": "10.16.0.29"
                                }
                            ],
                            "startTime": "2023-07-22T05:56:32Z",
                            "containerStatuses": [
                                {
                                    "name": "jupyterlab-instance-1",
                                    "state": {
                                        "running": {
                                            "startedAt": "2023-07-22T05:56:33Z"
                                        }
                                    },
                                    "lastState": {},
                                    "ready": true,
                                    "restartCount": 0,
                                    "image": "docker.io/jupyter/minimal-notebook:lab-4.0.2",
                                    "imageID": "docker.io/jupyter/minimal-notebook@sha256:7a4c9c06ef3f70692fe945cded77ec7f827012d4cff714f45c9b3468d01b849f",
                                    "containerID": "containerd://432de120b237c90dd2591fd4b8e4034c8bb4ce718006cd412e08294dd8c2edad",
                                    "started": true
                                }
                            ],
                            "qosClass": "Burstable"
                        }
                    }
                ]
            }
        }
    }
    let page = 1
    return listResources("Pod", page, maxLimit, namespace, labels)
}

export const listAllServices = async (namespace: string, labels: object) => {
    if (mock) {
        return {
            "code": 20000,
            "message": null,
            "exId": 0,
            "data": {
                "apiVersion": "v1",
                "kind": "ServiceList",
                "metadata": {
                    "name": "get-services",
                    "totalCount": 16,
                    "currentPage": 1,
                    "totalPage": 1,
                    "itemsPerPage": 100,
                    "conditions": "{}"
                },
                "items": [
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "ovn-nb",
                            "namespace": "kube-system",
                            "uid": "f8ffbdb4-2c76-44b2-be51-837e0132d2f7",
                            "resourceVersion": "619",
                            "creationTimestamp": "2023-06-01T04:26:07Z",
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"name\":\"ovn-nb\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"ovn-nb\",\"port\":6641,\"protocol\":\"TCP\",\"targetPort\":6641}],\"selector\":{\"app\":\"ovn-central\",\"ovn-nb-leader\":\"true\"},\"sessionAffinity\":\"None\",\"type\":\"ClusterIP\"}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:07Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":6641,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:18Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "ovn-nb",
                                    "protocol": "TCP",
                                    "port": 6641,
                                    "targetPort": 6641
                                }
                            ],
                            "selector": {
                                "app": "ovn-central",
                                "ovn-nb-leader": "true"
                            },
                            "clusterIP": "10.98.9.220",
                            "clusterIPs": [
                                "10.98.9.220"
                            ],
                            "type": "ClusterIP",
                            "sessionAffinity": "None",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "nexus3",
                            "namespace": "kube-devops",
                            "uid": "758d578f-2e36-470f-bd44-f6804773d786",
                            "resourceVersion": "1889778",
                            "creationTimestamp": "2023-06-16T01:25:41Z",
                            "labels": {
                                "name": "nexus3"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"name\":\"nexus3\"},\"name\":\"nexus3\",\"namespace\":\"kube-devops\"},\"spec\":{\"ports\":[{\"name\":\"nexus3\",\"nodePort\":31016,\"port\":8081,\"protocol\":\"TCP\",\"targetPort\":8081}],\"selector\":{\"name\":\"nexus3\"},\"type\":\"NodePort\"}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-16T01:25:41Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-16T01:25:41Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:name": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:externalTrafficPolicy": {},
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":8081,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:nodePort": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "nexus3",
                                    "protocol": "TCP",
                                    "port": 8081,
                                    "targetPort": 8081,
                                    "nodePort": 31016
                                }
                            ],
                            "selector": {
                                "name": "nexus3"
                            },
                            "clusterIP": "10.101.192.75",
                            "clusterIPs": [
                                "10.101.192.75"
                            ],
                            "type": "NodePort",
                            "sessionAffinity": "None",
                            "externalTrafficPolicy": "Cluster",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "kube-ovn-pinger",
                            "namespace": "kube-system",
                            "uid": "03cebfb1-3bd4-4103-86c9-47118ee3becf",
                            "resourceVersion": "622",
                            "creationTimestamp": "2023-06-01T04:26:11Z",
                            "labels": {
                                "app": "kube-ovn-pinger"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"kube-ovn-pinger\"},\"name\":\"kube-ovn-pinger\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"metrics\",\"port\":8080}],\"selector\":{\"app\":\"kube-ovn-pinger\"}}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:11Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:app": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":8080,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:18Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "metrics",
                                    "protocol": "TCP",
                                    "port": 8080,
                                    "targetPort": 8080
                                }
                            ],
                            "selector": {
                                "app": "kube-ovn-pinger"
                            },
                            "clusterIP": "10.100.226.179",
                            "clusterIPs": [
                                "10.100.226.179"
                            ],
                            "type": "ClusterIP",
                            "sessionAffinity": "None",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "kube-ovn-monitor",
                            "namespace": "kube-system",
                            "uid": "a229d598-ba22-4eb3-a19a-e54af5d86e12",
                            "resourceVersion": "615",
                            "creationTimestamp": "2023-06-01T04:26:11Z",
                            "labels": {
                                "app": "kube-ovn-monitor"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"kube-ovn-monitor\"},\"name\":\"kube-ovn-monitor\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"metrics\",\"port\":10661}],\"selector\":{\"app\":\"kube-ovn-monitor\"},\"sessionAffinity\":\"None\",\"type\":\"ClusterIP\"}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:11Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:app": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":10661,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:18Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "metrics",
                                    "protocol": "TCP",
                                    "port": 10661,
                                    "targetPort": 10661
                                }
                            ],
                            "selector": {
                                "app": "kube-ovn-monitor"
                            },
                            "clusterIP": "10.102.245.186",
                            "clusterIPs": [
                                "10.102.245.186"
                            ],
                            "type": "ClusterIP",
                            "sessionAffinity": "None",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "ovn-northd",
                            "namespace": "kube-system",
                            "uid": "a9128933-8bfb-4e18-8574-4f3073ad9e8e",
                            "resourceVersion": "612",
                            "creationTimestamp": "2023-06-01T04:26:07Z",
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"name\":\"ovn-northd\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"ovn-northd\",\"port\":6643,\"protocol\":\"TCP\",\"targetPort\":6643}],\"selector\":{\"app\":\"ovn-central\",\"ovn-northd-leader\":\"true\"},\"sessionAffinity\":\"None\",\"type\":\"ClusterIP\"}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:07Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":6643,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:18Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "ovn-northd",
                                    "protocol": "TCP",
                                    "port": 6643,
                                    "targetPort": 6643
                                }
                            ],
                            "selector": {
                                "app": "ovn-central",
                                "ovn-northd-leader": "true"
                            },
                            "clusterIP": "10.103.236.104",
                            "clusterIPs": [
                                "10.103.236.104"
                            ],
                            "type": "ClusterIP",
                            "sessionAffinity": "None",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "kube-message",
                            "namespace": "kube-system",
                            "uid": "e7dceb68-1e86-4b65-8feb-6fae18ebcc6d",
                            "resourceVersion": "5834419",
                            "creationTimestamp": "2023-07-17T02:29:17Z",
                            "labels": {
                                "name": "kube-message"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"name\":\"kube-message\"},\"name\":\"kube-message\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"rabbitmq-management-port\",\"nodePort\":30305,\"port\":15672,\"protocol\":\"TCP\",\"targetPort\":15672},{\"name\":\"rabbitmq-port\",\"nodePort\":30304,\"port\":5672,\"protocol\":\"TCP\",\"targetPort\":5672}],\"selector\":{\"name\":\"kube-message\"},\"type\":\"NodePort\"}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-17T02:29:17Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-17T02:29:17Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:name": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:externalTrafficPolicy": {},
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":5672,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:nodePort": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                },
                                                "k:{\"port\":15672,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:nodePort": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "rabbitmq-management-port",
                                    "protocol": "TCP",
                                    "port": 15672,
                                    "targetPort": 15672,
                                    "nodePort": 30305
                                },
                                {
                                    "name": "rabbitmq-port",
                                    "protocol": "TCP",
                                    "port": 5672,
                                    "targetPort": 5672,
                                    "nodePort": 30304
                                }
                            ],
                            "selector": {
                                "name": "kube-message"
                            },
                            "clusterIP": "10.97.125.50",
                            "clusterIPs": [
                                "10.97.125.50"
                            ],
                            "type": "NodePort",
                            "sessionAffinity": "None",
                            "externalTrafficPolicy": "Cluster",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "kube-authing",
                            "namespace": "kube-system",
                            "uid": "31af0d1c-9362-42e0-9460-4f0c9f079938",
                            "resourceVersion": "2947390",
                            "creationTimestamp": "2023-06-24T08:02:59Z",
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"name\":\"kube-authing\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"http\",\"nodePort\":30302,\"port\":8080,\"targetPort\":8080}],\"selector\":{\"app\":\"keycloak\"},\"type\":\"NodePort\"}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-24T08:02:59Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-24T08:02:59Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:externalTrafficPolicy": {},
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":8080,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:nodePort": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "http",
                                    "protocol": "TCP",
                                    "port": 8080,
                                    "targetPort": 8080,
                                    "nodePort": 30302
                                }
                            ],
                            "selector": {
                                "app": "keycloak"
                            },
                            "clusterIP": "10.108.151.178",
                            "clusterIPs": [
                                "10.108.151.178"
                            ],
                            "type": "NodePort",
                            "sessionAffinity": "None",
                            "externalTrafficPolicy": "Cluster",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "kube-ovn-cni",
                            "namespace": "kube-system",
                            "uid": "f571e2a0-ac13-461b-9913-44be6735da68",
                            "resourceVersion": "627",
                            "creationTimestamp": "2023-06-01T04:26:11Z",
                            "labels": {
                                "app": "kube-ovn-cni"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"kube-ovn-cni\"},\"name\":\"kube-ovn-cni\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"metrics\",\"port\":10665}],\"selector\":{\"app\":\"kube-ovn-cni\"}}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:11Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:app": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":10665,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:19Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "metrics",
                                    "protocol": "TCP",
                                    "port": 10665,
                                    "targetPort": 10665
                                }
                            ],
                            "selector": {
                                "app": "kube-ovn-cni"
                            },
                            "clusterIP": "10.98.73.189",
                            "clusterIPs": [
                                "10.98.73.189"
                            ],
                            "type": "ClusterIP",
                            "sessionAffinity": "None",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "ovn-sb",
                            "namespace": "kube-system",
                            "uid": "d3a4377c-fab8-42d1-9a8b-8564bb421d35",
                            "resourceVersion": "613",
                            "creationTimestamp": "2023-06-01T04:26:07Z",
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"name\":\"ovn-sb\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"ovn-sb\",\"port\":6642,\"protocol\":\"TCP\",\"targetPort\":6642}],\"selector\":{\"app\":\"ovn-central\",\"ovn-sb-leader\":\"true\"},\"sessionAffinity\":\"None\",\"type\":\"ClusterIP\"}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:07Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":6642,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:18Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "ovn-sb",
                                    "protocol": "TCP",
                                    "port": 6642,
                                    "targetPort": 6642
                                }
                            ],
                            "selector": {
                                "app": "ovn-central",
                                "ovn-sb-leader": "true"
                            },
                            "clusterIP": "10.104.13.184",
                            "clusterIPs": [
                                "10.104.13.184"
                            ],
                            "type": "ClusterIP",
                            "sessionAffinity": "None",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "jupyterlab",
                            "namespace": "jlab",
                            "uid": "b9675b23-45e1-430e-b704-1f286343c113",
                            "resourceVersion": "5351243",
                            "creationTimestamp": "2023-07-13T07:10:58Z",
                            "labels": {
                                "name": "jupyterlab"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"name\":\"jupyterlab\"},\"name\":\"jupyterlab\",\"namespace\":\"jlab\"},\"spec\":{\"ports\":[{\"name\":\"http\",\"port\":8888,\"protocol\":\"TCP\",\"targetPort\":8888}],\"selector\":{\"name\":\"jupyterlab\"},\"type\":\"NodePort\"}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-13T07:10:58Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-13T07:10:58Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:name": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:externalTrafficPolicy": {},
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":8888,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "http",
                                    "protocol": "TCP",
                                    "port": 8888,
                                    "targetPort": 8888,
                                    "nodePort": 35359
                                }
                            ],
                            "selector": {
                                "name": "jupyterlab"
                            },
                            "clusterIP": "10.103.198.46",
                            "clusterIPs": [
                                "10.103.198.46"
                            ],
                            "type": "NodePort",
                            "sessionAffinity": "None",
                            "externalTrafficPolicy": "Cluster",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "kube-dns",
                            "namespace": "kube-system",
                            "uid": "f24eb140-c67e-47b1-876e-8204bbf55929",
                            "resourceVersion": "617",
                            "creationTimestamp": "2023-06-01T04:25:50Z",
                            "labels": {
                                "k8s-app": "kube-dns",
                                "kubernetes.io/cluster-service": "true",
                                "kubernetes.io/name": "CoreDNS"
                            },
                            "annotations": {
                                "ovn.kubernetes.io/vpc": "ovn-cluster",
                                "prometheus.io/port": "9153",
                                "prometheus.io/scrape": "true"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubeadm",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:25:50Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:prometheus.io/port": {},
                                                "f:prometheus.io/scrape": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:k8s-app": {},
                                                "f:kubernetes.io/cluster-service": {},
                                                "f:kubernetes.io/name": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:clusterIP": {},
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":53,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                },
                                                "k:{\"port\":53,\"protocol\":\"UDP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                },
                                                "k:{\"port\":9153,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:18Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "dns",
                                    "protocol": "UDP",
                                    "port": 53,
                                    "targetPort": 53
                                },
                                {
                                    "name": "dns-tcp",
                                    "protocol": "TCP",
                                    "port": 53,
                                    "targetPort": 53
                                },
                                {
                                    "name": "metrics",
                                    "protocol": "TCP",
                                    "port": 9153,
                                    "targetPort": 9153
                                }
                            ],
                            "selector": {
                                "k8s-app": "kube-dns"
                            },
                            "clusterIP": "10.96.0.10",
                            "clusterIPs": [
                                "10.96.0.10"
                            ],
                            "type": "ClusterIP",
                            "sessionAffinity": "None",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "kube-ovn-controller",
                            "namespace": "kube-system",
                            "uid": "68fafaf0-2760-4a46-b884-d7a4b2d28b4c",
                            "resourceVersion": "624",
                            "creationTimestamp": "2023-06-01T04:26:11Z",
                            "labels": {
                                "app": "kube-ovn-controller"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"kube-ovn-controller\"},\"name\":\"kube-ovn-controller\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"metrics\",\"port\":10660}],\"selector\":{\"app\":\"kube-ovn-controller\"}}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:11Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:app": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":10660,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:19Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "metrics",
                                    "protocol": "TCP",
                                    "port": 10660,
                                    "targetPort": 10660
                                }
                            ],
                            "selector": {
                                "app": "kube-ovn-controller"
                            },
                            "clusterIP": "10.107.171.228",
                            "clusterIPs": [
                                "10.107.171.228"
                            ],
                            "type": "ClusterIP",
                            "sessionAffinity": "None",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "kube-backend",
                            "namespace": "kube-system",
                            "uid": "92870d80-1305-483f-8a26-ca3679519ca3",
                            "resourceVersion": "5381954",
                            "creationTimestamp": "2023-07-13T12:58:54Z",
                            "labels": {
                                "name": "kube-backend"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"name\":\"kube-backend\"},\"name\":\"kube-backend\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"kube-backend-port\",\"nodePort\":30308,\"port\":30308,\"protocol\":\"TCP\",\"targetPort\":30308}],\"selector\":{\"name\":\"kube-backend\"},\"type\":\"NodePort\"}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-13T12:58:54Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                },
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-13T12:58:54Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:name": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:externalTrafficPolicy": {},
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":30308,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:nodePort": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "kube-backend-port",
                                    "protocol": "TCP",
                                    "port": 30308,
                                    "targetPort": 30308,
                                    "nodePort": 30308
                                }
                            ],
                            "selector": {
                                "name": "kube-backend"
                            },
                            "clusterIP": "10.111.59.64",
                            "clusterIPs": [
                                "10.111.59.64"
                            ],
                            "type": "NodePort",
                            "sessionAffinity": "None",
                            "externalTrafficPolicy": "Cluster",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "kubernetes",
                            "namespace": "default",
                            "uid": "f656bde6-a587-4986-88bf-f0b171b789e7",
                            "resourceVersion": "608",
                            "creationTimestamp": "2023-06-01T04:25:49Z",
                            "labels": {
                                "component": "apiserver",
                                "provider": "kubernetes"
                            },
                            "annotations": {
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kube-apiserver",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:25:49Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:labels": {
                                                ".": {},
                                                "f:component": {},
                                                "f:provider": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:clusterIP": {},
                                            "f:internalTrafficPolicy": {},
                                            "f:ipFamilyPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":443,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:26:18Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "https",
                                    "protocol": "TCP",
                                    "port": 443,
                                    "targetPort": 6443
                                }
                            ],
                            "clusterIP": "10.96.0.1",
                            "clusterIPs": [
                                "10.96.0.1"
                            ],
                            "type": "ClusterIP",
                            "sessionAffinity": "None",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "kube-database",
                            "namespace": "kube-system",
                            "uid": "715b1629-2b89-442d-ae70-bd9917976a6f",
                            "resourceVersion": "859",
                            "creationTimestamp": "2023-06-01T04:27:50Z",
                            "labels": {
                                "name": "kube-database"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"name\":\"kube-database\"},\"name\":\"kube-database\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"postgre-port\",\"nodePort\":30306,\"port\":5432,\"protocol\":\"TCP\",\"targetPort\":5432},{\"name\":\"adminer-port\",\"nodePort\":30307,\"port\":8080,\"protocol\":\"TCP\",\"targetPort\":8080}],\"selector\":{\"name\":\"kube-database\"},\"type\":\"NodePort\"}}\n",
                                "ovn.kubernetes.io/vpc": "ovn-cluster"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:27:50Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:name": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:externalTrafficPolicy": {},
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":5432,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:nodePort": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                },
                                                "k:{\"port\":8080,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:nodePort": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                },
                                {
                                    "manager": "kube-ovn-controller",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-06-01T04:27:51Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                "f:ovn.kubernetes.io/vpc": {}
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "postgre-port",
                                    "protocol": "TCP",
                                    "port": 5432,
                                    "targetPort": 5432,
                                    "nodePort": 30306
                                },
                                {
                                    "name": "adminer-port",
                                    "protocol": "TCP",
                                    "port": 8080,
                                    "targetPort": 8080,
                                    "nodePort": 30307
                                }
                            ],
                            "selector": {
                                "name": "kube-database"
                            },
                            "clusterIP": "10.105.111.149",
                            "clusterIPs": [
                                "10.105.111.149"
                            ],
                            "type": "NodePort",
                            "sessionAffinity": "None",
                            "externalTrafficPolicy": "Cluster",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    },
                    {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "jupyterlab-instance-1-svc",
                            "namespace": "jupyterlab-management",
                            "uid": "15bd6adb-76f5-4502-8a9e-84a7d56744d9",
                            "resourceVersion": "6487981",
                            "creationTimestamp": "2023-07-22T06:01:50Z",
                            "labels": {
                                "app": "jupyterlab-instance",
                                "name": "jupyterlab-instance-1-svc"
                            },
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"jupyterlab-instance\",\"name\":\"jupyterlab-instance-1-svc\"},\"name\":\"jupyterlab-instance-1-svc\",\"namespace\":\"jupyterlab-management\"},\"spec\":{\"ports\":[{\"name\":\"http\",\"port\":8888,\"protocol\":\"TCP\",\"targetPort\":8888}],\"selector\":{\"name\":\"jupyterlab-instance-1\"},\"type\":\"NodePort\"}}\n"
                            },
                            "managedFields": [
                                {
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "apiVersion": "v1",
                                    "time": "2023-07-22T06:01:50Z",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            },
                                            "f:labels": {
                                                ".": {},
                                                "f:app": {},
                                                "f:name": {}
                                            }
                                        },
                                        "f:spec": {
                                            "f:externalTrafficPolicy": {},
                                            "f:internalTrafficPolicy": {},
                                            "f:ports": {
                                                ".": {},
                                                "k:{\"port\":8888,\"protocol\":\"TCP\"}": {
                                                    ".": {},
                                                    "f:name": {},
                                                    "f:port": {},
                                                    "f:protocol": {},
                                                    "f:targetPort": {}
                                                }
                                            },
                                            "f:selector": {},
                                            "f:sessionAffinity": {},
                                            "f:type": {}
                                        }
                                    }
                                }
                            ]
                        },
                        "spec": {
                            "ports": [
                                {
                                    "name": "http",
                                    "protocol": "TCP",
                                    "port": 8888,
                                    "targetPort": 8888,
                                    "nodePort": 34288
                                }
                            ],
                            "selector": {
                                "name": "jupyterlab-instance-1"
                            },
                            "clusterIP": "10.110.232.117",
                            "clusterIPs": [
                                "10.110.232.117"
                            ],
                            "type": "NodePort",
                            "sessionAffinity": "None",
                            "externalTrafficPolicy": "Cluster",
                            "ipFamilies": [
                                "IPv4"
                            ],
                            "ipFamilyPolicy": "SingleStack",
                            "internalTrafficPolicy": "Cluster"
                        },
                        "status": {
                            "loadBalancer": {}
                        }
                    }
                ]
            }
        }
    }
    let page = 1
    return listResources("Service", page, maxLimit, namespace, labels)
}


export const listAllCodeSnippets = async() => {
    if (mock) {
        return {
            "code": 20000,
            "message": null,
            "exId": 0,
            "data": {
                "apiVersion": "doslab.iscas/v1",
                "kind": "CodeSnippetList",
                "metadata": {
                    "name": "get-code-snippets",
                    "totalCount": 2,
                    "currentPage": 1,
                    "totalPage": 1,
                    "itemsPerPage": 100,
                    "conditions": "{}"
                },
                "items": [
                    {
                        "apiVersion": "doslab.iscas/v1",
                        "kind": "CodeSnippet",
                        "metadata": {
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"doslab.iscas/v1\",\"kind\":\"CodeSnippet\",\"metadata\":{\"annotations\":{},\"name\":\"full-code-test.py\"},\"spec\":{\"codeDir\":\"full-code\",\"codeName\":\"test.py\",\"codeType\":\"full\",\"content\":\"import os\\n\\nprint(\\\"Hello World\\\")\",\"language\":\"py\"}}\n"
                            },
                            "creationTimestamp": "2023-07-14T03:06:31Z",
                            "generation": 1,
                            "managedFields": [
                                {
                                    "apiVersion": "doslab.iscas/v1",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            }
                                        },
                                        "f:spec": {
                                            ".": {},
                                            "f:codeDir": {},
                                            "f:codeName": {},
                                            "f:codeType": {},
                                            "f:content": {},
                                            "f:language": {}
                                        }
                                    },
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "time": "2023-07-14T03:06:31Z"
                                }
                            ],
                            "name": "full-code-test.py",
                            "resourceVersion": "5456728",
                            "uid": "b5f51a42-40f9-4f45-9bb6-41fa33e36199"
                        },
                        "spec": {
                            "codeDir": "full-code",
                            "codeName": "test.py",
                            "codeType": "full",
                            "content": "import os\n\nprint(\"Hello World\")",
                            "language": "py"
                        }
                    },
                    {
                        "apiVersion": "doslab.iscas/v1",
                        "kind": "CodeSnippet",
                        "metadata": {
                            "annotations": {
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"doslab.iscas/v1\",\"kind\":\"CodeSnippet\",\"metadata\":{\"annotations\":{},\"name\":\"snippet-code-test2.py\"},\"spec\":{\"codeDir\":\"snippet-code\",\"codeName\":\"test2.py\",\"codeType\":\"snippet\",\"content\":\"import os\\n\\nprint(\\\"test2.py\\\")\",\"language\":\"py\"}}\n"
                            },
                            "creationTimestamp": "2023-07-14T03:06:31Z",
                            "generation": 1,
                            "managedFields": [
                                {
                                    "apiVersion": "doslab.iscas/v1",
                                    "fieldsType": "FieldsV1",
                                    "fieldsV1": {
                                        "f:metadata": {
                                            "f:annotations": {
                                                ".": {},
                                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                            }
                                        },
                                        "f:spec": {
                                            ".": {},
                                            "f:codeDir": {},
                                            "f:codeName": {},
                                            "f:codeType": {},
                                            "f:content": {},
                                            "f:language": {}
                                        }
                                    },
                                    "manager": "kubectl-client-side-apply",
                                    "operation": "Update",
                                    "time": "2023-07-14T03:06:31Z"
                                }
                            ],
                            "name": "snippet-code-test2.py",
                            "resourceVersion": "5456727",
                            "uid": "7b7c58b7-6ca3-4d98-be93-6b88e8599743"
                        },
                        "spec": {
                            "codeDir": "snippet-code",
                            "codeName": "test2.py",
                            "codeType": "snippet",
                            "content": "import os\n\nprint(\"test2.py\")",
                            "language": "py"
                        }
                    }
                ]
            }
        }
    }
    let page = 1
    return listResources("doslab.iscas.CodeSnippet", page, maxLimit, null, {})
}

export const getService = async (name: string, namespace: string, labels: object) => {
    if (mock) {
        return {
            "code": 20000,
            "message": null,
            "exId": 0,
            "data": {
                "kind": "Service",
                "apiVersion": "v1",
                "metadata": {
                    "name": "jupyterlab-instance-1-svc",
                    "namespace": "jupyterlab-management",
                    "uid": "15bd6adb-76f5-4502-8a9e-84a7d56744d9",
                    "resourceVersion": "6487981",
                    "creationTimestamp": "2023-07-22T06:01:50Z",
                    "labels": {
                        "app": "jupyterlab-instance",
                        "name": "jupyterlab-instance-1-svc"
                    },
                    "annotations": {
                        "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"jupyterlab-instance\",\"name\":\"jupyterlab-instance-1-svc\"},\"name\":\"jupyterlab-instance-1-svc\",\"namespace\":\"jupyterlab-management\"},\"spec\":{\"ports\":[{\"name\":\"http\",\"port\":8888,\"protocol\":\"TCP\",\"targetPort\":8888}],\"selector\":{\"name\":\"jupyterlab-instance-1\"},\"type\":\"NodePort\"}}\n"
                    },
                    "managedFields": [
                        {
                            "manager": "kubectl-client-side-apply",
                            "operation": "Update",
                            "apiVersion": "v1",
                            "time": "2023-07-22T06:01:50Z",
                            "fieldsType": "FieldsV1",
                            "fieldsV1": {
                                "f:metadata": {
                                    "f:annotations": {
                                        ".": {},
                                        "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                    },
                                    "f:labels": {
                                        ".": {},
                                        "f:app": {},
                                        "f:name": {}
                                    }
                                },
                                "f:spec": {
                                    "f:externalTrafficPolicy": {},
                                    "f:internalTrafficPolicy": {},
                                    "f:ports": {
                                        ".": {},
                                        "k:{\"port\":8888,\"protocol\":\"TCP\"}": {
                                            ".": {},
                                            "f:name": {},
                                            "f:port": {},
                                            "f:protocol": {},
                                            "f:targetPort": {}
                                        }
                                    },
                                    "f:selector": {},
                                    "f:sessionAffinity": {},
                                    "f:type": {}
                                }
                            }
                        }
                    ]
                },
                "spec": {
                    "ports": [
                        {
                            "name": "http",
                            "protocol": "TCP",
                            "port": 8888,
                            "targetPort": 8888,
                            "nodePort": 34288
                        }
                    ],
                    "selector": {
                        "name": "jupyterlab-instance-1"
                    },
                    "clusterIP": "10.110.232.117",
                    "clusterIPs": [
                        "10.110.232.117"
                    ],
                    "type": "NodePort",
                    "sessionAffinity": "None",
                    "externalTrafficPolicy": "Cluster",
                    "ipFamilies": [
                        "IPv4"
                    ],
                    "ipFamilyPolicy": "SingleStack",
                    "internalTrafficPolicy": "Cluster"
                },
                "status": {
                    "loadBalancer": {}
                }
            }
        }
    }
    return getResource("Service", name, namespace, labels)
}

export const getNode = async (name: string) => {
    if (mock) {
        return {
            "code": 20000,
            "message": null,
            "exId": 0,
            "data": {
                "kind": "Node",
                "apiVersion": "v1",
                "metadata": {
                    "name": "ecs-2503",
                    "uid": "d8d2c935-8cd5-4003-bb75-8962410879cf",
                    "resourceVersion": "6495762",
                    "creationTimestamp": "2023-06-01T04:25:47Z",
                    "labels": {
                        "beta.kubernetes.io/arch": "amd64",
                        "beta.kubernetes.io/os": "linux",
                        "kube-ovn/role": "master",
                        "kubernetes.io/arch": "amd64",
                        "kubernetes.io/hostname": "ecs-2503",
                        "kubernetes.io/os": "linux",
                        "node-role.kubernetes.io/control-plane": "",
                        "node.kubernetes.io/exclude-from-external-load-balancers": ""
                    },
                    "annotations": {
                        "kubeadm.alpha.kubernetes.io/cri-socket": "unix:///run/containerd/containerd.sock",
                        "node.alpha.kubernetes.io/ttl": "0",
                        "ovn.kubernetes.io/allocated": "true",
                        "ovn.kubernetes.io/chassis": "4ad38fef-5676-43bc-a557-a258d28e19b6",
                        "ovn.kubernetes.io/cidr": "100.64.0.0/16",
                        "ovn.kubernetes.io/gateway": "100.64.0.1",
                        "ovn.kubernetes.io/ip_address": "100.64.0.2",
                        "ovn.kubernetes.io/logical_switch": "join",
                        "ovn.kubernetes.io/mac_address": "00:00:00:61:57:01",
                        "ovn.kubernetes.io/port_name": "node-ecs-2503",
                        "volumes.kubernetes.io/controller-managed-attach-detach": "true"
                    },
                    "managedFields": [
                        {
                            "manager": "kubelet",
                            "operation": "Update",
                            "apiVersion": "v1",
                            "time": "2023-06-01T04:25:47Z",
                            "fieldsType": "FieldsV1",
                            "fieldsV1": {
                                "f:metadata": {
                                    "f:annotations": {
                                        ".": {},
                                        "f:volumes.kubernetes.io/controller-managed-attach-detach": {}
                                    },
                                    "f:labels": {
                                        ".": {},
                                        "f:beta.kubernetes.io/arch": {},
                                        "f:beta.kubernetes.io/os": {},
                                        "f:kubernetes.io/arch": {},
                                        "f:kubernetes.io/hostname": {},
                                        "f:kubernetes.io/os": {}
                                    }
                                }
                            }
                        },
                        {
                            "manager": "kubeadm",
                            "operation": "Update",
                            "apiVersion": "v1",
                            "time": "2023-06-01T04:25:50Z",
                            "fieldsType": "FieldsV1",
                            "fieldsV1": {
                                "f:metadata": {
                                    "f:annotations": {
                                        "f:kubeadm.alpha.kubernetes.io/cri-socket": {}
                                    },
                                    "f:labels": {
                                        "f:node-role.kubernetes.io/control-plane": {},
                                        "f:node.kubernetes.io/exclude-from-external-load-balancers": {}
                                    }
                                }
                            }
                        },
                        {
                            "manager": "kube-controller-manager",
                            "operation": "Update",
                            "apiVersion": "v1",
                            "time": "2023-06-01T04:26:05Z",
                            "fieldsType": "FieldsV1",
                            "fieldsV1": {
                                "f:metadata": {
                                    "f:annotations": {
                                        "f:node.alpha.kubernetes.io/ttl": {}
                                    }
                                },
                                "f:spec": {
                                    "f:podCIDR": {},
                                    "f:podCIDRs": {
                                        ".": {},
                                        "v:\"10.244.0.0/24\"": {}
                                    }
                                }
                            }
                        },
                        {
                            "manager": "kubectl-label",
                            "operation": "Update",
                            "apiVersion": "v1",
                            "time": "2023-06-01T04:26:06Z",
                            "fieldsType": "FieldsV1",
                            "fieldsV1": {
                                "f:metadata": {
                                    "f:labels": {
                                        "f:kube-ovn/role": {}
                                    }
                                }
                            }
                        },
                        {
                            "manager": "kube-ovn-daemon",
                            "operation": "Update",
                            "apiVersion": "v1",
                            "time": "2023-06-01T04:26:12Z",
                            "fieldsType": "FieldsV1",
                            "fieldsV1": {
                                "f:metadata": {
                                    "f:annotations": {
                                        "f:ovn.kubernetes.io/chassis": {}
                                    }
                                }
                            }
                        },
                        {
                            "manager": "kube-ovn-controller",
                            "operation": "Update",
                            "apiVersion": "v1",
                            "time": "2023-06-01T04:26:15Z",
                            "fieldsType": "FieldsV1",
                            "fieldsV1": {
                                "f:metadata": {
                                    "f:annotations": {
                                        "f:ovn.kubernetes.io/allocated": {},
                                        "f:ovn.kubernetes.io/cidr": {},
                                        "f:ovn.kubernetes.io/gateway": {},
                                        "f:ovn.kubernetes.io/ip_address": {},
                                        "f:ovn.kubernetes.io/logical_switch": {},
                                        "f:ovn.kubernetes.io/mac_address": {},
                                        "f:ovn.kubernetes.io/port_name": {}
                                    }
                                }
                            }
                        },
                        {
                            "manager": "kubelet",
                            "operation": "Update",
                            "apiVersion": "v1",
                            "time": "2023-07-22T07:29:27Z",
                            "fieldsType": "FieldsV1",
                            "fieldsV1": {
                                "f:status": {
                                    "f:conditions": {
                                        "k:{\"type\":\"DiskPressure\"}": {
                                            "f:lastHeartbeatTime": {}
                                        },
                                        "k:{\"type\":\"MemoryPressure\"}": {
                                            "f:lastHeartbeatTime": {}
                                        },
                                        "k:{\"type\":\"PIDPressure\"}": {
                                            "f:lastHeartbeatTime": {}
                                        },
                                        "k:{\"type\":\"Ready\"}": {
                                            "f:lastHeartbeatTime": {},
                                            "f:lastTransitionTime": {},
                                            "f:message": {},
                                            "f:reason": {},
                                            "f:status": {}
                                        }
                                    },
                                    "f:images": {},
                                    "f:nodeInfo": {
                                        "f:bootID": {}
                                    }
                                }
                            },
                            "subresource": "status"
                        }
                    ]
                },
                "spec": {
                    "podCIDR": "10.244.0.0/24",
                    "podCIDRs": [
                        "10.244.0.0/24"
                    ]
                },
                "status": {
                    "capacity": {
                        "cpu": "16",
                        "ephemeral-storage": "103079844Ki",
                        "hugepages-1Gi": "0",
                        "hugepages-2Mi": "0",
                        "memory": "65806172Ki",
                        "pods": "110"
                    },
                    "allocatable": {
                        "cpu": "16",
                        "ephemeral-storage": "94998384074",
                        "hugepages-1Gi": "0",
                        "hugepages-2Mi": "0",
                        "memory": "65703772Ki",
                        "pods": "110"
                    },
                    "conditions": [
                        {
                            "type": "MemoryPressure",
                            "status": "False",
                            "lastHeartbeatTime": "2023-07-22T07:29:27Z",
                            "lastTransitionTime": "2023-06-01T04:25:45Z",
                            "reason": "KubeletHasSufficientMemory",
                            "message": "kubelet has sufficient memory available"
                        },
                        {
                            "type": "DiskPressure",
                            "status": "False",
                            "lastHeartbeatTime": "2023-07-22T07:29:27Z",
                            "lastTransitionTime": "2023-06-01T04:25:45Z",
                            "reason": "KubeletHasNoDiskPressure",
                            "message": "kubelet has no disk pressure"
                        },
                        {
                            "type": "PIDPressure",
                            "status": "False",
                            "lastHeartbeatTime": "2023-07-22T07:29:27Z",
                            "lastTransitionTime": "2023-06-01T04:25:45Z",
                            "reason": "KubeletHasSufficientPID",
                            "message": "kubelet has sufficient PID available"
                        },
                        {
                            "type": "Ready",
                            "status": "True",
                            "lastHeartbeatTime": "2023-07-22T07:29:27Z",
                            "lastTransitionTime": "2023-06-01T04:25:48Z",
                            "reason": "KubeletReady",
                            "message": "kubelet is posting ready status"
                        }
                    ],
                    "addresses": [
                        {
                            "type": "InternalIP",
                            "address": "192.168.0.189"
                        },
                        {
                            "type": "Hostname",
                            "address": "ecs-2503"
                        }
                    ],
                    "daemonEndpoints": {
                        "kubeletEndpoint": {
                            "Port": 10250
                        }
                    },
                    "nodeInfo": {
                        "machineID": "c1c59108d90d4a4bbe62642972537ffc",
                        "systemUUID": "6D8A5F86-C748-4442-AEBE-B487A7192616",
                        "bootID": "84761cb3-4386-40de-bc2e-0c73d224ca79",
                        "kernelVersion": "3.10.0-1062.1.1.el7.x86_64",
                        "osImage": "CentOS Linux 7 (Core)",
                        "containerRuntimeVersion": "containerd://1.6.21",
                        "kubeletVersion": "v1.26.4",
                        "kubeProxyVersion": "v1.26.4",
                        "operatingSystem": "linux",
                        "architecture": "amd64"
                    },
                    "images": [
                        {
                            "names": [
                                "harbor.iecas.cn/test/libreoffice-api@sha256:8991790e205a9c9c2686f1a025508f090cb600b6f241075dd344f31dc2c0c625",
                                "harbor.iecas.cn/test/libreoffice-api:11-20230220-142949"
                            ],
                            "sizeBytes": 970772854
                        },
                        {
                            "names": [
                                "harbor.iecas.cn/test/question-to-picture@sha256:5e2d06721b2629f010ada4343c2d1c71b5727cbfa769062a8f054d8258215184",
                                "harbor.iecas.cn/test/question-to-picture:4-20230302-152415"
                            ],
                            "sizeBytes": 755261452
                        },
                        {
                            "names": [
                                "docker.io/jupyter/minimal-notebook@sha256:7a4c9c06ef3f70692fe945cded77ec7f827012d4cff714f45c9b3468d01b849f",
                                "docker.io/jupyter/minimal-notebook:lab-4.0.2"
                            ],
                            "sizeBytes": 482757483
                        },
                        {
                            "names": [
                                "docker.io/bitnami/keycloak@sha256:2e2f300ac90338912cde13684da15da58c8d51ec011860a361bc267b53aead67",
                                "docker.io/bitnami/keycloak:21.1.1"
                            ],
                            "sizeBytes": 438153815
                        },
                        {
                            "names": [
                                "harbor.iecas.cn/satools/neo4j@sha256:a9229cc31018c53d3fe7bb6d61723c2df50d7a81176722405adb54ea62781c65",
                                "harbor.iecas.cn/satools/neo4j:5.5.0-community"
                            ],
                            "sizeBytes": 339065185
                        },
                        {
                            "names": [
                                "docker.io/ktxcx/nexus3@sha256:35a7431375765273e993d2e4c47b5f6b85c7ef1d602abbdc88c368c29fb93615",
                                "docker.io/ktxcx/nexus3:3.37.3"
                            ],
                            "sizeBytes": 326687048
                        },
                        {
                            "names": [
                                "docker.io/sonatype/nexus3@sha256:88044c8cdbbf1fea42b65b6c785bb88e4e2b2e96b3becd2bfce22f481216a951",
                                "docker.io/sonatype/nexus3:3.56.0"
                            ],
                            "sizeBytes": 325153485
                        },
                        {
                            "names": [
                                "registry.cn-beijing.aliyuncs.com/dosproj/backend@sha256:0ba74cbaf9b284e9c1f8936973da4352fa6fe722abf75e54ade0a29e848e010c",
                                "registry.cn-beijing.aliyuncs.com/dosproj/backend:v1.2.1"
                            ],
                            "sizeBytes": 285389850
                        },
                        {
                            "names": [
                                "registry.cn-beijing.aliyuncs.com/dosproj/backend@sha256:954c497538c05aae975e4da913a9a7f73ce193ebbe6f95b10900eea49e0f85d2",
                                "registry.cn-beijing.aliyuncs.com/dosproj/backend:v1.2.0"
                            ],
                            "sizeBytes": 285387400
                        },
                        {
                            "names": [
                                "registry.cn-beijing.aliyuncs.com/dosproj/mirror@sha256:0f79192ddd2f01e880c0606458f80be02296ba968e6d445f890818715c64a393",
                                "registry.cn-beijing.aliyuncs.com/dosproj/mirror:v0.1.1"
                            ],
                            "sizeBytes": 256251359
                        },
                        {
                            "names": [
                                "quay.io/keycloak/keycloak@sha256:8ebb3930c41e8a066c4246eaf351ac09cdc984e11b1f607d6ff4ce10d69dc808",
                                "quay.io/keycloak/keycloak:21.1"
                            ],
                            "sizeBytes": 255469174
                        },
                        {
                            "names": [
                                "swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v3"
                            ],
                            "sizeBytes": 200828694
                        },
                        {
                            "names": [
                                "harbor.iecas.cn/test/education-api@sha256:37fcdb95156e95c4ad7cf4be14db5b76ca6515813358d636073db79d24922a5d",
                                "harbor.iecas.cn/test/education-api:797-20230601-145314"
                            ],
                            "sizeBytes": 193771072
                        },
                        {
                            "names": [
                                "harbor.iecas.cn/test/authing-api@sha256:9dd0a8d82a5d0b13cc21997ddd7d273ce8f1f06945c8d2e7416caaa9a2a36101",
                                "harbor.iecas.cn/test/authing-api:175-20230516-171639"
                            ],
                            "sizeBytes": 150947868
                        },
                        {
                            "names": [
                                "docker.io/kubeovn/kube-ovn@sha256:8b4b26d6d53c70b7b8d8703d8a30eceb410a0571deeaf3a5c6201094867f0b8a",
                                "docker.io/kubeovn/kube-ovn:v1.11.5"
                            ],
                            "sizeBytes": 140450819
                        },
                        {
                            "names": [
                                "harbor.iecas.cn/pub/postgres@sha256:8f10c40e5e687b2cbf2f28acb5192049cdb89ef1a8db44d2f21e6bdd1a36e4be",
                                "harbor.iecas.cn/pub/postgres:12.6"
                            ],
                            "sizeBytes": 114475586
                        },
                        {
                            "names": [
                                "docker.io/bitnami/rabbitmq@sha256:2e0ac5e3f348c949d6cd604068ce361ad5b3db11bb1fa3b82e8763e83fdbe168",
                                "docker.io/bitnami/rabbitmq:3.10.24"
                            ],
                            "sizeBytes": 103744673
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/etcd@sha256:dd75ec974b0a2a6f6bb47001ba09207976e625db898d1b16735528c009cb171c",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.5.6-0"
                            ],
                            "sizeBytes": 102542580
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/etcd@sha256:51eae8381dcb1078289fa7b4f3df2630cdc18d09fb56f8e56b41c40e191d6c83",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.5.7-0"
                            ],
                            "sizeBytes": 101639218
                        },
                        {
                            "names": [
                                "harbor.iecas.cn/pub/minio/minio@sha256:751b93282faeaf814de8083519637fc358b60d81985964282a6715e11fc7a581",
                                "harbor.iecas.cn/pub/minio/minio:RELEASE.2023-04-20T17-56-55Z"
                            ],
                            "sizeBytes": 101163512
                        },
                        {
                            "names": [
                                "docker.io/library/adminer@sha256:ea38d6384f8f6f0dc29705d6497ca7d77af3e664288d655e574f433d592030df",
                                "docker.io/library/adminer:4.8.1-standalone"
                            ],
                            "sizeBytes": 95935529
                        },
                        {
                            "names": [
                                "docker.io/library/postgres@sha256:ac09c433f64f2d310a83e5cc24dadc13561f645199d4ec8e503824de22e14668",
                                "docker.io/library/postgres:14.5-alpine"
                            ],
                            "sizeBytes": 84700894
                        },
                        {
                            "names": [
                                "harbor.iecas.cn/test/education-web@sha256:ee6672f64fbcd7fd474465b66eeafffcc6fe6794d099b308d684d7a4b9346023",
                                "harbor.iecas.cn/test/education-web:551-20230424-180552"
                            ],
                            "sizeBytes": 61741854
                        },
                        {
                            "names": [
                                "docker.io/library/nginx:1.7.9"
                            ],
                            "sizeBytes": 39947836
                        },
                        {
                            "names": [
                                "harbor.iecas.cn/pub/redis@sha256:c6b7e6bd9e234221509e0ebc90ad89ff491e61a604a4eb2649570e9703fafc65",
                                "harbor.iecas.cn/pub/redis:5.0.6"
                            ],
                            "sizeBytes": 35817240
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver@sha256:7e88c7043a88a2ebdb40d4ad11557115f1de2c53305f0f56f0b4c5b0dc06923d",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.26.4"
                            ],
                            "sizeBytes": 35520364
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver@sha256:a6daed8429c54f0008910fc4ecc17aefa1dfcd7cc2ff0089570854d4f95213ed",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.27.1"
                            ],
                            "sizeBytes": 33381303
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager@sha256:e85ef304b84013413e452a1bd6ca4dac7ac83162134cb7b78d18ffcf2363f185",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.26.4"
                            ],
                            "sizeBytes": 32366755
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager@sha256:ed43c8f8a78f7bcda715b8427da17a62b22befe236acdc90b24db411e106f481",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.27.1"
                            ],
                            "sizeBytes": 30974014
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy@sha256:958ddb03a4d4d7a567d3563c759a05f3e95aa42ca8af2964aa76867aafc43610",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.27.1"
                            ],
                            "sizeBytes": 23906399
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy@sha256:2f16397743223843e43035b7043333b221f39bb1435bbd33017822e54779d470",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.26.4"
                            ],
                            "sizeBytes": 21544886
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler@sha256:0b942e32d0d30ca47e2e133e421c7d3bb9cdb01ee972e56d3098e6aced3cdd8a",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.27.1"
                            ],
                            "sizeBytes": 18234520
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler@sha256:fede1e90a07876257f9af9eb2b364f36a780fb9c05946485f5c534e8295a6506",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.26.4"
                            ],
                            "sizeBytes": 17674232
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/coredns@sha256:a0ead06651cf580044aeb0a0feba63591858fb2e43ade8c9dea45a6a89ae7e5e",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:v1.10.1"
                            ],
                            "sizeBytes": 16190758
                        },
                        {
                            "names": [
                                "docker.io/rancher/local-path-provisioner@sha256:5bb33992a4ec3034c28b5e0b3c4c2ac35d3613b25b79455eb4b1a95adc82cdc0",
                                "docker.io/rancher/local-path-provisioner:v0.0.24"
                            ],
                            "sizeBytes": 14887612
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/coredns@sha256:8e352a029d304ca7431c6507b56800636c321cb52289686a581ab70aaa8a2e2a",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:v1.9.3"
                            ],
                            "sizeBytes": 14837849
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/goodrain/helm-env-checker@sha256:a38e100f8c5fbed66f0243ed04688be4ebe874773e87b3dcbcf18003e0ea4df7",
                                "registry.cn-hangzhou.aliyuncs.com/goodrain/helm-env-checker:latest"
                            ],
                            "sizeBytes": 3638258
                        },
                        {
                            "names": [
                                "docker.io/library/busybox@sha256:560af6915bfc8d7630e50e212e08242d37b63bd5c1ccf9bd4acccf116e262d5b"
                            ],
                            "sizeBytes": 2595855
                        },
                        {
                            "names": [
                                "docker.io/library/busybox@sha256:2376a0c12759aa1214ba83e771ff252c7b1663216b192fbe5e0fb364e952f85c"
                            ],
                            "sizeBytes": 2224294
                        },
                        {
                            "names": [
                                "docker.io/library/busybox@sha256:3fbc632167424a6d997e74f52b878d7cc478225cffac6bc977eedfe51c7f4e79",
                                "docker.io/library/busybox@sha256:653b23f3092ab4861f1a32e699b648d43291378fe6d9d64ca0bf735312587237",
                                "docker.io/library/busybox:latest"
                            ],
                            "sizeBytes": 2224229
                        },
                        {
                            "names": [
                                "harbor.iecas.cn/pub/busybox@sha256:62ffc2ed7554e4c6d360bce40bbcf196573dd27c4ce080641a2c59867e732dee",
                                "harbor.iecas.cn/pub/busybox:latest"
                            ],
                            "sizeBytes": 774771
                        },
                        {
                            "names": [
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/pause@sha256:7031c1b283388d2c2e09b57badb803c05ebed362dc88d84b480cc47f72a21097",
                                "registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.9"
                            ],
                            "sizeBytes": 321520
                        }
                    ]
                }
            }
        }
    }
    return getResource("Node", name, "default", {})
}

export const listResources = async (fullkind: string, page: number, limit: number, namespace: string | null, labels: any) => {
    let queryLabels: any = {}
    if (namespace) {
        queryLabels["metadata##namespace"] = namespace
    }
    // iterate through labels
    for (const [key, value] of Object.entries(labels)) {
        queryLabels["metadata##labels##" + key] = value
    }
    const requestData = {
        fullkind,
        page,
        limit,
        labels: queryLabels,
        region,
    };

    const response = await k8sClient.post('/kubesys/kube/listResources', requestData);
    return response.data;
}

export const getResource = async (fullkind: string, name: string, namespace: string | null, labels: any) => {
    const requestData = {
        fullkind,
        name,
        namespace,
        labels,
        region,
    };

    const response = await k8sClient.post('/kubesys/kube/getResource', requestData);
    return response.data;
};

export const deleteResource = async (fullkind: string, name: string, namespace: string | null) => {
    const requestData = {
        fullkind,
        name,
        namespace,
        region,
    };

    const response = await k8sClient.post('/kubesys/kube/deleteResource', requestData);
    return response.data;
}

export const createResource = async (yaml: any) => {
    if (mock) {
        return {
            "code": 20000,
            "message": null,
            "exId": 0,
            "data": {
                "kind": "Pod",
                "apiVersion": "v1",
                "metadata": {
                    "name": "busybox-pod2",
                    "namespace": "default",
                    "uid": "779ab2b1-c59c-4736-9b91-61d965cf8048",
                    "resourceVersion": "6502465",
                    "creationTimestamp": "2023-07-22T08:44:52Z",
                    "labels": {
                        "app": "busybox"
                    },
                    "managedFields": [
                        {
                            "manager": "Apache-HttpClient",
                            "operation": "Update",
                            "apiVersion": "v1",
                            "time": "2023-07-22T08:44:52Z",
                            "fieldsType": "FieldsV1",
                            "fieldsV1": {
                                "f:metadata": {
                                    "f:labels": {
                                        ".": {},
                                        "f:app": {}
                                    }
                                },
                                "f:spec": {
                                    "f:containers": {
                                        "k:{\"name\":\"busybox-container\"}": {
                                            ".": {},
                                            "f:command": {},
                                            "f:image": {},
                                            "f:imagePullPolicy": {},
                                            "f:name": {},
                                            "f:resources": {
                                                ".": {},
                                                "f:limits": {
                                                    ".": {},
                                                    "f:cpu": {},
                                                    "f:memory": {}
                                                },
                                                "f:requests": {
                                                    ".": {},
                                                    "f:cpu": {},
                                                    "f:memory": {}
                                                }
                                            },
                                            "f:terminationMessagePath": {},
                                            "f:terminationMessagePolicy": {}
                                        }
                                    },
                                    "f:dnsPolicy": {},
                                    "f:enableServiceLinks": {},
                                    "f:restartPolicy": {},
                                    "f:schedulerName": {},
                                    "f:securityContext": {},
                                    "f:terminationGracePeriodSeconds": {}
                                }
                            }
                        }
                    ]
                },
                "spec": {
                    "volumes": [
                        {
                            "name": "kube-api-access-wngjk",
                            "projected": {
                                "sources": [
                                    {
                                        "serviceAccountToken": {
                                            "expirationSeconds": 3607,
                                            "path": "token"
                                        }
                                    },
                                    {
                                        "configMap": {
                                            "name": "kube-root-ca.crt",
                                            "items": [
                                                {
                                                    "key": "ca.crt",
                                                    "path": "ca.crt"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "downwardAPI": {
                                            "items": [
                                                {
                                                    "path": "namespace",
                                                    "fieldRef": {
                                                        "apiVersion": "v1",
                                                        "fieldPath": "metadata.namespace"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "defaultMode": 420
                            }
                        }
                    ],
                    "containers": [
                        {
                            "name": "busybox-container",
                            "image": "busybox",
                            "command": [
                                "sleep",
                                "3600"
                            ],
                            "resources": {
                                "limits": {
                                    "cpu": "500m",
                                    "memory": "256Mi"
                                },
                                "requests": {
                                    "cpu": "500m",
                                    "memory": "256Mi"
                                }
                            },
                            "volumeMounts": [
                                {
                                    "name": "kube-api-access-wngjk",
                                    "readOnly": true,
                                    "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
                                }
                            ],
                            "terminationMessagePath": "/dev/termination-log",
                            "terminationMessagePolicy": "File",
                            "imagePullPolicy": "Always"
                        }
                    ],
                    "restartPolicy": "Always",
                    "terminationGracePeriodSeconds": 30,
                    "dnsPolicy": "ClusterFirst",
                    "serviceAccountName": "default",
                    "serviceAccount": "default",
                    "securityContext": {},
                    "schedulerName": "default-scheduler",
                    "tolerations": [
                        {
                            "key": "node.kubernetes.io/not-ready",
                            "operator": "Exists",
                            "effect": "NoExecute",
                            "tolerationSeconds": 300
                        },
                        {
                            "key": "node.kubernetes.io/unreachable",
                            "operator": "Exists",
                            "effect": "NoExecute",
                            "tolerationSeconds": 300
                        }
                    ],
                    "priority": 0,
                    "enableServiceLinks": true,
                    "preemptionPolicy": "PreemptLowerPriority"
                },
                "status": {
                    "phase": "Pending",
                    "qosClass": "Guaranteed"
                }
            }
        }
    }
    const requestData = {
        "region": region,
        "data": yaml
    }
    const response = await k8sClient.post('/kubesys/kube/createResource', requestData);
    return response.data;
}

// Add more API functions related to users as needed

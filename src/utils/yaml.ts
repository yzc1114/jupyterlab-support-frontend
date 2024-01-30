// export function createPodYaml(instanceName: string, userId: string, image: string, cpu: number, mem: number, gpu: number, nodeName: string, labBaseUrl: string) {
//     let podYaml: any = {
//         "apiVersion": "v1",
//         "kind": "Pod",
//         "metadata": {
//             "namespace": "jupyterlab-management",
//             "name": instanceName,
//             "labels": {
//                 "app": "jupyterlab-instance",
//                 "name": instanceName,
//                 "user": userId,
//             }
//         },
//         "spec": {
//             "securityContext": {
//                 "runAsUser": 0,
//                 "fsGroup": 0
//             },
//             "containers": [
//                 {
//                     "name": instanceName,
//                     "image": image,
//                     "imagePullPolicy": "IfNotPresent",
//                     "ports": [
//                         {
//                             "containerPort": 8888
//                         }
//                     ],
//                     "command": [
//                         "/bin/bash",
//                         "-c",
//                         `jupyter lab --generate-config && jupyter labextension disable @jupyterlab/docmanager-extension:download && jupyter labextension disable @jupyterlab/filebrowser-extension:download &&\ncat > ~/.jupyter/jupyter_lab_config.py << EOF\nc.ServerApp.tornado_settings = {\n'headers': {\n'Content-Security-Policy': \"frame-ancestors 'self' *;\",\n}\n}\nc.ServerApp.token = ''\nc.ServerApp.base_url = '${labBaseUrl}'\nc.ServerApp.password = ''\nc.ServerApp.disable_check_xsrf = True\nEOF\nstart.sh jupyter lab --ip='0.0.0.0' --ServerApp.allow_root=True --port 8888 --no-browser`
//                     ],
//                     "resources": {
//                         "requests": {
//                             "memory": `${mem}Mi`,
//                             "cpu": `${cpu}m`,
//                         }
//                     },
//                     "env": [
//                         {
//                             "name": "GRANT_SUDO",
//                             "value": "yes"
//                         }
//                     ],
//                     "volumeMounts": [
//                         {
//                             "name": "nfs-data-volume",
//                             "mountPath": "/data"
//                         },
//                         {
//                             "name": "data-samples-volume",
//                             "mountPath": "/mnt"
//                         }
//                     ]
//                 }
//             ],
//             "volumes": [
//                 {
//                     "name": "nfs-data-volume",
//                     "hostPath": {
//                         "path": "/data"
//                     }
//                 },
//                 {
//                     "name": "data-samples-volume",
//                     "hostPath": {
//                         "path": "/mnt"
//                     }
//                 }
//             ],
//             "nodeName": nodeName,
//             "restartPolicy": "Always"
//         }
//     }
//     if (gpu > 0) {
//         // podYaml.spec.containers[0].resources["limits"] = {
//         //     "nvidia.com/gpu": `${gpu}`,
//         // }
//         podYaml.spec.containers[0].resources["limits"] = {
//             "doslab.io/vcuda-core": `${gpu}`,
//         }
//     }
//     return podYaml
// }

export function createDeployYaml(instanceName: string, userId: string, image: string, cpu: number, mem: number, gpu: number, gpuMem: number, nodeName: string, labBaseUrl: string) {
    let deployYaml: any = {
        "apiVersion": "apps/v1",
        "kind": "Deployment",
        "metadata": {
            "namespace": "jupyterlab-management",
            "name": instanceName,
            "labels": {
                "app": "jupyterlab-instance",
                "name": instanceName,
                "user": userId
            }
        },
        "spec": {
            "schedulerName": "kube-gpu-scheduler",
            "selector": {
                "matchLabels": {
                    "app": "jupyterlab-instance",
                    "name": instanceName,
                    "user": userId
                }
            },
            "template": {
                "metadata": {
                    "labels": {
                        "app": "jupyterlab-instance",
                        "name": instanceName,
                        "user": userId
                    }
                },
                "spec": {
                    "securityContext": {
                        "runAsUser": 0,
                        "fsGroup": 0
                    },
                    "containers": [
                        {
                            "name": "instance-test-6-1717008369266900994",
                            "image": "jupyter/minimal-notebook:lab-4.0.2",
                            "imagePullPolicy": "IfNotPresent",
                            "ports": [
                                {
                                    "containerPort": 8888
                                }
                            ],
                            "command": [
                                "/bin/bash",
                                "-c",
                                `jupyter lab --generate-config && jupyter labextension disable @jupyterlab/docmanager-extension:download && jupyter labextension disable @jupyterlab/filebrowser-extension:download &&\ncat > ~/.jupyter/jupyter_lab_config.py << EOF\nc.ServerApp.tornado_settings = {\n'headers': {\n'Content-Security-Policy': \"frame-ancestors 'self' *;\",\n}\n}\nc.ServerApp.token = ''\nc.ServerApp.base_url = '${labBaseUrl}'\nc.ServerApp.password = ''\nc.ServerApp.disable_check_xsrf = True\nEOF\nstart.sh jupyter lab --ip='0.0.0.0' --ServerApp.allow_root=True --port 8888 --no-browser`
                            ],
                            "resources": {
                                "requests": {
                                    "memory": `${mem}Mi`,
                                    "cpu": `${cpu}m`,
                                }
                            },
                            "env": [
                                {
                                    "name": "GRANT_SUDO",
                                    "value": "yes"
                                }
                            ],
                            "volumeMounts": [
                                {
                                    "name": "nfs-data-volume",
                                    "mountPath": "/data"
                                },
                                {
                                    "name": "data-samples-volume",
                                    "mountPath": "/mnt"
                                }
                            ]
                        }
                    ],
                    "volumes": [
                        {
                            "name": "nfs-data-volume",
                            "hostPath": {
                                "path": "/data"
                            }
                        },
                        {
                            "name": "data-samples-volume",
                            "hostPath": {
                                "path": "/mnt"
                            }
                        }
                    ],
                    "nodeName": nodeName,
                    "restartPolicy": "Always"
                }
            }
        }
    }
    if (gpu > 0) {
        // deployYaml.spec.template.spec.containers[0].resources["limits"] = {
        //     "nvidia.com/gpu": `${gpu}`,
        // }
        if (deployYaml.spec.template.spec.containers[0].resources.containsKey("limits") === false) {
            deployYaml.spec.template.spec.containers[0].resources["limits"] = {}
        }
        deployYaml.spec.template.spec.containers[0].resources["limits"]["doslab.io/vcuda-core"] = `${gpu}`
        deployYaml.spec.template.spec.containers[0].resources["limits"]["doslab.io/vcuda-memory"] = `${gpuMem}`
        deployYaml.spec.template.spec.containers[0].resources["requests"]["doslab.io/vcuda-core"] = `${gpu}`
        deployYaml.spec.template.spec.containers[0].resources["requests"]["doslab.io/vcuda-memory"] = `${gpuMem}`
    }
    return deployYaml
}

export function createServiceYaml(instanceName: string, userId: string) {
    let serviceYaml = {
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {
            "name": `${instanceName}-svc`,
            "namespace": "jupyterlab-management",
            "labels": {
                "app": "jupyterlab-instance",
                "name": `${instanceName}-svc`
            }
        },
        "spec": {
            "type": "NodePort",
            "ports": [
                {
                    "port": 8888,
                    "targetPort": 8888,
                    "protocol": "TCP",
                    "name": "http"
                }
            ],
            "selector": {
                "name": instanceName,
            }
        }
    }
    return serviceYaml
}


export function createIngressYaml(instanceName: string, userId: string, labBaseUrl: string) {
    let ingressYaml = {
        "apiVersion": "networking.k8s.io/v1",
        "kind": "Ingress",
        "metadata": {
            "name": `${instanceName}-ingress`,
            "namespace": "jupyterlab-management",
            "labels": {
                "app": "jupyterlab-instance",
                "name": `${instanceName}-ingress`
            }
        },
        "spec": {
            "ingressClassName": "nginx",
            "rules": [
                {
                    "http": {
                        "paths": [
                            {
                                "path": `${labBaseUrl}`,
                                "pathType": "Prefix",
                                "backend": {
                                    "service": {
                                        "name": `${instanceName}-svc`,
                                        "port": {
                                            "number": 8888
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
    return ingressYaml
}
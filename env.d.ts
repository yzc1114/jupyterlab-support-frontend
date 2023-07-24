/// <reference types="vite/client" />
declare namespace NodeJS {
    interface ProcessEnv {
        VITE_NAMESPACE: string;
        VITE_K8S_IP: string;
        VITE_K8S_AUTHORIZATION: string;
    }
  }
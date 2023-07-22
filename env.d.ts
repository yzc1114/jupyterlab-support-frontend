/// <reference types="vite/client" />
declare namespace NodeJS {
    interface ProcessEnv {
        VITE_SERVER_IP: string;
        VITE_SERVER_PORT: string;
        VITE_NAMESPACE: string;
    }
  }
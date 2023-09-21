import axios from 'axios';

export const k8sClient = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/k8sApi`,
    timeout: 10000, // Set a reasonable timeout value
});

export const sampleClient = axios.create({
    baseURL: '/aiDesigner/sampleApi',
    timeout: 10000, // Set a reasonable timeout value
});

export const dataClient = axios.create({
    baseURL: '/aiDesigner/dataApi',
    timeout: 10000, // Set a reasonable timeout value
});



// Add a request interceptor
k8sClient.interceptors.request.use(
    (config) => {
        // Add your fixed headers here
        config.headers['Authorization'] = import.meta.env.VITE_K8S_AUTHORIZATION
        config.headers['user'] = 'admin';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

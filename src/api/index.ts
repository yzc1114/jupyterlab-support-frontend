import axios from 'axios';

export const k8sClient = axios.create({
    baseURL: '/k8sApi',
    timeout: 10000, // Set a reasonable timeout value
});

export const sampleClient = axios.create({
    baseURL: '/sampleApi',
    timeout: 10000, // Set a reasonable timeout value
});



// Add a request interceptor
k8sClient.interceptors.request.use(
    (config) => {
        // Add your fixed headers here
        config.headers['Authorization'] = 'Bearer k4m9cmqtkhtz7dsocyh7n1q7fidf3fwhusgu5ajo8y4ludvecop7xa3xusombrdrmaiidaggd55662kwlxn14kbbauqzclmxk2kynhjwzlqr0asohesufhjfb7xzldfpnqwfqjxwr2rrupzxfbjvwx0xqxr4nicoo3wvdwq9h8ef0ccz6y2vnlnmum2nc3qxrnvbqzffbljoumrc8hb9bgzijzkdwewbagqlrmmwcgcgsavtb64llknhvaxfeqsf';
        config.headers['user'] = 'admin';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

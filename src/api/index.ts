import axios from 'axios';

const serverIp = import.meta.env.VITE_SERVER_IP
const serverPort = import.meta.env.VITE_SERVER_PORT
console.log(serverIp, serverPort)

const apiClient = axios.create({
    // baseURL: `http://${serverIp}:${serverPort}`, // Replace with your API base URL
    baseURL: '/api',
    timeout: 10000, // Set a reasonable timeout value
});



// Add a request interceptor
apiClient.interceptors.request.use(
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

export default apiClient
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    cors: true,
    proxy: {
      '/k8sApi': {
        target: 'http://139.9.165.93:30308', // 修改为你的后端接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/k8sApi/, ''),
      },
      '/sampleApi': {
        target: 'http://60.10.63.2:18070', // 修改为你的后端接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sampleApi/, ''),
      },
    },
  },
})


// module.exports = {
//   devServer: {
//     // 配置代理
//     proxy: {
//       // 将请求发送到的后端服务的地址
//       '/api': {
//         target: 'http://backend-api.example.com', // 修改为你的后端接口地址
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': '', // 将请求中的/api字符串去除
//         },
//       },
//     },
//   },
// };

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  const BASE_URL = env.VITE_BASE_URL
  const K8S_IP = env.VITE_K8S_IP
  let c: any = {
    plugins: [
      vue(),
      vueJsx(),
    ],
    base: BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
  console.log("mode", mode)
  // console.log("mode", mode, "env", env)
  if (mode == 'development') {
    c.server = {
      cors: true,
      proxy: {
        '/aiDesigner/k8sApi': {
          target: `http://${K8S_IP}:30308`, // 修改为你的后端接口地址
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/aiDesigner\/k8sApi/, ''),
        },
        '/aiDesigner/sampleApi': {
          target: 'https://www.cpeos.org.cn', // 修改为你的后端接口地址
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/aiDesigner\/sampleApi/, ''),
        },
        '/aiDesigner/dataApi': {
          target: 'https://www.cpeos.org.cn',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/aiDesigner\/dataApi/, ''),
        },
        '/aiDesigner/lab': {
          target: `http://${K8S_IP}:32628`,
          changeOrigin: true,
        },
        '/aiDesigner/helper': {
          target: `https://www.cpeos.org.cn`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/aiDesigner\/helperApi/, ''),
        },
        '/aiDesigner/aiPlatformApi': {
          target: `https://www.cpeos.org.cn`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/aiDesigner\/aiPlatformApi/, ''),
        },
      },
      host: '0.0.0.0',
      port: 5173
    }
  }
  return c
})


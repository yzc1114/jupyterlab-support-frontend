import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  let c: any = {
    plugins: [
      vue(),
      vueJsx(),
    ],
    base: './',
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
          target: 'http://139.9.165.93:30308', // 修改为你的后端接口地址
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/aiDesigner\/k8sApi/, ''),
        },
        '/aiDesigner/sampleApi': {
          target: 'http://124.16.188.132:18070', // 修改为你的后端接口地址
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/aiDesigner\/sampleApi/, ''),
        },
        '/aiDesigner/dataApi': {
          target: 'https://www.cpeos.org.cn',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/aiDesigner\/dataApi/, ''),
        }
      },
    }
  }
  return c
})


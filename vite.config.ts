import react from '@vitejs/plugin-react-swc'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    build: {
      outDir: 'build',
      target: 'esnext',
    },
    plugins: [
      nodePolyfills({
        include: ['buffer'],
      }),
      react(),
      tsconfigPaths(),
    ],
    server: {
      port: 3000,
      ...(mode === 'development' && env.VITE_DEV_KEY && env.VITE_DEV_CERT && env.VITE_DEV_HOST
        ? {
            https: {
              key: fs.readFileSync(path.resolve(__dirname, env.VITE_DEV_KEY)),
              cert: fs.readFileSync(path.resolve(__dirname, env.VITE_DEV_CERT)),
            },
            host: env.VITE_DEV_HOST,
          }
        : {}),
    },
  }
})

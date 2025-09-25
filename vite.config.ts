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
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
      // include: ['process']
    },
    plugins: [
      // nodePolyfills({
      //   include: ['buffer', 'crypto', 'fs', 'http', 'https', 'stream', 'util', 'vm', 'zlib'],
      // }),
      nodePolyfills({
        include: ['http', 'https', 'util'],
      }),
      react(),
      tsconfigPaths(),
    ],
    resolve: {
      // alias: {
      //   '@synapsecns/sdk-router': '@synapsecns/sdk-router/dist/sdk-router.esm.js',
      // },
      alias: [
        { find: /^@synapsecns\/sdk-router$/, replacement: '@synapsecns/sdk-router/dist/sdk-router.esm.js' },
        // { find: /^@walletconnect\/logger$/, replacement: '@walletconnect/logger/dist/index.cjs.js' },
        // { find: /^process$/, replacement: 'process/browser' },
      ],
    },
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

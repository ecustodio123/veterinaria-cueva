import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'
import { seoPlugin } from './build/seo.js'

const appRoot = fileURLToPath(new URL('.', import.meta.url))
const commerceSrc = resolve(appRoot, '../../kafka-commerce/src')

export default defineConfig(({ command, mode, isPreview }) => {
  const useLocalCommerce =
    command === 'serve' && !isPreview && mode === 'commerce-local'

  return {
    plugins: [react(), seoPlugin()],
    resolve: {
      dedupe: ['react', 'react-dom', '@supabase/supabase-js'],
      alias: useLocalCommerce ? [
        {
          find: /^@ecustodio123\/kafka-commerce$/,
          replacement: resolve(commerceSrc, 'index.ts'),
        },
        {
          find: /^@ecustodio123\/kafka-commerce\/styles\.css$/,
          replacement: resolve(commerceSrc, 'styles/commerce.css'),
        },
      ] : [],
    },
    optimizeDeps: useLocalCommerce
      ? { exclude: ['@ecustodio123/kafka-commerce'] }
      : undefined,
    server: useLocalCommerce ? {
      fs: {
        allow: [searchForWorkspaceRoot(appRoot), commerceSrc],
      },
      allowedHosts: ['.trycloudflare.com'],
    } : undefined,
  }
})

import { defineConfig } from 'umi'

export default defineConfig({
  // devtool: false,
  proxy: {
    '/api': {
      'target': 'http://localhost:3000/',
      'changeOrigin': false,
      'pathRewrite': { '^/api': '' }
    }
  }
})

import { defineConfig } from 'umi'

export default defineConfig({
  // devtool: 'source-map',
  proxy: {
    '/api': {
      'target': 'http://localhost:3000/',
      'changeOrigin': false,
      'pathRewrite': { '^/api': '' }
    }
  }
})

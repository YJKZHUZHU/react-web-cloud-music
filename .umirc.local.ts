import { defineConfig } from 'umi'

export default defineConfig({
  // devtool: 'source-map',
  proxy: {
    '/api': {
      'target': 'https://api.douya-music.top/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' }
    }
  }
})
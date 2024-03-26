import { defineConfig } from '@umijs/max'

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
const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import {IConfig,defineConfig} from 'umi'

export default defineConfig({
  publicPath: '/',
  exportStatic: false,
  devtool: 'source-map',
  antd: {},
  dynamicImport: false,
  title: 'cloud-music-web-react',
  targets: {
    ie: 9,//浏览器前缀
    chrome: 40
  },
  dva:{
    immer: true,
    hmr: false,
    // 默认为 false，且必须 设置 false，否则 plugin-dva 会重复加载 model
    skipModelValidate: false
  },
  hash: true,
  theme: lessToJs(fs.readFileSync(path.join('./src/theme/default.less'), 'utf8')),
  sass: {
    implementation: require('node-sass'),
    sassOptions: {
      includePaths: ['./src/theme/']
    }
  },
  ignoreMomentLocale: true,
  externals: {
    Ripple: 'window.Ripple'
  },
  devServer: {
    compress: true,
  },
  proxy: {
    '/api': {
      'target': 'http://106.54.31.160:3000/',
      'changeOrigin': false,
      'pathRewrite': { '^/api': '' }
    }
  }
})

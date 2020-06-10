const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import {IConfig} from 'umi'
// ref: https://umijs.org/config/
const config: IConfig = {
  publicPath: '/',
  exportStatic: false,
  devtool:'source-map',
  antd:{},
  dynamicImport: false,
  title: 'cloud-music-web-react',
  targets: {
    ie:9,//浏览器前缀
    chrome: 40
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
  externals: {},
  devServer: {
    compress: true,
  },
  proxy: {
    '/api': {
      'target': 'http://106.54.31.160:3000/',
      'changeOrigin': false,
      'pathRewrite': {'^/api': ''}
    }
  }
}

export default config

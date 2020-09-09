const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import { defineConfig } from 'umi'

export default defineConfig({
  exportStatic: false,
  devtool: 'source-map',
  antd: {},
  dynamicImport: false,
  title: '豆芽音乐',
  targets: {
    ie: 9,//浏览器前缀
    chrome: 40
  },
  sass:{
    sass: require('node-sass')
  },
  dva: {
    immer: true,
    hmr: false,
    // 默认为 false，且必须 设置 false，否则 plugin-dva 会重复加载 model
    skipModelValidate: false
  },
  // plugins: ['@alitajs/hd'],
  // hd: {},
  // extraPostCSSPlugins: [
  //   px2rem({
  //     rootValue: 256,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
  //     propBlackList: ['*'],//这些属性不需要转换
  //     selectorBlackList: []//
  //   })],
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
      'target': 'http://localhost:3000/',
      'changeOrigin': false,
      'pathRewrite': { '^/api': '' }
    }
  }
})

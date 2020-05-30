const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import {IConfig} from 'umi'
// @ts-ignore
import themeConfig from './themeConfig'


// ref: https://umijs.org/config/
const config: IConfig = {
  publicPath: '/',
  exportStatic: false,
  devtool:'source-map',
  antd:{},
  // dva:{},
  dynamicImport: false,
  title: 'cloud-music-web-react',
  // plugins: [
    // ['umi-plugin-antd-theme', {
    //   theme: themeConfig,
    //   // 是否压缩css
    //   min: true,
    //   // css module
    //   isModule: true,
    //   // 忽略 antd 的依赖
    //   ignoreAntd: false,
    //   // 忽略 pro-layout
    //   ignoreProLayout: false,
    //   // 不使用缓存
    //   cache: true
    // }],
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    // ['umi-plugin-react', {
    //   antd: true,
    //   dva: false,
    //   dynamicImport: false,
    //   title: 'cloud-music-web-react',
    //   routes: {
    //     exclude: [
    //       /components\//
    //     ]
    //   },
    //   dll: {
    //     includes: [
    //       'umi',
    //       'umi-plugin-react',
    //       'antd',
    //       'axios',
    //       'unstated',
    //       'nprogress',
    //       'react-player',
    //       'react-virtualized',
    //       'react-transition-group',
    //       'react-infinite-scroller'
    //     ]
    //   },
    //   // hd: true
    // }]
  // ],
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

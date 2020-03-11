const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import {IConfig} from 'umi-types'
// @ts-ignore
import themeConfig from './themeConfig'


// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  history: 'browser',
  publicPath: '/',
  exportStatic: false,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: 'cloud-music-web-react',
      dll: false,

      routes: {
        exclude: [
          /components\//
        ]
      }
    }],
    ['umi-plugin-antd-theme', {
      theme: themeConfig,
      // 是否压缩css
      min: true,
      // css module
      isModule: true,
      // 忽略 antd 的依赖
      ignoreAntd: false,
      // 忽略 pro-layout
      ignoreProLayout: false,
      // 不使用缓存
      cache: true
    }]
  ],
  hash: true,
  theme: lessToJs(fs.readFileSync(path.join('./src/theme/default.less'), 'utf8')),
  sass: {
    sassOptions: {
      includePaths: ['./src/theme/']
    }
  },
  externals: {
    'RhythmRipple':"window.RhythmRipple"
  },
  proxy: {
    '/api': {
      'target': 'http://106.54.31.160:3000/',
      'changeOrigin': false,
      'pathRewrite': {'^/api': ''}
    }
  }
  // chainWebpack: (config) => {
  //   themeArr.forEach((item:ThemeInterface) => {
  //     config.entry(item.name).add(item.path).end()
  //   })
  // }
}

export default config

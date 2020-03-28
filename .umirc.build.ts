const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import {IConfig} from 'umi-types'
// @ts-ignore
import themeConfig from './themeConfig'
// @ts-ignore
import px2rem from 'postcss-plugin-px2rem'


// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  history: 'browser',
  publicPath: '/',
  exportStatic: false,
  devtool:'source-map',
  plugins: [
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
    }],
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: 'cloud-music-web-react',
      routes: {
        exclude: [
          /components\//
        ]
      },
      dll: {
        includes: [
          'umi',
          'umi-plugin-react',
          'antd',
          'axios',
          'unstated',
          'nprogress',
          'react-player',
          'react-virtualized',
          'react-transition-group',
          'react-infinite-scroller'
        ]
      },
      hd: true
    }]
  ],
  targets: {
    ie:9,//浏览器前缀
    chrome: 40
  },

  hash: true,
  theme: lessToJs(fs.readFileSync(path.join('./src/theme/default.less'), 'utf8')),
  sass: {
    sassOptions: {
      includePaths: ['./src/theme/']
    }
  },
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 200,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
      propBlackList: ['*'],//这些属性不需要转换
      selectorBlackList: []//
    })
  ],
  ignoreMomentLocale: true,
  externals: {},
  devServer: {
    compress: true,
  }
}

export default config

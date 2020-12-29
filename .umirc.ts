const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import { defineConfig } from 'umi'
import px2rem from 'postcss-plugin-px2rem'


//判断只有在生产模式才开启
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV)

const prod = IS_PROD ? {
  plugins: ['@alitajs/hd'],
  hd: {},
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 256,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
      propBlackList: ['*'],//这些属性不需要转换
      selectorBlackList: []//
    })
  ]
} : {}

export default defineConfig({
  ...prod,
  exportStatic: false,
  antd: {},
  // dynamicImport: {
  //   loading: '@/components/Loading/index'
  // },
  title: '豆芽音乐',
  esbuild: {},
  autoprefixer: {},
  targets: {
    chrome: 79,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
    ie: 11,
  },
  hash: true,
  theme: lessToJs(fs.readFileSync(path.join('./src/theme/default.less'), 'utf8')),
  sass: {
    implementation: require('node-sass'),
    sassOptions: {
      includePaths: ['./src/theme/']
    }
  },
  cssModulesTypescriptLoader: {},
  fastRefresh: {},
  extraBabelPlugins: [IS_PROD ? 'transform-remove-console' : ''],
  dva: {
    immer: true,
    hmr: false,
    // 默认为 false，且必须 设置 false，否则 plugin-dva 会重复加载 model
    skipModelValidate: false
  },
  nodeModulesTransform: { type: 'none' }, // 编译提速
  ignoreMomentLocale: true,
  externals: {
    Ripple: 'window.Ripple'
  },
  devServer: {
    compress: true,
  },
  chunks: ['react', 'antd', 'umi'],
  chainWebpack(config, { webpack }) {
    config.optimization.splitChunks({
      cacheGroups: {
        // react 相关
        react: {
          name: 'react',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|video-react|react-player)[\\/]/,
          priority: 12,
        },
        // antd
        antd: {
          name: 'antd',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](moment|antd|@ant-design|antd-mobile|ahooks)[\\/]/,
          priority: 11
        }
      }
    })
  }
})

const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import { defineConfig } from 'umi'

//判断只有在生产模式才开启
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV)

export default defineConfig({
  exportStatic: false,
  devtool: 'source-map',
  antd: {},
  dynamicImport: false,
  title: '豆芽音乐',
  esbuild: {},
  targets: {
    chrome: 79,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  hash: true,
  theme: lessToJs(fs.readFileSync(path.join('./src/theme/default.less'), 'utf8')),
  sass: {
    implementation: require('node-sass'),
    sassOptions: {
      includePaths: ['./src/theme/']
    }
  },
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
  // chunks: ['vendors', 'umi'],
  // chainWebpack: (config, { webpack }) => {
  //   config.merge({
  //     optimization: {
  //       minimize: true,
  //       splitChunks: {
  //         chunks: 'all',
  //         minSize: 30000,
  //         minChunks: 1,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           vendor: {
  //             name: 'vendors',
  //             test({ resource }) {
  //               return /[\\/]node_modules[\\/]/.test(resource);
  //             },
  //             priority: 10,
  //           }
  //         }
  //       }
  //     }
  //   })
  // }
})

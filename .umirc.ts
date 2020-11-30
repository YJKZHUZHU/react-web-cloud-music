const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import * as IWebpackChainConfig from 'webpack-chain'
import { defineConfig } from 'umi'

function getModulePackageName(module: { context: string }) {
  if (!module.context) return null;
  const nodeModulesPath = path.join(__dirname, '../node_modules/');
  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }
  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName: string | null = moduleDirName;
  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)![1];
  }
  return packageName;
}

//判断只有在生产模式才开启
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV)

export default defineConfig({
  exportStatic: false,
  antd: {},
  // forkTSChecker:{}, // 编译ts检测
  dynamicImport: {
    loading: '@/components/Loading/index'
  },
  title: '豆芽音乐',
  esbuild: {},
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
  //         chunks: 'async',
  //         minSize: 0,
  //         cacheGroups: {
  //           vendors: {
  //             chunks: 'all',
  //             name: 'vendors',
  //             test: (module: { context: string }) => {
  //               const packageName = getModulePackageName(module) || '';
  //               if (packageName) {
  //                 return [
  //                   'react',
  //                   'react-dom',
  //                   'react-router',
  //                   'react-router-dom',
  //                   'lodash',
  //                   'moment',
  //                   'react-draggable',
  //                   'react-infinite-scroller',
  //                   'react-player',
  //                   'unstated',
  //                   'video-react',
  //                   'antd'
  //                 ].includes(packageName);
  //               }
  //               return false;
  //             },
  //             priority: 10
  //           },
  //           // antd: {
  //           //   name: "argrace",
  //           //   test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
  //           //   chunks: "all",
  //           //   priority: 9
  //           // }
  //         }
  //       }
  //     }
  //   })
  //   // config.optimization
  //   //   .runtimeChunk(false)
  //   //   .splitChunks({
  //   //     chunks: 'async',
  //   //     minSize: 0,
  //   //     cacheGroups: {
  //   //       vendors: {
  //   //         chunks: 'all',
  //   //         name: 'vendors',
  //   //         test: (module: { context: string }) => {
  //   //           const packageName = getModulePackageName(module) || '';
  //   //           if (packageName) {
  //   //             return [
  //   //               'react',
  //   //               'react-dom',
  //   //               'react-router',
  //   //               'react-router-dom',
  //   //               'lodash',
  //   //               'moment',
  //   //               'react-draggable',
  //   //               'react-infinite-scroller',
  //   //               'react-player',
  //   //               'unstated',
  //   //               'video-react'
  //   //             ].includes(packageName);
  //   //           }
  //   //           return false;
  //   //         },
  //   //         priority: 10
  //   //       },
  //   //       antd: {
  //   //         name: "argrace",
  //   //         test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
  //   //         chunks: "all",
  //   //         priority: 9
  //   //       }
  //   //     }
  //   //   })
  //   // config.merge({
  //   //   optimization: {
  //   //     minimize: true,
  //   //     splitChunks: {
  //   //       chunks: 'all',
  //   //       minSize: 30000,
  //   //       minChunks: 1,
  //   //       automaticNameDelimiter: '.',
  //   //       cacheGroups: {
  //   //         vendor: {
  //   //           name: 'vendors',
  //   //           test({ resource }) {
  //   //             return /[\\/]node_modules[\\/]/.test(resource);
  //   //           },
  //   //           priority: 10,
  //   //         }
  //   //       }
  //   //     }
  //   //   }
  //   // })
  // }
})

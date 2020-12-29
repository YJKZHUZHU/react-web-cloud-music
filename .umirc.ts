const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import * as IWebpackChainConfig from 'webpack-chain'
import { defineConfig } from 'umi'
import px2rem from 'postcss-plugin-px2rem'

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
  // plugins: ['@alitajs/hd'],
  // hd: {},
  // extraPostCSSPlugins: [
  //   px2rem({
  //     rootValue: 256,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
  //     propBlackList: ['*'],//这些属性不需要转换
  //     selectorBlackList: []//
  //   })
  // ]
})

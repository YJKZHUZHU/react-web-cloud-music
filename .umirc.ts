const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
import { defineConfig } from '@umijs/max'
// import px2rem from 'postcss-plugin-px2rem'
import routes from './routes'
const prodGzipList = ['js', 'css']



//判断只有在生产模式才开启
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV!)

const prod = IS_PROD ? {
  extraBabelPlugins: [IS_PROD ? 'transform-remove-console' : ''],
  // plugins: ['@alitajs/hd'],
  // hd: {},
  // extraPostCSSPlugins: [
  //   px2rem({
  //     rootValue: 256,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
  //     propBlackList: ['*'],//这些属性不需要转换
  //     selectorBlackList: []//
  //   })
  // ]
} : {}

export default defineConfig({
  model: {},
  // apiRoute: {
  //   platform: 'vercel',
  // },
  // layout:false,
  // layout: {
  //   // https://umijs.org/docs/max/layout-menu#构建时配置
  //   title: 'UmiJS',
  //   locale: true,
  // },
  initialState: {},
  request: {},
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  // ...prod,
  exportStatic: false,
  antd: {
    // import: true,
    import: false,
  },
  // dynamicImport: {
  //   loading: '@/components/Loading/index'
  // },
  routes: routes,
  scripts: [`/ripple.js?version=${Date.now()}`],
  // mfsu:{},
  title: '豆芽音乐',
  // esbuild: {},
  autoprefixer: {},
  // targets: {
  //   chrome: 79,
  //   firefox: false,
  //   safari: false,
  //   edge: false,
  //   ios: false,
  //   ie: 11
  // },
  hash: true,
  esbuildMinifyIIFE: true,
  // theme: lessToJs(fs.readFileSync(path.join('./src/theme/default.less'), 'utf8')),
  // sass: {
  //   // implementation: require('node-sass'),
  //   sassOptions: {
  //     includePaths: ['./src/theme/']
  //   }
  // },
  // cssModulesTypescriptLoader: {},
  fastRefresh: true,
  dva: {
    immer: {},
  },
  // dva: {
  //   immer: true,
  //   // hmr: false,
  //   // 默认为 false，且必须 设置 false，否则 plugin-dva 会重复加载 model
  //   // skipModelValidate: false
  // },
  // nodeModulesTransform: { type: 'none' }, // 编译提速
  // ignoreMomentLocale: true,
  // externals: {
  //   Ripple: 'window.Ripple'
  // },
  // devServer: {
  //   compress: true
  // },
  // chunks: ['react', 'antd', 'utils', 'umiPlugin','vendors', 'umi'],
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  chainWebpack(config, { webpack }) {

    config.merge({
      optimization: {
        splitChunks: {
          cacheGroups: {
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react-dom|react|react-router|moment|react-router-dom|react-player|video-react|react-draggable)[\\/]/,
              priority: 10,
              enforce: true
            },
            antd: {
              name: 'antd',
              chunks: 'async',
              test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
              priority: -10,
              enforce: true
            },
            utils: {
              name: 'utils',
              chunks: 'async',
              test: /[\\/]node_modules[\\/](rc-tabs|@better-scroll|ahooks|better-scroll|nprogress)[\\/]/,
              priority: -11,
              enforce: true
            },
            umiPlugin: {
              name: 'umiPlugin',
              chunks: 'async',
              test: /[\\/]node_modules[\\/](@umijs)[\\/]/,
              priority: -9,
              enforce: true
            },
            vendors: {
              name: 'vendors',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: -12
            }
            // react: {
            //   name: 'react',
            //   chunks: 'all',
            //   test: ({ resource }) => /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|moment|antd|@ant-design|react-player|video-react)[\\/]/.test(resource),
            //   priority: 12,
            // },
            // vendors: {
            //   name: 'vendors',
            //   chunks: 'all',
            //   test: /[\\/]node_modules[\\/]/,
            //   priority: 10,
            // },
          }
        }
      }
    })
    // .module
    //   .rule('jsx-px2rem-loader')
    //   .test(/\.tsx$/)
    //   // .test(/\.js$/)
    //   .exclude
    //   .add([path.resolve('./loader'), path.resolve('./src/pages/.umi'), path.resolve('./src/.umi')])
    //   .end()
    //   .use('./loader/jsx-px2rem-loader')
    //   .loader(path.join(__dirname, './loader/jsx-px2rem-loader'))
  },
  npmClient: 'pnpm',
})

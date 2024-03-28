const path = require("path");
const fs = require("fs");
const lessToJs = require("less-vars-to-js");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
import { defineConfig } from "@umijs/max";
// import px2rem from 'postcss-plugin-px2rem'
import routes from "./routes";
const prodGzipList = ["js", "css"];

//判断只有在生产模式才开启
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV!);


export default defineConfig({
  model: {},
  initialState: {},
  request: {},
  extraBabelPlugins: [IS_PROD ? "transform-remove-console" : ""],
  locale: {
    // default zh-CN
    default: "zh-CN",
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  // ...prod,
  exportStatic: false,
  antd: {
    import: false,
  },
  // dynamicImport: {
  //   loading: '@/components/Loading/index'
  // },
  routes: routes,
  scripts: [`/ripple.js?version=${Date.now()}`],
  title: "豆芽音乐",
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

  codeSplitting: {
    jsStrategy: "granularChunks",
  },
  // chainWebpack(config, { webpack }) {
  //   config.merge({
  //     optimization: {
  //       splitChunks: {
  //         cacheGroups: {
  //           react: {
  //             name: "react",
  //             chunks: "all",
  //             test: /[\\/]node_modules[\\/](react-dom|react|react-router|react-router-dom|react-player|video-react|react-draggable)[\\/]/,
  //             priority: 10,
  //             enforce: true,
  //           },
  //           antd: {
  //             name: "antd",
  //             chunks: "async",
  //             test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
  //             priority: -10,
  //             enforce: true,
  //           },
  //           utils: {
  //             name: "utils",
  //             chunks: "async",
  //             test: /[\\/]node_modules[\\/](rc-tabs|@better-scroll|ahooks|better-scroll|nprogress)[\\/]/,
  //             priority: -11,
  //             enforce: true,
  //           },
  //           umiPlugin: {
  //             name: "umiPlugin",
  //             chunks: "async",
  //             test: /[\\/]node_modules[\\/](@umijs)[\\/]/,
  //             priority: -9,
  //             enforce: true,
  //           },
  //           vendors: {
  //             name: "vendors",
  //             chunks: "all",
  //             test: /[\\/]node_modules[\\/]/,
  //             priority: -12,
  //           },

  //         },
  //       },
  //     },
  //   });
  // },
  npmClient: "pnpm",
  tailwindcss: {},
});

const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
import {IConfig} from 'umi'
// @ts-ignore
import themeConfig from './themeConfig'
// @ts-ignore
import px2rem from 'postcss-plugin-px2rem'


// ref: https://umijs.org/config/
const config: IConfig = {
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 200,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
      propBlackList: ['*'],//这些属性不需要转换
      selectorBlackList: []//
    })
  ]
}

export default config

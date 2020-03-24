import {IConfig} from 'umi-types'
// @ts-ignore
import px2rem from 'postcss-plugin-px2rem'


// ref: https://umijs.org/config/
const config: IConfig = {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      hd: true
    }]
  ],
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 200,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
      propBlackList: ['*'],//这些属性不需要转换
      selectorBlackList: []//
    })
  ]
}

export default config

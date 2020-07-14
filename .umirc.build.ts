import { defineConfig } from 'umi'
import px2rem from 'postcss-plugin-px2rem'


export default defineConfig(
  {
    plugins: ['@alitajs/hd'],
    hd: {},
    extraPostCSSPlugins: [
      px2rem({
        rootValue: 256,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
        propBlackList: ['*'],//这些属性不需要转换
        selectorBlackList: []//
      })
    ]
  }
)

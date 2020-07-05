import 'nprogress/nprogress.css'
import Utils from '@/help/index'
import moment from 'moment'
import API from '@/api'
import { appState } from '@/models/gloable'
import store from '@/help/localStorage'
import { message } from 'antd'
import { getUserInfo } from '@/help/getUserInfo'

moment.locale(window.navigator.language)

message.config({
  maxCount: 1
})


interface RouterInterface {
  location: any,
  routes: any,
  action: any
}


export function onRouteChange(props: RouterInterface) {

  //从地址栏输入，请求最新状态
  if (props.action === 'POP') {
    // getUserInfo().then(r => r)
    if (!store.getStorage('theme')) {
      store.setStorage('theme', 'red')
    }

    //设置默认音量
    if (!store.getStorage('volume')) store.setValue('volume', 0.5)
    //搜索关键词
    if (!store.getStorage('keywords')) store.setValue('keywords', '')

    //搜索历史
    if (!store.getStorage('searchHistory')) store.setValue('searchHistory', [])

    //播放历史
    if (!store.getStorage('playHistory')) store.setValue('playHistory', [])

    Utils.getTheme()
  }
}


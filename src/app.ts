import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Utils from '@/help/index'
import moment from 'moment'
import API from '@/api'
import {appState} from '@/models/gloable'
import router from 'umi/router'
import store from '@/help/localStorage'
// import './ripple.js'

moment.locale(window.navigator.language)


interface RouterInterface {
  location: any,
  routes: any,
  action: any
}

let lastKey: string = ''

const getUserInfo = async () => {
  const Ret: any = await API.status({loading: true})
  if (Ret.code === 200) {
    const loginRet = await API.useInfo({uid: Ret.profile.userId})
    await appState.setLoginStatus(true)
    await appState.setUserInfo(loginRet)
  }
}

export function onRouteChange(props: RouterInterface) {
  NProgress.start()

  if (props.location.key !== lastKey) {
    lastKey = props.location.pathname
    NProgress.done()
  }
  //首次加载undefined
  if (!props.action) {
    getUserInfo().then(r => r)
    if (!store.getStorage('theme')) {
      store.setStorage('theme', 'red')
    }

    //设置默认音量
    if (!store.getStorage('volume')) {
      store.setStorage('volume', 0.5)
    }
    //搜索关键词
    if (!store.getStorage('keywords')) {
      store.setStorage('keywords', '')
    }

    //搜索历史
    if (!store.getStorage('searchHistory')) {
      store.setStorage('searchHistory', JSON.stringify([]))
    }

    Utils.getTheme()
  }
}


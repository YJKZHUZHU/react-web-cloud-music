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
  await appState.setGlobalLoading(true)
  const Ret: any = await API.status()
  if (Ret.code === 200) {
    const loginRet = await API.useInfo({uid: Ret.profile.userId})
    await appState.setLoginStatus(true)
    await appState.setUserInfo(loginRet)
  }
  appState.setGlobalLoading(false)
}

export function onRouteChange(props: RouterInterface) {
  console.log(props)
  const {pathname} = props.location
  NProgress.start()
  if (props.location.key !== lastKey) {
    lastKey = props.location.pathname
    NProgress.done()
  }
  //暂时加载首页判断登录态，该接口有点慢
  // if (pathname === '/recommend/findMusic') {
  //   getUserInfo()
  //   //获取登录态
  //   // await getUserInfo()
  // }

  //首次加载undefined
  if (!props.action) {
    console.log(111)
    getUserInfo()
    // await getUserInfo()
    // router.push('/recommend/findMusic')

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


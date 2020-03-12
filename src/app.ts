import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Utils from '@/help/index'
import router from 'umi/router'
import store from '@/help/localStorage'
// import './ripple.js'

interface RouterInterface {
  location: any,
  routes: any,
  action: any
}

let lastKey: string = ''

export function onRouteChange(props: RouterInterface) {
  console.log(props)
  console.log(window.Ripple)

  NProgress.start()
  if (props.location.key !== lastKey) {
    lastKey = props.location.pathname
    NProgress.done()
  }
  //首次加载undefined
  if (!props.action) {
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


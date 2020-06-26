import 'nprogress/nprogress.css'
import Utils from '@/help/index'
import moment from 'moment'
import API from '@/api'
import {appState} from '@/models/gloable'
import store from '@/help/localStorage'
import {getUserInfo} from '@/help/getUserInfo'

moment.locale(window.navigator.language)


interface RouterInterface {
  location: any,
  routes: any,
  action: any
}


// const getUserInfo = async () => {
//   const Ret: any = await API.status({loading: true})
//   if (Ret.code === 200) {
//     const loginRet:any = await API.useInfo({uid: Ret.profile.userId})
//     const RecordRet = await API.getPlayRecord({ uid: Ret.profile.userId,type:0}) //type:0 所有 1 一周
//     await appState.setAllPlayRecord(RecordRet.allData)
//     await appState.setLoginStatus(true)
//     await appState.setUserInfo(loginRet)
//     await appState.setUserId(loginRet.userPoint.userId)
//     const playListRet:any = await API.userPlaylist({uid:loginRet.userPoint.userId})
//     if(playListRet.code === 200){
//       await appState.setPlayList(playListRet.playlist)
//     }
//   }
// }

export function onRouteChange(props: RouterInterface) {

  //从地址栏输入，请求最新状态
  if (props.action === 'POP') {
    getUserInfo().then(r => r)
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


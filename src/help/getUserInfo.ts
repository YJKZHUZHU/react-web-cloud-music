import { appState } from '@/models/gloable'
import API from '@/api'
import { message } from 'antd'

export const getUserInfo = async () => {
  const Ret: any = await API.status({ loading: true })
  if(Ret.code !== 200){
    return [false,'服务器开小差了，再试一次哦']
  }
  const loginRet: any = await API.useInfo({ uid: Ret.profile.userId })
  const RecordRet = await API.getPlayRecord({ uid: Ret.profile.userId, type: 0 }) //type:0 所有 1 一周
  await appState.setAllPlayRecord(RecordRet.allData)
  await appState.setLoginStatus(true)
  await appState.setUserInfo(loginRet)
  await appState.setUserId(loginRet.userPoint.userId)
  const playListRet: any = await API.userPlaylist({ uid: loginRet.userPoint.userId })
  if (playListRet.code === 200) {
    await appState.setPlayList(playListRet.playlist)
  }
  return [true,'']
}

export default {getUserInfo}
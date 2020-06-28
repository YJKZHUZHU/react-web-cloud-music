import { appState } from '@/models/gloable'
import API from '@/api'

export const getUserInfo = async () => {
  const Ret: any = await API.status({ loading: true })
  if(Ret.code !== 200){
    return [false,'服务器开小差了，再试一次哦']
  }
  const loginRet: any = await API.useInfo({ uid: Ret.profile.userId })
  const RecordRet = await API.getPlayRecord({ uid: Ret.profile.userId, type: 0 }) //type:0 所有 1 一周
  const playListRet: any = await API.userPlaylist({ uid: loginRet.userPoint.userId })
  await appState.setUserInfo(loginRet)
  await appState.setUserId(loginRet.userPoint.userId)
  await appState.setAllPlayRecord(RecordRet.allData)
  if (playListRet.code === 200) {
    await appState.setPlayList(playListRet.playlist)
  }
  await appState.setLoginStatus(true)
  return [true,'']
}

export default {getUserInfo}
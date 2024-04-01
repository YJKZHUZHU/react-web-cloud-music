import { request } from '@umijs/max'
import { service } from '@/help/server'
import { AccountData, IAccountInfo, ISongListItem, IUserInfo, IVipInfo, ProfileData } from '@/store/user'

enum FetchEnum {
  loginByEmail = "/login",
  loginByPhone = "/login/cellphone",
  loginStatus = "/login/status",
  userDetail = "/user/detail",
  accountDetail = "/user/account",
  anonimous = "/register/anonimous",
  logout = "/logout",
  vipGrowthpoint = "/vip/growthpoint",
  userLevel = "/user/level",
  userPlaylist = '/user/playlist',
}

interface ILoginRes {
  code: number // 状态码
  account: AccountData // 账户信息
  profile: ProfileData // 用户资料信息
}

export const accountDetail = () => {
  return service<IAccountInfo>(FetchEnum.accountDetail)
}

export const userDetail = (data: { uid: string }) => {
  return service<IUserInfo>(FetchEnum.userDetail, data)
}


export const loginStatus = () => {
  return service<ILoginRes>(FetchEnum.loginStatus,)
}

interface IAnonimousResp {
  cookie: string
  createTime: number
  userId: number
}
/** 游客登录 */
export const anonimous = () => {
  return service<IAnonimousResp>(FetchEnum.anonimous)
}

export const vipGrowthpoint = () => {
  return service<IVipInfo>(FetchEnum.vipGrowthpoint)
}




// 用户歌单
export const userPlaylist = (data: { uid: string }) => {
  return service<{ playlist: ISongListItem[] }>(FetchEnum.userPlaylist, data)
}
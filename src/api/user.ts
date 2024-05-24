/** @format */

import {EnumLocalStorage, getItem} from "@/help/cache"
import {service} from "@/help/server"
import {
  AccountData,
  IAccountInfo,
  IAllPlayRecordItem,
  ISongListItem,
  ISubCountInfo,
  IUserInfo,
  IVipInfo,
  ProfileData
} from "@/store/user"

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
  userPlaylist = "/user/playlist",
  userRecord = "/user/record",
  daily_signin = "/daily_signin",
  userSubcount = "/user/subcount"
}

interface ILoginRes {
  code: number // 状态码
  account: AccountData // 账户信息
  profile: ProfileData // 用户资料信息
}

export const accountDetail = () => {
  return service<IAccountInfo>(FetchEnum.accountDetail, {cookie: getItem(EnumLocalStorage.cookie)})
}

export const userDetail = (data: {uid: string}) => {
  return service<IUserInfo>(FetchEnum.userDetail, data)
}

export const loginStatus = () => {
  return service<ILoginRes>(FetchEnum.loginStatus, {cookie: getItem(EnumLocalStorage.cookie)})
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
export const userPlaylist = (data: {uid: string}) => {
  return service<{playlist: ISongListItem[]}>(FetchEnum.userPlaylist, data)
}

// 用户播放记录 type:0 所有 1 一周
export const userRecord = (data: {uid: string | number; type: 0 | 1}) => {
  return service<{allData: IAllPlayRecordItem[]; code: number}>(FetchEnum.userRecord, data)
}

// 签到 type: 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到
export const dailySignin = (data: {type: number}) => {
  return service<{code: number; point: number}>(FetchEnum.daily_signin, {
    ...data,
    cookie: getItem(EnumLocalStorage.cookie)
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const userSubcount = () => {
  return service<ISubCountInfo>(FetchEnum.userSubcount, {
    cookie: getItem(EnumLocalStorage.cookie)
  })
}

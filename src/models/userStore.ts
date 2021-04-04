import { Effect, ImmerReducer, Subscription } from 'umi'
import API from '@/api'

export interface ICreator {
  accountStatus: number
  anchor: boolean
  authStatus: number
  authenticationTypes: number
  authority: number
  avatarDetail: any
  avatarImgId: number
  avatarImgIdStr: string
  avatarImgId_str: string
  avatarUrl: string
  backgroundImgId: number
  backgroundImgIdStr: string
  backgroundUrl: string
  birthday: number
  city: number
  defaultAvatar: boolean
  description: string
  detailDescription: string
  djStatus: number
  expertTags: any
  experts: any
  followed: boolean
  gender: number
  mutual: boolean
  nickname: string
  province: number
  remarkName: any
  signature: string
  userId: number
  userType: number
  vipType: number
  [props: string]: any
}
export interface IPlayListItem {
  adType: number
  anonimous: boolean
  artists: any
  backgroundCoverId: number
  backgroundCoverUrl: any
  cloudTrackCount: number
  commentThreadId: string
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  createTime: number
  creator: ICreator
  description: string
  englishTitle: any
  highQuality: boolean
  id: number
  name: string
  newImported: boolean
  opRecommend: boolean
  ordered: boolean
  playCount: number
  privacy: number
  recommendInfo: any
  specialType: number
  status: number
  subscribed: boolean
  subscribedCount: number
  subscribers: any[]
  tags: any[]
  titleImage: number
  titleImageUrl: any
  totalDuration: number
  trackCount: number
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: any
  updateFrequency: any
  updateTime: number
  userId: number
  [props: string]: any
}
export interface IPlayList {
  creator: IPlayListItem[]
  favorite: IPlayListItem[]
}
export interface AllPlayRecordInterface {
  playCount: string
  score: string
  song: { [propName: string]: string }
}
export interface UserModelState {
  userInfo?: any, //用户信息
  loginStatus?: boolean, //登录状态
  userId?: number | string //用户Idp
  allPlayRecord: AllPlayRecordInterface[]
  playList: IPlayList
}


export interface UserModelType {
  namespace: 'userModel'
  state: UserModelState
  effects: {
    getUserInfo: Effect
    getPlayList: Effect
  }
  reducers: {
    initUserInfo: ImmerReducer<UserModelState>
    setPlayList: ImmerReducer<UserModelState>
  },
  subscriptions?: { setup: Subscription };
}

const UserModel: UserModelType = {
  namespace: 'userModel',

  state: {
    userInfo: {},
    loginStatus: false,
    userId: '',
    allPlayRecord: [],
    playList: { creator: [], favorite: [] }
  },

  effects: {
    *getUserInfo({ payload }, { call, put }) {
      const StatusRet = yield call(API.status)
      if (StatusRet?.data.code !== 200 || !StatusRet?.data?.profile) return [false, '服务器开小差了，再试一次哦']

      const { userId } = StatusRet?.data?.profile
      const LoginRet = yield call(API.useInfo, { uid: userId })
      const RecordRet = yield call(API.getPlayRecord, { uid: userId, type: 0 }) //type:0 所有 1 一周
      const playListRet = yield call(API.userPlaylist, { uid: userId })
      yield put({
        type: 'initUserInfo',
        payload: {
          userInfo: LoginRet,
          userId,
          loginStatus: true,
          allPlayRecord: RecordRet.allData,
          playList: playListRet.playlist
        }
      })
      return {
        creator: playListRet.playlist.filter((item: any) => !item.subscribed),
        favorite: playListRet.playlist.filter((item: any) => item.subscribed)
      }
    },
    *getPlayList({ payload }, { call, put, select }) {
      const { userId } = yield select((state: any): UserModelState => state.userModel)
      const Ret = yield call(API.userPlaylist, { uid: userId })
      if (Ret.code === 200) {
        yield put({
          type: 'setPlayList',
          payload: {
            playList: Ret.playlist
          }
        })
      }
    }
  },
  reducers: {
    initUserInfo(state, action) {
      const { userInfo, loginStatus, userId, playList, allPlayRecord } = action.payload
      state.userInfo = userInfo
      state.loginStatus = loginStatus
      state.userId = userId
      state.allPlayRecord = allPlayRecord
      state.playList.creator = playList.filter((item: any) => !item.subscribed)
      state.playList.favorite = playList.filter((item: any) => item.subscribed)
    },
    setPlayList(state, action) {
      const { playList } = action.payload
      state.playList = {
        creator: playList.filter((item: any) => !item.subscribed),
        favorite: playList.filter((item: any) => item.subscribed)
      }
    }
  }
}

export default UserModel

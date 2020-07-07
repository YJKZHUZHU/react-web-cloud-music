import { Effect, ImmerReducer, Subscription } from 'umi'
import API from '@/api'
interface IPlayList {
  creator: any[]
  favorite: any[]
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
      if (StatusRet.code !== 200) {
        return [false, '服务器开小差了，再试一次哦']
      }
      const { userId } = StatusRet.profile
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
  },
  // subscriptions: {// 订阅，在app.start()即启动项目时被执行
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname }) => {
  //       // 进入 '/recommend/findMusic' 路由，会发起一个名叫 'save' 的 effect
  //       if (pathname === '/recommend/findMusic') {
  //         console.log('来了吗')
  //         dispatch({ type: 'getUserInfo' })
  //       }
  //     })
  //   }
  // }
}

export default UserModel

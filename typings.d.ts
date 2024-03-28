import '@umijs/max/typings';




declare interface IState {
  playmodel: PlayModelState
  songInfoModel: SongInfoModelState
  userModel: UserModelState
  loading: {
    [props: string]: any
    global: boolean
    models: {
      userModel: boolean
      [props: string]: any
    }
    effects: {
      "userModel/getUserInfo": boolean
      "userModel/getPlayList": boolean
    }
  }
}

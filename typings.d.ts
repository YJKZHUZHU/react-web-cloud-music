import '@umijs/max/typings';



// import {PlayModelState, SongInfoModelState, UserModelState} from "umi"


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

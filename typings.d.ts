/** @format */

import {PlayModelState, SongInfoModelState, UserModelState} from "umi"

declare module "*.css"
declare module "*.png"
declare module "*.scss"
declare module "*.json"
declare module "Ripple"
declare module "video-react"
declare module "Ripple"

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

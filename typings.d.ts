import { PlayModelState, SongInfoModelState, UserModelState } from 'umi'

declare module '*.css'
declare module '*.png'
declare module '*.scss'
declare module '*.json'
declare module 'Ripple'
// declare module 'video-react'


export interface IState {
  playmodel: PlayModelState
  songInfoModel: SongInfoModelState
  userModel: UserModelState
}

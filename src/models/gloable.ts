import { Container } from 'unstated'

export interface SingerInterface {
  alias?: any[]
  id?: number
  name?: string
  tns?: any[]
}
export interface SongInterface {
  url?: string,
  id?: number
  name?: string
  singerArr?: SingerInterface[]
  songTime?: number
  backgroundImg?: string
}
export interface PlayerInterface {
  loaded?: number
  loadedSeconds?: number
  played?: number
  playedSeconds?: number
}
export interface LyricInterface {
  time?: number
  lyc?: string
}
export interface PlayRecordInterface {
  title: string
  singer: string
  time: string
  id: number
  [propName: string]: any
}

export interface AllPlayRecordInterface {
  playCount: string
  score: string
  song: { [propName: string]: string }
}

export enum playModeEnum {
  InOrder,//顺序播放
  SingleCycle,//循环播放
  ShufflePlayback//随机播放
}
export enum PlayerRateEnum {//倍速
  Multiple_1 = 1,
  Multiple_1_2 = 1.2,
  Multiple_1_5 = 1.5,
  Multiple_2 = 2
}


export interface AppState {
  loading: boolean
}

export default class AppContainer extends Container<AppState> {
  state: AppState = {
    loading: false,
  }

  setLoading = (loading: boolean) => {
    console.log(loading)
    if (loading === this.state.loading) {
      return false
    }
    return this.setState({
      loading
    })
  }
}

export const appState = new AppContainer()

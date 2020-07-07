import { Container } from 'unstated'
import store from '@/help/localStorage'
import Utils from '@/help/index'
import PlayList from '@/pages/playList'
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
  loading?: boolean,
  globalLoading?: boolean,
  songObj?: SongInterface,
  isPlay?: boolean,
  playerObj?: PlayerInterface,
  lyric?: LyricInterface[],
  showPlayer?: boolean,
  volume?: number,
  playMode?: playModeEnum, //0 顺序播放 1 单曲循环 2 随机播放
  playerRate?: PlayerRateEnum //播放速度,
  keywords?: string //搜索关键词,
  userInfo?: any, //用户信息
  loginStatus?: boolean, //登录状态
  userId?: number | string //用户Id
  playList?: { creator: any[], favorite: any[] },
  playHistory?: PlayRecordInterface[]//播放历史
  showPlayRecord?: boolean
  playRecord?: PlayRecordInterface[]
  playRecordTip?: string
  allPlayRecord: AllPlayRecordInterface[]
}

export default class AppContainer extends Container<AppState> {

  state: AppState = {
    songObj: {},// false
    isPlay: false,// false
    userInfo: {},// false
    loginStatus: false,// false
    userId: '',// false
    lyric: [],// false
    playList: { creator: [], favorite: [] },// false
    playHistory: store.getValue('playHistory') || [], // false
    showPlayRecord: false,// false
    playRecordTip: '',// false
    allPlayRecord: [],//false

    showPlayer: false,
    playerObj: {},
    volume: store.getValue('volume'), //默认音量
    playMode: 0,
    playerRate: 1,

    keywords: '',// false
    playRecord: [],// false

    loading: false,
    globalLoading: false
  }


  setLoading = (loading: boolean) => {
    if (loading === this.state.loading) {
      return false
    }
    return this.setState({
      loading
    })
  }

  setShowPlayRecord = (showPlayRecord: boolean) => this.setState({ showPlayRecord })

  setGlobalLoading = (globalLoading: boolean) => this.setState({ globalLoading })

  setSongObj = (songObj: SongInterface) => this.setState({ songObj })

  setStopPlay = (isPlay: boolean) => this.setState({ isPlay })

  setPlayerObj = (playerObj: PlayerInterface) => this.setState({ playerObj })

  setLyric = (lyric: LyricInterface[]) => this.setState({ lyric })

  setShowPlayer = (showPlayer: boolean) => this.setState({ showPlayer })

  setVolume = (volume: number) => {
    store.setValue('volume', volume)
    return this.setState({ volume })
  }

  setPlayMode = (playMode: playModeEnum) => this.setState({ playMode })

  setPlayRate = (playerRate: PlayerRateEnum) => this.setState({ playerRate })

  setKeywords = (keywords: string) => {
    store.setValue('keywords', keywords)
    return this.setState({ keywords })
  }

  setUserInfo = (userInfo: any) => this.setState({ userInfo })

  setLoginStatus = (loginStatus: boolean) => this.setState({ loginStatus })

  setUserId = (userId: string | number) => this.setState({ userId })

  setPlayList = (playList: any[]) => {
    return this.setState({
      playList: {
        creator: playList.filter((item: any) => !item.subscribed),
        favorite: playList.filter((item: any) => item.subscribed)
      }
    })
  }

  setPlayHistory = (record: any) => {
    const [songObj] = record.songs
    const playHistory = Utils.removeRepeat([...store.getValue('playHistory'), songObj], 'id')

    store.setValue('playHistory', playHistory)

    return this.setState({ playHistory })
  }
  setPlayRecord = (playRecord: PlayRecordInterface[]) => {
    this.setState({ playRecord: Utils.removeRepeat((this.state.playRecord?.concat(playRecord) as PlayRecordInterface[]), 'id') })
  }
  setPlayRecordTip = (tip: string) => this.setState({ playRecordTip: tip })

  setAllPlayRecord = (allPlayRecord: AllPlayRecordInterface[]) => this.setState({ allPlayRecord })
}

export const appState = new AppContainer()

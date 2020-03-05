import {Container} from 'unstated'
import store from '@/help/localStorage'


interface AppState {
  loading: boolean,
  globalLoading: boolean,
  songObj: any,
  isPlay: boolean,
  playerObj: any,
  lyric: Array<any>,
  showPlayer: boolean,
  volume: number,
  playMode: number, //0 顺序播放 1 单曲循环 2 随机播放
  playerRate: number //播放速度
}

export default class AppContainer extends Container<AppState> {

  state: AppState = {
    loading: false,
    globalLoading: false,
    songObj: {},
    isPlay: false,
    playerObj: {},
    lyric: [],
    showPlayer: false,
    volume: JSON.parse(<string>store.getStorage('volume')), //默认音量
    playMode: 0,
    playerRate: 1
  }


  setLoading(loading: boolean) {
    if (loading === this.state.loading) {
      return false
    }
    return this.setState({
      loading: loading
    })
  }

  setGlobalLoading(globalLoading: boolean) {
    return this.setState({
      globalLoading
    })
  }

  setSongObj(songObj: any) {
    return this.setState({songObj})
  }

  setStopPlay(isPlay: boolean) {
    return this.setState({isPlay})
  }

  setPlayerObj(playerObj: any) {
    return this.setState({playerObj})
  }

  setLyric(lyric: any) {
    console.log(lyric)
    return this.setState({lyric})
  }

  setShowPlayer(showPlayer: boolean) {
    return this.setState({showPlayer})
  }

  setVolume(volume: number) {
    store.setStorage('volume', volume)
    return this.setState({volume})
  }

  setPlayMode(playMode:number) {
    return this.setState({playMode})
  }
  setPlayRate(playerRate:number){
    return this.setState({playerRate})
  }

}

export const appState = new AppContainer()

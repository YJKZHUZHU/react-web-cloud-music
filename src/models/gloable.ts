import {Container} from 'unstated'

interface AppState {
  loading: boolean,
  globalLoading: boolean,
  songObj: any,
  isPlay: boolean,
  playerObj: any,
  lyric: Array<any>,
  showPlayer: boolean
}

export default class AppContainer extends Container<AppState> {

  state: AppState = {
    loading: false,
    globalLoading: false,
    songObj: {},
    isPlay: false,
    playerObj: {},
    lyric: [],
    showPlayer: false
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

  setLyric(lyric:any) {
    console.log(lyric)
    return this.setState({lyric})
  }

  setShowPlayer(showPlayer:boolean){
    return this.setState({showPlayer})
  }

}

export const appState = new AppContainer()

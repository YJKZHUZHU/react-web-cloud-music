import { ImmerReducer } from 'umi'
import store from '@/help/localStorage'
export interface PlayerInterface {
  loaded: number
  loadedSeconds: number
  played: number
  playedSeconds: number
}
export interface PlayModelState {
  showPlayer: boolean
  playerObj: PlayerInterface
  volume: number
  playMode: number
  playerRate: number
}

export interface PlayModelType {
  namespace: 'playmodel'
  state: PlayModelState
  reducers: {
    setShowPlayer: ImmerReducer<PlayModelState>
    setPlayerObj: ImmerReducer<PlayModelState>
    setVolume: ImmerReducer<PlayModelState>
    setPlayMode: ImmerReducer<PlayModelState>
    setPlayRate: ImmerReducer<PlayModelState>
  }
}

const PlayModel: PlayModelType = {
  namespace: 'playmodel',
  state: {
    showPlayer: false,
    playerObj: {} as PlayerInterface,
    volume: store.getValue('volume'), //默认音量
    playMode: 0,
    playerRate: 1,
  },
  reducers: {
    setShowPlayer(state, action) {
      const { showPlayer } = action.payload
      state.showPlayer = showPlayer
    },
    setPlayerObj(state, action) {
      const { playerObj } = action.payload
      state.playerObj = playerObj
    },
    setVolume(state, action) {
      const { volume } = action.payload
      store.setValue('volume', volume)
      state.volume = volume
    },
    setPlayMode(state, action) {
      const { playMode } = action.payload
      state.playMode = playMode
    },
    setPlayRate(state, action) {
      const { playerRate } = action.payload
      state.playerRate = playerRate
    }
  }
}

export default PlayModel
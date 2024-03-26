import { ImmerReducer } from '@umijs/max'
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
  playMode: number
  playerRate: number
}

export interface PlayModelType {
  namespace: 'playmodel'
  state: PlayModelState
  reducers: {
    setShowPlayer: ImmerReducer<PlayModelState>
    setPlayerObj: ImmerReducer<PlayModelState>
    setPlayMode: ImmerReducer<PlayModelState>
    setPlayRate: ImmerReducer<PlayModelState>
  }
}

const PlayModel: PlayModelType = {
  namespace: 'playmodel',
  state: {
    showPlayer: false,
    playerObj: {} as PlayerInterface,
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
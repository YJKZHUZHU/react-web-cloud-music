import { Effect, ImmerReducer } from 'umi'
import API from '@/api'

export interface SongInfoModelState {
  songObj: any
  lyric: any
  playHistory: any
  isPlay: boolean
  showPlayRecord: boolean
  playRecordTip: string
}
export interface SongInfoModeType {
  namespace: 'songInfoModel'
  state: SongInfoModelState
  effects: {
    getSongInfo: Effect
  }
  reducers: {
    initSongInfo: ImmerReducer<SongInfoModelState>
    setIsPlay: ImmerReducer<SongInfoModelState>
    setShowPlayRecord: ImmerReducer<SongInfoModelState>
    setPlayRecordTip: ImmerReducer<SongInfoModelState>
  }
}

const SongInfoModel: SongInfoModeType = {
  namespace: 'songInfoModel',
  state: {
    songObj: '',
    lyric: '',
    playHistory: '',
    isPlay: false,
    showPlayRecord: false,
    playRecordTip: ''
  },
  effects: {
    *getSongInfo({ payload }, { call, put }) {
      const { id } = payload
      const PlayRet = yield call(API.playSong, { id })
      const SongRet = yield call(API.song, { ids: id })
      const LyricRet = yield call(API.getLyric, { id })
      yield put({
        type: 'initSongInfo',
        payload: { PlayRet, SongRet, LyricRet, isPlay:true }
      })
      // yield put({
      //   type: 'setIsPlay',
      //   payload: {
      //     isPlay: true
      //   }
      // })
    }

  },
  reducers: {
    initSongInfo(state, action) {
      const { PlayRet, SongRet, LyricRet, isPlay } = action.payload
      console.log(isPlay)
      state.songObj = {
        url: PlayRet.data[0].url,
        id: PlayRet.data[0].id,
        backgroundImg: SongRet.songs[0].al.picUrl,
        name: SongRet.songs[0].name,
        songTime: SongRet.songs[0].dt / 1000,
        singerArr: SongRet.songs[0].ar
      }
      state.playHistory = SongRet
      state.isPlay = isPlay
      state.lyric = LyricRet
    },
    setIsPlay(state, action) {
      state.isPlay = action.payload.isPlay
    },
    setShowPlayRecord(state, action) {
      state.showPlayRecord = action.payload.showPlayRecord
    },
    setPlayRecordTip(state, action) {
      state.playRecordTip = action.payload.playRecordTip
    }
  }
}

export default SongInfoModel
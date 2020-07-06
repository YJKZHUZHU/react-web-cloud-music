import { Effect, ImmerReducer } from 'umi'
import API from '@/api'
import store from '@/help/localStorage'
import Utils from '@/help'

interface PlayRecordInterface {
  title: string
  singer: string
  time: string
  id: number
  [propName: string]: any
}

export interface SongInfoModelState {
  songObj: any
  lyric: any
  playHistory: any
  isPlay: boolean
  showPlayRecord: boolean
  playRecordTip: string
  keywords: string
  playRecord: PlayRecordInterface[]
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
    setKeywords: ImmerReducer<SongInfoModelState>
    setPlayRecord: ImmerReducer<SongInfoModelState>
  }
}

const SongInfoModel: SongInfoModeType = {
  namespace: 'songInfoModel',
  state: {
    songObj: '',
    lyric: '',
    playHistory: store.getValue('playHistory') || [],
    isPlay: false,
    showPlayRecord: false,
    playRecordTip: '',
    keywords: '',
    playRecord: []
  },
  effects: {
    *getSongInfo({ payload }, { call, put, select }) {
      const { id } = payload
      const PlayRet = yield call(API.playSong, { id })
      const SongRet = yield call(API.song, { ids: id })
      const LyricRet = yield call(API.getLyric, { id })
      const [songObj] = SongRet.songs
      const { playHistory } = yield select((state: any): SongInfoModelState => state.songInfoModel)
      yield put({
        type: 'initSongInfo',
        payload: { PlayRet, SongRet, LyricRet, isPlay: true, playHistory: Utils.removeRepeat([...playHistory, songObj], 'id') }
      })
    }

  },
  reducers: {
    initSongInfo(state, action) {
      const { PlayRet, SongRet, LyricRet, isPlay, playHistory } = action.payload
      console.log(isPlay)
      state.songObj = {
        url: PlayRet.data[0].url,
        id: PlayRet.data[0].id,
        backgroundImg: SongRet.songs[0].al.picUrl,
        name: SongRet.songs[0].name,
        songTime: SongRet.songs[0].dt / 1000,
        singerArr: SongRet.songs[0].ar
      }
      state.playHistory = playHistory
      state.isPlay = isPlay
      state.lyric = LyricRet
      store.setValue('playHistory',playHistory)
    },
    setIsPlay(state, action) {
      state.isPlay = action.payload.isPlay
    },
    setShowPlayRecord(state, action) {
      state.showPlayRecord = action.payload.showPlayRecord
    },
    setPlayRecordTip(state, action) {
      state.playRecordTip = action.payload.playRecordTip
    },

    setKeywords(state, action) {
      const keywords = action.payload
      store.setValue('keywords', keywords)
      state.keywords = keywords
    },

    setPlayRecord(state, action) {
      console.log(state, action)
      const { playRecord } = action.payload
      state.playRecord = playRecord
    }

  }
}

export default SongInfoModel
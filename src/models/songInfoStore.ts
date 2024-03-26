import { Effect, ImmerReducer } from '@umijs/max'
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
export interface LyricInterface {
  time?: number
  lyc?: string
}
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

export interface SongInfoModelState {
  songObj: SongInterface
  lyric: LyricInterface[]
  playHistory: PlayRecordInterface[]
  isPlay: boolean
  showPlayRecord: boolean
  playRecordTip: string
  keywords: string
  playRecord: PlayRecordInterface[]
  songId: number
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
    songObj: {},
    lyric: [],
    playHistory: store.getValue('playHistory') || [],
    isPlay: false,
    showPlayRecord: false,
    playRecordTip: '',
    keywords: '',
    playRecord: [],
    songId: 0
  },
  effects: {
    *getSongInfo({ payload }, { call, put, select }) {
      const { playHistory, songObj: songInfo } = yield select((state: any): SongInfoModelState => state.songInfoModel)
      if (songInfo.id === payload?.id) return false
      const { id } = payload
      const PlayRet = yield call(API.playSong, { id })
      const SongRet = yield call(API.song, { ids: id })
      const LyricRet = yield call(API.getLyric, { id })
      const [songObj] = SongRet.songs
      const lyric = Utils.formatterLyric(LyricRet.lrc ? LyricRet.lrc.lyric : '')
      yield put({
        type: 'initSongInfo',
        payload: { id, PlayRet, SongRet, lyric, isPlay: true, playHistory: Utils.removeRepeat([...playHistory, songObj], 'id') }
      })
    }

  },
  reducers: {
    initSongInfo(state, action) {
      const { PlayRet, SongRet, lyric, isPlay, playHistory, id } = action.payload
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
      state.lyric = lyric
      state.songId = id
      store.setValue('playHistory', playHistory)
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
      const { playRecord } = action.payload
      state.playRecord = playRecord
    }
  }
}

export default SongInfoModel
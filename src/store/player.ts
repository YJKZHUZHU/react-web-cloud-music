/** @format */

import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { getSongDetail, checkMusic, getLyric, getSongUrl } from "@/api/plyer"
import Utils from "@/help"

export interface IPlayerObj {
  loaded: number
  loadedSeconds: number
  played: number
  playedSeconds: number
}

export enum PlayerModeEnum {
  /**顺序播放 */
  order,
  /**单曲循环 */
  cycle,
  /**随机播放 */
  random
}

export interface ISingerArrItem {
  alias?: any[]
  id?: number
  name?: string
  tns?: any[]
}

export interface ISongObj {
  url?: string
  id?: number
  name?: string
  singerArr?: ISingerArrItem[]
  songTime?: number
  backgroundImg?: string
}

export interface ILyricItem {
  time?: number
  lyc?: string
}

interface IPlayHistoryItem {
  title: string
  singer: string
  time: string
  id: number
  [propName: string]: any
}

interface IPlayRecordItem {
  title: string
  singer: string
  time: string
  id: number
  [propName: string]: any
}

export interface ISongsItem {
  name: string // 歌曲名称
  id: number // 歌曲ID
  pst: number // 歌曲属性，可能与版权有关
  t: number // 歌曲类型
  ar: Artist[] // 艺术家信息列表
  alia: string[] // 歌曲别名列表
  pop: number // 歌曲流行度
  st: number // 歌曲状态
  rt: string // 歌曲跳转地址
  fee: number // 歌曲收费等级
  v: number // 歌曲版本
  crbt: any | null // 高音质信息，具体类型未知
  cf: string // 歌曲版权信息
  al: Album // 专辑信息
  dt: number // 歌曲时长，单位为毫秒
  h: MusicQuality // 高品质音乐信息
  m: MusicQuality // 中品质音乐信息
  l: MusicQuality // 低品质音乐信息
  sq: MusicQuality // 超高品质音乐信息
  hr: any | null // 超高音质信息，具体类型未知
  a: any | null // 未知信息
  cd: string // 唱片编号
  no: number // 歌曲编号
  rtUrl: string | null // 相关URL
  ftype: number // 文件类型
  rtUrls: string[] // 相关URL列表
  djId: number // 音乐DJ ID
  copyright: number // 版权信息
  s_id: number // 歌曲ID的字符串形式
  mark: number // 标记
  originCoverType: number // 原始封面类型
  originSongSimpleData: any | null // 原始歌曲简单数据，具体类型未知
  tagPicList: any | null // 标签图片列表，具体类型未知
  resourceState: boolean // 资源状态
  version: number // 版本
  songJumpInfo: any | null // 歌曲跳转信息，具体类型未知
  entertainmentTags: any | null // 娱乐标签，具体类型未知
  awardTags: any | null // 获奖标签，具体类型未知
  single: number // 是否单曲
  noCopyrightRcmd: any | null // 无版权推荐信息，具体类型未知
  mv: number // 音乐视频ID
  rtype: number // 推荐类型
  rurl: string | null // 推荐URL
  mst: number // 状态
  cp: number // 版权
  publishTime: number // 发行时间，单位为毫秒
  tns: string[] // 翻译名称列表
}

interface Artist {
  id: number // 艺术家ID
  name: string // 艺术家名称
  tns: string[] // 艺术家别名列表
  alias: string[] // 艺术家别名列表
}

interface Album {
  id: number // 专辑ID
  name: string // 专辑名称
  picUrl: string // 专辑封面图片URL
  tns: string[] // 专辑别名列表
  pic_str: string // 专辑图片字符串ID
  pic: number // 专辑图片ID
}

interface MusicQuality {
  br: number // 比特率
  fid: number // 文件ID
  size: number // 文件大小，单位为字节
  vd: number // 版本号
  sr: number // 采样率
}

export interface IPrivilegeItem {
  id: number // 特权ID
  fee: number // 费用等级
  payed: number // 是否已付费
  st: number // 状态
  pl: number // 高品质播放特权
  dl: number // 高品质下载特权
  sp: number // 单曲特权
  cp: number // 版权特权
  subp: number // 订阅特权
  cs: boolean // 是否可以免费试听
  maxbr: number // 最高比特率
  fl: number // 文件品质
  toast: boolean // 是否有toast提示
  flag: number // 标记
  preSell: boolean // 是否预售
  playMaxbr: number // 播放最高比特率
  downloadMaxbr: number // 下载最高比特率
  maxBrLevel: string // 最高比特率等级
  playMaxBrLevel: string // 播放最高比特率等级
  downloadMaxBrLevel: string // 下载最高比特率等级
  plLevel: string // 播放品质等级
  dlLevel: string // 下载品质等级
  flLevel: string // 文件品质等级
  rscl: any | null // 相关推荐，具体类型未知
  freeTrialPrivilege: {
    resConsumable: boolean // 资源是否可消耗
    userConsumable: boolean // 用户是否可消耗
    listenType: any // 试听类型，具体类型未知
    cannotListenReason: any // 不可试听原因，具体类型未知
    playReason: any // 播放原因，具体类型未知
  }
  rightSource: number // 权限来源
  chargeInfoList: {
    rate: number // 比特率
    chargeUrl: string | null // 收费URL
    chargeMessage: string | null // 收费信息
    chargeType: number // 收费类型
  }[]
}

export interface ISongUrl {
  /**
   * 音频ID
   */
  id: number
  /**
   * 音频URL
   */
  url: string
  /**
   * 比特率
   */
  br: number
  /**
   * 文件大小
   */
  size: number
  /**
   * MD5哈希值
   */
  md5: string
  /**
   * 响应状态码
   */
  code: number
  /**
   * 过期时间
   */
  expi: number
  /**
   * 类型
   */
  type: string
  /**
   * 增益
   */
  gain: number
  /**
   * 峰值
   */
  peak: number
  /**
   * 付费费用
   */
  fee: number
  /**
   * 用户付费标识
   */
  uf: null
  /**
   * 是否已付费
   */
  payed: number
  /**
   * 标志位
   */
  flag: number
  /**
   * 是否可扩展
   */
  canExtend: boolean
  /**
   * 免费试用信息
   */
  freeTrialInfo: null
  /**
   * 音频质量等级
   */
  level: string
  /**
   * 编码类型
   */
  encodeType: string
  /**
   * 声道布局
   */
  channelLayout: null
  /**
   * 免费试用特权
   */
  freeTrialPrivilege: {
    /**
     * 资源是否可消耗
     */
    resConsumable: boolean
    /**
     * 用户是否可消耗
     */
    userConsumable: boolean
    /**
     * 可听类型
     */
    listenType: null
    /**
     * 无法播放的原因
     */
    cannotListenReason: null
    /**
     * 播放原因
     */
    playReason: null
  }
  /**
   * 免费时间试用特权
   */
  freeTimeTrialPrivilege: {
    /**
     * 资源是否可消耗
     */
    resConsumable: boolean
    /**
     * 用户是否可消耗
     */
    userConsumable: boolean
    /**
     * 类型
     */
    type: number
    /**
     * 剩余时间
     */
    remainTime: number
  }
  /**
   * URL来源
   */
  urlSource: number
  /**
   * 权限来源
   */
  rightSource: number
  /**
   * Podcast CTRP
   */
  podcastCtrp: null
  /**
   * 音效类型
   */
  effectTypes: null
  /**
   * 时长（毫秒）
   */
  time: number
  /**
   * 消息
   */
  message: null
}

export interface ILyrics {
  /**
   * 是否包含简体歌词
   */
  sgc: boolean
  /**
   * 是否包含翻译歌词
   */
  sfy: boolean
  /**
   * 是否包含歌词翻译后的歌词
   */
  qfy: boolean
  /**
   * 歌词信息 - 歌词文本
   */
  lrc: {
    /**
     * 歌词版本
     */
    version: number
    /**
     * 歌词内容
     */
    lyric: string
  }
  /**
   * 歌词信息 - 翻译歌词文本
   */
  klyric: {
    /**
     * 歌词版本
     */
    version: number
    /**
     * 歌词内容
     */
    lyric: string
  }
  /**
   * 歌词信息 - 歌词翻译后的歌词文本
   */
  tlyric: {
    /**
     * 歌词版本
     */
    version: number
    /**
     * 歌词内容
     */
    lyric: string
  }
  /**
   * 歌词信息 - 罗马音歌词文本
   */
  romalrc: {
    /**
     * 歌词版本
     */
    version: number
    /**
     * 歌词内容
     */
    lyric: string
  }
  /**
   * 响应状态码
   */
  code: number
}

interface Props {
  showPlayer: boolean
  playerObj: IPlayerObj
  playerMode: PlayerModeEnum
  playerRate: number
  songObj: ISongObj
  lyric: ILyricItem[]
  playHistory: IPlayHistoryItem[]
  isPlay: boolean
  showPlayRecord: boolean
  playRecordTip: string
  keywords: string
  playRecord: IPlayRecordItem[]
  songId: number
}

interface Actions {
  setShowPlayer: (showPlayer: boolean) => void
  setPlayerObj: (playerObj: IPlayerObj) => void
  setPlayerMode: (playMode: PlayerModeEnum) => void
  setPlayRate: (playerRate: number) => void
  getSongInfo: (id: number) => void
  setIsPlay: (isPlay: boolean) => void
  setShowPlayRecord: (showPlayRecord: boolean) => void
  setPlayRecordTip: (playRecordTip: string) => void
  setKeywords: (keywords: string) => void
  setPlayRecord: (playRecord: IPlayRecordItem[]) => void
}

export enum MusicLevelEnum {
  /** 标准 */
  standard = "standard",
  /** 较高 */
  higher = "higher",
  /** 极高 */
  exhigh = "exhigh",
  /** 无损 */
  lossless = "lossless",
  /** Hi-Res */
  hires = "hires",
  /** 高清环绕声 */
  jyeffect = "jyeffect",
  /** 沉浸环绕声 */
  sky = "sky",
  /** 超清母带 */
  jymaster = "jymaster"
}

const initialState: Props = {
  showPlayer: false,
  playerObj: {} as IPlayerObj,
  playerMode: PlayerModeEnum.order,
  playerRate: 1,
  songObj: {},
  lyric: [],
  playHistory: [],
  isPlay: false,
  showPlayRecord: false,
  playRecordTip: "",
  keywords: "",
  playRecord: [],
  songId: 0
}

export const usePlayer = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setShowPlayer: (showPlayer) => {
          set({ showPlayer }, false, "是否显示播放界面")
        },
        setPlayerObj: (playerObj) => {
          set({ playerObj })
        },
        setPlayerMode: (playerMode) => {
          set({ playerMode })
        },
        setPlayRate: (playerRate) => {
          set({ playerRate })
        },
        getSongInfo: async (id) => {
          try {
            // const { playHistory, songObj: songInfo } = yield select((state: any): SongInfoModelState => state.songInfoModel)
            const playHistory = get().playHistory
            const songInfo = get().songObj
            if (songInfo.id === id) return false
            const check = await checkMusic({ id })
            console.log("check", check)
            const songUrlRes = await getSongUrl({ id, level: MusicLevelEnum.standard })
            const songDetailRes = await getSongDetail({ ids: id })
            const lyricRes = await getLyric({ id })
            const songDetail = songDetailRes.data.songs[0]
            const lyric = Utils.formatterLyric(lyricRes.data.lrc ? lyricRes.data.lrc.lyric : "")
            console.log("播放信息", {
              songUrlRes,
              songDetailRes,
              lyricRes,
              songDetail,
              lyric
            })
            set({
              songObj: {
                url: songUrlRes.data[0].url,
                id: songUrlRes.data[0].id,
                backgroundImg: songDetail.al.picUrl,
                name: songDetail.name,
                songTime: songDetail.dt / 1000,
                singerArr: songDetail.ar
              },
              playHistory: Utils.removeRepeat([...playHistory, songDetail], "id"),
              isPlay: true,
              lyric,
              songId: id
            })
          } catch (error) {
            console.log("error", error)
          }
        },
        setIsPlay: (isPlay) => {
          set({ isPlay })
        },
        setShowPlayRecord: (showPlayRecord) => {
          set({ showPlayRecord })
        },
        setPlayRecordTip: (playRecordTip) => {
          set({ playRecordTip })
        },
        setKeywords: (keywords) => {
          set({ keywords })
        },
        setPlayRecord: (playRecord) => {
          set({ playRecord })
        }
      }),
      {
        name: "playStore",
        storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
      }
    ),
    {
      name: "playStore"
    }
  )
)
export const useIsPlay = () => usePlayer((state) => state.isPlay)
export const useSongObj = () => usePlayer((state) => state.songObj)
export const useLyric = () => usePlayer((state) => state.lyric)
export const useSongId = () => usePlayer((state) => state.songId)
export const useShowPlayRecord = () => usePlayer((state) => state.showPlayRecord)
export const usePlayRecordTip = () => usePlayer((state) => state.playRecordTip)

export const useShowPlayer = () => usePlayer((state) => state.showPlayer)
export const usePlayerObj = () => usePlayer((state) => state.playerObj)
export const usePlayerMode = () => usePlayer((state) => state.playerMode)
export const usePlayerRate = () => usePlayer((state) => state.playerRate)

export const useSetPlayerMode = () => usePlayer((state) => state.setPlayerMode)

export const useSetIsPlay = () => usePlayer((state) => state.setIsPlay)
export const useSetPlayerObj = () => usePlayer((state) => state.setPlayerObj)
export const useSetShowPlayRecord = () => usePlayer((state) => state.setShowPlayRecord)
export const useSetPlayRecordTip = () => usePlayer((state) => state.setPlayRecordTip)
export const useSetPlayRate = () => usePlayer((state) => state.setPlayRate)
export const useSetPlayRecord = () => usePlayer((state) => state.setPlayRecord)
export const useSetKeywords = () => usePlayer((state) => state.setKeywords)

export const useSetShowPlayer = () => usePlayer((state) => state.setShowPlayer)

export const usePlayRecord = () => usePlayer((state) => state.playRecord)

export const usePlayHistory = () => usePlayer((state) => state.playHistory)

export const useGetSongInfo = () => usePlayer((state) => state.getSongInfo)

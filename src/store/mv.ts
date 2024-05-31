/** @format */

import {create} from "zustand"
import {createJSONStorage, devtools, persist} from "zustand/middleware"
import {videoGroupList, videoCategoryList} from "@/api/video"
import {mvAll, mvFirst, mvExclusiveRcmd, topMv} from "@/api/mv"
import Utils from "@/help"

type Artist = {
  id: number // 艺术家ID
  name: string // 艺术家名称
  alias: string[] // 艺术家别名列表
  transNames: string[] | null // 艺术家翻译名称，可能为空
}
interface MV {
  // MV授权ID
  authId: number
  // MV状态
  status: number
  // MV ID
  id: number
  // MV标题
  title: string
  // MV副标题
  subTitle: string
  // MV应用标题
  appTitle: string
  // MV别名
  aliaName: string
  // MV翻译名
  transName: string
  // MV图片4v3
  pic4v3: number
  // MV图片16v9
  pic16v9: number
  // MV字幕
  caption: number
  // MV字幕语言
  captionLanguage: string
  // MV风格
  style?: string | null
  // MV标语
  mottos: string
  // MV单字标语
  oneword?: string | null
  // MV应用标语
  appword: string
  // MV星级
  stars?: any[] // 未知类型，可能需要根据实际数据进一步定义
  // MV描述
  desc: string
  // MV地区
  area: string
  // MV类型
  type: string
  // MV子类型
  subType: string
  // 是否为网易云音乐独家
  neteaseonly: number
  // 是否禁止上传
  upban: number
  // MV上榜周数
  topWeeks?: string | null // 可能为空
  // MV发布时间
  publishTime: string
  // MV上线时间戳
  online: number
  // MV评分
  score: number
  // MV播放次数
  plays: number
  // MV月播放次数
  monthplays: number
  // MV周播放次数
  weekplays: number
  // MV日播放次数
  dayplays: number
  // MV费用
  fee: number
  // MV视频信息数组
  videos: Video[]
}

interface Video {
  // 视频标签签名
  tagSign: TagSign
  // 视频标签
  tag: string
  // 视频URL
  url: string
  // 视频时长，单位为毫秒
  duration: number
  // 视频大小，单位为字节
  size: number
  // 视频宽度
  width: number
  // 视频高度
  height: number
  // 视频容器格式
  container: string
  // 视频MD5校验码
  md5: string
  // 视频检查状态
  check: boolean
}

interface TagSign {
  // 视频比特率
  br: number
  // 视频类型
  type: string
  // 视频标签签名
  tagSign: string
  // 视频类型
  mvtype: string
  // 视频分辨率
  resolution: number
}

export interface IMVAllItem {
  // 歌曲ID
  id: number
  // 歌曲封面图片的URL
  cover: string
  // 歌曲名称
  name: string
  // 播放次数
  playCount: number
  // 歌曲简介，可能为空
  briefDesc?: string | null
  // 歌曲详细描述，可能为空
  desc?: string | null
  // 艺术家名称
  artistName: string
  // 艺术家ID
  artistId: number
  // 歌曲时长，单位为毫秒
  duration: number
  // 标记，具体含义未给出，可能用于标记歌曲的某些状态
  mark: number
  // 是否订阅，表示用户是否订阅了该歌曲或艺术家
  subed: boolean
  // 艺术家信息数组，当前数据中只有一个艺术家
  artists: Artist[]
  alias?: string[]
}

export interface ITopMvItem {
  // 音乐ID
  id: number
  // 音乐封面图片URL
  cover: string
  // 音乐名称
  name: string
  // 播放次数
  playCount: number
  // 音乐简介，可能为空
  briefDesc?: string | null
  // 音乐详细描述，可能为空
  desc?: string | null
  // 艺术家名称
  artistName: string
  // 艺术家ID
  artistId: number
  // 音乐时长，单位为毫秒
  duration: number
  // 标记，具体含义未给出，可能用于标记音乐的某些状态
  mark: number
  // MV信息
  mv: MV
  // 排名
  lastRank: number
  // 评分
  score: number
  // 是否订阅，表示用户是否订阅了该音乐或艺术家
  subed: boolean
  // 艺术家信息数组
  artists: Artist[]
}

interface Actions {
  getNewMvList: (area: string) => void
  getHotMvList: () => void
  getRcmdMvList: () => void
  getTopMvList: (area: string) => void
}

interface Props {
  newMvList: IMVAllItem[]
  hotMvList: IMVAllItem[]
  rcmdMvList: IMVAllItem[]
  topMvList: ITopMvItem[]
  topMvUpdateTime: string
  loading: boolean
  newMvLoading: boolean
  hotMvLoading: boolean
  rcmdMvLoading: boolean
  topMvLoading: boolean
}

const initialState: Props = {
  topMvUpdateTime: "",
  newMvList: [],
  hotMvList: [],
  rcmdMvList: [],
  topMvList: [],
  newMvLoading: false,
  loading: false,
  hotMvLoading: false,
  rcmdMvLoading: false,
  topMvLoading: false
}

export const useMv = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        getNewMvList: async (area = "内地") => {
          try {
            set({newMvLoading: true}, false, "Loading...")

            const res = await mvFirst({area, limit: 8})

            set({newMvList: res.data, newMvLoading: false}, false, "更新最新MV")
          } catch (error) {
            set({newMvLoading: false}, false, "Loading...")
            console.log("error", error)
          }
        },

        getHotMvList: async () => {
          try {
            get().hotMvList.length === 0 && set({hotMvLoading: true}, false, "Loading...")
            const res = await mvAll({order: "最热", limit: 8, offset: 0})
            set({hotMvList: res.data, hotMvLoading: false}, false, "更新最新MV")
          } catch (error) {
            console.log("error", error)
            set({hotMvLoading: false}, false, "Loading...")
          }
        },

        getTopMvList: async (area: string) => {
          try {
            set({topMvLoading: true}, false, "Loading...")
            const res = await topMv({area, limit: 50, offset: 0})

            set(
              {
                topMvList: res.data,
                topMvUpdateTime: Utils.commentFormatTime(res.updateTime),
                topMvLoading: false
              },
              false,
              "更新最新MV"
            )
          } catch (error) {
            set({topMvLoading: false}, false, "Loading...")
            console.log("error", error)
          }
        },

        getRcmdMvList: async () => {
          try {
            get().rcmdMvList.length === 0 && set({rcmdMvLoading: true}, false, "Loading...")

            const res = await mvExclusiveRcmd({limit: 8, offset: 0})

            set({rcmdMvList: res.data, rcmdMvLoading: false}, false, "更新最新MV")
          } catch (error) {
            set({rcmdMvLoading: false}, false, "Loading...")
            console.log("error", error)
          }
        }
      }),
      {
        name: "MVStore",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          newMvList: state.newMvList,
          hotMvList: state.hotMvList,
          rcmdMvList: state.rcmdMvList,
          topMvList: state.topMvList
        })
      }
    ),
    {
      name: "MVStore"
    }
  )
)

export const useGetNewMvList = () => useMv((state) => state.getNewMvList)

export const useGetHotMvList = () => useMv((state) => state.getHotMvList)

export const useGetRcmdMvList = () => useMv((state) => state.getRcmdMvList)

export const useGetTopMvList = () => useMv((state) => state.getTopMvList)

export const useHotMvList = () => useMv((state) => state.hotMvList)

export const useHotMvLoading = () => useMv((state) => state.hotMvLoading)

export const useNewMvList = () => useMv((state) => state.newMvList)

export const useNewMvLoading = () => useMv((state) => state.newMvLoading)

export const useRcmdMvList = () => useMv((state) => state.rcmdMvList)

export const useRcmdMvLoading = () => useMv((state) => state.rcmdMvLoading)

export const useTopMvList = () => useMv((state) => state.topMvList)

export const useTopMvLoading = () => useMv((state) => state.topMvLoading)

export const useTopMvUpdateTime = () => useMv((state) => state.topMvUpdateTime)

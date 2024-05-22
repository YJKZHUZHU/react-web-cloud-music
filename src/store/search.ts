/** @format */

import {create} from "zustand"
import {createJSONStorage, devtools, persist} from "zustand/middleware"
import {hotDetail, searchSuggest, defaultSearch} from "@/api/search"
import debounce from "lodash-es/debounce"

export interface SearchResponse {
  searchWord: string // 搜索关键词
  score: number // 评分或权重，具体含义可能需要根据实际业务逻辑来解释
  content: string // 内容，这里为空字符串，可能表示未提供具体内容或描述
  source: number // 来源标识，具体含义可能需要根据实际业务逻辑来解释
  iconType: number // 图标类型，具体含义可能需要根据实际业务逻辑来解释
  iconUrl: string // 图标URL地址
  url: string // 链接地址，这里为空字符串，可能表示未提供具体链接
  alg: string // 算法标识或名称，表示生成该结果所使用的算法
}

export interface Artist {
  id: number // 艺人ID
  name: string // 艺人名称
  picUrl: string // 艺人图片URL
  alias?: string[] // 艺人别名列表
  albumSize: number // 专辑数量
  picId: number // 图片ID
  fansGroup?: any // 粉丝团信息，具体类型未提供
  img1v1Url: string // 艺人1v1图片URL
  img1v1: number // 1v1图片标识，具体含义未提供
  alia?: string[] // 别名列表，具体含义未提供
  trans?: any // 转换信息，具体类型未提供
}

export interface Album {
  id: number // 专辑ID
  name: string // 专辑名称
  artist: Artist // 专辑艺人信息
  publishTime: number // 发行时间（毫秒时间戳）
  size: number // 专辑歌曲数量
  copyrightId: number // 版权ID
  status: number // 专辑状态码，具体含义未提供
  picId: number // 专辑图片ID
  mark: number // 专辑标记，具体含义未提供
}

export interface Song {
  id: number // 歌曲ID
  name: string // 歌曲名称
  artists: Artist[] // 歌曲艺人信息列表
  album: Album // 专辑信息
  duration: number // 歌曲时长（毫秒）
  copyrightId: number // 版权ID
  status: number // 歌曲状态码，具体含义未提供
  alias: string[] // 歌曲别名列表
  rtype: number // 歌曲类型码，具体含义未提供
  ftype: number // 文件类型码，具体含义未提供
  mvid: number // 音乐视频ID
  fee: number // 费用，可能表示是否需要付费
  rUrl: string | null // 歌曲资源URL，可能为null
  mark: number // 标记，具体含义未提供
  transNames: string[]
}

export interface Playlist {
  id: number // 歌单ID
  name: string // 歌单名称
  coverImgUrl: string // 歌单封面图片URL
  creator: null // 歌单创建者信息，这里为null，表示没有提供具体信息
  subscribed: boolean // 是否已订阅该歌单
  trackCount: number // 歌单中曲目数量
  userId: number // 创建该歌单的用户ID
  playCount: number // 歌单播放次数
  bookCount: number // 歌单收藏次数
  specialType: number // 歌单特殊类型码，具体含义未提供
  officialTags: null // 官方标签，这里为null，表示没有提供具体信息
  action: null // 动作信息，这里为null，表示没有提供具体信息
  actionType: null // 动作类型，这里为null，表示没有提供具体信息
  recommendText: null // 推荐文本，这里为null，表示没有提供具体信息
  score: null // 评分，这里为null，表示没有提供具体信息
  description: string // 歌单描述
  highQuality: boolean // 是否为高品质
}

export enum SUGGEST_TYOE_ENUM {
  albums = "albums",
  artists = "artists",
  songs = "songs",
  playlists = "playlists"
}

export enum SEARCH_TYPE_ENUM {
  single = '1',
  album = '10',
  singer = '100',
  playlist = '1000',
  user = '1002',
  mv = '1004',
  lyric = '1006',
  broadcastingStation = '1009',
  video = '1014',
  synthesize = '1018'
}

interface ISuggestListItem<T> {
  key: SUGGEST_TYOE_ENUM
  name: string
  list: T[]
  // 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
  searchType: SEARCH_TYPE_ENUM
}

export type ISuggestList = (ISuggestListItem<Song> &
  ISuggestListItem<Artist> &
  ISuggestListItem<Album> &
  ISuggestListItem<Playlist>)[]

interface Actions {
  updateKeywords: (keywords: string, fetch?: boolean) => void
  getHotList: () => void
  getSearchSuggest: (keywords: string) => void
  getDefaultSearch: () => void
  updateSearchHistoryList: (list: string[]) => void
}

interface Props {
  keywords: string
  hotList: SearchResponse[]
  hotLoading: boolean
  loading: boolean
  suggestList: ISuggestList
  searchHistoryList: string[]
  defaultSearch: string
}
const initialState: Props = {
  keywords: "",
  hotList: [],
  hotLoading: false,
  suggestList: [] as unknown as ISuggestList,
  loading: false,
  searchHistoryList: [],
  defaultSearch: ""
}

export const useSearchStore = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        updateSearchHistoryList: (list) => {
          set({searchHistoryList: [...new Set(list)]}, false, "更新搜索关键字")
        },
        updateKeywords: (keywords, fetch = true) => {
          set({keywords}, false, "更新搜索关键字")

          fetch && get().getSearchSuggest(keywords)
        },
        getDefaultSearch: async () => {
          try {
            const res = await defaultSearch()
            set({defaultSearch: res.data.showKeyword}, false, "设置默认搜索关键词")
          } catch (error) {
            console.log("error", error)
          }
        },
        getHotList: async () => {
          try {
            set({hotLoading: true}, false, "Loading....")

            const res = await hotDetail()
            set({hotLoading: false, hotList: res.data}, false, "获取热搜列表....")
            get().getDefaultSearch()
          } catch (error) {
            console.log("error", error)
            set({hotLoading: false}, false, "Loading....")
          }
        },
        getSearchSuggest: debounce(async (keywords) => {
          try {
            set({loading: true}, false, "Loading....")
            const res = await searchSuggest({keywords})
            const suggestList: ISuggestList = [
              {
                key: SUGGEST_TYOE_ENUM.songs,
                name: "单曲",
                list: res.data.result?.songs || [],
                searchType: SEARCH_TYPE_ENUM.single
              },
              {
                key: SUGGEST_TYOE_ENUM.artists,
                name: "歌手",
                list: res.data.result?.artists || [],
                searchType: SEARCH_TYPE_ENUM.singer
              },
              {
                key: SUGGEST_TYOE_ENUM.albums,
                name: "专辑",
                list: res.data.result?.albums || [],
                searchType: SEARCH_TYPE_ENUM.album
              },
              {
                key: SUGGEST_TYOE_ENUM.playlists,
                name: "歌单",
                list: res.data.result?.playlists || [],
                searchType: SEARCH_TYPE_ENUM.playlist
              }
            ].filter((item) => item.list.length !== 0)
            set({loading: false, suggestList}, false, "获取热搜列表....")
          } catch (error) {
            console.log("error", error)
            set({loading: false}, false, "Loading....")
          }
        }, 500)
      }),
      {
        name: "searchStore",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          hotList: state.hotList,
          searchHistoryList: state.searchHistoryList
        })
      }
    ),
    {
      name: "searchStore"
    }
  )
)

export const useHotList = () => useSearchStore((state) => state.hotList)

export const useGetHotList = () => useSearchStore((state) => state.getHotList)

export const useKeywords = () => useSearchStore((state) => state.keywords)

export const useUpdateKeywords = () => useSearchStore((state) => state.updateKeywords)

export const useSuggestList = () => useSearchStore((state) => state.suggestList)

export const useGetSearchSuggest = () => useSearchStore((state) => state.getSearchSuggest)

export const useSearchHistoryList = () => useSearchStore((state) => state.searchHistoryList)

export const useUpdateSearchHistoryList = () =>
  useSearchStore((state) => state.updateSearchHistoryList)

export const useLoading = () => useSearchStore((state) => state.loading)

export const useDefaultSearch = () => useSearchStore((state) => state.defaultSearch)

export const useGetDefaultSearch = () => useSearchStore((state) => state.getDefaultSearch)

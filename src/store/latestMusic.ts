/** @format */

import {create} from "zustand"
import {persist, createJSONStorage, devtools} from "zustand/middleware"
import {MAP_CLASSIFICATION_TYPE_ENUM} from "@/constants/latest-music"
import {songs, album} from "@/api/latestMusic"

type MusicQuality = {
  dfsId: number
  sr: number // 采样率
  playTime: number // 播放时长
  bitrate: number // 比特率
  volumeDelta: number // 音量差值
  name: string | null // 音乐名称，可能为空
  id: number // 音乐ID
  size: number // 文件大小
  extension: string // 文件扩展名
}

type Artist = {
  img1v1Id: number
  topicPerson: number
  briefDesc: string
  picId: number
  trans: string
  albumSize: number
  img1v1Url: string // 艺术家头像URL
  picUrl: string // 艺术家图片URL
  musicSize: number
  followed: boolean
  alias: string[]
  name: string
  id: number
  img1v1Id_str: string
}

type Album = {
  songs: any[] // 歌曲列表，具体结构未提供
  paid: boolean
  onSale: boolean
  description: string
  briefDesc: string
  picId: number
  artist: Artist
  publishTime: number // 发行时间
  picUrl: string // 专辑图片URL
  commentThreadId: string
  company: string
  tags: string
  alias: string[]
  copyrightId: number
  status: number
  subType: string // 子类型，如"录音室版"
  blurPicUrl: string // 模糊图片URL
  companyId: number
  pic: number
  artists: Artist[]
  name: string
  id: number
  type: string // 专辑类型，如"EP/Single"
  size: number
  picId_str: string
}

type Privilege = {
  id: number
  fee: number
  payed: number
  st: number
  pl: number // 播放权限
  dl: number // 下载权限
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number // 最大比特率
  fl: number // 文件品质
  toast: boolean
  flag: number
  preSell: boolean
}

export type Song = {
  starred: boolean // 是否收藏
  popularity: number // 热度
  starredNum: number // 收藏数量
  playedNum: number // 播放次数
  dayPlays: number // 日播放次数
  hearTime: number // 听歌时长
  mp3Url: string // 音乐URL
  rtUrls: null // 可能为空
  duration: number // 时长
  fee: number // 费用
  copyFrom: string
  mMusic: MusicQuality
  lMusic: MusicQuality
  album: Album
  audition: null
  ringtone: string
  disc: string
  no: number // 序号
  hMusic: MusicQuality
  mvid: number
  ftype: number
  rtype: number
  rurl: null
  commentThreadId: string
  crbt: null
  bMusic: MusicQuality
  rtUrl: null
  alias: string[]
  score: number // 评分
  copyrightId: number
  position: number
  status: number
  artists: Artist[]
  name: string // 歌曲名称
  id: number // 歌曲ID
  exclusive: boolean // 是否独家
  privilege: Privilege
}

// 专辑艺人信息接口
interface AlbumArtist {
  img1v1Id: number // 专辑艺人头像1v1图ID
  topicPerson: number // 是否是话题人物
  picId: number // 专辑艺人图片ID
  picUrl: string // 专辑艺人图片URL
  followed: boolean // 是否关注该专辑艺人
  trans: string // 专辑艺人名字的翻译
  img1v1Url: string // 专辑艺人头像1v1图URL
  briefDesc: string // 专辑艺人简介
  musicSize: number // 专辑艺人音乐数量
  albumSize: number // 专辑艺人专辑数量
  alias: string[] // 专辑艺人别名数组
  name: string // 专辑艺人名字
  id: number // 专辑艺人ID
  picId_str: string // 专辑艺人图片ID字符串形式
  transNames: string[] // 专辑艺人名字的翻译数组
  img1v1Id_str: string // 专辑艺人头像1v1图ID字符串形式
}

export interface IAlbumItem {
  paid: boolean // 是否付费
  onSale: boolean // 是否在售
  picId: number // 图片ID
  picUrl: string // 图片URL
  publishTime: number // 发布时间
  artists: Artist[] // 艺人数组
  commentThreadId: string // 评论线程ID
  companyId: number // 公司ID
  blurPicUrl: string // 模糊图片URL
  briefDesc: string // 简介
  copyrightId: number // 版权ID
  artist: AlbumArtist // 专辑艺人信息
  company: string // 公司
  subType: string // 子类型
  pic: number // 图片编号
  status: number // 状态
  description: string // 描述
  alias: any[] // 别名数组
  tags: string // 标签
  name: string // 名称
  id: number // ID
  type: string // 类型
  size: number // 大小
  picId_str: string // 图片ID字符串形式
  areaId: number // 区域ID
  exclusive: boolean // 是否独家
  isSub: boolean // 是否订阅
}

export type SongKey =
  | MAP_CLASSIFICATION_TYPE_ENUM.newSongAll
  | MAP_CLASSIFICATION_TYPE_ENUM.newSongZH
  | MAP_CLASSIFICATION_TYPE_ENUM.newSongEA
  | MAP_CLASSIFICATION_TYPE_ENUM.newSongKR
  | MAP_CLASSIFICATION_TYPE_ENUM.newSongJP

type Props = {
  song: Partial<{
    [key in MAP_CLASSIFICATION_TYPE_ENUM]: Song[]
  }>
  loading: boolean
  monthAlbum: IAlbumItem[]
  weekAlbum: IAlbumItem[]
}

interface Actions {
  getSong: (type: MAP_CLASSIFICATION_TYPE_ENUM) => void
  getAlbum: (data: any) => void
}

const initialState: Props = {
  song: {},
  loading: false,
  monthAlbum: [],
  weekAlbum: []
}

export const useLatestMusic = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        getAlbum: async () => {
          try {
            const res = await album({})
            set({monthAlbum: res.data.monthData}, false, "")
          } catch (error) {
            console.log("error", error)
          }
        },
        getSong: async (type) => {
          try {
            const result = get().song

            if (Array.isArray(result[type]) && result[type]?.length !== 0) {
              return
            }

            set({loading: true}, false, "Loading...")

            const res = await songs({type})

            set(
              {
                song: {
                  ...result,
                  [type]: res.data
                },
                loading: false
              },
              false,
              "新歌速递"
            )

            console.log("res--", res)
          } catch (error) {
            set({loading: false}, false, "Loading...")
            console.log("error", error)
          }
        }
      }),
      {
        name: "latestMusicStore",
        storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
      }
    ),
    {
      name: "latestMusicStore"
    }
  )
)

export const useGetSong = () => useLatestMusic((state) => state.getSong)

export const useLoading = () => useLatestMusic((state) => state.loading)

export const useSong = () => useLatestMusic((state) => state.song)

export const useGetAlbum = () => useLatestMusic((state) => state.getAlbum)

export const useMonthAlbum = () => useLatestMusic((state) => state.monthAlbum)
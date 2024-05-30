/** @format */

import {create} from "zustand"
import {createJSONStorage, devtools, persist} from "zustand/middleware"
import {videoGroupList, videoCategoryList} from "@/api/video"

export interface IVideoGroupListItem {
  id: number
  name: string
  url: string | null
  relatedVideoType: string | null
  selectTab: boolean
  abExtInfo: string | null
}

type Resolution = {
  /** 分辨率 */
  resolution: number
  /** 文件大小 */
  size: number
}

type Creator = {
  /** 是否默认头像 */
  defaultAvatar: boolean
  /** 省份ID */
  province: number
  /** 认证状态 */
  authStatus: number
  /** 是否关注 */
  followed: boolean
  /** 头像URL */
  avatarUrl: string
  /** 账号状态 */
  accountStatus: number
  /** 性别 */
  gender: number
  /** 城市ID */
  city: number
  /** 生日（时间戳） */
  birthday: number
  /** 用户ID */
  userId: number
  /** 用户类型 */
  userType: number
  /** 用户昵称 */
  nickname: string
  /** 用户签名 */
  signature: string
  /** 用户描述 */
  description: string
  /** 详细描述 */
  detailDescription: string
  /** 头像图片ID */
  avatarImgId: number
  /** 背景图片ID */
  backgroundImgId: number
  /** 背景URL */
  backgroundUrl: string
  /** 权限等级 */
  authority: number
  /** 是否互粉 */
  mutual: boolean
  /** 专家标签 */
  expertTags: any[] | null
  /** 专家 */
  experts: any[] | null
  /** DJ身份状态 */
  djStatus: number
  /** VIP类型 */
  vipType: number
  /** 备注名 */
  remarkName: any | null
  /** 头像图片ID字符串 */
  avatarImgIdStr: string
  /** 背景图片ID字符串 */
  backgroundImgIdStr: string
}

type VideoGroup = {
  /** 分组ID */
  id: number
  /** 分组名称 */
  name: string
  /** 分组算法 */
  alg: any | null
}

type RelateSong = {
  /** 歌曲名称 */
  name: string
  /** 歌曲ID */
  id: number
  /** 歌手列表 */
  ar: Array<{
    /** 歌手ID */
    id: number
    /** 歌手名称 */
    name: string
    /** 歌手昵称 */
    tns: string[]
    /** 歌手别名 */
    alias: string[]
  }>
  /** 专辑封面图片URL */
  picUrl: string
  /** 歌曲时长（毫秒） */
  dt: number
  /** 高品质音频信息 */
  h: {
    /** 比特率 */
    br: number
    /** 文件ID */
    fid: number
    /** 文件大小 */
    size: number
    /** 未知字段 */
    vd: number
  }
  /** 中品质音频信息 */
  m: {
    br: number
    fid: number
    size: number
    vd: number
  }
  /** 低品质音频信息 */
  l: {
    br: number
    fid: number
    size: number
    vd: number
  }
  /** 未知字段 */
  a: any | null
  /** 未知字段 */
  cd: string
  /** 未知字段 */
  no: number
  /** 未知字段 */
  rtUrl: any | null
  /** 未知字段 */
  ftype: number
  /** 未知字段 */
  rtUrls: any[]
  /** 未知字段 */
  djId: number
  /** 版权信息 */
  copyright: number
  /** 未知字段 */
  s_id: number
  /** 未知字段 */
  cp: number
  /** 未知字段 */
  mv: number
  /** 未知字段 */
  rtype: number
  /** 未知字段 */
  rurl: any | null
  /** 发布时间（时间戳） */
  publishTime: number
  /** 权限信息 */
  privilege: {
    id: number
    fee: number
    payed: number
    st: number
    pl: number
    dl: number
    sp: number
    cp: number
    subp: number
    cs: boolean
    maxbr: number
    fl: number
    toast: boolean
    flag: number
    preSell: boolean
  }
}

export type IVideoListItem = {
  type: number
  displayed: boolean
  alg: string
  extAlg: any | null
  data: {
    alg: string
    scm: string
    threadId: string
    coverUrl: string
    height: number
    width: number
    title: string
    description: any | null
    commentCount: number
    shareCount: number
    resolutions: Resolution[]
    creator: Creator
    videoGroup: VideoGroup[]
    previewUrl: any | null
    previewDurationms: number
    hasRelatedGameAd: boolean
    markTypes: any | null
    relateSong: RelateSong[]
    relatedInfo: any | null
    videoUserLiveInfo: any | null
    vid: string
    durationms: number
    playTime: number
    praisedCount: number
    praised: boolean
    subscribed: boolean
  }
}

interface Actions {
  init: () => void
}

interface Props {
  tagList: IVideoGroupListItem[]
  categoryList: IVideoGroupListItem[]
  loading: boolean
}

const initialState: Props = {
  tagList: [],
  categoryList: [],
  loading: false
}

export const useVideo = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        init: async () => {
          try {
            set({loading: true}, false, "loading...")
            const [tagRes, categoryRes] = await Promise.all([videoGroupList(), videoCategoryList()])
            set(
              {loading: false, tagList: tagRes?.data, categoryList: categoryRes?.data},
              false,
              "loading..."
            )
          } catch (error) {
            console.log("error", error)
            set({loading: false}, false, "loading...")
          }
        }
      }),
      {
        name: "videoStore",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          categoryList: state.categoryList,
          tagList: state.tagList
        })
      }
    ),
    {
      name: "videoStore"
    }
  )
)

export const useInit = () => useVideo((state) => state.init)

export const useTagList = () => useVideo((state) => state.tagList)

export const useCategoryList = () => useVideo((state) => state.categoryList)

/** @format */

import {MAP_CLASSIFICATION_TYPE_ENUM} from "@/constants/latest-music"
import {service} from "@/help/server"
import {IAlbumItem} from "@/store/latestMusic"
import {ISongUrl} from "@/store/player"
import {
  IArtistToplist,
  IArtistToplistDetail,
  IRewardToplist,
  ITopDetailListItem,
  ITopListItem,
  OfficialTypeEnum
} from "@/store/top"
import {IPlaylistDetails} from "@/types/playlistDetails"

enum FetchEnum {
  album = "/album",
  dynamic = "/album/detail/dynamic",
  subAlbum = "/album/sub"
}

type Artist = {
  id: number // 艺术家id
  name: string // 艺术家名
  alia: string[] // 艺术家别名数组
  picUrl: string // 艺术家图片URL
  pic: number // 艺术家图片ID
}

export type AlbumInfo = {
  songs: any[] // 专辑包含的歌曲列表，具体结构未提供
  paid: boolean // 是否为付费专辑
  onSale: boolean // 是否在售
  mark: number // 专辑标记
  awardTags: any[] // 获奖标签，具体结构未提供
  artists: Artist[] // 参与该专辑的艺术家列表
  copyrightId: number // 版权ID
  picId: number // 专辑图片ID
  artist: Artist // 主要艺术家信息
  publishTime: number // 发行时间，时间戳格式
  company: string // 发行公司
  briefDesc: string // 简介
  picUrl: string // 专辑图片URL
  commentThreadId: string // 评论线程ID
  blurPicUrl: string // 模糊专辑图片URL
  companyId: number // 公司ID
  pic: number // 专辑图片ID
  status: number // 状态
  subType: string // 子类型
  alias: string[] // 别名数组
  description: string // 描述
  tags: string // 标签
  name: string // 专辑名
  id: number // 专辑ID
  type: string // 类型
  size: number // 专辑包含的歌曲数量
  picId_str: string // 专辑图片ID字符串格式
  info: {
    // 专辑的额外信息，具体结构未提供
    commentThread: any
    latestLikedUsers: any[]
    liked: boolean
    comments: any
    resourceType: number
    resourceId: number
    commentCount: number
    likedCount: number
    shareCount: number
    threadId: string
  }
}

export type Song = {
  rtUrls: any[] // 高品质音乐链接数组，具体结构未提供
  ar: Artist[] // 艺术家信息
  al: AlbumInfo // 专辑信息
  st: number // 歌曲状态
  noCopyrightRcmd: any // 无版权推荐信息，具体结构未提供
  songJumpInfo: any // 歌曲跳转信息，具体结构未提供
  no: number // 歌曲编号
  fee: number // 收费情况
  djId: number // DJ ID
  mv: number // MV情况
  t: number // 语种标签
  v: number // 版本标签
  cd: string // 唱片集
  rtype: number // 歌曲类型
  rurl: any // 歌曲链接，具体结构未提供
  pst: number // 出版状态
  alia: string[] // 别名数组
  pop: number // 流行度
  rt: string // 歌曲唯一标识
  mst: number // 音乐状态
  cp: number // 版权信息
  crbt: any // 歌词信息，具体结构未提供
  cf: string // 歌曲文件
  dt: number // 歌曲时长
  h: {
    br: number // 高品质音乐码率
    fid: number // 文件ID
    size: number // 文件大小
    vd: number // 版本差异
    sr: number // 采样率
  }
  sq: {
    // 超高品质音乐信息
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }
  hr: any // 高分辨率音乐信息，具体结构未提供
  l: {
    // 普通品质音乐信息
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }
  rtUrl: any // 歌曲链接，具体结构未提供
  ftype: number // 文件类型
  a: any // 未知字段，具体结构未提供
  m: {
    // 中品质音乐信息
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }
  name: string // 歌曲名
  id: number // 歌曲ID
  privilege: {
    // 权限信息
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
    playMaxbr: number
    downloadMaxbr: number
    maxBrLevel: string
    playMaxBrLevel: string
    downloadMaxBrLevel: string
    plLevel: string
    dlLevel: string
    flLevel: string
    rscl: any
    freeTrialPrivilege: {
      resConsumable: boolean
      userConsumable: boolean
      listenType: any
      cannotListenReason: any
      playReason: any
    }
    rightSource: number
    chargeInfoList: Array<{
      rate: number
      chargeUrl: any
      chargeMessage: any
      chargeType: number
    }>
  }
}

// 使用定义的类型

export interface IAlbumRes {
  resourceState: boolean // 资源状态
  songs: Song[] // 歌曲数组
  code: number // 响应码
  album: AlbumInfo // 专辑信息
}
export const album = (data: {id: string | number}) => {
  return service<IAlbumRes>(FetchEnum.album, data)
}

export interface IDynamicRes {
  onSale: boolean // 是否在售
  albumGameInfo: null // 专辑游戏信息，这里指定为null，表示没有具体数据
  commentCount: number // 评论数量
  likedCount: number // 点赞数量
  shareCount: number // 分享数量
  isSub: boolean // 是否订阅
  subTime: number // 订阅时间，这里指定为0，表示没有具体时间
  subCount: number // 订阅数量
  code: number // 状态码
}

export const dynamic = (data: {id: string | number}) => {
  return service<IDynamicRes>(FetchEnum.dynamic, data)
}

// t : 1 为收藏,其他为取消收藏
export const subAlbum = (data: {id: string | number; t: 0 | 1}) => {
  return service<{code: number; time: number}>(FetchEnum.subAlbum, data)
}

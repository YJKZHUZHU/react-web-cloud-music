/** @format */

import {EnumLocalStorage, getItem} from "@/help/cache"
import {cssExports} from "./../pages/mv/components/SelectTag/index.scss.d"
import {service} from "@/help/server"
import {ILyrics, IPrivilegeItem, ISongUrl, ISongsItem, MusicLevelEnum} from "@/store/player"
import {CategoryType, IHighqualityTagsItem, IPlaylistItem, SongCategory} from "@/store/songList"
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
  /** 歌单分类 */
  catlist = "/playlist/catlist",
  /** 精品歌单列表 */
  highquality = "/top/playlist/highquality",
  /** 精品歌单标签 */
  highqualityTags = "/playlist/highquality/tags",
  /** 歌单列表 */
  playlist = "/top/playlist"
}

interface ITagsRes {
  code: number // 响应码
  all: SongCategory // 全部歌单的信息
  sub: SongCategory[] // 子歌单的数组
  categories: CategoryType // 分类类型描述
}
export const catlist = () => {
  return service<ITagsRes>(FetchEnum.catlist)
}

export interface IHighqualityParams {
  /** tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags) */
  cat: string
  limit: number
  /** 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据 */
  before: number
}
interface IHighqualityRes {
  playlists: IPlaylistItem[]
  code: number
  more: boolean
  lasttime: number
  total: number
}
export const highquality = (data: Partial<IHighqualityParams>) => {
  return service<IHighqualityRes>(FetchEnum.highquality, data)
}

interface IHighqualityTagsRes {
  tags: IHighqualityTagsItem[]
  code: number
}
export const highqualityTags = () => {
  return service<IHighqualityTagsRes>(FetchEnum.highqualityTags)
}

export interface IPlaylistParams {
  /** 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot' */
  order: "new" | "hot"
  cat: string
  limit: number
  /** 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值 */
  offset: number
}
interface IPlaylistRes {
  playlists: IPlaylistItem[]
  total: number
  code: number
  more: boolean
  cat: string
}
export const playlist = (data: Partial<IPlaylistParams>) => {
  return service<IPlaylistRes>(
    FetchEnum.playlist,
    {
      ...data,
      cookie: getItem(EnumLocalStorage.cookie)
    },
    false
  )
}

/** @format */

import {MAP_CLASSIFICATION_TYPE_ENUM} from "@/constants/latest-music"
import {service} from "@/help/server"
import {IAlbumItem, Song} from "@/store/latestMusic"
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
  /** 新碟上架 */
  album = "/top/album",
  /** 新歌速递 */
  song = "/top/song"
}

interface IAlbumParams {
  /** ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本 */
  area: MAP_CLASSIFICATION_TYPE_ENUM
  /** new:全部 hot:热门,默认为 new */
  type: MAP_CLASSIFICATION_TYPE_ENUM
  /** 年,默认本年 2024 */
  year: string
  /** 月,默认本月 5 */
  month: string
  offset: number
  limit: number
}

export interface IAlbumRes {
  weekData: IAlbumItem[] // 周数据数组
  hasMore: boolean // 是否有更多数据
  monthData: IAlbumItem[] // 月数据数组
  code: number // 响应码
}
export const album = (data: Partial<IAlbumParams>) => {
  return service<IAlbumRes>(FetchEnum.album, data)
}

export const songs = (data: {type: MAP_CLASSIFICATION_TYPE_ENUM}) => {
  return service<Song[]>(FetchEnum.song, data)
}

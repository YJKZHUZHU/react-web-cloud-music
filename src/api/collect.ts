/** @format */

import {service} from "@/help/server"

enum FetchEnum {
  album = "/album/sublist",
  artist = "/artist/sublist",
  mv = "/mv/sublist"
}

// 音乐平台的艺人信息接口
interface ArtistInfo {
  // 艺人图片ID
  img1v1Id: number
  // 专题人物标记，0 或 1
  topicPerson: number
  // 艺人图片ID
  picId: number
  // 艺人简介
  briefDesc: string
  // 艺人音乐数量
  musicSize: number
  // 艺人专辑数量
  albumSize: number
  // 艺人图片URL
  picUrl: string
  // 艺人图片1v1URL
  img1v1Url: string
  // 是否关注该艺人，false 为未关注，true 为已关注
  followed: boolean
  // 艺人翻译名
  trans: string
  // 艺人别名数组
  alias: string[]
  // 艺人名称
  name: string
  // 艺人ID
  id: number
  // 艺人图片1v1ID字符串形式
  img1v1Id_str: string
}

// 音乐平台的订阅信息数据接口
export interface SubscriptionData {
  // 订阅时间戳
  subTime: number
  // 消息数组
  msg: any[]
  // 艺人信息数组
  artists: ArtistInfo[]
  // 订阅图片ID
  picId: number
  // 订阅图片URL
  picUrl: string
  // 订阅别名数组
  alias: string[]
  // 订阅名称
  name: string
  // 订阅ID
  id: number
  // 订阅大小
  size: number
  // 订阅翻译名数组
  transNames: string[]
}

// 音乐平台的订阅信息响应接口
interface IAlbumRes {
  // 数据数组，包含订阅信息
  data: SubscriptionData[]
  // 总数
  count: number
  // 是否还有更多数据，false 表示没有更多数据
  hasMore: boolean
  // 付费内容数量
  paidCount: number
  // 状态码，200 表示成功
  code: number
}
export const album = (data: {limit: number; offset: number}): Promise<IAlbumRes> => {
  return service(FetchEnum.album, data, false, {format: false}) as any
}

export type IArtistItem = {
  /** 描述信息 */
  info: string
  /** 艺人ID */
  id: number
  /** 艺人姓名 */
  name: string
  /** 翻译名，如果不存在则为null */
  trans: string | null
  /** 别名列表 */
  alias: string[]
  /** 专辑数量 */
  albumSize: number
  /** 音乐视频数量 */
  mvSize: number
  /** 封面图片ID */
  picId: number
  /** 封面图片URL */
  picUrl: string
  /** 艺人头像图片URL */
  img1v1Url: string
}

interface IArtistRes {
  // 数据数组，包含订阅信息
  data: IArtistItem[]
  // 总数
  count: number
  // 是否还有更多数据，false 表示没有更多数据
  hasMore: boolean
  // 付费内容数量
  paidCount: number
  // 状态码，200 表示成功
  code: number
}

export const artist = (data: {limit: number; offset: number}): Promise<IArtistRes> => {
  return service(FetchEnum.artist, data, false, {format: false}) as any
}

export type VideoInfo = {
  /** 视频类型，例如1可能代表某种特定的视频分类 */
  type: number
  /** 视频标题 */
  title: string
  /** 视频时长，单位毫秒 */
  durationms: number
  /** 创作者信息列表 */
  creator: Creator[]
  /** 播放次数 */
  playTime: number
  /** 视频封面图片URL */
  coverUrl: string
  /** 视频ID */
  vid: string
  /** 别名，可能为null表示没有别名 */
  aliaName: string | null
  /** 翻译名，可能为null表示没有翻译名 */
  transName: string | null
  /** 算法标识，可能为null表示未指定 */
  alg: any | null // 使用any类型因为具体内容未知
  /** 标记类型列表，空列表表示没有标记类型 */
  markTypes: string[]
}

type Creator = {
  /** 创作者用户ID */
  userId: number
  /** 创作者用户名 */
  userName: string
}

interface IMVRes {
  // 数据数组，包含订阅信息
  data: VideoInfo[]
  // 总数
  count: number
  // 是否还有更多数据，false 表示没有更多数据
  hasMore: boolean
  // 付费内容数量
  paidCount: number
  // 状态码，200 表示成功
  code: number
}

export const mv = (data: {limit: number; offset: number}): Promise<IMVRes> => {
  return service(FetchEnum.mv, data, false, {format: false}) as any
}

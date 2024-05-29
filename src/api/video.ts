/** @format */

import {service} from "@/help/server"

enum FetchEnum {
  videoUrl = "/video/url",
  videoDetail = "/video/detail",
  videoDetailInfo = "/video/detail/info",
  relatedAllvideo = "/related/allvideo"
}

export enum BrlLevelEnum {
  low = 240,
  high = 480,
  super = 720,
  "1080p" = 1080
}

export type VideoUrl = {
  /** 视频的唯一标识符 */
  id: string
  /** 视频的URL地址 */
  url: string
  /** 视频文件的大小，单位为字节 */
  size: number
  /** 视频的有效时长，单位为秒 */
  validityTime: number
  /** 视频是否需要付费 */
  needPay: boolean
  /** 视频的付费信息，如果needPay为false，则此字段为null */
  payInfo: object | null
  /** 视频的分辨率，例如720表示720p */
  r: BrlLevelEnum
}

type IVideoUrlRes = {
  /** 视频URL列表 */
  urls: VideoUrl[]
  /** 响应状态码 */
  code: number
}

export const videoUrl = (data: {id: string | number; t?: number}) => {
  return service<IVideoUrlRes>(FetchEnum.videoUrl, data)
}

export interface IArtistsItem {
  id: number // 艺术家ID
  name: string // 艺术家名称
  img1v1Url: string // 艺术家1v1图片URL
  followed: boolean // 是否已关注
}


export interface IVideoGroupItem {
  id: number // 分组ID
  name: string // 分组名称
  type: number // 分组类型
}

type Creator = {
  /** 认证状态 */
  authStatus: number
  /** 是否已关注 */
  followed: boolean
  /** 账号状态 */
  accountStatus: number
  /** 用户ID */
  userId: number
  /** 用户类型 */
  userType: number
  /** 用户昵称 */
  nickname: string
  /** 用户头像URL */
  avatarUrl: string
  /** 专家标签，可能为null */
  expertTags: any[] | null
  /** 专家信息，可能为null */
  experts: any[] | null
  /** 头像详细信息，可能为null */
  avatarDetail: any | null
}

export type Resolution = {
  /** 视频文件大小 */
  size: number
  /** 视频分辨率 */
  resolution: BrlLevelEnum
}

export type VideoGroupItem = {
  /** 分组ID */
  id: number
  /** 分组名称 */
  name: string
  /** 算法标识，可能为null */
  alg: any
}

export type IVideoDetailRes = {
  /** 视频ID */
  vid: string
  /** 创作者信息 */
  creator: Creator
  /** 视频封面URL */
  coverUrl: string
  /** 视频标题 */
  title: string
  /** 视频描述，可能为null */
  description: string | null
  /** 视频时长，单位为毫秒 */
  durationms: number
  /** 视频线程ID */
  threadId: string
  /** 播放时间，单位为毫秒 */
  playTime: number
  /** 点赞数 */
  praisedCount: number
  /** 评论数 */
  commentCount: number
  /** 分享数 */
  shareCount: number
  /** 订阅数 */
  subscribeCount: number
  /** 发布时间，单位为毫秒 */
  publishTime: number
  avatarUrl: string
  /** 视频宽度 */
  width: number
  /** 视频高度 */
  height: number
  /** 视频分辨率列表 */
  resolutions: Resolution[]
  /** 视频分组列表 */
  videoGroup: VideoGroupItem[]
  /** 是否有相关游戏广告 */
  hasRelatedGameAd: boolean
  /** 是否有广告 */
  advertisement: boolean
  /** 认证类型 */
  authType: number
  /** 标记类型列表 */
  markTypes: any[]
  /** 视频用户直播信息，可能为null */
  videoUserLiveInfo: any | null
}

export const videoDetail = (data: {id: string | number}) => {
  return service<IVideoDetailRes>(FetchEnum.videoDetail, data)
}

interface IMvDetailInfoRes {
  likedCount: number // 点赞数量
  shareCount: number // 分享数量
  commentCount: number // 评论数量
  liked: boolean // 是否已点赞
  code: number // 响应状态码
}
export const videoDetailInfo = (data: {vid: string | number}) => {
  return service<IMvDetailInfoRes>(FetchEnum.videoDetailInfo, data)
}

export type MVItem = {
  id: number // 视频ID
  cover: string // 视频封面图片链接
  name: string // 视频名称
  playCount: number // 播放次数
  briefDesc: string | null // 视频简介，可能为空
  desc: string | null // 视频详细描述，可能为空
  artistName: string // 艺术家名称
  artistId: number // 艺术家ID
  duration: number // 视频时长（毫秒）
  mark: number // 标记，具体含义未知
  artists: Artist[] // 艺术家列表
  alg: string // 算法标识，具体含义未知
}

type Artist = {
  id: number // 艺术家ID
  name: string // 艺术家名称
  alias: string[] // 艺术家别名列表
  transNames: string[] | null // 艺术家翻译名称，可能为空
}

type ISimiMvRes = {
  mvs: MVItem[] // 视频列表
  code: number // 响应码，200表示成功
}

export const relatedAllvideo = (data: {id: string | number}) => {
  return service<[]>(FetchEnum.relatedAllvideo, data)
}

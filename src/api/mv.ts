/** @format */

import {service} from "@/help/server"

enum FetchEnum {
  mvUrl = "/mv/url",
  mvDetail = "/mv/detail",
  mvDetailInfo = "/mv/detail/info",
  eventDel = "/event/del",
  simiMv = "/simi/mv"
}

export enum BrlLevelEnum {
  low = 240,
  high = 480,
  super = 720,
  "1080p" = 1080
}

export interface IMvUrlRes {
  id: number // 资源ID
  url: string // 资源链接地址
  r: BrlLevelEnum // 资源分辨率
  size: number // 资源大小，单位字节
  md5: string // 资源MD5校验值，可能为空
  code: number // 子状态码，与外层code相同
  expi: number // 过期时间，单位秒
  fee: number // 费用，0表示免费
  mvFee: number // MV费用，0表示免费
  st: number // 状态码，0表示正常
  promotionVo: null // 推广信息，可能为空
  msg: string // 消息内容
}

export const mvUrl = (data: {id: string | number; t?: number}) => {
  return service<IMvUrlRes>(FetchEnum.mvUrl, data)
}

export interface IArtistsItem {
  id: number // 艺术家ID
  name: string // 艺术家名称
  img1v1Url: string // 艺术家1v1图片URL
  followed: boolean // 是否已关注
}

export interface IMvDetailRes {
  loadingPic: string // 加载图片URL
  bufferPic: string // 缓冲图片URL
  loadingPicFS: string // 快速加载图片URL
  bufferPicFS: string // 快速缓冲图片URL
  subed: boolean // 是否已订阅
  mp: {
    id: number // 音乐资源ID
    fee: number // 音乐费用，0表示免费
    mvFee: number // MV费用，0表示免费
    payed: number // 已支付费用
    pl: number // 无损品质
    dl: number // 下载品质
    cp: number // 是否允许版权
    sid: number // 歌单ID
    st: number // 状态码
    normal: boolean // 是否正常
    unauthorized: boolean // 是否未授权
    msg: null // 消息，通常为空
  }
  data: {
    id: number // 音乐数据ID
    name: string // 音乐名称
    artistId: number // 艺术家ID
    artistName: string // 艺术家名称
    briefDesc: string // 简介描述
    desc: null // 详细描述，通常为空
    cover: string // 封面图片URL
    coverId_str: string // 封面图片ID字符串
    coverId: number // 封面图片ID
    playCount: number // 播放次数
    subCount: number // 订阅次数
    shareCount: number // 分享次数
    commentCount: number // 评论次数
    duration: number // 时长，单位毫秒
    nType: number // 类型
    publishTime: string // 发布时间
    price: null // 价格，通常为空
    brs: Array<{
      size: number // 码率大小，单位字节
      br: BrlLevelEnum // 码率
      point: number // 点数
    }> // 码率列表
    artists: IArtistsItem[] // 艺术家列表
    commentThreadId: string // 评论主题ID
    videoGroup: IVideoGroupItem[] // 视频分组列表
  }
  code: number // 响应状态码
}

export interface IVideoGroupItem {
  id: number // 分组ID
  name: string // 分组名称
  type: number // 分组类型
}
export const mvDetail = (data: {mvid: string | number}) => {
  return service<IMvDetailRes>(FetchEnum.mvDetail, data, false, {
    format: false
  }) as unknown as Promise<IMvDetailRes>
}

interface IMvDetailInfoRes {
  likedCount: number // 点赞数量
  shareCount: number // 分享数量
  commentCount: number // 评论数量
  liked: boolean // 是否已点赞
  code: number // 响应状态码
}
export const mvDetailInfo = (data: {mvid: string | number}) => {
  return service<IMvDetailInfoRes>(FetchEnum.mvDetailInfo, data)
}

export type MVItem = {
  id: number; // 视频ID
  cover: string; // 视频封面图片链接
  name: string; // 视频名称
  playCount: number; // 播放次数
  briefDesc: string | null; // 视频简介，可能为空
  desc: string | null; // 视频详细描述，可能为空
  artistName: string; // 艺术家名称
  artistId: number; // 艺术家ID
  duration: number; // 视频时长（毫秒）
  mark: number; // 标记，具体含义未知
  artists: Artist[]; // 艺术家列表
  alg: string; // 算法标识，具体含义未知
};

type Artist = {
  id: number; // 艺术家ID
  name: string; // 艺术家名称
  alias: string[]; // 艺术家别名列表
  transNames: string[] | null; // 艺术家翻译名称，可能为空
};

type ISimiMvRes = {
  mvs: MVItem[]; // 视频列表
  code: number; // 响应码，200表示成功
};

export const simiMv = (data: {mvid: string | number}) => {
  return service<ISimiMvRes>(FetchEnum.simiMv, data)
}

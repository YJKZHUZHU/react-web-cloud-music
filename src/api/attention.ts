/** @format */

import {service} from "@/help/server"
import {IEventItem} from "./care"

enum FetchEnum {
  event = "/event",
  hotTopic = "/hot/topic"
}

interface IEventRes {
  lasttime: number // 最后时间戳
  more: boolean // 是否还有更多
  event: IEventItem[] // 事件列表
  code: number // 状态码
}
export const event = (data: {pagesize: number; lasttime: number | string}) => {
  return service<IEventRes>(FetchEnum.event, data)
}

export type HotItem = {
  actId: number // 活动ID
  title: string // 标题
  text: string[] // 文本内容数组
  participateCount: number // 参与人数
  iconUrl: null // 图标URL，这里为null，表示没有图标
  readCnt: null // 阅读次数，这里为null，表示没有提供阅读次数
  topicDisplayType: null // 主题展示类型，这里为null，表示没有提供展示类型
  bizId: null // 商业ID，这里为null，表示没有提供商业ID
  bizType: null // 商业类型，这里为null，表示没有提供商业类型
  memberCount: null // 成员数量，这里为null，表示没有提供成员数量
  onlineNum: null // 在线人数，这里为null，表示没有提供在线人数
  sharePicUrl: string // 分享图片URL
  reason: string // 原因说明，这里为空字符串，表示没有特别原因
  isDefaultImg: boolean // 是否为默认图片，false表示不是默认图片
  alg: string // 算法标识
}

interface IHotTopicRes {
  code: number // 状态码
  hot: HotItem[] // 热门项目数组
}
export const hotTopic = (data: {limit: number; offset: number}) => {
  return service<IHotTopicRes>(FetchEnum.hotTopic, data)
}

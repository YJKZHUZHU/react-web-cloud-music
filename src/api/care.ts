/** @format */

import {service} from "@/help/server"

enum FetchEnum {
  userFollows = "/user/follows",
  userFolloweds = "/user/followeds",
  userEvent = "/user/event",
  eventDel = "/event/del"
}

interface IUserFollowsParams {
  uid: string | number
  limit?: number
  offset?: number
}
export interface FollowItem {
  py: string // 用户昵称的拼音
  time: number // 时间戳
  avatarDetail?: {
    identityIconUrl: string
    identityLevel: number
    userType: number
  } // 用户头像详情，可能为空
  userType: number // 用户类型
  followed: boolean // 是否已关注
  vipType: number // VIP类型
  userId: number // 用户ID
  remarkName?: null // 备注名称，可能为空
  mutual: boolean // 是否互相关注
  nickname: string // 用户昵称
  followeds: number // 关注数量
  follows: number // 粉丝数量
  avatarUrl: string // 用户头像链接
  authStatus: number // 认证状态
  gender: number // 性别
  expertTags?: null // 专家标签，可能为空
  experts?: null // 专家信息，可能为空
  accountStatus: number // 账号状态
  signature?: null // 用户签名，可能为空
  vipRights: {
    associator?: {
      iconUrl: string
      rights: boolean
      vipCode: 100
    } // 关联账号信息，可能为空
    musicPackage?: null // 音乐包信息，可能为空
    redplus?: null // Redplus信息，可能为空
    redVipAnnualCount: number // 年度VIP数量
    redVipLevel: number // VIP等级
    relationType: number // 关系类型
  }
  blacklist: boolean // 是否黑名单
  eventCount: number // 事件数量
  playlistCount: number // 歌单数量
}

interface IUserFollowsRes {
  follow: FollowItem[] // 关注列表
  touchCount: number // 触摸计数
  more: boolean // 是否还有更多数据
  code: number // 响应码
}

export const userFollows = (data: IUserFollowsParams) => {
  return service<IUserFollowsRes>(FetchEnum.userFollows, data)
}

export type IUserFollowedsRes = {
  newCount: number // 新增计数
  code: number // 状态码
  more: boolean // 是否有更多数据
  followeds: Followed[] // 关注列表
  size: number // 数据大小
}

export type Followed = {
  py: string // 用户昵称的拼音
  time: number // 时间戳
  nickname: string // 用户昵称
  mutual: boolean // 是否互粉
  follows: number // 关注数
  remarkName: string | null // 备注名称
  followeds: number // 被关注数
  avatarUrl: string // 头像链接
  authStatus: number // 认证状态
  gender: number // 性别
  expertTags: any[] | null // 专家标签
  experts: any[] | null // 专家
  accountStatus: number // 账号状态
  vipType: number // VIP类型
  avatarDetail: any | null // 头像详情
  userType: number // 用户类型
  followed: boolean // 是否已关注
  userId: number // 用户ID
  signature: string // 个人签名
  vipRights: VipRights // VIP权益
  eventCount: number // 事件数量
  playlistCount: number // 歌单数量
}

type VipRights = {
  associator: any | null // 关联账号
  musicPackage: any | null // 音乐包
  redplus: any | null // 红加
  redVipAnnualCount: number // 年度红Vip数量
  redVipLevel: number // 红Vip等级
  relationType: number // 关系类型
}

export const userFolloweds = (data: IUserFollowsParams) => {
  return service<IUserFollowedsRes>(FetchEnum.userFolloweds, data)
}

interface IuserEventParams {
  uid: string | number
  limit: number
  lasttime: number
}

export interface IEventItem {
  musicianSay: boolean // 是否有音乐人说
  actName: string | null // 活动名称
  identityLabels: any[] | null // 身份标签
  socialUser: any | null // 社交用户信息
  pendantData: any | null // 挂件数据
  forwardCount: number // 转发数量
  lotteryEventData: any | null // 抽奖事件数据
  discussId: string // 讨论ID
  encryptUserId: string // 加密用户ID
  insiteForwardCount: number // 站内转发数量
  info: {
    commentThread: {
      id: string // 评论线程ID
      resourceInfo: any // 资源信息
      resourceType: number // 资源类型
      commentCount: number // 评论数量
      likedCount: number // 点赞数量
      shareCount: number // 分享数量
      hotCount: number // 热门数量
      latestLikedUsers: any // 最新点赞用户列表
      resourceTitle: string // 资源标题
      resourceId: number // 资源ID
      resourceOwnerId: number // 资源所有者ID
    }
    latestLikedUsers: any // 最新点赞用户列表
    liked: boolean // 是否已点赞
    comments: any // 评论
    resourceType: number // 资源类型
    resourceId: number // 资源ID
    commentCount: number // 评论数量
    likedCount: number // 点赞数量
    shareCount: number // 分享数量
    threadId: string // 线程ID
  }
  topEvent: boolean // 是否是置顶事件
  threadId: string // 线程ID
  tailMark: any | null // 尾部标记
  typeDesc: string // 类型描述
  alterLinkUrl: string | null // 改变链接URL
  alterLinkWebviewUrl: string | null // 改变Webview链接URL
  privacySetting: number // 隐私设置
  privacySettingInfo: {
    desc: string // 描述
  }
  question: any | null // 问题
  voice: any | null // 声音
  topActivityInfos: any | null // 顶部活动信息
  bottomActivityInfos: any | null // 底部活动信息
  h5Target: any | null // H5目标
  more: boolean // 是否还有更多
  logInfo: any | null // 日志信息
  eventActionToast: any | null // 事件操作提示
  relationTopic: any | null // 关联话题
  extType: string // 扩展类型
  extSource: any | null // 扩展来源
  distributionType: any | null // 分发类型
  srcResId: any | null // 来源资源ID
  srcResType: any | null // 来源资源类型
  srcResThreadId: any | null // 来源资源线程ID
  location: any | null // 位置
  ipLocation: {
    ip: any // IP地址
    location: string // 地理位置
  }
  anonymityInfo: {
    anonymous: number // 匿名状态
    name: string | null // 名称
    avatarUrl: string | null // 头像URL
    me: number // 是否是我
    labelIcons: any | null // 标签图标
  }
  pointTopicInfo: {
    id: any // ID
    type: any // 类型
    subType: any // 子类型
    name: string | null // 名称
    icon: any // 图标
    desc: string | null // 描述
    target: any // 目标
    throughInfo: any // 通过信息
    ext: any // 扩展信息
    hot: boolean // 是否热门
    hotIcon: any // 热门图标
    hotDiscussNumDesc: any // 热门讨论数量描述
    squareDesc: string | null // 广场描述
    momentTopic: boolean // 是否是动态话题
    pubGuide: boolean // 是否是发布指南
    pubGuideIcon: any // 发布指南图标
    pubGuideText: string | null // 发布指南文本
    pubGuideActionText: string | null // 发布指南动作文本
    parent: any // 父级
  }
  commentInfo: any | null // 评论信息
  userBizLevels: any | null // 用户业务等级
  owner: boolean // 是否是所有者
  commentTargetUrl: string | null // 评论目标URL
  resourceUniqueId: string // 资源唯一ID
  showFollowButton: boolean // 是否显示关注按钮
  readCount: any | null // 阅读数量
  medal: any | null // 勋章
  user: {
    defaultAvatar: boolean // 是否是默认头像
    province: number // 省份
    authStatus: number // 认证状态
    followed: boolean // 是否已关注
    avatarUrl: string // 头像URL
    accountStatus: number // 账号状态
    gender: number // 性别
    city: number // 城市
    birthday: number // 生日
    userId: number // 用户ID
    userType: number // 用户类型
    nickname: string // 昵称
    signature: string // 签名
    description: string // 描述
    detailDescription: string // 详细描述
    avatarImgId: number // 头像图片ID
    backgroundImgId: number // 背景图片ID
    backgroundUrl: string // 背景URL
    authority: number // 权限
    mutual: boolean // 是否互粉
    expertTags: any // 专家标签
    experts: any // 专家
    djStatus: number // DJ状态
    vipType: number // VIP类型
    remarkName: string | null // 备注名
    authenticationTypes: number // 认证类型
    avatarDetail: any // 头像详情
    avatarImgIdStr: string // 头像图片ID字符串
    backgroundImgIdStr: string // 背景图片ID字符串
    anchor: boolean // 是否是主播
    urlAnalyze: boolean // 是否URL分析
    vipRights: {
      associator: {
        vipCode: number // 关联VIP代码
        rights: boolean // 是否有权限
        iconUrl: string // 图标URL
      }
      musicPackage: {
        vipCode: number // 音乐包VIP代码
        rights: boolean // 是否有权限
        iconUrl: string // 图标URL
      }
      redplus: any // 红加
      redVipAnnualCount: number // 红Vip年数
      redVipLevel: number // 红Vip等级
      relationType: number // 关系类型
    }
    avatarImgId_str: string // 头像图片ID字符串
    commonIdentity: any // 共同身份
    followeds: number // 关注数量
  }
  xInfo: {
    topEvent: boolean // 是否是置顶事件
    insiteForwardCount: number // 站内转发数量
    info: {
      commentThread: {
        id: string // 评论线程ID
        resourceInfo: any // 资源信息
        resourceType: number // 资源类型
        commentCount: number // 评论数量
        likedCount: number // 点赞数量
        shareCount: number // 分享数量
        hotCount: number // 热门数量
        latestLikedUsers: any // 最新点赞用户列表
        resourceTitle: string // 资源标题
        resourceId: number // 资源ID
        resourceOwnerId: number // 资源所有者ID
      }
      latestLikedUsers: any // 最新点赞用户列表
      liked: boolean // 是否已点赞
      comments: any // 评论
      resourceType: number // 资源类型
      resourceId: number // 资源ID
      commentCount: number // 评论数量
      likedCount: number // 点赞数量
      shareCount: number // 分享数量
      threadId: string // 线程ID
    }
  }
  json: string // JSON字符串
  uuid: string // UUID
  eventTime: number // 事件时间戳
  extJsonInfo: {
    actId: number // 活动ID
    actIds: any[] // 活动IDs
    uuid: string // UUID
    extType: string // 扩展类型
    extSource: any // 扩展来源
    distributionType: any // 分发类型
    extId: string // 扩展ID
    srcResId: any // 来源资源ID
    srcResType: any // 来源资源类型
    circleId: string // 圈子ID
    circlePubType: any // 圈子发布类型
    extParams: any // 扩展参数
    tailMark: any // 尾部标记
    privacySetting: number // 隐私设置
    typeDesc: any // 类型描述
    questionId: any // 问题ID
    voiceInfo: any // 声音信息
    pointTopicInfo: {
      id: any // ID
      relatedId: any // 相关ID
      type: any // 类型
      subType: any // 子类型
      name: string // 名称
      icon: any // 图标
      target: any // 目标
      h5Target: any // H5目标
      throughInfo: any // 通过信息
      ext: any // 扩展信息
      hot: boolean // 是否热门
      hotIcon: any // 热门图标
      hotDiscussNumDesc: any // 热门讨论数量描述
      squareDesc: string // 广场描述
      momentTopic: boolean // 是否是动态话题
      pubGuide: boolean // 是否是发布指南
      pubGuideIcon: any // 发布指南图标
      pubGuideText: string // 发布指南文本
      pubGuideActionText: string // 发布指南动作文本
      parent: any // 父级
    }
    activityInfos: any[] // 活动信息列表
    anonymityInfo: {
      anonymous: number // 匿名状态
      name: string // 名称
      avatarUrl: string // 头像URL
    }
    socialUserId: any // 社交用户ID
    socialSpaceVisible: any // 社交空间可见性
    titleAlias: any // 标题别名
    gradeSnapshotId: any // 等级快照ID
    changeExtTypeTime: any // 改变扩展类型时间
    algScores: any // 算法分数
    location: any // 位置
    publishTag: any // 发布标签
    activityCode: any // 活动代码
    recommendStatus: number // 推荐状态
    firstRecommendTime: number // 首次推荐时间
    momentScore: any // 动态分数
    firstEditTime: number // 首次编辑时间
  }
  rcmdInfo: any // 推荐信息
  pics: any[] // 图片列表
  tmplId: number // 模板ID
  expireTime: number // 过期时间
  actId: number // 活动ID
  showTime: number // 展示时间
  id: number // ID
  type: EnumEventType // 类型
}

export enum EnumEventType {
  shareBoke = 28,
  publishMlog = 57,
  shareMV = 21,
  sharePlaylist = 13,
  transmit = 22,
  shareAlbum = 19,
  shareSingle = 18,
  publishDynamic = 35
}

interface IUserEventRes {
  lasttime: number // 最后时间戳
  more: boolean // 是否还有更多
  size: number // 大小
  events: IEventItem[] // 事件列表
  code: number // 状态码
}

export const userEvent = (data: IuserEventParams) => {
  return service<IUserEventRes>(FetchEnum.userEvent, data)
}

export const eventDel = (data: {evId: string | number}) => {
  return service<IUserEventRes>(FetchEnum.eventDel, data)
}

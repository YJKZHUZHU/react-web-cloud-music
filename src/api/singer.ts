/** @format */

import {service} from "@/help/server"

enum FetchEnum {
  artistList = "/artist/list",
  artistAlbum = "/artist/album",
  artistDesc = "/artist/desc",
  simiArtist = "/simi/artist",
  artistMv = "/artist/mv",
  artistSub = "/artist/sub",
  artistDetail = "/artist/detail"
}

export interface ArtistInfo {
  accountId: number // 账号ID
  albumSize: number // 专辑数量
  alias: string[] // 别名列表
  briefDesc: string // 简介描述
  fansCount: number // 粉丝数量
  followed: boolean // 是否已关注
  id: number // 艺人ID
  img1v1Id: number // 头像1v1图片ID
  img1v1Id_str: string // 头像1v1图片ID的字符串形式
  img1v1Url: string // 头像1v1图片URL
  musicSize: number // 音乐作品数量
  name: string // 艺人名称
  picId: number // 专辑图片ID
  picId_str: string // 专辑图片ID的字符串形式
  picUrl: string // 专辑图片URL
  topicPerson: number // 主题人物数量
  trans: string // 翻译名称
  transNames: string[] // 翻译名称列表
}

export interface IArtistListParams {
  limit: number
  /** 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 */
  offset: number
  /** 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0 */
  initial: number | string
  type: number
  area: number
}
interface IArtistListRes {
  code: number // 响应码
  artists: ArtistInfo[]
  more: boolean
}
export const artistList = (data: Partial<IArtistListParams>) => {
  return service<IArtistListRes>(FetchEnum.artistList, data)
}

export interface Artist {
  img1v1Id: number // 艺人图片1v1标识符
  topicPerson: number // 主题人物标识
  picId: number // 艺人图片标识符
  musicSize: number // 音乐数量
  albumSize: number // 专辑数量
  briefDesc: string // 简介描述
  picUrl: string // 艺人图片URL
  img1v1Url: string // 艺人1v1图片URL
  followed: boolean // 是否关注
  trans: string // 翻译名
  alias: string[] // 别名数组
  name: string // 艺人名称
  id: number // 艺人ID
  picId_str: string // 艺人图片标识符字符串
  img1v1Id_str: string // 艺人1v1图片标识符字符串
}

export interface ArtistAlbum {
  songs: any[] // 歌曲列表
  paid: boolean // 是否付费
  onSale: boolean // 是否在售
  mark: number // 标记
  awardTags: any[] | null // 奖项标签
  artists: Artist[] // 艺人数组
  copyrightId: number // 版权标识
  picId: number // 专辑图片标识符
  artist: Artist // 艺人信息
  publishTime: number // 发布时间
  company: string // 发行公司
  briefDesc: string // 简介描述
  picUrl: string // 专辑图片URL
  commentThreadId: string // 评论线程标识符
  blurPicUrl: string // 模糊专辑图片URL
  companyId: number // 公司标识
  pic: number // 专辑图片标识符
  status: number // 状态
  subType: string // 子类型
  alias: string[] // 别名数组
  description: string // 描述
  tags: string // 标签
  name: string // 专辑名称
  transNames: string[]
  id: number // 专辑ID
  type: string // 类型
  size: number // 大小
  picId_str: string // 专辑图片标识符字符串
  isSub: boolean // 是否为子集
}

interface IAlbumDetailRes {
  artist: Artist // 艺人信息
  hotAlbums: ArtistAlbum[] // 热门专辑列表
  more: boolean // 是否有更多数据
  code: number // 响应码
}

interface IAlbumDetailParams {
  id: number | string
  limit?: number
  offset?: number
}

export const artistAlbum = (data: IAlbumDetailParams) => {
  return service<IAlbumDetailRes>(FetchEnum.artistAlbum, data)
}

type IntroductionItem = {
  ti: string // 标题
  txt: string // 描述内容
}

type TopicContentItem = {
  type: number // 内容类型
  id: number // 内容ID
  content: string // 具体内容
}

type Topic = {
  id: number // 主题ID
  addTime: number // 添加时间
  mainTitle: string // 主标题
  title: string // 标题
  content: TopicContentItem[] // 内容列表
  userId: number // 用户ID
  cover: number // 封面图片ID
  headPic: number // 用户头像ID
  shareContent: string // 分享内容
  wxTitle: string // 微信标题
  showComment: boolean // 是否显示评论
  status: number // 状态
  seriesId: number // 系列ID
  pubTime: number // 发布时间
  readCount: number // 阅读次数
  tags: string[] // 标签列表
  pubImmidiatly: boolean // 是否立即发布
  auditor: string // 审核员
  auditTime: number // 审核时间
  auditStatus: number // 审核状态
  startText: string // 开始文本
  delReason: string // 删除原因
  showRelated: boolean // 是否显示相关内容
  fromBackend: boolean // 是否来自后台
  rectanglePic: number // 矩形图片ID
  updateTime: number // 更新时间
  reward: boolean // 是否打赏
  summary: string // 摘要
  memo: string | null // 备注
  adInfo: string // 广告信息
  categoryId: number // 分类ID
  hotScore: number // 热度分数
  recomdTitle: string // 推荐标题
  recomdContent: string // 推荐内容
  number: number // 数量
}

type Creator = {
  userId: number // 用户ID
  userType: number // 用户类型
  nickname: string // 用户昵称
  avatarImgId: number // 头像图片ID
  avatarUrl: string // 头像图片URL
  backgroundImgId: number // 背景图片ID
  backgroundUrl: string // 背景图片URL
  signature: string // 用户签名
  createTime: number // 创建时间
  userName: string // 用户名
  accountType: number // 账号类型
  shortUserName: string // 简短用户名
  birthday: number // 生日
  authority: number // 权限
  gender: number // 性别
  accountStatus: number // 账号状态
  province: number // 省份
  city: number // 城市
  authStatus: number // 认证状态
  description: string // 描述
  detailDescription: string // 详细描述
  defaultAvatar: boolean // 是否默认头像
  expertTags: string[] // 专家标签列表
  experts: {[key: number]: string} // 专家领域
  djStatus: number // DJ状态
  locationStatus: number // 定位状态
  vipType: number // VIP类型
  followed: boolean // 是否关注
  mutual: boolean // 是否互关
  authenticated: boolean // 是否认证
  lastLoginTime: number // 最后登录时间
  lastLoginIP: string // 最后登录IP
  remarkName: string | null // 备注名称
  viptypeVersion: number // VIP类型版本
  authenticationTypes: number // 认证类型
  avatarDetail: any // 头像详情
  anchor: boolean // 是否是主播
}

type TopicDataItem = {
  topic: Topic // 主题详情
  creator: Creator // 创建者信息
  shareCount: number // 分享次数
  commentCount: number // 评论次数
  likedCount: number // 点赞次数
  liked: boolean // 是否点赞
  rewardCount: number // 打赏次数
  rewardMoney: number // 打赏金额
  relatedResource: any // 相关资源
  rectanglePicUrl: string // 矩形图片URL
  coverUrl: string // 封面图片URL
  categoryId: number // 分类ID
  categoryName: string // 分类名称
  mainTitle: string // 主标题
  commentThreadId: string // 评论线程ID
  wxTitle: string // 微信标题
  addTime: number // 添加时间
  seriesId: number // 系列ID
  showComment: boolean // 是否显示评论
  showRelated: boolean // 是否显示相关内容
  memo: string | null // 备注
  summary: string // 摘要
  recmdTitle: string // 推荐标题
  recmdContent: string // 推荐内容
  readCount: number // 阅读次数
  url: string // 链接
  title: string // 标题
  tags: string[] // 标签列表
  id: number // ID
  number: number // 数量
}

export interface IArtistDescRes {
  introduction: IntroductionItem[] // 简介列表
  briefDesc: string // 简介描述
  count: number // 数量
  topicData: TopicDataItem[] // 主题数据列表
  code: number // 响应码
}

export const artistDesc = (data: {id: string | number}) => {
  return service<IArtistDescRes>(FetchEnum.artistDesc, data)
}

export type ISimiArtistItem = {
  name: string // 艺术家名称
  id: number // 艺术家ID
  picId: number // 艺术家图片ID
  img1v1Id: number // 艺术家1v1图片ID
  briefDesc: string // 艺术家简介
  picUrl: string // 艺术家图片URL
  img1v1Url: string // 艺术家1v1图片URL
  albumSize: number // 专辑数量
  alias: string[] // 别名列表
  trans: string // 翻译
  musicSize: number // 音乐作品数量
  topicPerson: number // 主题人物数量
  showPrivateMsg: null // 是否显示私信
  isSubed: null // 是否订阅
  accountId: null // 账号ID
  picId_str: string // 艺术家图片ID字符串
  img1v1Id_str: string // 艺术家1v1图片ID字符串
  transNames: null // 翻译名称列表
  followed: boolean // 是否已关注
  mvSize: null // MV数量
  publishTime: null // 发布时间
  identifyTag: null // 识别标签
  alg: string // 算法标识
  fansCount: number // 粉丝数量
}

type ISimiArtistRes = {
  artists: ISimiArtistItem[] // 艺术家列表
  code: number // 响应码
}

export const simiArtist = (data: {id: string | number}) => {
  return service<ISimiArtistRes>(FetchEnum.simiArtist, data)
}

export interface IMVItem {
  id: number // MV的唯一标识
  name: string // MV的名称
  status: number // MV的状态码
  artistName: string // 艺人名称
  imgurl: string // MV的图片URL
  artist: Artist // 艺人信息
  imgurl16v9: string // MV的16:9图片URL
  duration: number // MV的时长，单位为毫秒
  playCount: number // MV的播放次数
  publishTime: string // MV的发布时间，格式为'YYYY-MM-DD'
  subed: boolean // 是否已订阅
}

interface IArtistMvRes {
  mvs: IMVItem[] // MV列表
  time: number // 响应时间戳
  hasMore: boolean // 是否还有更多数据
  code: number // 响应状态码
}
export const artistMv = (data: {id: string | number; limit?: number; offset?: number}) => {
  return service<IArtistMvRes>(FetchEnum.artistMv, data)
}

export const artistSub = (data: {id: string | number; t: 0 | 1}) => {
  return service<any>(FetchEnum.artistSub, data)
}

export interface IArtistDetailRes {
  videoCount: number // 视频数量
  identify: {
    imageUrl?: string | null // 艺人图片链接，可能为空
    imageDesc: string // 图片描述
    actionUrl: string // 动作链接
  }
  artist: {
    id: number // 艺人ID
    cover?: string // 封面图片链接
    avatar?: string // 头像图片链接
    name: string // 艺人名字
    transNames: string[] // 别名列表，可能为空数组
    alias: string[] // 别名
    identities: string[] // 身份标识
    identifyTag?: string | null // 身份标签，可能为空
    briefDesc: string // 简介描述
    rank: {
      rank: number // 排名
      type: number // 类型
    }
    albumSize: number // 专辑数量
    musicSize: number // 音乐数量
    mvSize: number // MV数量
  }
  blacklist: boolean // 是否黑名单
  preferShow: number // 优先展示数量
  showPriMsg: boolean // 是否显示主要消息
  secondaryExpertIdentiy: Array<{
    expertIdentiyId: number // 专家身份ID
    expertIdentiyName: string // 专家身份名称
    expertIdentiyCount: number // 专家身份计数
  }> // 次要专家身份列表
}

export const artistDetail = (data: {id: string | number}) => {
  return service<IArtistDetailRes>(FetchEnum.artistDetail, data)
}

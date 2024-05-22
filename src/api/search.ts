/** @format */

import {service} from "@/help/server"
import {
  SearchResponse,
  Album,
  Artist,
  Song,
  Playlist,
  SUGGEST_TYOE_ENUM,
  SEARCH_TYPE_ENUM
} from "@/store/search"

enum FetchEnum {
  searchSuggest = "/search/suggest",
  hotDetail = "/search/hot/detail",
  defaultSearch = "/search/default",
  cloudSearch = "/cloudsearch",
  search = "/search"
}

type ISearchSuggestRes = {
  result: {
    [key in SUGGEST_TYOE_ENUM]: Album[] & Artist[] & Song[] & Playlist[]
  }
  code: number
}

export const searchSuggest = (data: {keywords: string; type?: string}) => {
  return service<ISearchSuggestRes>(FetchEnum.searchSuggest, data)
}

export const hotDetail = () => {
  return service<SearchResponse[]>(FetchEnum.hotDetail, {}, true)
}

export interface IDefaultSearchRes {
  showKeyword: string // 展示的关键词
  styleKeyword: {
    keyWord: string // 风格关键词
    descWord: string | null // 描述词，如果没有则为null
  }
  realkeyword: string // 实际搜索的关键词
  searchType: number // 搜索类型编号
  action: number // 动作编号
  alg: string // 算法标识
  gap: number // 间隔
  source: string | null // 数据来源，如果没有则为null
  bizQueryInfo: string // 业务查询信息，JSON字符串
  logInfo: string | null // 日志信息，如果没有则为null
  imageUrl: string | null // 图片URL，如果没有则为null
  trp_type: string | null // 跳转类型，如果没有则为null
  trp_id: string | null // 跳转ID，如果没有则为null
}

export const defaultSearch = () => {
  return service<IDefaultSearchRes>(FetchEnum.defaultSearch)
}
interface ISearchParams {
  keywords: string
  limit?: number // 返回数量 , 默认为 30
  offset?: number //偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
  type?: SEARCH_TYPE_ENUM
}

type ISearchArtist = {
  name: string // 艺术家名称
  id: number // 艺术家ID
  picId: number // 艺术家图片ID
  img1v1Id: number // 艺术家头像1v1ID
  briefDesc: string // 艺术家简介
  picUrl: string // 艺术家图片URL
  img1v1Url: string // 艺术家头像1v1URL
  albumSize: number // 艺术家专辑数量
  alias: string[] // 艺术家别名
  trans: string // 艺术家翻译名
  musicSize: number // 艺术家音乐作品数量
  topicPerson: number // 主题人物标识
  picId_str: string // 艺术家图片ID字符串形式
}

export type AlbumItem = {
  name: string // 专辑名称
  id: number // 专辑ID
  idStr: string // 专辑ID字符串形式
  type: string // 专辑类型
  size: number // 专辑包含歌曲数量
  picId: number // 专辑封面图片ID
  blurPicUrl: string // 专辑封面模糊图片URL
  companyId: number // 公司ID
  pic: number // 专辑封面图片ID（重复字段，已忽略）
  picUrl: string // 专辑封面图片URL（重复字段，已忽略）
  publishTime: number // 专辑发布时间（时间戳）
  description: string // 专辑描述
  tags: string // 专辑标签
  company: string // 发行公司名称
  briefDesc: string // 专辑简介
  artist: ISearchArtist // 专辑艺术家信息
  songs: [] // 专辑歌曲列表
  alias: string[] // 专辑别名
  status: number // 专辑状态
  copyrightId: number // 版权ID
  commentThreadId: string // 评论线程ID
  artists: ISearchArtist[] // 参与专辑的艺术家列表
  onSale: boolean // 是否在售
  picId_str: string // 专辑封面图片ID字符串形式
  isSub: boolean // 是否订阅
}

export interface MusicArtist {
  id: number // 艺人ID
  name: string // 艺人名称
  picUrl: string // 艺人图片URL
  alias: string[] // 艺人别名列表
  albumSize: number // 专辑数量
  picId: number // 艺人图片ID
  fansGroup: null // 粉丝团信息，这里为null
  img1v1Url: string // 艺人1v1图片URL
  img1v1: number // 艺人1v1图片ID
  transNames: string[] // 艺人的翻译名称列表
  mvSize: number // MV数量
  followed: boolean // 是否已关注
  trans: string // 翻译名
  accountId?: number
}

export type MusicPlaylist = {
  /** 歌单ID */
  id: number
  /** 歌单名称 */
  name: string
  /** 歌单封面图片URL */
  coverImgUrl: string
  /** 歌单创建者信息 */
  creator: {
    /** 创建者昵称 */
    nickname: string
    /** 创建者用户ID */
    userId: number
    /** 创建者用户类型 */
    userType: number
    /** 创建者头像URL */
    avatarUrl: string | null
    /** 创建者认证状态 */
    authStatus: number
    /** 创建者专家标签 */
    expertTags: string[] | null
    /** 创建者专家信息 */
    experts: any[] | null // 未知类型，需要具体信息才能定义
  }
  /** 歌单是否被订阅 */
  subscribed: boolean
  /** 歌单中曲目数量 */
  trackCount: number
  /** 创建者用户ID */
  userId: number
  /** 歌单播放次数 */
  playCount: number
  /** 歌单收藏次数 */
  bookCount: number
  /** 歌单特殊类型 */
  specialType: number
  /** 官方标签 */
  officialTags: any[] | null // 未知类型，需要具体信息才能定义
  /** 歌单操作 */
  action: any | null // 未知类型，需要具体信息才能定义
  /** 歌单操作类型 */
  actionType: any | null // 未知类型，需要具体信息才能定义
  /** 推荐文本 */
  recommendText: string | null
  /** 评分 */
  score: number | null
  /** 歌单描述 */
  description: string
  /** 是否为高品质音乐 */
  highQuality: boolean
}

export interface IUserItem {
  /**
   * 是否使用默认头像
   */
  defaultAvatar: boolean
  /**
   * 省份ID
   */
  province: number
  /**
   * 认证状态
   */
  authStatus: number

  /**
   * 是否已关注
   */
  followed: boolean
  /**
   * 头像链接
   */
  avatarUrl: string
  /**
   * 账号状态
   */
  accountStatus: number
  /**
   * 性别，1表示男性，2表示女性
   */
  gender: number
  /**
   * 城市ID
   */
  city: number
  /**
   * 生日，格式为时间戳
   */
  birthday: number
  /**
   * 用户ID
   */
  userId: number
  /**
   * 用户类型
   */
  userType: number
  /**
   * 用户昵称
   */
  nickname: string
  /**
   * 个人签名
   */
  signature: string
  /**
   * 个人简介
   */
  description: string
  /**
   * 详细个人简介
   */
  detailDescription: string
  /**
   * 头像图片ID
   */
  avatarImgId: number
  /**
   * 背景图片ID
   */
  backgroundImgId: number
  /**
   * 背景图片链接
   */
  backgroundUrl: string
  /**
   * 权限
   */
  authority: number
  /**
   * 是否互相关注
   */
  mutual: boolean
  /**
   * 专家标签，可能为null
   */
  expertTags: any[] | null
  /**
   * 专家，可能为null
   */
  experts: any[] | null
  /**
   * DJ状态
   */
  djStatus: number
  /**
   * 会员类型
   */
  vipType: number
  /**
   * 备注名，可能为null
   */
  remarkName: string | null
  /**
   * 认证类型
   */
  authenticationTypes: number
  /**
   * 头像详情
   */
  avatarDetail: {
    /**
     * 用户类型
     */
    userType: number
    /**
     * 身份等级
     */
    identityLevel: number
    /**
     * 身份图标链接
     */
    identityIconUrl: string
  }
  /**
   * 头像图片ID字符串
   */
  avatarImgIdStr: string
  /**
   * 背景图片ID字符串
   */
  backgroundImgIdStr: string
  /**
   * 是否是主播
   */
  anchor: boolean
  /**
   * 头像图片ID字符串（别名）
   */
  avatarImgId_str: string
  /**
   * 关注数
   */
  followeds: number
  /**
   * 粉丝数
   */
  follows: number
  /**
   * 算法标识
   */
  alg: string
  /**
   * 歌单数量
   */
  playlistCount: number
  /**
   * 被订阅的歌单数量
   */
  playlistBeSubscribedCount: number
}

export interface IMvItem {
  id: number // 歌曲ID
  cover: string // 歌曲封面图片链接
  name: string // 歌曲名称
  playCount: number // 播放次数
  briefDesc?: string | null // 歌曲简介，可能是null
  desc?: string | null // 歌曲详细描述，可能是null
  artistName: string // 歌手名称
  artistId: number // 歌手ID
  duration: number // 歌曲时长，单位为毫秒
  mark: number // 标记，具体含义根据上下文确定
  artists: {
    id: number // 歌手ID
    name: string // 歌手名称
    alias?: string[] // 歌手别名数组，可能是null
    transNames?: string[] // 歌手外文名，可能是null
  }[] // 歌手数组
  transNames?: string[] | null // 歌曲外文名，可能是null
  alias?: string[] | null // 别名，可能是null
}

interface Privilege {
  id: number
  fee: number // 价格
  payed: number
  st: number
  pl: number // 播放权限
  dl: number // 下载权限
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number // 最高比特率
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
  }
  rightSource: number
  chargeInfoList: Array<{
    rate: number
    chargeUrl: string | null
    chargeMessage: string | null
    chargeType: number
  }>
}

// 歌词
type ILyricItem = {
  name: string // 歌曲名
  id: number // 歌曲ID
  pst: number // 隐私类型
  t: number // 歌曲类型
  ar: {
    id: number
    name: string
    tns: string[] // 艺人别名
    alias: string[] // 艺人译名
  }[] // 歌手列表
  alia: string[] // 歌曲别名
  pop: number // 热度
  st: number // 状态码
  rt: string // 歌曲跳转链接
  fee: number // 收费类型
  v: number // 版本
  crbt: null // 歌词文件
  cf: string // 歌曲文件
  al: {
    id: number
    name: string
    picUrl: string // 专辑封面图片链接
    tns: string[] // 专辑别名
    pic_str: string // 专辑封面图片ID
    pic: number // 专辑封面图片ID的数字形式
  } // 专辑信息
  dt: number // 歌曲时长
  h: {
    br: number // 比特率
    fid: number
    size: number // 文件大小
    vd: number
    sr: number // 采样率
  } // 高品质音乐信息
  m: {
    br: number // 比特率
    fid: number
    size: number // 文件大小
    vd: number
    sr: number // 采样率
  } // 中品质音乐信息
  l: {
    br: number // 比特率
    fid: number
    size: number // 文件大小
    vd: number
    sr: number // 采样率
  } // 低品质音乐信息
  sq: {
    br: number // 比特率
    fid: number
    size: number // 文件大小
    vd: number
    sr: number // 采样率
  } // 无损品质音乐信息
  hr: null // 无损品质音乐信息（备用）
  a: null // 无损品质音乐信息（备用）
  cd: string // 唱片集
  no: number // 序号
  rtUrl: null // 歌曲跳转链接（备用）
  ftype: number
  rtUrls: any[] // 歌曲跳转链接数组
  djId: number
  copyright: number // 版权类型
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: null
  tagPicList: any[]
  resourceState: boolean
  version: number
  songJumpInfo: null
  entertainmentTags: any[]
  single: number
  noCopyrightRcmd: null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
  publishTime: number // 发布时间
  privilege: Privilege // 权限信息
  lyrics: string[] // 歌词列表
}
 
export type IVideoItem = {
  /**
   * 封面图片URL
   */
  coverUrl: string
  /**
   * 歌曲标题
   */
  title: string
  /**
   * 歌曲时长，单位毫秒
   */
  durationms: number
  /**
   * 播放时间，单位毫秒
   */
  playTime: number
  /**
   * 歌曲类型，具体含义需要根据上下文确定
   */
  type: number
  /**
   * 创作者列表
   */
  creator: Array<{
    /**
     * 用户ID
     */
    userId: number
    /**
     * 用户名
     */
    userName: string
  }>
  /**
   * 别名，可能为null
   */
  aliaName: string | null
  /**
   * 翻译名，可能为null
   */
  transName: string | null
  /**
   * 视频ID
   */
  vid: string
  /**
   * 标记类型，可能为null，具体含义需要根据上下文确定
   */
  markTypes: any[] | null
  /**
   * 算法标识，具体含义需要根据上下文确定
   */
  alg: string
}

export interface ISearchSongItem {
  // 歌曲名称
  name: string
  // 歌曲ID
  id: number
  // 版权类型
  pst: number
  // 歌曲类型
  t: number
  // 歌手列表
  ar: {
    // 歌手ID
    id: number
    // 歌手名称
    name: string
    // 歌手别名列表
    tns: string[]
    // 歌手昵称列表
    alias: string[]
  }[]
  // 歌曲别名列表
  alia: string[]
  // 歌曲热度
  pop: number
  // 状态码
  st: number
  // 歌曲跳转URL
  rt: string
  // 收费类型
  fee: number
  // 版本号
  v: number
  // 歌词文件URL，可能为空
  crbt: string | null
  // 歌曲文件URL，可能为空
  cf: string
  // 专辑信息
  al: {
    // 专辑ID
    id: number
    // 专辑名称
    name: string
    // 专辑封面图片URL
    picUrl: string
    // 专辑名称列表
    tns: string[]
    // 专辑图片字符串标识
    pic_str: string
    // 专辑图片标识
    pic: number
  }
  // 歌曲时长（毫秒）
  dt: number
  // 高品质音频信息
  h: AudioQuality
  // 中品质音频信息
  m: AudioQuality
  // 普通品质音频信息
  l: AudioQuality
  // 无损品质音频信息
  sq: AudioQuality
  // 高解析无损品质音频信息，可能为空
  hr: AudioQuality | null
  // 专辑ID，可能为空
  a: number | null
  // 专辑中的歌曲序号
  cd: string
  // 专辑中的歌曲编号
  no: number
  // 歌曲跳转URL，可能为空
  rtUrl: string | null
  // 文件类型
  ftype: number
  // 歌曲跳转URL列表，可能为空
  rtUrls: string[]
  // 歌单ID
  djId: number
  // 版权标识
  copyright: number
  // 标识
  s_id: number
  // 封面类型
  mark: number
  // 封面图片类型，可能为空
  originCoverType: number
  // 原始歌曲简单数据，可能为空
  originSongSimpleData: any
  // 标签图片列表，可能为空
  tagPicList: any
  // 资源状态
  resourceState: boolean
  // 版本
  version: number
  // 歌曲跳转信息，可能为空
  songJumpInfo: any
  // 娱乐标签，可能为空
  entertainmentTags: any
  // 是否为单曲
  single: number
  // 无版权推荐，可能为空
  noCopyrightRcmd: any
  // 歌曲类型
  rtype: number
  // 重定向URL，可能为空
  rurl: string | null
  // 音乐风格
  mst: number
  // 版权公司
  cp: number
  // MV ID
  mv: number
  // 发布时间（毫秒）
  publishTime: number
  // 权限信息
  privilege: Privilege
}

interface AudioQuality {
  // 比特率
  br: number
  // 文件ID
  fid: number
  // 文件大小
  size: number
  // 视频数据
  vd: number
  // 采样率
  sr: number
}

interface Privilege {
  // 歌曲ID
  id: number
  // 收费类型
  fee: number
  // 是否已购买
  payed: number
  // 状态码
  st: number
  // 播放权限级别
  pl: number
  // 下载权限级别
  dl: number
  // 是否为空间歌曲
  sp: number
  // 是否为版权歌曲
  cp: number
  // 是否为彩铃
  subp: number
  // 是否为纯音乐
  cs: boolean
  // 最大比特率
  maxbr: number
  // 音质级别
  fl: number
  // 是否显示toast
  toast: boolean
  // 标志
  flag: number
  // 是否为预售
  preSell: boolean
  // 最大播放比特率
  playMaxbr: number
  // 最大下载比特率
  downloadMaxbr: number
  // 最大比特率级别
  maxBrLevel: string
  // 播放最大比特率级别
  playMaxBrLevel: string
  // 下载最大比特率级别
  downloadMaxBrLevel: string
  // 播放权限级别
  plLevel: string
  // 下载权限级别
  dlLevel: string
  // 音质级别
  flLevel: string
  // 推荐歌曲列表，可能为空
  rscl: any
  // 免费试听权限，可能为空
  freeTrialPrivilege: {
    resConsumable: boolean
    userConsumable: boolean
    listenType: any
    cannotListenReason: any
  }
  // 版权来源
  rightSource: number
  // 收费信息列表
  chargeInfoList: ChargeInfo[]
}

interface ChargeInfo {
  // 比特率
  rate: number
  // 收费URL，可能为空
  chargeUrl: string | null
  // 收费信息，可能为空
  chargeMessage: string | null
  // 收费类型
  chargeType: number
}

interface SearchResult {
  // 搜索质量提醒，可能为空
  searchQcReminder: string | null
  // 歌曲列表
  songs: ISearchSongItem[] | ILyricItem[]
  songCount: number
  // 专辑类别
  albums: AlbumItem[]
  albumCount: number
  // 歌手列表
  artists: MusicArtist[]
  artistCount: number
  /** 歌单列表 */
  playlists: MusicPlaylist[]
  playlistCount: number
  /** 用户 */
  userprofiles: IUserItem[]
  userprofileCount: number
  mvs: IMvItem[]
  mvCount: number
  videos: IVideoItem[]
  videoCount: number
}
interface ISearchRes {
  // 结果代码，200表示成功
  code: number
  // 搜索结果
  result: Partial<SearchResult>
}
export const cloudSearch = (data: ISearchParams) => {
  return service<ISearchRes>(FetchEnum.cloudSearch, data)
}

/** @format */

import {create} from "zustand"
import {createJSONStorage, devtools, persist} from "zustand/middleware"
import {userPlaylist, userRecord, userSubcount} from "@/api/user"
import {EnumLocalStorage, getItem} from "@/help/cache"

export interface IUserInfo {
  level: number // 用户等级
  listenSongs: number // 听歌数量
  userPoint: {
    userId: number // 用户ID
    balance: number // 余额
    updateTime: number // 更新时间
    version: number // 版本
    status: number // 状态
    blockBalance: number // 封禁余额
  }
  mobileSign: boolean // 手机签到
  pcSign: boolean // PC签到
  profile: {
    privacyItemUnlimit: {
      area: boolean // 区域
      college: boolean // 学院
      gender: boolean // 性别
      age: boolean // 年龄
      villageAge: boolean // 村龄
    }
    avatarDetail: null // 头像详情
    createTime: number // 创建时间
    gender: number // 性别
    nickname: string // 昵称
    avatarImgId: number // 头像图片ID
    birthday: number // 生日
    authStatus: number // 认证状态
    avatarUrl: string // 头像图片URL
    backgroundImgId: number // 背景图片ID
    backgroundUrl: string // 背景图片URL
    city: number // 城市
    detailDescription: string // 详细描述
    djStatus: number // DJ状态
    expertTags: any[] | null // 专家标签
    followed: boolean // 是否已关注
    mutual: boolean // 是否互相关注
    province: number // 省份
    remarkName: string | null // 备注名
    defaultAvatar: boolean // 是否默认头像
    experts: {} // 专家信息
    vipType: number // VIP类型
    accountStatus: number // 账户状态
    userType: number // 用户类型
    backgroundImgIdStr: string // 背景图片ID字符串
    avatarImgIdStr: string // 头像图片ID字符串
    description: string // 描述
    userId: number // 用户ID
    signature: string // 签名
    authority: number // 权限
    followeds: number // 粉丝数
    follows: number // 关注数
    blacklist: boolean // 是否在黑名单中
    eventCount: number // 动态数
    allSubscribedCount: number // 订阅总数
    playlistBeSubscribedCount: number // 被订阅的歌单数
    followTime: null // 关注时间
    followMe: boolean // 是否被关注
    artistIdentity: any[] // 艺术家身份
    cCount: number // C数
    inBlacklist: boolean // 是否在黑名单中
    sDJPCount: number // DJP数
    playlistCount: number // 歌单数
    sCount: number // S数
    newFollows: number // 新关注数
  }
  peopleCanSeeMyPlayRecord: boolean // 是否允许他人查看我的播放记录
  bindings: {
    expiresIn: number // 过期时间
    refreshTime: number // 刷新时间
    bindingTime: number // 绑定时间
    tokenJsonStr: null // 令牌JSON字符串
    url: string // URL
    expired: boolean // 是否过期
    userId: number // 用户ID
    id: number // ID
    type: number // 类型
  }[]
  adValid: boolean // 广告有效
  code: number // 状态码
  newUser: boolean // 是否新用户
  recallUser: boolean // 是否回忆用户
  createTime: number // 创建时间
  createDays: number // 创建天数
  profileVillageInfo: {
    title: string // 标题
    imageUrl: null // 图片URL
    targetUrl: string // 目标URL
  }
}

export interface AccountData {
  id: number // 账户ID
  userName: string // 用户名
  type: number // 类型
  status: number // 状态
  whitelistAuthority: number // 白名单权限
  createTime: number // 创建时间
  tokenVersion: number // 令牌版本
  ban: number // 封禁状态
  baoyueVersion: number // 包月版本
  donateVersion: number // 捐赠版本
  vipType: number // VIP类型
  anonimousUser: boolean // 是否匿名用户
  paidFee: boolean // 是否付费
}

export interface ProfileData {
  userId: number // 用户ID
  userType: number // 用户类型
  nickname: string // 昵称
  avatarImgId: number // 头像图片ID
  avatarUrl: string // 头像图片URL
  backgroundImgId: number // 背景图片ID
  backgroundUrl: string // 背景图片URL
  signature: string // 签名
  createTime: number // 创建时间
  userName: string // 用户名
  accountType: number // 账户类型
  shortUserName: string // 短用户名
  birthday: number // 生日
  authority: number // 权限
  gender: number // 性别
  accountStatus: number // 账户状态
  province: number // 省份
  city: number // 城市
  authStatus: number // 认证状态
  description: string | null // 描述
  detailDescription: string | null // 详细描述
  defaultAvatar: boolean // 是否默认头像
  expertTags: any[] | null // 专家标签
  experts: any[] | null // 专家信息
  djStatus: number // DJ状态
  locationStatus: number // 位置状态
  vipType: number // VIP类型
  followed: boolean // 是否已关注
  mutual: boolean // 是否互相关注
  authenticated: boolean // 是否已认证
  lastLoginTime: number // 最后登录时间
  lastLoginIP: string // 最后登录IP
  remarkName: string | null // 备注名
  viptypeVersion: number // VIP类型版本
  authenticationTypes: number // 认证类型
  avatarDetail: any[] | null // 头像详情
  anchor: boolean // 是否是主播
}

export interface IAccountInfo {
  account: Partial<AccountData>
  profile: Partial<ProfileData>
}

export interface UserLevel {
  userId: number // 用户ID
  level: number // 用户等级
  growthPoint: number // 用户成长值
  levelName: string // 等级名称
  yesterdayPoint: number // 昨日成长值
  vipType: number // VIP类型
  extJson: string // 扩展JSON数据
  expireTime: number // 过期时间
  avatarUrl: null // 头像URL（为空）
  latestVipType: number // 最新VIP类型
  latestVipStatus: number // 最新VIP状态
  normal: boolean // 是否正常
  maxLevel: boolean // 是否达到最高等级
}

export interface LevelCard {
  rightId: number // 权益ID
  level: number // 等级
  privilegeName: string // 权益名称
  privilegeSubTitle: string // 权益副标题
  privilegeIconUrl: string | null // 权益图标URL（可为空）
  privilegePlusIconUrl: string | null // 权益附加图标URL（可为空）
  resourceId: number // 资源ID
  levelBackgroundCardImageUrl: string // 等级背景卡片图像URL
  levelBackgroundCardExpireImageUrl: string // 过期等级背景卡片图像URL
  levelName: string // 等级名称
  levelMarkImageUrl: string // 等级标记图像URL
  levelMarkExpireImageUrl: string // 过期等级标记图像URL
  backgroundImageUrl: string // 背景图像URL
  upgradeFireworksImageUrl: string // 升级烟花图像URL
  newUpgradeFireworksImageUrl: string // 新升级烟花图像URL
  blurryBackgroundImageUrl: string // 模糊背景图像URL
  redVipImageUrl: string // 红色VIP图像URL
  redVipExpireImageUrl: string // 过期红色VIP图像URL
  redVipWholeImageUrl: string // 红色VIP整体图像URL
  redVipExpireWholeImageUrl: string // 过期红色VIP整体图像URL
  redVipBuckleImageUrl: string // 红色VIP扣图像URL
  redVipExpireBuckleImageUrl: string // 过期红色VIP扣图像URL
  vipGiftRightBarImageUrl: string // VIP礼物右侧栏图像URL
  vipGiftExpireRightBarImageUrl: string | null // 过期VIP礼物右侧栏图像URL（可为空）
  vipLevelPageCardImgUrl: string // VIP等级页面卡片图像URL
  vipLevelPageExpireCardImgUrl: string // 过期VIP等级页面卡片图像URL
  accountPageIconImgUrl: string // 账户页面图标图像URL
  flashIconImgUrl: string // 闪光图标图像URL
}

export interface IVipInfo {
  userLevel: UserLevel // 用户等级信息
  levelCard: LevelCard // 等级卡片信息
}

export interface IUserItem {
  // 用户的默认头像标志位，true表示使用默认头像
  defaultAvatar: boolean
  // 用户所在的省份ID
  province: number
  // 用户的认证状态，0表示未认证
  authStatus: number
  // 是否已关注该用户
  followed: boolean
  // 用户头像的URL
  avatarUrl: string
  // 用户账号状态，0表示账号正常
  accountStatus: number
  // 用户的性别，2表示女性
  gender: number
  // 用户所在的城市ID
  city: number
  // 用户的生日，0表示未设置
  birthday: number
  // 用户的唯一ID
  userId: number
  // 用户类型，0表示普通用户
  userType: number
  // 用户的昵称
  nickname: string
  // 用户的签名
  signature: string
  // 用户的详细描述
  description: string
  // 用户的详细描述详细信息
  detailDescription: string
  // 头像图片ID
  avatarImgId: number
  // 背景图片ID
  backgroundImgId: number
  // 背景图片的URL
  backgroundUrl: string
  // 用户的权限等级
  authority: number
  // 是否互相关注
  mutual: boolean
  // 专家标签，null表示没有
  expertTags: string[] | null
  // 专家信息，null表示没有
  experts: any[] | null // 这里需要具体的结构，这里暂时用any代替
  // DJ身份状态，0表示不是DJ
  djStatus: number
  // VIP类型，11表示某种VIP身份
  vipType: number
  // 用户的备注名
  remarkName: string | null
  // 认证类型
  authenticationTypes: number
  // 头像图片的详细信息，null表示没有
  avatarDetail: any | null // 这里需要具体的结构，这里暂时用any代替
  // 头像图片ID的字符串形式
  avatarImgIdStr: string
  // 是否为主播
  anchor: boolean
  // 头像图片ID的字符串形式
  avatarImgId_str: string

  // 其他字段...
}

export interface ISongListItem {
  // 订阅者列表，空数组表示没有订阅者
  subscribers: IUserItem[]
  // 是否已订阅该歌单
  subscribed: boolean
  // 歌单创建者的信息
  creator: IUserItem
  // 艺术家列表，null表示没有
  artists: any[] | null // 这里需要具体的结构，这里暂时用any代替
  // 音轨列表，null表示没有
  tracks: any[] | null // 这里需要具体的结构，这里暂时用any代替
  // 是否置顶歌单
  top: boolean
  // 更新频率，null表示未知
  updateFrequency: string | null
  // 背景封面图片ID
  backgroundCoverId: number
  // 背景封面图片的URL，null表示没有
  backgroundCoverUrl: string | null
  // 歌单标题图片ID
  titleImage: number
  // 歌单标题图片的URL，null表示没有
  titleImageUrl: string | null
  // 歌单的英文标题，null表示没有
  englishTitle: string | null
  // 是否官方推荐
  opRecommend: boolean
  // 推荐信息，null表示没有
  recommendInfo: any | null // 这里需要具体的结构，这里暂时用any代替
  // 订阅者数量
  subscribedCount: number
  // 云同步音轨数量
  cloudTrackCount: number
  // 歌单所属用户的唯一ID
  userId: number
  // 所有音轨的总时长，单位为毫秒
  totalDuration: number
  // 封面图片ID
  coverImgId: number
  // 歌单的隐私设置，0表示公开
  privacy: number
  // 音轨最后更新的时间戳
  trackUpdateTime: number
  // 音轨数量
  trackCount: number
  // 歌单最后更新的时间戳
  updateTime: number
  // 评论线程ID
  commentThreadId: string
  // 封面图片的URL
  coverImgUrl: string
  // 歌单的特殊类型，5表示是用户的收藏夹
  specialType: number
  // 是否匿名创建，false表示不是匿名
  anonymous: boolean
  // 歌单创建的时间戳
  createTime: number
  // 是否为高品质音频，false表示不是
  highQuality: boolean
  // 是否为新导入的歌单，false表示不是
  newImported: boolean
  // 音轨数量最后更新的时间戳
  trackNumberUpdateTime: number
  // 播放次数
  playCount: number
  // 广告类型，0表示没有广告
  adType: number
  // 歌单描述
  description: string
  // 歌单标签列表
  tags: string[]
  // 是否已排序，false表示未排序
  ordered: boolean
  // 歌单状态，0表示正常
  status: number
  // 歌单名称
  name: string
  // 歌单的唯一ID
  id: number
  // 封面图片ID的字符串形式
  coverImgId_str: string
  // 共享用户列表，null表示没有
  sharedUsers: any[] | null // 这里需要具体的结构，这里暂时用any代替
  // 共享状态，null表示未知
  shareStatus: string | null
  // 是否被复制，false表示未被复制
  copied: boolean
}

export interface IAllPlayRecordItem {
  playCount: number // 播放次数
  score: number // 评分
  song: Song // 歌曲信息
}

interface SongPrivilege {
  id: number // 歌曲ID
  fee: number // 费用等级
  payed: number // 是否付费
  st: number // 状态
  pl: number // 播放权限级别
  dl: number // 下载权限级别
  sp: number // 单曲售卖级别
  cp: number // 版权信息
  subp: number // 订阅权限级别
  cs: boolean // 是否为云盘歌曲
  maxbr: number // 最高比特率
  fl: number // 比特率
  toast: boolean // 是否有toast提示
  flag: number // 标识
  preSell: boolean // 是否为预售
  playMaxbr: number // 播放时的最高比特率
  downloadMaxbr: number // 下载时的最高比特率
  maxBrLevel: string // 最高比特率级别
  playMaxBrLevel: string // 播放时的最高比特率级别
  downloadMaxBrLevel: string // 下载时的最高比特率级别
  plLevel: string // 播放权限级别
  dlLevel: string // 下载权限级别
  flLevel: string // 比特率级别
  rscl: any // 未知字段
  freeTrialPrivilege: {
    resConsumable: boolean // 资源是否可消费
    userConsumable: boolean // 用户是否可消费
    listenType: any // 未知字段
  }
  chargeInfoList: {
    rate: number // 比特率
    chargeUrl: null // 收费链接
    chargeMessage: null // 收费信息
    chargeType: number // 收费类型
  }[]
}

interface SongQuality {
  br: number // 比特率
  fid: number // 文件ID
  size: number // 文件大小
  vd: number // 未知字段
}

interface Artist {
  id: number // 艺术家ID
  name: string // 艺术家名称
  tns: string[] // 未知字段
  alias: string[] // 艺术家别名
}

interface Album {
  id: number // 专辑ID
  name: string // 专辑名称
  picUrl: string // 专辑图片URL
  tns: string[] // 未知字段
  pic_str: string // 未知字段
  pic: number // 专辑图片标识
}

interface Song {
  name: string // 歌曲名称
  id: number // 歌曲ID
  pst: number // 未知字段
  t: number // 未知字段
  ar: Artist[] // 艺术家数组
  alia: string[] // 歌曲别名
  pop: number // 流行度
  st: number // 状态
  rt: null // 未知字段
  fee: number // 费用等级
  v: number // 版本
  crbt: null // 未知字段
  cf: string // 未知字段
  al: Album // 专辑信息
  dt: number // 时长
  h: SongQuality // 高品质
  m: SongQuality // 中品质
  l: SongQuality // 低品质
  a: null // 未知字段
  cd: string // 专辑中的歌曲编号
  no: number // 序号
  rtUrl: null // 未知字段
  ftype: number // 文件类型
  rtUrls: any[] // 未知字段
  djId: number // 未知字段
  copyright: number // 版权信息
  s_id: number // 未知字段
  mark: number // 标记
  originCoverType: number // 原始封面类型
  originSongSimpleData: null // 未知字段
  single: number // 是否为单曲
  noCopyrightRcmd: null // 无版权推荐
  rtype: number // 未知字段
  rurl: null // 未知字段
  mst: number // 未知字段
  cp: number // 版权信息
  mv: number // 音乐视频ID
  publishTime: number // 发布时间戳
  privilege: SongPrivilege // 权限信息
}

// 统计信息接口，用于描述一个用户在音乐平台上的各类内容统计
export interface ISubCountInfo {
  // 节目数量，用户创建的节目总数
  programCount: number
  // 电台数量，用户创建的电台总数
  djRadioCount: number
  // 音乐视频数量，用户收藏的音乐视频总数
  mvCount: number
  // 艺人数量，用户关注的艺人总数
  artistCount: number
  // 新节目数量，用户新创建的节目总数
  newProgramCount: number
  // 创建电台数量，用户新创建的电台总数
  createDjRadioCount: number
  // 创建歌单数量，用户创建的歌单总数
  createdPlaylistCount: number
  // 订阅歌单数量，用户订阅的歌单总数
  subPlaylistCount: number
  // 状态码，用于表示请求是否成功，200 表示成功
  code: number
}
interface Props {
  accountInfo: Partial<IAccountInfo> // 账号信息
  userInfo: Partial<IUserInfo> // 用户信息
  vipInfo: Partial<IVipInfo>
  songList: ISongListItem[] // 用户歌单
  allPlayRecord: IAllPlayRecordItem[] // 播放记录
  playRecordLoading: boolean
  isSignIn: boolean
  subCountInfo: Partial<ISubCountInfo>
  songListLoading: boolean
}

interface Actions {
  setAccountInfo: (accountInfo: IAccountInfo) => void
  setUserInfo: (userInfo: IUserInfo) => void
  setVipInfo: (vipInfo: IVipInfo) => void
  getSongList: (userId: number) => void
  setAllPlayRecord: () => void
  setIsSignIn: (signIn: boolean) => void
  setSubCountInfo: () => void
}

const initialState: Props = {
  accountInfo: {},
  userInfo: {},
  vipInfo: {},
  songList: [],
  songListLoading: false,
  allPlayRecord: [],
  playRecordLoading: false,
  isSignIn: false,
  subCountInfo: {}
}

export const useUserStore = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setAccountInfo: (accountInfo) => set({accountInfo}, false, "设置账户信息"),
        setUserInfo: (userInfo) => {
          set({userInfo, isSignIn: userInfo.pcSign}, false, "设置用户信息")
        },
        setVipInfo: (vipInfo) => set({vipInfo}, false, "设置vip信息"),
        getSongList: async (userId) => {
          try {
            get().songList.length === 0 && set({songListLoading: true}, false, "Loading...")
            const res = await userPlaylist({uid: String(userId)})
            set({songListLoading: false, songList: res.data.playlist}, false, "设置用户歌单信息")
          } catch (error) {
            set({songListLoading: false}, false, "Loading...")
            console.log("error", error)
          }
        },
        setAllPlayRecord: async () => {
          try {
            set({playRecordLoading: true}, false, "Loading...")
            const uid = getItem(EnumLocalStorage.userId) as string
            if (!uid) return
            const res = await userRecord({uid, type: 0})
            console.log("===播放列表获取成功===")
            set({allPlayRecord: res.data.allData}, false, "获取播放列表")
            set({playRecordLoading: false}, false, "Loading...")
          } catch (error) {
            console.log("error", error)
          }
        },
        setIsSignIn: (signIn) => {
          set({isSignIn: signIn}, false, "设置是否签到")
        },
        setSubCountInfo: async () => {
          try {
            const res = await userSubcount()
            set({subCountInfo: res.data}, false, "获取用户信息 , 歌单，收藏，mv, dj 数量")
          } catch (error) {
            console.log("error", error)
          }
        }
      }),
      {
        name: "userStore",
        storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
      }
    ),
    {
      name: "userStore"
    }
  )
)

export const useUserInfo = () => useUserStore((state) => state.userInfo)

export const useVipInfo = () => useUserStore((state) => state.vipInfo)

export const useAvatarUrl = () => useUserStore((state) => state.accountInfo.profile?.avatarUrl)

export const useIsVip = () => useUserStore((state) => !!state.accountInfo.profile?.vipType)

export const useVipLevel = () => useUserStore((state) => state.vipInfo.userLevel?.level)

export const useLevel = () => useUserStore((state) => state.userInfo?.level)

export const useFollows = () => useUserStore((state) => state.userInfo.profile?.follows)

export const useEventCount = () => useUserStore((state) => state.userInfo.profile?.eventCount)

export const useFolloweds = () => useUserStore((state) => state.userInfo.profile?.followeds)

export const useFollowed = () => useUserStore((state) => state.userInfo.profile?.followed)

// 是否签到
export const useIsSignIn = () => useUserStore((state) => state.isSignIn)

export const useSetIsSignIn = () => useUserStore((state) => state.setIsSignIn)

export const useGetSongList = () => useUserStore((state) => state.getSongList)

export const useSongListLoading = () => useUserStore((state) => state.songListLoading)

// 用户创建的歌单
export const useCreatorSongList = () =>
  useUserStore((state) => state.songList?.filter((item) => !item.subscribed))

// 用户收藏的歌单
export const useFavoriteSongList = () =>
  useUserStore((state) => state.songList?.filter((item) => item.subscribed))

export const useAllPlayRecord = () => useUserStore((state) => state.allPlayRecord)

export const useSetAllPlayRecord = () => useUserStore((state) => state.setAllPlayRecord)

export const usePlayRecordLoading = () => useUserStore((state) => state.playRecordLoading)

export const useSubCountInfo = () => useUserStore((state) => state.subCountInfo)

export const useSetSubCountInfo = () => useUserStore((state) => state.setSubCountInfo)

import { create } from "zustand"
import { devtools } from "zustand/middleware"

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
interface Props {
  accountInfo: Partial<IAccountInfo> // 账号信息
  userInfo: Partial<IUserInfo> // 用户信息
  vipInfo: Partial<IVipInfo>
}

interface Actions {
  setAccountInfo: (accountInfo: IAccountInfo) => void
  setUserInfo: (userInfo: IUserInfo) => void
  setVipInfo: (userInfo: IVipInfo) => void
}

const initialState: Props = {
  accountInfo: {},
  userInfo: {},
  vipInfo: {},
}

export const useUserStore = create<Props & Actions>()(
  devtools(
    (set) => ({
      ...initialState,
      setAccountInfo: (accountInfo) => set({ accountInfo }, false, "设置账户信息"),
      setUserInfo: (userInfo) => set({ userInfo }, false, "设置用户信息"),
      setVipInfo: (vipInfo) => set({ vipInfo }, false, "设置vip信息"),
    }),
    {
      name: "userStore",
    }
  )
)


export const useAvatarUrl = () => useUserStore((state) => state.accountInfo.profile?.avatarUrl)

export const useIsVip = () => useUserStore((state) => !!state.accountInfo.profile?.vipType)

export const useVipLevel = () => useUserStore((state) => state.vipInfo.userLevel?.level)

export const useLevel = () => useUserStore((state) => state.userInfo?.level)

export const useFollows = () => useUserStore((state) => state.userInfo.profile?.follows)

export const useFolloweds = () => useUserStore((state) => state.userInfo.profile?.followeds)

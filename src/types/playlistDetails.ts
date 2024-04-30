
// 歌单详情
export interface IPlaylistDetails {
  code: number; // 响应码
  // relatedVideos字段为null，不生成具体类型
  playlist: Playlist; // 歌单信息
  urls: any[] | null; // 相关URL，具体结构未知
  privileges: Privilege[]; // 权限信息
  sharedPrivilege: any | null; // 分享权限，具体结构未知
  resEntrance: any | null; // 资源入口，具体结构未知
  fromUsers: any[] | null; // 来源用户，具体结构未知
  fromUserCount: number; // 来源用户数量
  songFromUsers: any[] | null; // 来源用户的歌曲，具体结构未知
}

// 歌单信息类型
export interface Playlist {
  id: number; // 歌单ID
  name: string; // 歌单名称
  coverImgId: number; // 封面图片ID
  coverImgUrl: string; // 封面图片URL
  coverImgId_str: string; // 封面图片ID字符串形式
  adType: number; // 广告类型
  userId: number; // 用户ID
  createTime: number; // 创建时间
  status: number; // 状态
  opRecommend: boolean; // 是否推荐
  highQuality: boolean; // 是否为高品质
  newImported: boolean; // 是否新导入
  updateTime: number; // 更新时间
  trackCount: number; // 曲目数量
  specialType: number; // 特殊类型
  privacy: number; // 隐私设置
  trackUpdateTime: number; // 曲目更新时间
  commentThreadId: string; // 评论线程ID
  playCount: number; // 播放次数
  trackNumberUpdateTime: number; // 曲目编号更新时间
  subscribedCount: number; // 订阅数量
  cloudTrackCount: number; // 云曲目数量
  ordered: boolean; // 是否排序
  description: string; // 描述
  tags: string[]; // 标签
  updateFrequency: any | null; // 更新频率，具体结构未知
  backgroundCoverId: number; // 背景封面ID
  backgroundCoverUrl: string | null; // 背景封面URL
  titleImage: number; // 标题图片
  titleImageUrl: string | null; // 标题图片URL
  englishTitle: string | null; // 英文标题
  officialPlaylistType: any | null; // 官方歌单类型，具体结构未知
  copied: boolean; // 是否复制
  relateResType: any | null; // 相关资源类型，具体结构未知
  subscribers: Subscriber[]; // 订阅者列表
  subscribed: boolean; // 是否已订阅
  creator: Creator; // 创作者信息
  tracks: Track[]; // 曲目列表
  videoIds: any[] | null; // 视频ID列表，具体结构未知
  videos: any[] | null; // 视频列表，具体结构未知
  trackIds: TrackId[]; // 曲目ID列表
  bannedTrackIds: any[] | null; // 禁播曲目ID列表，具体结构未知
  mvResourceInfos: any[] | null; // MV资源信息，具体结构未知
  shareCount: number; // 分享次数
  commentCount: number; // 评论数量
  remixVideo: any | null; // 混音视频，具体结构未知
  sharedUsers: any[] | null; // 分享用户，具体结构未知
  historySharedUsers: any[] | null; // 历史分享用户，具体结构未知
  gradeStatus: string; // 评分状态
  score: any | null; // 分数，具体结构未知
  algTags: any[] | null; // 算法标签，具体结构未知
  trialMode: number; // 试用模式
  ToplistType: string; // 排行榜类型
}

// 订阅者信息类型
interface Subscriber {
  defaultAvatar: boolean; // 是否默认头像
  province: number; // 省份
  authStatus: number; // 认证状态
  followed: boolean; // 是否关注
  avatarUrl: string; // 头像URL
  accountStatus: number; // 账号状态
  gender: number; // 性别
  city: number; // 城市
  birthday: number; // 生日
  userId: number; // 用户ID
  userType: number; // 用户类型
  nickname: string; // 昵称
  signature: string; // 签名
  description: string; // 描述
  detailDescription: string; // 详细描述
  avatarImgId: number; // 头像图片ID
  backgroundImgId: number; // 背景图片ID
  backgroundUrl: string; // 背景URL
  authority: number; // 权限
  mutual: boolean; // 是否互关
  expertTags: any[] | null; // 专家标签，具体结构未知
  experts: any[] | null; // 专家，具体结构未知
  djStatus: number; // DJ状态
  vipType: number; // VIP类型
  remarkName: string | null; // 备注名称
  authenticationTypes: number; // 认证类型
  avatarDetail: any | null; // 头像详情，具体结构未知
  anchor: boolean; // 是否是主播
  avatarImgIdStr: string; // 头像图片ID字符串形式
  backgroundImgIdStr: string; // 背景图片ID字符串形式
  avatarImgId_str: string; // 头像图片ID字符串形式
}

// 创作者信息类型
interface Creator extends Subscriber {
  // Creator具有Subscriber所有属性，此外还有：
  backgroundUrl: string; // 背景URL
  djStatus: number; // DJ状态
  vipType: number; // VIP类型
  avatarDetail: AvatarDetail; // 头像详情
  anchor: boolean; // 是否是主播
}

// 头像详情类型
interface AvatarDetail {
  userType: number; // 用户类型
  identityLevel: number; // 身份等级
  identityIconUrl: string; // 身份图标URL
}

// 曲目信息类型
export interface Track {
  name: string; // 曲目名称
  id: number; // 曲目ID
  pst: number; // 地位
  t: number; // 类型
  ar: Artist[]; // 艺术家列表
  alia: string[]; // 别名列表
  pop: number; // 流行度
  st: number; // 状态
  rt: string; // 转载信息
  fee: number; // 费用
  v: number; // 版本
  crbt: any | null; // 彩铃信息，具体结构未知
  cf: string; // 版权信息
  al: Album; // 专辑信息
  dt: number; // 时长
  h: HighQuality; // 高品质音频信息
  m: MediumQuality; // 中品质音频信息
  l: LowQuality; // 低品质音频信息
  sq: SuperQuality; // 超品质音频信息
  hr: HighResolution; // 高分辨率音频信息
  a: any | null; // 未知信息
  cd: string; // 唱片
  no: number; // 序号
  rtUrl: any | null; // 转载URL，具体结构未知
  ftype: number; // 文件类型
  rtUrls: any[]; // 转载URL列表，具体结构未知
  djId: number; // DJ ID
  copyright: number; // 版权
  s_id: number; // 歌曲ID
  mark: number; // 标记
  originCoverType: number; // 原始封面类型
  originSongSimpleData: any | null; // 原始歌曲简单数据，具体结构未知
  tagPicList: any[] | null; // 标签图片列表，具体结构未知
  resourceState: boolean; // 资源状态
  version: number; // 版本
  songJumpInfo: any | null; // 歌曲跳转信息，具体结构未知
  entertainmentTags: any[] | null; // 娱乐标签，具体结构未知
  awardTags: any[] | null; // 奖项标签，具体结构未知
  single: number; // 是否单曲
  noCopyrightRcmd: any | null; // 无版权推荐，具体结构未知
  rtype: number; // 类型
  rurl: any | null; // URL，具体结构未知
  mst: number; // 状态
  cp: number; // 版权
  mv: number; // 音乐视频
  publishTime: number; // 发布时间
}

// 艺术家信息类型
interface Artist {
  id: number; // 艺术家ID
  name: string; // 艺术家名称
  tns: string[]; // 昵称列表
  alias: string[]; // 别名列表
}

// 专辑信息类型
interface Album {
  id: number; // 专辑ID
  name: string; // 专辑名称
  picUrl: string; // 专辑图片URL
  tns: string[]; // 昵称列表
  pic_str: string; // 专辑图片字符串形式
  pic: number; // 专辑图片ID
}

// 高品质音频信息类型
interface HighQuality {
  br: number; // 比特率
  fid: number; // 文件ID
  size: number; // 文件大小
  vd: number; // 版本
}

// 中品质音频信息类型
interface MediumQuality extends HighQuality {
  // 继承自HighQuality
}

// 低品质音频信息类型
interface LowQuality extends HighQuality {
  // 继承自HighQuality
}

// 超品质音频信息类型
interface SuperQuality extends HighQuality {
  // 继承自HighQuality
}

// 高分辨率音频信息类型
interface HighResolution extends HighQuality {
  // 继承自HighQuality
}

// 曲目ID类型
interface TrackId {
  id: number; // 曲目ID
  v: number; // 版本
  t: number; // 类型
  at: number; // 添加时间
  alg: any | null; // 算法，具体结构未知
  uid: number; // 用户ID
  rcmdReason: string; // 推荐理由
  sc: any | null; // 评分，具体结构未知
  f: any | null; // 未知信息
  sr: any | null; // 采样率，具体结构未知
  ratio: number; // 比例
}

// 权限信息类型
interface Privilege {
  id: number; // 权限ID
  fee: number; // 费用
  payed: number; // 是否已支付
  realPayed: number; // 实际支付状态
  st: number; // 状态
  pl: number; // 高品质播放权限
  dl: number; // 高品质下载权限
  sp: number; // 流畅品质
  cp: number; // 版权
  subp: number; // 订阅权限
  cs: boolean; // 是否可试听
  maxbr: number; // 最大比特率
  fl: number; // 流畅度
  pc: any | null; // 未知信息
  toast: boolean; // 是否显示提示
  flag: number; // 标记
  paidBigBang: boolean; // 是否付费大爆炸
  preSell: boolean; // 是否预售
  playMaxbr: number; // 播放最大比特率
  downloadMaxbr: number; // 下载最大比特率
  maxBrLevel: string; // 最大比特率级别
  playMaxBrLevel: string; // 播放最大比特率级别
  downloadMaxBrLevel: string; // 下载最大比特率级别
  plLevel: string; // 播放级别
  dlLevel: string; // 下载级别
  flLevel: string; // 流畅级别
  rscl: any | null; // 未知信息
  freeTrialPrivilege: FreeTrialPrivilege; // 免费试听权限
  rightSource: number; // 权限来源
  chargeInfoList: ChargeInfo[]; // 收费信息列表
}

// 免费试听权限类型
interface FreeTrialPrivilege {
  resConsumable: boolean; // 资源是否可消费
  userConsumable: boolean; // 用户是否可消费
  listenType: any | null; // 试听类型，具体结构未知
  cannotListenReason: any | null; // 不能试听的原因，具体结构未知
  playReason: any | null; // 播放原因，具体结构未知
}

// 收费信息类型
interface ChargeInfo {
  rate: number; // 比特率
  chargeUrl: any | null; // 收费URL，具体结构未知
  chargeMessage: any | null; // 收费信息，具体结构未知
  chargeType: number; // 收费类型
}


export interface ISubscriber {
  // 是否有默认头像，默认为 false
  defaultAvatar: boolean;
  // 省份编号
  province: number;
  // 认证状态，0 表示未认证
  authStatus: number;
  // 是否已关注
  followed: boolean;
  // 用户头像 URL
  avatarUrl: string;
  // 账号状态，0 表示正常
  accountStatus: number;
  // 性别，0 表示未知，1 表示男，2 表示女
  gender: number;
  // 城市编号
  city: number;
  // 生日，格式为时间戳
  birthday: number;
  // 用户 ID
  userId: number;
  // 用户类型，0 表示普通用户
  userType: number;
  // 用户昵称
  nickname: string;
  // 用户签名
  signature: string;
  // 用户描述
  description: string;
  // 用户详细描述
  detailDescription: string;
  // 头像图片 ID
  avatarImgId: number;
  // 背景图片 ID
  backgroundImgId: number;
  // 背景图片 URL
  backgroundUrl: string;
  // 权限等级
  authority: number;
  // 是否互相关注
  mutual: boolean;
  // 专家标签，可能为 null
  expertTags: any[] | null;
  // 专家信息，可能为 null
  experts: any[] | null;
  // DJ 状态，0 表示未认证 DJ
  djStatus: number;
  // VIP 类型
  vipType: number;
  // 备注名称，可能为 null
  remarkName: string | null;
  // 订阅时间，格式为时间戳
  subscribeTime: number;
  // 背景图片 ID 的字符串形式
  backgroundImgIdStr: string;
  // 头像图片 ID 的字符串形式
  avatarImgIdStr: string;
  // VIP 权益，可能为 null
  vipRights: any[] | null;
  // 头像图片 ID 的字符串形式，别名
  avatarImgId_str: string;
  // 头像详细信息，可能为 null
  avatarDetail: any | null;
}


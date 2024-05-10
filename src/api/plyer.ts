import { service } from '@/help/server'
import { ILyrics, IPrivilegeItem, ISongUrl, ISongsItem, MusicLevelEnum } from '@/store/player'


enum FetchEnum {
  songUrl = '/song/url',
  songUrlV1 = '/song/url/v1',
  checkMusic = '/check/music',
  songDetail = '/song/detail',
  lyric = '/lyric',
  simiSong = '/simi/song',
  simiPlaylist = '/simi/playlist'
}


export const getSongUrl = (data: { id: number, level: MusicLevelEnum }) => {
  return service<ISongUrl[]>(FetchEnum.songUrlV1, data)
}

export const checkMusic = (data: { id: number, }) => {
  return service<{
    code: number,
    message: string,
    success: boolean
  }>(FetchEnum.checkMusic, data)
}

interface ISongDetailRes {
  songs: ISongsItem[]; // 歌曲列表
  privileges: IPrivilegeItem[]; // 权限列表
  code: number; // 响应状态码，200表示成功
}
export const getSongDetail = (data: { ids: number, }) => {
  return service<ISongDetailRes>(FetchEnum.songDetail, data)
}
export const getLyric = (data: { id: number, }) => {
  return service<ILyrics>(FetchEnum.lyric, data)
}

export type MusicData = {
  starred: boolean; // 是否收藏
  popularity: number; // 歌曲流行度
  starredNum: number; // 收藏数量
  playedNum: number; // 播放次数
  dayPlays: number; // 日播放次数
  hearTime: number; // 听歌时长
  mp3Url: string; // 歌曲的mp3链接
  rtUrls: null | string[]; // 相关链接
  mark: number; // 标记
  noCopyrightRcmd: null | any[]; // 无版权推荐
  originCoverType: number; // 原始封面类型
  originSongSimpleData: null | any; // 原始歌曲简单数据
  songJumpInfo: null | any; // 歌曲跳转信息
  artists: ArtistType[]; // 艺术家信息
  copyrightId: number; // 版权ID
  album: AlbumType; // 专辑信息
  score: number; // 评分
  hMusic: MusicQualityType; // 高品质音乐信息
  mMusic: MusicQualityType; // 中品质音乐信息
  lMusic: MusicQualityType; // 低品质音乐信息
  audition: null | any; // 试听信息
  copyFrom: string; // 复制来源
  ringtone: string; // 铃声
  disc: string; // 唱片
  no: number; // 序号
  fee: number; // 费用
  commentThreadId: string; // 评论线程ID
  mvid: number; // 音乐视频ID
  rtUrl: null | string; // 实时链接
  ftype: number; // 文件类型
  rtype: number; // 响应类型
  rurl: null | string; // 资源链接
  crbt: null | string; // 歌词
  bMusic: MusicQualityType; // 基础品质音乐信息
  sqMusic: MusicQualityType; // 超高品质音乐信息
  hrMusic: null | MusicQualityType; // 超高分辨率音乐信息
  position: number; // 位置
  duration: number; // 时长
  alias: string[]; // 别名
  status: number; // 状态
  name: string; // 歌曲名称
  id: number; // 歌曲ID
  transNames: string[]; // 翻译名称
  recommendReason: string; // 推荐理由
  privilege: PrivilegeType; // 权限信息
  alg: string; // 算法标识
};

type ArtistType = {
  img1v1Id: number; // 艺术家头像标识
  topicPerson: number; // 主题人物
  picId: number; // 图片ID
  briefDesc: string; // 简介描述
  musicSize: number; // 音乐大小
  albumSize: number; // 专辑大小
  picUrl: string; // 艺术家图片链接
  img1v1Url: string; // 艺术家头像链接
  followed: boolean; // 是否关注
  trans: string; // 翻译
  alias: string[]; // 别名
  name: string; // 艺术家名称
  id: number; // 艺术家ID
  img1v1Id_str: string; // 艺术家头像标识字符串
};

type AlbumType = {
  songs: any[]; // 专辑内歌曲列表
  paid: boolean; // 是否付费
  onSale: boolean; // 是否在售
  mark: number; // 标记
  awardTags: null | any[]; // 获奖标签
  artists: ArtistType[]; // 艺术家信息
  copyrightId: number; // 版权ID
  picId: number; // 图片ID
  artist: ArtistType; // 艺术家信息
  publishTime: number; // 发行时间
  company: string; // 公司
  briefDesc: string; // 简介描述
  picUrl: string; // 专辑图片链接
  commentThreadId: string; // 评论线程ID
  blurPicUrl: string; // 模糊图片链接
  companyId: number; // 公司ID
  pic: number; // 图片
  status: number; // 状态
  subType: string; // 子类型
  alias: string[]; // 别名
  description: string; // 描述
  tags: string; // 标签
  name: string; // 专辑名称
  id: number; // 专辑ID
  type: string; // 类型
  size: number; // 大小
  picId_str: string; // 图片ID字符串
};

type MusicQualityType = {
  volumeDelta: number; // 音量差
  playTime: number; // 播放时间
  bitrate: number; // 比特率
  dfsId: number; // 分布式文件系统ID
  sr: number; // 采样率
  name: string; // 音乐名称
  id: number; // 音乐ID
  size: number; // 音乐文件大小
  extension: string; // 文件扩展名
};

type PrivilegeType = {
  id: number; // 歌曲ID
  fee: number; // 费用
  payed: number; // 是否已支付
  st: number; // 状态
  pl: number; // 播放权限级别
  dl: number; // 下载权限级别
  sp: number; // 单曲购买权限级别
  cp: number; // 版权购买权限级别
  subp: number; // 订阅权限级别
  cs: boolean; // 是否有版权
  maxbr: number; // 最大比特率
  fl: number; // 文件级别
  toast: boolean; // 是否有提示
  flag: number; // 标志
  preSell: boolean; // 是否预售
  playMaxbr: number; // 播放最大比特率
  downloadMaxbr: number; // 下载最大比特率
  maxBrLevel: string; // 最大比特率级别
  playMaxBrLevel: string; // 播放最大比特率级别
  downloadMaxBrLevel: string; // 下载最大比特率级别
  plLevel: string; // 播放级别
  dlLevel: string; // 下载级别
  flLevel: string; // 文件级别
  rscl: null | any; // 推荐等级
  freeTrialPrivilege: {
    resConsumable: boolean; // 资源是否可消费
    userConsumable: boolean; // 用户是否可消费
    listenType: null | any; // 听歌类型
    cannotListenReason: null | any; // 不可听歌原因
    playReason: null | any; // 播放原因
  };
  rightSource: number; // 权限来源
  chargeInfoList: {
    rate: number; // 比特率
    chargeUrl: null | string; // 收费链接
    chargeMessage: null | string; // 收费信息
    chargeType: number; // 收费类型
  }[];
};

interface ISimiSongRes {
  songs: MusicData[],
  code: number
}

export const getSimiSong = (data: { id: number, }) => {
  return service<ISimiSongRes>(FetchEnum.simiSong, data)
}
export type Playlist = {
  name: string; // 歌单名称
  id: number; // 歌单ID
  trackNumberUpdateTime: number; // 歌曲数量更新时间戳
  status: number; // 歌单状态，0表示正常
  userId: number; // 创建歌单的用户ID
  createTime: number; // 歌单创建时间戳
  updateTime: number; // 歌单最后更新时间戳
  subscribedCount: number; // 订阅该歌单的用户数量
  trackCount: number; // 歌单包含的歌曲数量
  cloudTrackCount: number; // 歌单中云盘歌曲的数量
  coverImgUrl: string; // 歌单封面图片的URL
  coverImgId: number; // 歌单封面图片的ID
  description: string; // 歌单描述
  tags: string[]; // 歌单标签数组
  playCount: number; // 歌单播放次数
  trackUpdateTime: number; // 歌单中歌曲最后更新的时间戳
  specialType: number; // 特殊类型，0表示普通歌单
  totalDuration: number; // 歌单中所有歌曲的总时长
  creator: {
    extProperties: any; // 扩展属性
    defaultAvatar: boolean; // 是否使用默认头像
    province: number; // 用户所在省份的行政区划代码
    authStatus: number; // 用户认证状态
    followed: boolean; // 是否被当前用户关注
    avatarUrl: string; // 用户头像图片的URL
    accountStatus: number; // 用户账号状态
    gender: number; // 用户性别，1表示男
    city: number; // 用户所在城市的行政区划代码
    birthday: number; // 用户生日，时间戳格式
    userId: number; // 用户ID
    userType: number; // 用户类型
    nickname: string; // 用户昵称
    signature: string; // 用户签名
    description: string; // 用户描述
    detailDescription: string; // 用户详细描述
    avatarImgId: number; // 用户头像图片的ID
    backgroundImgId: number; // 用户个人主页背景图片的ID
    backgroundUrl: string; // 用户个人主页背景图片的URL
    authority: number; // 用户权限等级
    mutual: boolean; // 是否是互粉
    expertTags: string[]; // 专家标签数组
    experts: { [key: number]: string }; // 专家领域
    djStatus: number; // DJ身份状态
    vipType: number; // 用户VIP类型
    remarkName: string | null; // 用户备注名
    avatarImgIdStr: string; // 用户头像图片ID的字符串形式
    backgroundImgIdStr: string; // 用户个人主页背景图片ID的字符串形式
    xInfo: any; // 扩展信息
  };
  tracks: any; // 歌单中的歌曲列表，可能是null
  subscribers: any[]; // 订阅了该歌单的用户列表，可能是空数组
  subscribed: boolean; // 当前用户是否订阅了该歌单
  commentThreadId: string; // 歌单的评论贴子ID
  newImported: boolean; // 是否为新导入的歌单
  adType: number; // 广告类型
  highQuality: boolean; // 是否为高品质音乐
  privacy: number; // 隐私设置
  ordered: boolean; // 是否是有序歌单
  anonimous: boolean; // 是否匿名
  coverStatus: number; // 封面状态
  recommendInfo: any; // 推荐信息
  socialPlaylistCover: any; // 社交歌单封面信息
  recommendText: string | null; // 推荐文本
  coverText: string | null; // 封面文本
  relateResType: any; // 相关资源类型
  relateResId: any; // 相关资源ID
  extProperties: {
    coverImgId_str: string; // 封面图片ID的字符串形式
  };
  recommendReason: string; // 推荐理由
  xInfo: {
    coverImgId_str: string; // 封面图片ID的字符串形式
  };
  iconImgUrl: string | null; // 歌单图标图片的URL
  tsSongCount: number; // 腾讯音乐歌曲数量
  alg: string; // 算法标识
};
interface ISimiPlaylistRes {
  playlists: Playlist[],
  code: number
}
export const getSimiPlaylist = (data: { id: number, }) => {
  return service<ISimiPlaylistRes>(FetchEnum.simiPlaylist, data)
}
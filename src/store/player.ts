/** @format */

import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { getSongDetail, checkMusic, getLyric, getSongUrl, getSimiSong, getSimiPlaylist, } from "@/api/plyer"
import Utils from "@/help"
import { Track } from "@/types/playlistDetails"
import { message } from "antd"

export interface IPlayerObj {
  loaded: number
  loadedSeconds: number
  played: number
  playedSeconds: number
}

export enum PlayerModeEnum {
  /**顺序播放 */
  order,
  /** 列表循环 */
  listCycle,
  /**单曲循环 */
  cycle,
  /**随机播放 */
  random
}

export interface ISingerArrItem {
  alias?: any[]
  id?: number
  name?: string
  tns?: any[]
}

export interface ISongObj {
  /** 歌曲名称 */
  name?: string
  /** 演唱者 */
  singerArr?: string[]
  /** 歌曲时长 */
  songTime?: number
  /** 歌曲背景 */
  backgroundImg?: string
}

export interface ILyricItem {
  time?: number
  lyc?: string
}

export interface IPlayHistoryItem {
  title: string
  singer: string
  time: string
  id: number
  [propName: string]: any
}

interface IPlayRecordItem extends Track {
  title: string
  singer: string
  time: string
  id: number
  [propName: string]: any
}

export interface ISongsItem {
  name: string // 歌曲名称
  id: number // 歌曲ID
  pst: number // 歌曲属性，可能与版权有关
  t: number // 歌曲类型
  ar: Artist[] // 艺术家信息列表
  alia: string[] // 歌曲别名列表
  pop: number // 歌曲流行度
  st: number // 歌曲状态
  rt: string // 歌曲跳转地址
  fee: number // 歌曲收费等级
  v: number // 歌曲版本
  crbt: any | null // 高音质信息，具体类型未知
  cf: string // 歌曲版权信息
  al: Album // 专辑信息
  dt: number // 歌曲时长，单位为毫秒
  h: MusicQuality // 高品质音乐信息
  m: MusicQuality // 中品质音乐信息
  l: MusicQuality // 低品质音乐信息
  sq: MusicQuality // 超高品质音乐信息
  hr: any | null // 超高音质信息，具体类型未知
  a: any | null // 未知信息
  cd: string // 唱片编号
  no: number // 歌曲编号
  rtUrl: string | null // 相关URL
  ftype: number // 文件类型
  rtUrls: string[] // 相关URL列表
  djId: number // 音乐DJ ID
  copyright: number // 版权信息
  s_id: number // 歌曲ID的字符串形式
  mark: number // 标记
  originCoverType: number // 原始封面类型
  originSongSimpleData: any | null // 原始歌曲简单数据，具体类型未知
  tagPicList: any | null // 标签图片列表，具体类型未知
  resourceState: boolean // 资源状态
  version: number // 版本
  songJumpInfo: any | null // 歌曲跳转信息，具体类型未知
  entertainmentTags: any | null // 娱乐标签，具体类型未知
  awardTags: any | null // 获奖标签，具体类型未知
  single: number // 是否单曲
  noCopyrightRcmd: any | null // 无版权推荐信息，具体类型未知
  mv: number // 音乐视频ID
  rtype: number // 推荐类型
  rurl: string | null // 推荐URL
  mst: number // 状态
  cp: number // 版权
  publishTime: number // 发行时间，单位为毫秒
  tns: string[] // 翻译名称列表
}

interface Artist {
  id: number // 艺术家ID
  name: string // 艺术家名称
  tns: string[] // 艺术家别名列表
  alias: string[] // 艺术家别名列表
}

interface Album {
  id: number // 专辑ID
  name: string // 专辑名称
  picUrl: string // 专辑封面图片URL
  tns: string[] // 专辑别名列表
  pic_str: string // 专辑图片字符串ID
  pic: number // 专辑图片ID
}

interface MusicQuality {
  br: number // 比特率
  fid: number // 文件ID
  size: number // 文件大小，单位为字节
  vd: number // 版本号
  sr: number // 采样率
}

export interface IPrivilegeItem {
  id: number // 特权ID
  fee: number // 费用等级
  payed: number // 是否已付费
  st: number // 状态
  pl: number // 高品质播放特权
  dl: number // 高品质下载特权
  sp: number // 单曲特权
  cp: number // 版权特权
  subp: number // 订阅特权
  cs: boolean // 是否可以免费试听
  maxbr: number // 最高比特率
  fl: number // 文件品质
  toast: boolean // 是否有toast提示
  flag: number // 标记
  preSell: boolean // 是否预售
  playMaxbr: number // 播放最高比特率
  downloadMaxbr: number // 下载最高比特率
  maxBrLevel: string // 最高比特率等级
  playMaxBrLevel: string // 播放最高比特率等级
  downloadMaxBrLevel: string // 下载最高比特率等级
  plLevel: string // 播放品质等级
  dlLevel: string // 下载品质等级
  flLevel: string // 文件品质等级
  rscl: any | null // 相关推荐，具体类型未知
  freeTrialPrivilege: {
    resConsumable: boolean // 资源是否可消耗
    userConsumable: boolean // 用户是否可消耗
    listenType: any // 试听类型，具体类型未知
    cannotListenReason: any // 不可试听原因，具体类型未知
    playReason: any // 播放原因，具体类型未知
  }
  rightSource: number // 权限来源
  chargeInfoList: {
    rate: number // 比特率
    chargeUrl: string | null // 收费URL
    chargeMessage: string | null // 收费信息
    chargeType: number // 收费类型
  }[]
}

export interface ISongUrl {
  /**
   * 音频ID
   */
  id: number
  /**
   * 音频URL
   */
  url: string
  /**
   * 比特率
   */
  br: number
  /**
   * 文件大小
   */
  size: number
  /**
   * MD5哈希值
   */
  md5: string
  /**
   * 响应状态码
   */
  code: number
  /**
   * 过期时间
   */
  expi: number
  /**
   * 类型
   */
  type: string
  /**
   * 增益
   */
  gain: number
  /**
   * 峰值
   */
  peak: number
  /**
   * 付费费用
   */
  fee: number
  /**
   * 用户付费标识
   */
  uf: null
  /**
   * 是否已付费
   */
  payed: number
  /**
   * 标志位
   */
  flag: number
  /**
   * 是否可扩展
   */
  canExtend: boolean
  /**
   * 免费试用信息
   */
  freeTrialInfo: null
  /**
   * 音频质量等级
   */
  level: string
  /**
   * 编码类型
   */
  encodeType: string
  /**
   * 声道布局
   */
  channelLayout: null
  /**
   * 免费试用特权
   */
  freeTrialPrivilege: {
    /**
     * 资源是否可消耗
     */
    resConsumable: boolean
    /**
     * 用户是否可消耗
     */
    userConsumable: boolean
    /**
     * 可听类型
     */
    listenType: null
    /**
     * 无法播放的原因
     */
    cannotListenReason: null
    /**
     * 播放原因
     */
    playReason: null
  }
  /**
   * 免费时间试用特权
   */
  freeTimeTrialPrivilege: {
    /**
     * 资源是否可消耗
     */
    resConsumable: boolean
    /**
     * 用户是否可消耗
     */
    userConsumable: boolean
    /**
     * 类型
     */
    type: number
    /**
     * 剩余时间
     */
    remainTime: number
  }
  /**
   * URL来源
   */
  urlSource: number
  /**
   * 权限来源
   */
  rightSource: number
  /**
   * Podcast CTRP
   */
  podcastCtrp: null
  /**
   * 音效类型
   */
  effectTypes: null
  /**
   * 时长（毫秒）
   */
  time: number
  /**
   * 消息
   */
  message: null
}

export interface ILyrics {
  /**
   * 是否包含简体歌词
   */
  sgc: boolean
  /**
   * 是否包含翻译歌词
   */
  sfy: boolean
  /**
   * 是否包含歌词翻译后的歌词
   */
  qfy: boolean
  /**
   * 歌词信息 - 歌词文本
   */
  lrc: {
    /**
     * 歌词版本
     */
    version: number
    /**
     * 歌词内容
     */
    lyric: string
  }
  /**
   * 歌词信息 - 翻译歌词文本
   */
  klyric: {
    /**
     * 歌词版本
     */
    version: number
    /**
     * 歌词内容
     */
    lyric: string
  }
  /**
   * 歌词信息 - 歌词翻译后的歌词文本
   */
  tlyric: {
    /**
     * 歌词版本
     */
    version: number
    /**
     * 歌词内容
     */
    lyric: string
  }
  /**
   * 歌词信息 - 罗马音歌词文本
   */
  romalrc: {
    /**
     * 歌词版本
     */
    version: number
    /**
     * 歌词内容
     */
    lyric: string
  }
  /**
   * 响应状态码
   */
  code: number
}

export enum MusicLevelEnum {
  /** 标准 */
  standard = "standard",
  /** 较高 */
  higher = "higher",
  /** 极高 */
  exhigh = "exhigh",
  /** 无损 */
  lossless = "lossless",
  /** Hi-Res */
  hires = "hires",
  /** 高清环绕声 */
  jyeffect = "jyeffect",
  /** 沉浸环绕声 */
  sky = "sky",
  /** 超清母带 */
  jymaster = "jymaster"
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
interface Props {
  showPlayer: boolean
  playerObj: IPlayerObj
  playerMode: PlayerModeEnum
  playerRate: number
  songObj: ISongObj
  /** 音乐Url */
  songUrl: string
  lyric: Map<number, string[]>
  playHistory: ISongsItem[]
  isPlay: boolean
  showPlayRecord: boolean
  playRecordTip: string
  playRecord: IPlayRecordItem[]
  songId: number,
  loading: boolean,
  simiSongList: MusicData[],
  simiPlayList: Playlist[],
  volum: number,
}

interface Actions {
  setShowPlayer: (showPlayer: boolean) => void
  setPlayerObj: (playerObj: IPlayerObj) => void
  setPlayerMode: (playMode: PlayerModeEnum) => void
  setPlayRate: (playerRate: number) => void
  getSongInfo: (id: number, songObj?: ISongObj) => void
  setIsPlay: (isPlay: boolean) => void
  setShowPlayRecord: (showPlayRecord: boolean) => void
  setPlayRecordTip: (playRecordTip: string) => void
  setPlayRecord: (playRecord: IPlayRecordItem[]) => void
  setVolum: (volum: number) => void
  setPlayHistory: (list: ISongsItem[]) => void
}



const initialState: Props = {
  showPlayer: false,
  playerObj: {} as IPlayerObj,
  playerMode: PlayerModeEnum.order,
  playerRate: 1,
  songObj: {},
  lyric: new Map(),
  playHistory: [],
  isPlay: false,
  showPlayRecord: false,
  playRecordTip: "",
  playRecord: [],
  songId: 0,
  songUrl: '',
  loading: false,
  simiSongList: [],// 相似歌曲
  simiPlayList: [], // 相似歌单
  volum: 0
}

const updatePlayRecord = (source: ISongsItem[], target: ISongsItem) => {
  const isExist = source.find(item => item.id === target.id)
  if (!isExist) {
    return [...source, target]
  }
  return source
}

export const usePlayer = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setShowPlayer: (showPlayer) => {
          set({ showPlayer }, false, "是否显示播放界面")
        },
        setPlayerObj: (playerObj) => {
          set({ playerObj })
        },
        setPlayerMode: (playerMode) => {
          set({ playerMode })
        },
        setPlayRate: (playerRate) => {
          set({ playerRate })
        },
        setVolum: (volum) => {
          set({ volum })
        },
        setPlayHistory: (list) => {
          set({ playHistory: list }, false, '设置播放历史')
        },
        getSongInfo: async (id, songObj) => {
          try {
            if (get().songId === id) {
              !get().isPlay && set({ isPlay: true }, false, '播放歌曲')

              return message.info('当前歌曲正在播放')
            }
            // set({ playerObj: {} as IPlayerObj }, false, '清空播放器信息...')
            // if (songObj) {
            //   set({
            //     songObj: {
            //       ...get().songObj,
            //       ...songObj
            //     },
            //     isPlay: false,
            //     playerObj: {} as IPlayerObj,
            //   }, false, '提前设置歌曲信息')
            // }

            set({ loading: true }, false, 'Loading...')

            const resCheck = await checkMusic({ id })

            if (!resCheck.data.success) {
              return message.warning(resCheck.data.message)
            }
            console.log('====音乐可播放===')

            set({ playerObj: {} as IPlayerObj, }, false, '清空播放器信息')

            set({ songId: id }, false, '设置音乐ID')

            const songDetailRes = await getSongDetail({ ids: id })

            console.log('====歌曲详情===', songDetailRes)

            const [songDetail] = songDetailRes.data.songs
            set({
              songObj: {
                backgroundImg: songDetail.al.picUrl,
                name: songDetail.name,
                songTime: songDetail.dt / 1000,
                singerArr: songDetail.ar.map(item => item.name)
              }
            }, false, '设置歌曲信息')

            const songUrlRes = await getSongUrl({ id, level: MusicLevelEnum.standard })

            console.log('====音乐Url===', songUrlRes)

            set({ songUrl: songUrlRes.data.at(0)?.url }, false, '设置音乐URL')

            const lyricRes = await getLyric({ id })

            console.log('====歌词信息===', lyricRes)

            const lyric = Utils.formatterLyric(lyricRes.data.lrc.lyric)


            set({ lyric }, false, '设置歌词')

            set({ playHistory: updatePlayRecord(get().playHistory, songDetail), }, false, '更新播放记录')

            set({ isPlay: true }, false, '歌曲加载完毕')

            const [simiSongRes, simiPlaylistRes] = await Promise.all([
              getSimiSong({ id }),
              getSimiPlaylist({ id })
            ])

            set({ simiSongList: simiSongRes.data.songs, simiPlayList: simiPlaylistRes.data.playlists }, false, '获取相似歌曲和歌单...')

            set({ loading: false }, false, 'Loading...')

          } catch (error) {
            console.log("error", error)
          }
        },
        setIsPlay: (isPlay) => {
          set({ isPlay })
        },
        setShowPlayRecord: (showPlayRecord) => {
          set({ showPlayRecord })
        },
        setPlayRecordTip: (playRecordTip) => {
          set({ playRecordTip })
        },

        setPlayRecord: (playRecord) => {
          set({ playRecord })
        }
      }),
      {
        name: "playStore",
        storage: createJSONStorage(() => localStorage, {
          reviver: (key, value: any) => {
            if (key === 'lyric') {
              const storedMapArray = JSON.parse(value);
              // 将数组转换为 Map 对象
              const restoredMap = new Map(storedMapArray);
              return restoredMap
            }

            return value
          },
          replacer: (key, value: any) => {
            if (key === 'lyric') {
              const mapArray = Array.from(value);

              // 将数组转换为 JSON 字符串
              const mapString = JSON.stringify(mapArray);

              // 将字符串存储到 localStorage
              return mapString
            }

            return value
          },
        }),

        partialize: state => {
          return {
            // playerObj: state.playerObj,
            playerMode: state.playerMode,
            playerRate: state.playerRate,
            songObj: state.songObj,
            lyric: state.lyric,
            playHistory: state.playHistory,
            playRecord: state.playRecord,
            songId: state.songId,
            songUrl: state.songUrl,
            volum: state.volum
          }
        }
      }
    ),
    {
      name: "playStore",
    }
  )
)
export const useIsPlay = () => usePlayer((state) => state.isPlay)
export const useSongObj = () => usePlayer((state) => state.songObj)
export const useLyric = () => usePlayer((state) => state.lyric)
export const useSongId = () => usePlayer((state) => state.songId)
export const useShowPlayRecord = () => usePlayer((state) => state.showPlayRecord)
export const usePlayRecordTip = () => usePlayer((state) => state.playRecordTip)

export const useShowPlayer = () => usePlayer((state) => state.showPlayer)
export const usePlayerObj = () => usePlayer((state) => state.playerObj)
export const usePlayerMode = () => usePlayer((state) => state.playerMode)
export const usePlayerRate = () => usePlayer((state) => state.playerRate)

export const useSetPlayerMode = () => usePlayer((state) => state.setPlayerMode)

export const useSetIsPlay = () => usePlayer((state) => state.setIsPlay)

export const useSetPlayerObj = () => usePlayer((state) => state.setPlayerObj)
export const useSetShowPlayRecord = () => usePlayer((state) => state.setShowPlayRecord)
export const useSetPlayRecordTip = () => usePlayer((state) => state.setPlayRecordTip)
export const useSetPlayRate = () => usePlayer((state) => state.setPlayRate)
export const useSetPlayRecord = () => usePlayer((state) => state.setPlayRecord)

export const useSetShowPlayer = () => usePlayer((state) => state.setShowPlayer)

export const usePlayRecord = () => usePlayer((state) => state.playRecord)

export const usePlayHistory = () => usePlayer((state) => state.playHistory)

export const useGetSongInfo = () => usePlayer((state) => state.getSongInfo)

export const useSongUrl = () => usePlayer((state) => state.songUrl)

export const useSetPlayHistory = () => usePlayer((state) => state.setPlayHistory)

export const useActiveLyric = () => usePlayer(state => {
  const keys = state.lyric.size !== 0 ? [...state.lyric.keys()] : []

  const timesArr = keys
    .filter((time) => {
      return time <= state.playerObj.playedSeconds
    })
  const targetKey = timesArr.at(-1)
  const target = state.lyric.get(targetKey!)

  if (target && Array.isArray(target) && target.length === 2) {
    return target.at(-1)
  }

  return state.lyric.get(timesArr[timesArr.length - 2])?.at(-1)

})

export const useSimiSongList = () => usePlayer((state) => state.simiSongList)

export const useSimiPlayList = () => usePlayer((state) => state.simiPlayList)


export const useLoading = () => usePlayer((state) => state.loading)

export const useVolum = () => usePlayer((state) => state.volum)

export const useSetVolum = () => usePlayer((state) => state.setVolum)

export const useIsSoundOff = () => usePlayer((state) => state.volum === 0)
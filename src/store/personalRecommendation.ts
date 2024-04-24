import { create } from "zustand"
import { persist, createJSONStorage, devtools } from "zustand/middleware"
import { banner, recommendResource, newSong, privateContent, mv } from '@/api/personalRecommendation'


export interface BannerItem {
  // 图片URL
  imageUrl: string;
  // 目标ID
  targetId: number;
  // 广告ID，可以为null
  adid: number | null;
  // 目标类型，例如1可能代表某种特定的目标类型
  targetType: number;
  // 标题颜色，如"red"
  titleColor: string;
  // 类型标题，如"新歌首发"
  typeTitle: string;
  // 链接URL，可以为null
  url: string | null;
  // 是否独家，false表示非独家
  exclusive: boolean;
  // 监控印象，可以为null
  monitorImpress: any | null; // 具体类型未知，需根据实际情况确定
  // 监控点击，可以为null
  monitorClick: any | null; // 具体类型未知，需根据实际情况确定
  // 监控类型，可以为null
  monitorType: any | null; // 具体类型未知，需根据实际情况确定
  // 监控印象列表，可以为null
  monitorImpressList: any[] | null; // 具体类型未知，需根据实际情况确定
  // 监控点击列表，可以为null
  monitorClickList: any[] | null; // 具体类型未知，需根据实际情况确定
  // 监控黑名单，可以为null
  monitorBlackList: any[] | null; // 具体类型未知，需根据实际情况确定
  // 扩展监控信息，可以为null
  extMonitor: any | null; // 具体类型未知，需根据实际情况确定
  // 扩展监控信息详情，可以为null
  extMonitorInfo: any | null; // 具体类型未知，需根据实际情况确定
  // 广告来源，可以为null
  adSource: any | null; // 具体类型未知，需根据实际情况确定
  // 广告位置，可以为null
  adLocation: any | null; // 具体类型未知，需根据实际情况确定
  // 广告调度信息，可以为null
  adDispatchJson: any | null; // 具体类型未知，需根据实际情况确定
  // 编码后的ID
  encodeId: string;
  // 节目信息，可以为null
  program: any | null; // 具体类型未知，需根据实际情况确定
  // 事件信息，可以为null
  event: any | null; // 具体类型未知，需根据实际情况确定
  // 视频信息，可以为null
  video: any | null; // 具体类型未知，需根据实际情况确定
  // 歌曲信息，可以为null
  song: any | null; // 具体类型未知，需根据实际情况确定
  // 商业参数
  scm: string;
  // 横幅业务类型
  bannerBizType: string;
}


interface Creator {
  avatarImgIdStr: string; // 用户头像图片ID的字符串形式
  backgroundImgIdStr: string; // 用户背景图片ID的字符串形式
  backgroundUrl: string; // 用户背景图片的URL
  birthday: number; // 用户生日，0表示未设置
  city: number; // 用户所在的城市ID
  avatarUrl: string; // 用户头像的URL
  authStatus: number; // 用户的认证状态，1表示已认证
  userType: number; // 用户类型，10表示某种特定的用户类型
  nickname: string; // 用户的昵称
  gender: number; // 用户的性别，0表示未设置
  accountStatus: number; // 用户账号状态，0表示账号正常
  vipType: number; // 用户的VIP类型，0表示非VIP
  province: number; // 用户所在的省份ID
  avatarImgId: number; // 用户头像图片ID
  backgroundImgId: number; // 用户背景图片ID
  detailDescription: string; // 用户的详细描述
  defaultAvatar: boolean; // 是否使用默认头像
  expertTags: any[] | null; // 专家标签，null表示没有
  djStatus: number; // DJ身份状态，0表示不是DJ
  followed: boolean; // 是否已关注该用户
  mutual: boolean; // 是否互相关注
  remarkName: string | null; // 用户的备注名
  description: string; // 用户的描述
  userId: number; // 用户的唯一ID
  signature: string; // 用户的签名
  authority: number; // 用户的权限等级
}

export interface IRecommendItem {
  id: number; // 歌单的ID
  type: number; // 歌单的类型，1可能表示某种特定的类型
  name: string; // 歌单的名称
  copywriter: string; // 歌单的文案，空字符串表示无文案
  picUrl: string; // 歌单封面图片的URL
  playcount: number; // 歌单的播放次数
  createTime: number; // 歌单的创建时间戳
  creator: Creator; // 歌单的创建者信息
  trackCount: number; // 歌单中的音轨数量
  userId: number; // 歌单所属用户的唯一ID
  alg: string; // 歌单的算法标识，如"alg_mgc_red"可能表示某种推荐算法
}

interface Song {
  name: string; // 歌曲名称
  id: number; // 歌曲ID
  position: number; // 歌曲在专辑中的位置
  alias: string[]; // 歌曲别名列表
  status: number; // 歌曲状态
  fee: number; // 歌曲费用等级
  copyrightId: number; // 版权ID
  disc: string; // 唱片标识
  no: number; // 歌曲编号
  artists: Artist[]; // 艺术家列表
  album: Album; // 专辑信息
  starred: boolean; // 是否收藏
  popularity: number; // 歌曲热度
  score: number; // 歌曲评分
  starredNum: number; // 收藏数量
  duration: number; // 歌曲时长，单位为毫秒
  playedNum: number; // 播放次数
  dayPlays: number; // 日播放次数
  hearTime: number; // 听歌时长，单位为毫秒
  // 高品质音乐信息
  sqMusic: MusicInfo;
  hrMusic: MusicInfo;
  ringtone: string; // 铃声
  crbt: any; // 高音质信息，具体类型未知
  audition: any; // 试听信息，具体类型未知
  copyFrom: string; // 复制来源
  commentThreadId: string; // 评论线程ID
  rtUrl: string | null; // 相关URL
  ftype: number; // 文件类型
  rtUrls: string[]; // 相关URL列表
  copyright: number; // 版权信息
  transName: string | null; // 翻译名称
  sign: string | null; // 签名
  mark: number; // 标记
  originCoverType: number; // 原始封面类型
  single: number; // 是否单曲
  noCopyrightRcmd: any; // 无版权推荐信息，具体类型未知
  hMusic: MusicInfo; // 高品质音乐信息
  mMusic: MusicInfo; // 中品质音乐信息
  lMusic: MusicInfo; // 低品质音乐信息
  bMusic: MusicInfo; // 最低品质音乐信息
  mvid: number; // 音乐视频ID
  rtype: number; // 推荐类型
  rurl: string | null; // 推荐URL
  mp3Url: string | null; // MP3 URL
  privilege: Privilege; // 权限信息
}

interface Artist {
  name: string; // 艺术家名称
  id: number; // 艺术家ID
  picId: number; // 艺术家图片ID
  img1v1Id: number; // 艺术家1v1图片ID
  briefDesc: string; // 简介
  picUrl: string; // 艺术家图片URL
  img1v1Url: string; // 艺术家1v1图片URL
  albumSize: number; // 专辑数量
  alias: string[]; // 别名列表
  trans: string; // 转换
  musicSize: number; // 音乐数量
  topicPerson: number; // 主题人物数量
}

interface Album {
  name: string; // 专辑名称
  id: number; // 专辑ID
  type: string; // 专辑类型
  size: number; // 专辑中的歌曲数量
  picId: number; // 专辑图片ID
  blurPicUrl: string; // 专辑模糊图片URL
  companyId: number; // 公司ID
  pic: number; // 专辑图片
  picUrl: string; // 专辑图片URL
  publishTime: number; // 发布时间戳
  description: string; // 描述
  tags: string; // 标签
  company: string; // 公司
  briefDesc: string; // 简介
  artist: Artist; // 艺术家信息
  songs: Song[]; // 专辑中的歌曲列表
  alias: string[]; // 别名列表
  status: number; // 状态
  copyrightId: number; // 版权ID
  commentThreadId: string; // 评论线程ID
  artists: Artist[]; // 艺术家列表
  subType: string; // 子类型
  transName: string | null; // 翻译名称
  onSale: boolean; // 是否在售
  mark: number; // 标记
  gapless: number; // 无缝播放
  picId_str: string; // 专辑图片ID的字符串形式
}

interface MusicInfo {
  name: string | null; // 音乐名称
  id: number; // 音乐ID
  size: number; // 文件大小，单位为字节
  extension: string; // 文件扩展名
  sr: number; // 采样率
  dfsId: number; // 云音乐ID
  bitrate: number; // 比特率
  playTime: number; // 播放时长，单位为毫秒
  volumeDelta: number; // 音量差
}

interface Privilege {
  id: number; // 特权ID
  fee: number; // 费用等级
  payed: number; // 是否已付费
  st: number; // 状态
  pl: number; // 高品质播放特权
  dl: number; // 高品质下载特权
  sp: number; // 单曲特权
  cp: number; // 版权特权
  subp: number; // 订阅特权
  cs: boolean; // 是否可以免费试听
  maxbr: number; // 最高比特率
  fl: number; // 文件品质
  toast: boolean; // 是否有toast提示
  flag: number; // 标记
  preSell: boolean; // 是否预售
  playMaxbr: number; // 播放最高比特率
  downloadMaxbr: number; // 下载最高比特率
  maxBrLevel: string; // 最高比特率等级
  playMaxBrLevel: string; // 播放最高比特率等级
  downloadMaxBrLevel: string; // 下载最高比特率等级
  plLevel: string; // 播放品质等级
  dlLevel: string; // 下载品质等级
  flLevel: string; // 文件品质等级
  rscl: any; // 相关推荐，具体类型未知
  freeTrialPrivilege: {
    resConsumable: boolean; // 资源是否可消耗
    userConsumable: boolean; // 用户是否可消耗
    listenType: any; // 试听类型，具体类型未知
    cannotListenReason: any; // 不可试听原因，具体类型未知
    playReason: any; // 播放原因，具体类型未知
  };
  rightSource: number; // 权限来源
  chargeInfoList: {
    rate: number; // 比特率
    chargeUrl: string | null; // 收费URL
    chargeMessage: string | null; // 收费信息
    chargeType: number; // 收费类型
  }[];
}

export interface INewSongItem {
  id: number; // 歌单ID
  type: number; // 歌单类型
  name: string; // 歌单名称
  copywriter: string | null; // 歌单文案
  picUrl: string; // 歌单封面图片URL
  canDislike: boolean; // 是否可以不喜欢
  trackNumberUpdateTime: number | null; // 音轨数量更新时间戳
  song: Song; // 歌曲信息
  alg: string; // 推荐算法标识
}

export interface IPrivateContentItem {
  // 媒体内容的ID
  id: number;
  // 媒体内容的URL，空字符串表示没有链接
  url: string;
  // 媒体内容的图片URL
  picUrl: string;
  // 媒体内容的小图片URL
  sPicUrl: string;
  // 媒体内容的类型，数字5可能表示特定的内容类型
  type: number;
  // 媒体内容的文案描述
  copywriter: string;
  // 媒体内容的名称
  name: string;
  // 推荐算法标识，如"featured"可能表示特色推荐
  alg: string;
  videoId: number
}


export interface IMvItem {
  id: number; // 曲目ID
  type: number; // 曲目类型，数字5可能表示特定的曲目类型
  name: string; // 曲目名称
  copywriter: string; // 编辑推荐语
  picUrl: string; // 曲目封面图片URL
  canDislike: boolean; // 是否允许不喜欢此曲目
  trackNumberUpdateTime: null | number; // 音轨编号更新时间戳，可能为null
  duration: number; // 曲目时长，单位为毫秒
  playCount: number; // 播放次数
  subed: boolean; // 是否已订阅
  artists: {
    id: number; // 艺人ID
    name: string; // 艺人名称
  }[]; // 艺术家信息列表
  artistName: string; // 艺术家名称
  artistId: number; // 艺术家ID
  alg: string; // 推荐算法标识，如"featured"表示特色推荐
}



interface Props {
  loading: boolean,
  banner: BannerItem[],
  bannerLoading: boolean;
  recommendResource: IRecommendItem[],
  recommendResourceLoading: boolean;
  privateContent: IPrivateContentItem[],
  privateContentLoading: boolean;
  newSong: INewSongItem[],
  newSongLoading: boolean;
  mv: IMvItem[]
  mvLoading: boolean;
}

interface Actions {
  init: () => void
  getBanner: () => void
  getRecommendResource: () => void
  getNewsong: () => void
  getPrivateContent: () => void
  getMv: () => void
}

const initialState = {
  loading: false,
  banner: [],
  bannerLoading: false,
  recommendResource: [],
  recommendResourceLoading: false,
  privateContent: [],
  privateContentLoading: false,
  newSong: [],
  newSongLoading: false,
  mv: [],
  mvLoading: false
}

export const usePersonalRecommendation = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        getBanner: async () => {
          try {
            set({ bannerLoading: true }, false, 'bannerLoading')
            const res = await banner()
            set({ bannerLoading: false, banner: res.success ? res.data.banners : [] }, false, '更新banner')
          } catch (error) {
            console.log('error', error)
            set({ bannerLoading: false }, false, 'bannerLoading')
          }
        },
        getRecommendResource: async () => {
          try {
            set({ recommendResourceLoading: true }, false, 'recommendResourceLoading')
            const res = await recommendResource()
            set({ recommendResourceLoading: false, recommendResource: res.success ? res.data.recommend : [] }, false, '获取推荐歌单')
          } catch (error) {
            console.log('error', error)
            set({ recommendResourceLoading: false }, false, 'recommendResourceLoading')
          }
        },
        getNewsong: async () => {
          try {
            set({ newSongLoading: true }, false, 'newSongLoading')
            const res = await newSong({ limit: 10 })
            set({ newSongLoading: false, newSong: res.success ? res.data.result : [] }, false, '获取最新音乐')

          } catch (error) {
            console.log('error', error)
            set({ newSongLoading: false }, false, 'newSongLoading')
          }
        },
        getPrivateContent: async () => {
          try {
            set({ privateContentLoading: true }, false, 'privateContentLoading')
            const res = await privateContent()
            set({ privateContentLoading: false, privateContent: res.success ? res.data.result : [] }, false, '获取独家放送')
          } catch (error) {
            console.log('error', error)
            set({ privateContentLoading: false }, false, 'privateContentLoading')
          }
        },
        getMv: async () => {
          try {
            set({ mvLoading: true }, false, 'mvLoading')
            const res = await mv()
            set({ mvLoading: false, mv: res.success ? res.data.result : [] }, false, '获取推荐MV')

          } catch (error) {
            console.log('error', error)
            set({ mvLoading: false }, false, 'mvLoading')
          }
        },
        init: async () => {
          try {
            set({ loading: true }, false, 'loading')
            await get().getBanner()
            await get().getRecommendResource()
            await get().getNewsong()
            await get().getPrivateContent()
            await get().getMv()
            set({ loading: false }, false, 'loading')

          } catch (error) {
            set({ loading: false }, false, 'loading')
            console.log('error', error)
          }

        },
      }),
      {
        name: "personalRecommendationStore",
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    ),
    {
      name: "personalRecommendationStore",
    }
  )
)

export const useInit = () => usePersonalRecommendation((state) => state.init)

export const useCarouseData = () => usePersonalRecommendation((state) => state.banner)

export const useCarouseLoading = () => usePersonalRecommendation((state) => state.bannerLoading)

export const useRecommendResource = () => usePersonalRecommendation((state) => state.recommendResource)
export const useRecommendResourceLoading = () => usePersonalRecommendation((state) => state.recommendResourceLoading)

export const useNewSong = () => usePersonalRecommendation((state) => state.newSong.slice(0, 5))
export const useNewSongLoading = () => usePersonalRecommendation((state) => state.newSongLoading)


export const usePrivateContent = () => usePersonalRecommendation((state) => state.privateContent)
export const usePrivateContentLoading = () => usePersonalRecommendation((state) => state.privateContentLoading)


export const useMV = () => usePersonalRecommendation((state) => state.mv)
export const useMVLoading = () => usePersonalRecommendation((state) => state.mvLoading)


import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { toplist, toplistDetail, playlistDetail } from '@/api/top'
import { IResp } from "@/help/server";
import { IPlaylistDetails, Playlist } from "@/types/playlistDetails";
import { usePlaylistDetail } from '@/store/playlistDetail'


export enum OfficialTypeEnum {
  China = 1,
  Europe,
  Korea,
  Japan
}

export interface ITopListItem {
  // 订阅者列表，空数组表示没有订阅者
  subscribers: any[];
  // 是否已订阅，null表示未知或不适用
  subscribed: boolean | null;
  // 歌单的创建者信息，null表示没有或不适用
  creator: any | null;
  // 歌单包含的艺人列表，null表示没有或不适用
  artists: any[] | null;
  // 歌单包含的曲目列表，null表示没有或不适用
  tracks: any[] | null;
  // 更新频率，如“刚刚更新”
  updateFrequency: string;
  // 背景封面ID，0表示默认或无封面
  backgroundCoverId: number;
  // 背景封面图片的URL，null表示没有或不适用
  backgroundCoverUrl: string | null;
  // 标题图片ID，0表示默认或无标题图片
  titleImage: number;
  // 封面文字，null表示没有或不适用
  coverText: string | null;
  // 标题图片的URL，null表示没有或不适用
  titleImageUrl: string | null;
  // 封面图片的URL，null表示没有或不适用
  coverImageUrl: string | null;
  // 图标图片的URL，null表示没有或不适用
  iconImageUrl: string | null;
  // 英文标题，null表示没有或不适用
  englishTitle: string | null;
  // 是否官方推荐，false表示不是
  opRecommend: boolean;
  // 推荐信息，null表示没有或不适用
  recommendInfo: any | null;
  // 社交歌单封面，null表示没有或不适用
  socialPlaylistCover: any | null;
  // 腾讯歌曲计数，0表示不适用或无曲目
  tsSongCount: number;
  // 更新时间戳，单位为毫秒
  updateTime: number;
  // 曲目数量
  trackCount: number;
  // 评论线程ID
  commentThreadId: string;
  // 曲目最后更新的时间戳，单位为毫秒
  trackUpdateTime: number;
  // 隐私设置，0表示公开
  privacy: number;
  // 播放次数
  playCount: number;
  // 特殊类型，如10表示某种特定的歌单类型
  specialType: number;
  // 曲目编号最后更新的时间戳，单位为毫秒
  trackNumberUpdateTime: number;
  // 封面图片ID
  coverImgId: number;
  // 封面图片的URL
  coverImgUrl: string;
  // 是否匿名创建，false表示不是匿名
  anonymous: boolean;
  // 是否为新导入的歌单，false表示不是
  newImported: boolean;
  // 总时长，单位为毫秒，0表示未知或不适用
  totalDuration: number;
  // 是否为高品质音频，false表示不是
  highQuality: boolean;
  // 广告类型，0表示没有广告
  adType: number;
  // 订阅者数量
  subscribedCount: number;
  // 云同步音轨数量
  cloudTrackCount: number;
  // 创建时间戳，单位为毫秒
  createTime: number;
  // 是否已排序，true表示已排序
  ordered: boolean;
  // 歌单描述
  description: string;
  // 歌单状态，0表示正常
  status: number;
  // 歌单标签列表
  tags: string[];
  // 创建者的用户ID
  userId: number;
  // 歌单名称
  name: string;
  // 歌单的唯一ID
  id: number;
  // 封面图片ID的字符串形式
  coverImgId_str: string;
  // 歌单类型，"S"可能表示某种特定的歌单类型
  ToplistType: string;
}

export interface IArtistToplist {
  // 封面图片的URL
  coverUrl: string;
  // 排行榜的名称
  name: string;
  // 更新频率，如"每天更新"
  updateFrequency: string;
  // 排行榜的位置或排名
  position: number;
  // 额外的更新频率信息，可能是重复字段
  upateFrequency: string; // 注意：字段名可能有拼写错误，应为 "updateFrequency"
}

// 定义一个歌手类型，包含三个属性：first, second, third
interface Artist {
  first: string; // 主要艺术家名称
  second: string; // 次要艺术家名称，此处为空字符串
  third: number; // 艺术家的某种标识符或ID
}

// 定义一个云音乐歌手榜类型
export interface IArtistToplistDetail {
  coverUrl: string; // 封面图片的URL
  artists: Artist[]; // 艺术家数组
  name: string; // 名称，如“云音乐歌手榜”
  updateFrequency: string; // 更新频率，如“每天更新”
  position: number; // 排名位置
}

interface MusicTrack {
  first: string; // 歌曲名
  second: string; // 歌手名
};

export interface ITopDetailListItem {
  subscribers: any[]; // 订阅者列表
  subscribed: null | boolean; // 是否已订阅
  creator: null | string; // 创建者
  artists: null | string; // 艺术家
  tracks: MusicTrack[]; // 歌曲列表
  updateFrequency: string; // 更新频率
  backgroundCoverId: number; // 背景封面ID
  backgroundCoverUrl: null | string; // 背景封面URL
  titleImage: number; // 标题图片
  coverText: null | string; // 封面文字
  titleImageUrl: null | string; // 标题图片URL
  coverImageUrl: null | string; // 封面图片URL
  iconImageUrl: null | string; // 图标图片URL
  englishTitle: null | string; // 英文标题
  opRecommend: boolean; // 是否官方推荐
  recommendInfo: null | string; // 推荐信息
  socialPlaylistCover: null | string; // 社交播放列表封面
  tsSongCount: number; // 歌曲数量（毫秒为单位）
  adType: number; // 广告类型
  trackNumberUpdateTime: number; // 曲目编号更新时间戳
  cloudTrackCount: number; // 云曲目数量
  subscribedCount: number; // 订阅数量
  specialType: number; // 特殊类型
  trackUpdateTime: number; // 曲目更新时间戳
  privacy: number; // 隐私设置
  playCount: number; // 播放次数
  anonimous: boolean; // 是否匿名
  coverImgId: number; // 封面图片ID
  updateTime: number; // 更新时间戳
  newImported: boolean; // 是否新导入
  trackCount: number; // 曲目数量
  coverImgUrl: string; // 封面图片URL
  commentThreadId: string; // 评论线程ID
  highQuality: boolean; // 是否高质量
  createTime: number; // 创建时间戳
  ordered: boolean; // 是否有序
  description: string; // 描述
  status: number; // 状态
  tags: string[]; // 标签列表
  userId: number; // 用户ID
  name: string; // 名称
  id: number; // ID
  coverImgId_str: string; // 封面图片ID字符串
  ToplistType: string; // 排行榜类型
}

interface IRewardToplistArtist {
  name: string; // 艺术家名称
  id: number; // 艺术家ID
  picId: number; // 艺术家图片ID
  img1v1Id: number; // 艺术家1v1图片ID
  briefDesc: string; // 艺术家简介
  picUrl: string; // 艺术家图片URL
  img1v1Url: string; // 艺术家1v1图片URL
  albumSize: number; // 艺术家专辑数量
  alias: string[]; // 艺术家别名列表
  trans: string; // 艺术家翻译名
  musicSize: number; // 艺术家音乐数量
  topicPerson: number; // 主题人物数量
}

interface IRewardToplistAlbum {
  name: string; // 专辑名称
  id: number; // 专辑ID
  type: string; // 专辑类型
  size: number; // 专辑中歌曲数量
  picId: number; // 专辑图片ID
  blurPicUrl: string; // 专辑模糊图片URL
  picUrl: string; // 专辑图片URL
  publishTime: number; // 专辑发布时间戳
  description: string; // 专辑描述
  tags: string; // 专辑标签
  company: null; // 专辑公司，可能为null
  briefDesc: string; // 专辑简介
  artist: IRewardToplistArtist; // 专辑的艺术家信息
  songs: any[]; // 专辑中包含的歌曲列表，具体结构未给出
  alias: string[]; // 专辑别名列表
  status: number; // 专辑状态
  copyrightId: number; // 版权ID
  commentThreadId: string; // 专辑评论线程ID
  artists: IRewardToplistArtist[]; // 专辑包含的艺术家列表
  subType: string; // 专辑子类型，如“录音室版”
  transName: null; // 专辑翻译名，可能为null
  onSale: boolean; // 是否在售
  mark: number; // 标记
  gapless: number; // 无间隙播放设置
  dolbyMark: number; // Dolby设置
  picId_str: string; // 专辑图片ID的字符串形式
}

interface IRewardToplistMusicQuality {
  name: null; // 音乐品质名称，可能为null
  id: number; // 音乐品质ID
  size: number; // 文件大小
  extension: string; // 文件扩展名
  sr: number; // 采样率
  dfsId: number; // DFS ID
  bitrate: number; // 比特率
  playTime: number; // 播放时长
  volumeDelta: number; // 音量差值
}

interface IRewardToplistSong {
  name: string; // 歌曲名称
  id: number; // 歌曲ID
  position: number; // 歌曲位置
  alias: string[]; // 歌曲别名列表
  status: number; // 歌曲状态
  fee: number; // 费用
  copyrightId: number; // 版权ID
  disc: string; // 唱片标识
  no: number; // 歌曲编号
  artists: Artist[]; // 歌曲的艺术家信息
  album: IRewardToplistAlbum; // 所属专辑信息
  starred: boolean; // 是否收藏
  popularity: number; // 歌曲热度
  score: number; // 评分
  starredNum: number; // 收藏数量
  duration: number; // 时长
  playedNum: number; // 播放次数
  dayPlays: number; // 日播放次数
  hearTime: number; // 收听时长
  sqMusic: IRewardToplistMusicQuality | null; // SQ品质音乐信息，可能为null
  hrMusic: IRewardToplistMusicQuality | null; // HR品质音乐信息，可能为null
  ringtone: string; // 铃声
  crbt: null; // 可能为null
  audition: null; // 试听信息，可能为null
  copyFrom: string; // 复制来源
  commentThreadId: string; // 评论线程ID
  rtUrl: null; // 可能为null
  ftype: number; // 文件类型
  rtUrls: any[]; // 相关URLs列表，具体结构未给出
  copyright: number; // 版权信息
  transName: null; // 翻译名，可能为null
  sign: null; // 签名信息，可能为null
  mark: number; // 标记
  originCoverType: number; // 原始封面类型
  originSongSimpleData: null; // 原始歌曲简单数据，可能为null
  single: number; // 单曲信息
  noCopyrightRcmd: null; // 无版权推荐，可能为null
  bMusic: IRewardToplistMusicQuality; // 基础品质音乐信息
  mp3Url: null; // MP3 URL，可能为null
  rtype: number; // 相关类型
  rurl: null; // 相关URL，可能为null
  mvid: number; // 音乐视频ID
  hMusic: IRewardToplistMusicQuality; // 高品质音乐信息
  mMusic: IRewardToplistMusicQuality; // 中品质音乐信息
  lMusic: IRewardToplistMusicQuality; // 低品质音乐信息
}

export interface IRewardToplist {
  coverUrl: string; // 封面图片URL
  songs: IRewardToplistSong[]; // 歌曲列表
  name: string; // 歌单名称
  position: number; // 歌单位置
}




interface Props {
  loading: boolean,
  topList: ITopListItem[],
  officialList: Playlist[],
  topListLoading: boolean,
  artistToplist: IArtistToplist | null,
  topListContent: ITopDetailListItem[],
  detailArtistToplist: IArtistToplistDetail | null,
  rewardToplist: IRewardToplist | null,
  topListContentLoading: boolean
}

interface Actions {
  getTopList: () => void
  getTopListContent: () => void
  getOfficialList: (isd: number[]) => void
  init: () => void
}

const initialState: Props = {
  loading: false,
  topListLoading: false,
  officialList: [],
  topList: [],
  artistToplist: null,
  detailArtistToplist: null,
  rewardToplist: null,
  topListContent: [],
  topListContentLoading: false
}



export const useTop = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        getTopList: async () => {
          try {
            set({ topListLoading: true }, false, 'topListLoading')
            const res = await toplist()
            console.log('res--11', res)

            set({ topListLoading: false, topList: res.data.list, artistToplist: res.data.artistToplist }, false, '获取所有榜单')

          } catch (error) {
            set({ topListLoading: false }, false, 'topListLoading')
            console.log('error', error)
          }
        },
        getTopListContent: async () => {
          try {
            set({ topListContentLoading: true }, false, 'topListContentLoading')
            const res = await toplistDetail()
            console.log('res--22', res)
            const target = res.data.list.filter(item => ['S', 'N', "O", 'H'].includes(item.ToplistType)).map(item => item.id)
            console.log('target--', target)
            get().getOfficialList(target)

            set({ topListContentLoading: false, topListContent: res.data.list, detailArtistToplist: res.data.artistToplist, rewardToplist: res.data.rewardToplist }, false, '所有榜单内容摘要')

          } catch (error) {
            set({ topListContentLoading: false }, false, 'topListContentLoading')
            console.log('error', error)
          }
        },
        init: async () => {
          try {
            set({ loading: true }, false, 'loading')
            await Promise.all([get().getTopListContent()])
            set({ loading: false }, false, 'loading')

          } catch (error) {
            set({ loading: false }, false, 'loading')
            console.log('error', error)
          }
        },
        getOfficialList: async (ids: number[]) => {
          try {
            let fnArr: Promise<IResp<IPlaylistDetails>>[] = []
            ids.forEach(id => {
              fnArr.push(playlistDetail({ id }))
            })
            const res = await Promise.all(fnArr)
            set({ officialList: res.map(item => item.data.playlist) })


            ids.forEach(item => {
              const result = res.find(d => Number(d.data.playlist.id) === Number(item))
              console.log('result---', result)
              const updateDetail = usePlaylistDetail.getState().updateDetail
              result && updateDetail(item, result.data)
            })


          } catch (error) {
            console.log('error', error)
          }
        }

      }),
      {
        name: "topStore",
        storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
      }
    ),
    {
      name: "topStore"
    }
  )
)

export const useGetTopList = () => useTop((state) => state.getTopList)
export const useGetTopListContent = () => useTop((state) => state.getTopListContent)
export const useInit = () => useTop((state) => state.init)

export const useOfficialList = () => useTop((state) => state.officialList)
export const useGlobalList = () => useTop((state) => state.topListContent.filter(item => !['S', 'N', "O", 'H'].includes(item.ToplistType)))
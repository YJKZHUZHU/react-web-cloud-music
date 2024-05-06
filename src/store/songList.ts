import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { IHighqualityParams, catlist, highquality, highqualityTags } from '@/api/songList'

enum CategoryEnum {
  /** 语种 */
  language,
  /** 风格 */
  style,
  /** 场景 */
  scene,
  /** 情感 */
  emotion,
  /** 主题 */
  theme
}

export interface SongCategory {
  name: string; // 歌单名称
  resourceCount: number; // 资源数量
  imgId: number; // 图片ID
  imgUrl?: null; // 图片URL，可能为null
  type: number; // 类型
  category: CategoryEnum; // 分类
  resourceType: number; // 资源类型
  hot: boolean; // 是否热门
  activity: boolean; // 是否有活动
}

export interface IHighqualityTagsItem {
  id: number,
  name: string,
  type: number,
  category: CategoryEnum,
  hot: boolean
}

export type CategoryType = {
  [key in CategoryEnum]: string; // 分类类型，键为数字，值为对应的分类名称
}

export interface IPlaylistItem {
  // 歌单名称
  name: string;
  // 歌单ID
  id: number;
  // 曲目编号更新时间（毫秒时间戳）
  trackNumberUpdateTime: number;
  // 歌单状态，具体含义需要根据业务逻辑确定
  status: number;
  // 创建该歌单的用户ID
  userId: number;
  // 歌单创建时间（毫秒时间戳）
  createTime: number;
  // 歌单更新时间（毫秒时间戳）
  updateTime: number;
  // 订阅该歌单的用户数量
  subscribedCount: number;
  // 歌单中的曲目数量
  trackCount: number;
  // 云端曲目数量，具体含义需要根据业务逻辑确定
  cloudTrackCount: number;
  // 歌单封面图片的URL
  coverImgUrl: string;
  // 歌单封面图片的ID
  coverImgId: number;
  // 歌单描述
  description: string;
  // 歌单标签列表
  tags: string[];
  // 播放次数
  playCount: number;
  // 曲目更新时间（毫秒时间戳）
  trackUpdateTime: number;
  // 特殊类型，具体含义需要根据业务逻辑确定
  specialType: number;
  // 总时长，单位未指定（可能为秒）
  totalDuration: number;
  // 歌单创建者信息
  creator: Creator;
  // 歌单中的曲目列表，这里为null，具体数据结构需要根据业务逻辑确定
  tracks: any[] | null;
  // 订阅者列表
  subscribers: Subscriber[];
  // 是否已订阅该歌单
  subscribed: boolean;
  // 评论线程ID
  commentThreadId: string;
  // 是否为新导入的歌单，具体含义需要根据业务逻辑确定
  newImported: boolean;
  // 广告类型，具体含义需要根据业务逻辑确定
  adType: number;
  // 是否为高品质音频
  highQuality: boolean;
  // 隐私设置，具体含义需要根据业务逻辑确定
  privacy: number;
  // 是否已排序
  ordered: boolean;
  // 是否匿名，具体含义需要根据业务逻辑确定
  anonimous: boolean;
  // 封面状态，具体含义需要根据业务逻辑确定
  coverStatus: number;
  // 推荐信息，具体数据结构需要根据业务逻辑确定
  recommendInfo: any;
  // 社交歌单封面，具体数据结构需要根据业务逻辑确定
  socialPlaylistCover: any;
  // 推荐文本，具体含义需要根据业务逻辑确定
  recommendText: string | null;
  // 分享次数
  shareCount: number;
  // 封面图片ID的字符串形式
  coverImgId_str: string;
  // 评论数量
  commentCount: number;
  // 宣传文案
  copywriter: string;
  // 标签字符串，由逗号分隔
  tag: string;
}

interface Creator {
  // 是否使用默认头像
  defaultAvatar: boolean;
  // 省份ID
  province: number;
  // 认证状态，具体含义需要根据业务逻辑确定
  authStatus: number;
  // 是否已关注
  followed: boolean;
  // 用户头像URL
  avatarUrl: string;
  // 账号状态，具体含义需要根据业务逻辑确定
  accountStatus: number;
  // 性别，1通常表示男性，2表示女性，具体含义需要根据业务逻辑确定
  gender: number;
  // 城市ID
  city: number;
  // 生日，格式为毫秒时间戳
  birthday: number;
  // 用户ID
  userId: number;
  // 用户类型，具体含义需要根据业务逻辑确定
  userType: number;
  // 用户昵称
  nickname: string;
  // 用户签名
  signature: string;
  // 用户描述
  description: string;
  // 详细描述
  detailDescription: string;
  // 用户头像图片ID
  avatarImgId: number;
  // 用户背景图片ID
  backgroundImgId: number;
  // 用户背景图片URL
  backgroundUrl: string;
  // 权限等级，具体含义需要根据业务逻辑确定
  authority: number;
  // 是否互粉
  mutual: boolean;
  // 专家标签列表
  expertTags: string[];
  // 专家领域，具体数据结构需要根据业务逻辑确定
  experts: { [key: number]: string };
  // DJ身份状态，具体含义需要根据业务逻辑确定
  djStatus: number;
  // VIP类型，具体含义需要根据业务逻辑确定
  vipType: number;
  // 备注名称
  remarkName: string | null;
  // 认证类型，具体含义需要根据业务逻辑确定
  authenticationTypes: number;
  // 用户头像详情，具体数据结构需要根据业务逻辑确定
  avatarDetail: AvatarDetail;
  // 背景图片ID的字符串形式
  backgroundImgIdStr: string;
  // 头像图片ID的字符串形式
  avatarImgIdStr: string;
  // 是否为主播
  anchor: boolean;
  // 头像图片ID的字符串形式（与avatarImgIdStr相同）
  avatarImgId_str: string;
}

interface AvatarDetail {
  // 用户类型，具体含义需要根据业务逻辑确定
  userType: number;
  // 身份等级，具体含义需要根据业务逻辑确定
  identityLevel: number;
  // 身份图标URL
  identityIconUrl: string;
}

interface Subscriber {
  // 是否使用默认头像
  defaultAvatar: boolean;
  // 省份ID
  province: number;
  // 认证状态，具体含义需要根据业务逻辑确定
  authStatus: number;
  // 是否已关注
  followed: boolean;
  // 用户头像URL
  avatarUrl: string;
  // 账号状态，具体含义需要根据业务逻辑确定
  accountStatus: number;
  // 性别，1通常表示男性，2表示女性，具体含义需要根据业务逻辑确定
  gender: number;
  // 城市ID
  city: number;
  // 生日，格式为毫秒时间戳
  birthday: number;
  // 用户ID
  userId: number;
  // 用户类型，具体含义需要根据业务逻辑确定
  userType: number;
  // 用户昵称
  nickname: string;
  // 用户签名
  signature: string;
  // 用户描述
  description: string;
  // 详细描述
  detailDescription: string;
  // 用户头像图片ID
  avatarImgId: number;
  // 用户背景图片ID
  backgroundImgId: number;
  // 用户背景图片URL
  backgroundUrl: string;
  // 权限等级，具体含义需要根据业务逻辑确定
  authority: number;
  // 是否互粉
  mutual: boolean;
  // 专家标签列表，可能为null
  expertTags: string[] | null;
  // 专家领域，可能为null
  experts: any;
  // DJ身份状态，具体含义需要根据业务逻辑确定
  djStatus: number;
  // VIP类型，具体含义需要根据业务逻辑确定
  vipType: number;
  // 备注名称
  remarkName: string | null;
  // 认证类型，具体含义需要根据业务逻辑确定
  authenticationTypes: number;
  // 用户头像详情，可能为null
  avatarDetail: any;
  // 背景图片ID的字符串形式
  backgroundImgIdStr: string;
  // 头像图片ID的字符串形式
  avatarImgIdStr: string;
  // 是否为主播
  anchor: boolean;
  // 头像图片ID的字符串形式（与avatarImgIdStr相同）
  avatarImgId_str: string;
}




interface Actions {
  getCatList: () => void
  getHighquality: (cat: string) => void
  getHighqualityTags: () => void
  init: () => void
  updateActiveTag: (tag: string) => void
}

interface Props {
  allCatlist: SongCategory | null,
  subCatlist: SongCategory[],
  categories: CategoryType | null,
  loading: boolean
  activeTag: string,
  highqualityTags: IHighqualityTagsItem[]
  highquality: { [key: string]: IPlaylistItem }
}
const initialState: Props = {
  allCatlist: null,
  subCatlist: [],
  highqualityTags: [],
  categories: null,
  loading: false,
  activeTag: '全部',
  highquality: {},
}

export const useSongList = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        updateActiveTag: (tag) => {
          set({ activeTag: tag }, false, '更新tag')
          // 请求精品歌单
          if (get().highqualityTags.find(item => item.name === tag)) {
            get().getHighquality(tag)
          }

        },
        getCatList: async () => {
          try {
            const res = await catlist()
            set({ allCatlist: res.data.all, subCatlist: res.data.sub, categories: res.data.categories, }, false, '更新歌单分类')
          } catch (error) {
            console.log('error', error)
          }
        },
        getHighqualityTags: async () => {
          try {
            const res = await highqualityTags()
            set({ highqualityTags: res.data.tags })
          } catch (error) {
            console.log('error', error)
          }
        },
        getHighquality: async (cat: string = '全部') => {
          try {
            const res = await highquality({ cat, limit: 1 })

            set({ highquality: { ...get().highquality, [cat]: res.data.playlists.at(0)! } }, false, '获取精品歌单')

          } catch (error) {
            console.log('error', error)
          }
        },
        init: async () => {
          try {
            set({ loading: true }, false, 'loading...')

            await get().getHighquality('全部')
            await get().getCatList()
            await get().getHighqualityTags()

            set({ loading: false }, false, 'loading...')
          } catch (error) {
            console.log('error', error)
            set({ loading: false }, false, 'loading...')
          }
        }
      }),
      {
        name: "songListStore",
        storage: createJSONStorage(() => localStorage),
        partialize: state => ({
          allCatlist: state.allCatlist,
          subCatlist: state.subCatlist,
          highqualityTags: state.highqualityTags,
          categories: state.categories,
          loading: state.loading,
          highquality: state.highquality
        })
      }
    ),
    {
      name: "songListStore"
    }
  )
)

export const useInit = () => useSongList(state => state.init)

export const useAllCatlist = () => useSongList(state => state.allCatlist)

export const useSubCatlist = () => useSongList(state => state.subCatlist)

export const useHighqualityDesc = () => useSongList(state => state.highquality[state.activeTag])

export const useHotTags = () => useSongList(state => state.subCatlist?.filter(item => item.hot))

export const useActiveTag = () => useSongList(state => state.activeTag)

export const useUpdateActiveTag = () => useSongList(state => state.updateActiveTag)

export const useHighqualityTags = () => useSongList(state => state.highqualityTags)

export const useReduceSubCatlist = () => useSongList(state => ([
  {
    name: '语种',
    key: CategoryEnum.language,
    list: state.subCatlist.filter(item => item.category === CategoryEnum.language)
  },
  {
    name: '情感',
    key: CategoryEnum.emotion,
    list: state.subCatlist.filter(item => item.category === CategoryEnum.emotion)
  },
  {
    name: '场景',
    key: CategoryEnum.scene,
    list: state.subCatlist.filter(item => item.category === CategoryEnum.scene)
  },
  {
    name: '风格',
    key: CategoryEnum.style,
    list: state.subCatlist.filter(item => item.category === CategoryEnum.style)
  },
  {
    name: '主题',
    key: CategoryEnum.theme,
    list: state.subCatlist.filter(item => item.category === CategoryEnum.theme)
  }
]))



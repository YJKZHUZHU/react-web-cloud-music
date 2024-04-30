import { service } from '@/help/server'
import { BannerItem, IMvItem, INewSongItem, IPrivateContentItem, IRecommendItem } from '@/store/personalRecommendation'
import { CommentSortTypeEnum, CommentTypeEnum, ICommentItem } from '@/types/comment';


enum FetchEnum {
  commentPlaylist = '/comment/playlist',
  /** 热门评论 */
  commentHot = '/comment/hot',
  /** 评论 */
  commentNew = '/comment/new'
}

interface ICommentPlaylistParams {
  /** 歌单 id */
  id: number,
  /** 取出评论数量 , 默认为 20 */
  limit?: number,
  /** 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值 */
  offset?: number,
  /** 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到) */
  before?: number
}


interface ICommentPlaylistRes {
  // 是否是音乐家，布尔值
  isMusician: boolean;
  // 某个数值，可能是计数或者编号
  cnum: number;
  // 用户ID
  userId: number;
  // 顶级评论列表，可能是空数组
  topComments: ICommentItem[];
  // 是否有更多热门评论，布尔值
  moreHot: boolean;
  // 热门评论列表，可能是空数组
  hotComments: ICommentItem[];
  // 评论横幅，可能为null
  commentBanner: string | null;
  // 响应码，通常是HTTP状态码
  code: number;
  // 评论列表，可能是空数组
  comments: ICommentItem[];
  // 评论总数
  total: number;
  // 是否有更多评论，布尔值
  more: boolean;
}


export const commentPlaylist = (data: ICommentPlaylistParams) => {
  return service<ICommentPlaylistRes>(FetchEnum.commentPlaylist, data)
}

interface ICommentHotParams {
  id: number,
  type: CommentTypeEnum
  /** 取出评论数量 , 默认为 20 */
  limit?: number
  /** 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值 */
  offset?: number
  /** 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到) */
  before?: string
}
interface ICommentHotRes {
  topComments: ICommentItem[]
  hasMore: true,
  hotComments: ICommentItem[]
  total: number,
  code: number
}
export const commentHot = (data: ICommentHotParams) => {
  return service<ICommentHotRes>(FetchEnum.commentHot, data)
}

interface ICommentNewParams {
  id: number,
  type: CommentTypeEnum
  /** 分页参数,第 N 页,默认为 1 */
  pageNo?: number
  /** 分页参数,每页多少条数据,默认 20 */
  pageSize?: number
  /** 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序 */
  sortType?: CommentSortTypeEnum
  /** 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time */
  cursor?: string
}
interface ICommentNewRes {
  commentsTitle: string,
  comments: ICommentItem[],
  currentCommentTitle: string,
  currentComment: null | any,
  totalCount: number,
  hasMore: boolean,
  cursor: string,
  sortType: number,
  sortTypeList: {
    sortType: 99 | 2 | 3,
    sortTypeName: string,
    target: "order_by_alg" | 'order_by_hot' | 'order_by_time'
  }[],
  style: string,
  bottomAction: null | any,
  likeAnimation: {
    animationConfigMap: {
      EVENT_FEED: [],
      MOMENT: [],
      INPUT: [],
      COMMENT_AREA: []
    },
    version: number
  },
  newReplyExpGroupName: string,
  expandCount: number
}
export const commentNew = (data: ICommentNewParams) => {
  return service<ICommentNewRes>(FetchEnum.commentNew, data)
}









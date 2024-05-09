import { service } from '@/help/server'
import { BannerItem, IMvItem, INewSongItem, IPrivateContentItem, IRecommendItem } from '@/store/personalRecommendation'


enum FetchEnum {
  banner = '/banner',
  /** 每日歌单推荐，需要登录 */
  recommendResource = '/recommend/resource',
  /** 推荐新音乐 */
  newSong = '/personalized/newsong',
  /** 独家放送 */
  privateContent = '/personalized/privatecontent',
  /** 推荐mv */
  mv = '/personalized/mv'
}

export const banner = () => {
  return service<{ banners: BannerItem[] }>(FetchEnum.banner)
}

interface IRecommendResourceRes {
  code: number,
  haveRcmdSongs: boolean,//是否有推荐歌曲，false表示没有
  recommend: IRecommendItem[],
  featureFirst: boolean //是否优先展示特性或功能，true表示是
}

export const recommendResource = () => {
  return service<IRecommendResourceRes>(FetchEnum.recommendResource)
}

interface INewSongRes {
  category: number,
  code: number
  result: INewSongItem[]
}
export const newSong = (data: { limit: number }) => {
  return service<INewSongRes>(FetchEnum.newSong, data)
}

interface IPrivateContentRes {
  code: number,
  name: string,
  result: IPrivateContentItem[]
}
export const privateContent = () => {
  return service<IPrivateContentRes>(FetchEnum.privateContent)
}

interface IMvRes {
  category: number
  code: number
  result: IMvItem[]
}
export const mv = () => {
  return service<IMvRes>(FetchEnum.mv)
}




import { cssExports } from './../pages/mv/components/SelectTag/index.scss.d';
import { service } from '@/help/server'
import { ILyrics, IPrivilegeItem, ISongUrl, ISongsItem, MusicLevelEnum } from '@/store/player'
import { IArtistToplist, IArtistToplistDetail, IRewardToplist, ITopDetailListItem, ITopListItem, OfficialTypeEnum } from '@/store/top'
import { IPlaylistDetails } from '@/types/playlistDetails';


enum FetchEnum {
  /** 歌手榜 */
  toplistArtist = '/toplist/artist',
  /** 所有榜单 */
  toplist = '/toplist',
  /**所有榜单内容摘要 */
  toplistDetail = '/toplist/detail',
  /** 歌单详情 */
  playlistDetail = 'playlist/detail'
}

export const toplistArtist = (data: { type: OfficialTypeEnum }) => {
  return service<ISongUrl[]>(FetchEnum.toplistArtist, data)
}

interface IToplistRes {
  artistToplist: IArtistToplist,
  list: ITopListItem[]
}

export const toplist = () => {
  return service<IToplistRes>(FetchEnum.toplist)
}

interface ITopListDetailRes {
  artistToplist: IArtistToplistDetail,
  list: ITopDetailListItem[],
  rewardToplist: IRewardToplist
}
export const toplistDetail = () => {
  return service<ITopListDetailRes>(FetchEnum.toplistDetail)
}

export const playlistDetail = (data: { id: string | number, s?: number }) => {
  return service<IPlaylistDetails>(FetchEnum.playlistDetail, data)
}









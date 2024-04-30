import { service } from '@/help/server'
import { IPlaylistDetails, ISubscriber } from '@/types/playlistDetails';


enum FetchEnum {
  /** 歌单详情 */
  playlistDetail = '/playlist/detail',
  /** 歌单收藏 */
  playlistSubscribers = '/playlist/subscribers'
}


export const playlistDetail = (data: { id: string | number, s?: number }) => {
  return service<IPlaylistDetails>(FetchEnum.playlistDetail, data)
}

interface IPlaylistSubscribersParams {
  id: number,
  limit?: number
  offset?: number
}
interface IPlaylistSubscribersRes {
  total: number,
  code: number,
  more: true,
  subscribers: ISubscriber[]
}
export const playlistSubscribers = (data: IPlaylistSubscribersParams) => {
  return service<IPlaylistSubscribersRes>(FetchEnum.playlistSubscribers, data)
}











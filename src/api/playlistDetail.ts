import { service } from '@/help/server'
import { IPlaylistDetails } from '@/types/playlistDetails';


enum FetchEnum {
  /** 歌单详情 */
  playlistDetail = '/playlist/detail',
}


export const playlistDetail = (data: { id: string | number, s?: number }) => {
  return service<IPlaylistDetails>(FetchEnum.playlistDetail, data)
}








